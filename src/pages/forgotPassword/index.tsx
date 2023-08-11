import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import ForgotPasswordComponent from "../../components/forgotPassword/ForgotPassword";
import { useAuth } from "../../hooks/useAuth";

const ForgotPasswordPage: NextPage = () => {
  const router = useRouter();
  const { forgotPassword } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const handleLoginCallback = ({
    status,
    message,
    username,
    setSubmitting,
  }) => {
    enqueueSnackbar(message, {
      variant: status,
    });
    setSubmitting(false);
    if (status === "success") router.push(`/forgotPassword/${username}`);
  };

  const handleSubmit = (formFields, { setSubmitting }) => {
    forgotPassword(formFields, (value) =>
      handleLoginCallback({
        ...value,
        username: formFields.username,
        setSubmitting,
      })
    );
  };

  return (
    <>
      <ForgotPasswordComponent submitForm={handleSubmit} />
    </>
  );
};

export default ForgotPasswordPage;
