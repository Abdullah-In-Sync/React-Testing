import type { NextPage } from "next";
import { useSnackbar } from "notistack";
import LoginComponent from "../../components/login/Login";
import { useAuth } from "../../hooks/useAuth";

const LoginPage: NextPage = () => {
  const { login } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const handleLoginCallback = ({ data, status }) => {
    const { message } = data;
    enqueueSnackbar(message, {
      variant: status,
    });
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
