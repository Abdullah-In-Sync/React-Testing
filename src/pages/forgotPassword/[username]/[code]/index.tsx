import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import NewPassword from "../../../../components/forgotPassword/newPassword/NewPassword";
import { useAuth } from "../../../../hooks/useAuth";

const CreatePasswordPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { code, username },
  } = router;
  const { forgotPasswordSubmit } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const handleCallback = ({ setSubmitting, message, status }) => {
    enqueueSnackbar(message, {
      variant: status,
    });
    setSubmitting(false);
    if (status === "success") router.push("/login");
  };

  const handleSubmit = ({ newPassword }, { setSubmitting }) => {
    forgotPasswordSubmit(
      username as string,
      code as string,
      newPassword,
      (value) => handleCallback({ ...value, setSubmitting })
    );
  };

  return (
    <>
      <NewPassword submitForm={handleSubmit} />
    </>
  );
};

export default CreatePasswordPage;
