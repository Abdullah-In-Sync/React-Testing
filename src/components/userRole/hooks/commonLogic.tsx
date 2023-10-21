import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

export const commonLogic = ({ confirmRef }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleSavePress = (
    formFields,
    { setSubmitting },
    { onSubmitForm, description }
  ) => {
    confirmRef.current.openConfirm({
      confirmFunction: (callback) => onSubmitForm(formFields, callback),
      description,
      setSubmitting,
    });
  };

  const onPressCancel = ({ description, redirectUrl }) => {
    confirmRef.current.openConfirm({
      confirmFunction: () => router.push(redirectUrl),
      description,
    });
  };

  const redirectionWithDisplayMessage = ({
    result,
    message,
    cMessage,
    redirectUrl,
  }) => {
    if (result) {
      enqueueSnackbar(cMessage, {
        variant: "success",
      });
      router.push(redirectUrl);
    } else if (!result && message) {
      enqueueSnackbar(message, {
        variant: "error",
      });
    }
  };

  return { handleSavePress, onPressCancel, redirectionWithDisplayMessage };
};
