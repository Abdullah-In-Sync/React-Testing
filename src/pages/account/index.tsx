import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import LoginComponent from "../../components/login/Login";
import { useAppContext } from "../../contexts/AuthContext";
import { queryOrgTokenData } from "../../hooks/fetchOrgTokenData";
import { useAuth } from "../../hooks/useAuth";
import { homeRoute } from "../../lib/constants";
import { clearSession } from "../../utility/storage";
import { getTokenIdDecodedData } from "../../utility/helper";

const LoginPage: NextPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const { orgQuery } = queryOrgTokenData();
  const { setUser, setIsAuthenticated } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleAuthLoginRedirection = ({
    userType,
    status,
    message,
    setSubmitting,
  }) => {
    const { _id: orgId } = orgQuery || {};
    const tData = getTokenIdDecodedData();
    /* istanbul ignore next */
    const { org_id: tokenOrgId } = tData[userType + "_data"] || {};

    if (orgId === tokenOrgId || userType === "admin") {
      setUser({
        ...tData,
      });
      setIsAuthenticated(true);
      nofify({
        status: status,
        message: message,
      });
      setSubmitting(false);
      return router.replace(homeRoute[userType]);
    } else {
      clearSession(() => {
        nofify({
          status: "error",
          message: "Not allowed!",
        });
      });
      setSubmitting(false);
    }
  };

  const nofify = ({ status, message }) => {
    enqueueSnackbar(message, {
      variant: status,
    });
  };

  const handleLoginCallback = ({
    status,
    message,
    userType,
    setSubmitting,
  }) => {
    if (status === "error") {
      setSubmitting(false);
      return nofify({
        status,
        message,
      });
    }
    handleAuthLoginRedirection({ userType, status, message, setSubmitting });
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
