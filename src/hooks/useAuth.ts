import { useRouter } from "next/router";

import { Amplify, Auth } from "aws-amplify";
import { homeRoute } from "../lib/constants";
import { clearSession, setSessionToken } from "../utility/storage";
import { env } from "./../lib/env";
const {
  cognito: { region, userPoolId, clientId },
} = env;

/* istanbul ignore next */
Amplify.configure({
  Auth: {
    region,
    userPoolId,
    userPoolWebClientId: clientId,
  },
});

/* istanbul ignore next */
export const useAuth = () => {
  const router = useRouter();
  const login = async (values, { setSubmitting, callback }) => {
    const { username, password } = values;
    try {
      const user = await Auth.signIn(username, password);
      const {
        signInUserSession: {
          accessToken: { jwtToken, payload },
        },
      } = user;

      const userData = {
        jwtToken,
        userType: payload["cognito:groups"][0],
        exp: payload["exp"],
      };

      setSessionToken(userData, ({ userType }) => {
        callback({
          status: "success",
          data: userData,
          message: "Login successful!",
        });
        return router.replace(homeRoute[userType]);
      });
    } catch (error) {
      callback({ status: "error", message: error.message });
    } finally {
      setSubmitting(false);
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
        ...{ data, message: "Password changed successfully!" },
      });
    } catch (err) {
      callback({ status: "error", message: err.message });
    }
  };

  const logout = async (callback) => {
    try {
      await Auth.signOut();
      router.replace("/login");
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

  return {
    login,
    logout,
    changePassword,
  };
};
