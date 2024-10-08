import { useRouter } from "next/router";

import { Amplify, Auth } from "aws-amplify";
import { clearSession, setSessionToken } from "../utility/storage";
import { env } from "./../lib/env";
import { parseJwt } from "../utility/helper";
const {
  cognito: { region, userPoolId, clientId },
} = env;

/* istanbul ignore next */
Amplify.configure({
  Auth: {
    region,
    userPoolId,
    userPoolWebClientId: clientId,
    mandatorySignIn: false,
  },
});

/* istanbul ignore next */
export const useAuth = () => {
  const router = useRouter();

  const handleCustomData = (idTokenData, callback) => {
    const { role_detail } = idTokenData;
    const roleDetailObj = JSON.parse(role_detail);
    callback(roleDetailObj["accessibility"]);
  };

  const storeToken = ({ userData, callback, setSubmitting }) => {
    setSessionToken(userData, ({ userType }) => {
      callback({
        status: "success",
        data: userData,
        message: "Login successful!",
        userType,
        setSubmitting,
      });
    });
  };
  const login = async (values, { setSubmitting, callback }) => {
    const { username, password } = values;
    try {
      const user = await Auth.signIn(username, password);

      const {
        signInUserSession: {
          accessToken: { jwtToken, payload },
          idToken: { jwtToken: jwtIdToken },
        },
      } = user;
      const jwtIdTokenDecodeData = parseJwt(jwtIdToken);
      const userRoles = jwtIdTokenDecodeData["cognito:groups"];

      const userData = {
        jwtToken,
        jwtIdToken,
        exp: payload["exp"],
      };
      if (userRoles.includes("custom")) {
        handleCustomData(jwtIdTokenDecodeData, (userType) => {
          storeToken({
            userData: { ...userData, ...{ userType } },
            callback,
            setSubmitting,
          });
        });
      } else {
        storeToken({
          userData: { ...userData, ...{ userType: userRoles[0] } },
          callback,
          setSubmitting,
        });
      }
    } catch (error) {
      callback({ status: "error", message: error.message, setSubmitting });
    }
  };

  const changePassword = async (
    oldPassword: string,
    newPassword: string,
    callback
  ) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(user, oldPassword, newPassword);
      callback({
        status: "success",
        ...{ data, message: "Password updated successfully!" },
      });
    } catch (err) {
      callback({ status: "error", message: err.message });
    }
  };

  const logout = async (callback) => {
    try {
      await Auth.signOut();
      router.replace("/account");
      clearSession(() => {
        return callback({
          status: "success",
          message: "Logout successful!",
        });
      });
    } catch (error) {
      return callback({
        status: "error",
        message: error.message,
      });
    }
  };

  // Send confirmation code to user's email
  const forgotPassword = async (values, callback) => {
    const { username } = values;
    try {
      await Auth.forgotPassword(username);
      return callback({
        status: "success",
        message: "Security code has been sent to your email!",
      });
    } catch (error) {
      return callback({
        status: "error",
        message: error.message,
      });
    }
  };

  // Collect confirmation code and new password
  const forgotPasswordSubmit = async (
    username: string,
    code: string,
    newPassword: string,
    callback
  ) => {
    try {
      await Auth.forgotPasswordSubmit(username, code, newPassword);
      return callback({
        status: "success",
        message: "Password updated successfully!",
      });
    } catch (error) {
      return callback({
        status: "error",
        message: error.message,
      });
    }
  };

  return {
    login,
    logout,
    changePassword,
    forgotPassword,
    forgotPasswordSubmit,
  };
};
