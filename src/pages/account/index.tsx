import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import LoginComponent from "../../components/login/Login";
import { useAppContext } from "../../contexts/AuthContext";
import { queryOrgTokenData } from "../../hooks/fetchOrgTokenData";
import { useAuth } from "../../hooks/useAuth";
import { homeRoute } from "../../lib/constants";
import { clearSession } from "../../utility/storage";

const LoginPage: NextPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { orgQuery, getTokenQuery } = queryOrgTokenData();
  const { setUser, setIsAuthenticated } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleAuthLoginRedirection = ({ userType }) => {
    const { _id: orgId } = orgQuery || {};
    getTokenQuery[userType]({
      onCompleted: (orgTokenData) => {
        const { getTokenData: tData = {} } = orgTokenData;
        const { organization_settings: { _id: tokenOrgId = undefined } = {} } =
          tData;
        if (orgId === tokenOrgId) {
          setUser({
            ...tData,
          });
          setIsAuthenticated(true);
          nofify({
            status: "success",
            message: "Login successful!",
          });
          return router.replace(homeRoute[userType]);
        } else {
          clearSession(() => {
            nofify({
              status: "error",
              message: "Not allowed!",
            });
          });
        }
      },
    });
  };

  const nofify = ({ status, message }) => {
    enqueueSnackbar(message, {
      variant: status,
    });
  };

  const handleLoginCallback = ({ status, message, userType }) => {
    if (status === "error")
      return nofify({
        status,
        message,
      });
    else if (userType === "admin") {
      nofify({
        status,
        message,
      });
      return router.replace(homeRoute[userType]);
    }

    handleAuthLoginRedirection({ userType });
  };

  const handleSubmit = (formFields, { setSubmitting }) => {
    login(formFields, { setSubmitting, callback: handleLoginCallback });
  };

  return (
    <>
      <LoginComponent submitForm={handleSubmit} />
    </>
  );
};

export default LoginPage;
