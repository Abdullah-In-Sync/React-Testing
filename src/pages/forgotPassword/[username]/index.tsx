import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import SecurityVerificationCodeComponent from "../../../components/forgotPassword/securityVerification/SecurityVerificationCode";
import { useAuth } from "../../../hooks/useAuth";

const SecurityCodePage: NextPage = () => {
  const router = useRouter();
  const {
    query: { username },
  } = router;
  const { forgotPassword } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = ({ code }, { setSubmitting }) => {
    setSubmitting(false);
    router.push(`/forgotPassword/${username}/${code}`);
  };

  const handleCallback = ({ message, status }) => {
    enqueueSnackbar(message, {
      variant: status,
    });
  };

  const resendConfirmation = () => {
    forgotPassword({ username }, (value) => handleCallback({ ...value }));
  };

  return (
    <>
      <SecurityVerificationCodeComponent
        resendConfirmation={resendConfirmation}
        submitForm={handleSubmit}
        username={username as string}
      />
    </>
  );
};

export default SecurityCodePage;
