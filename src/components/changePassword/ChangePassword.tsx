import { Formik } from "formik";
import { useSnackbar } from "notistack";
import React from "react";
import * as Yup from "yup";
import { useAuth } from "../../hooks/useAuth";
import InfoModal, { ConfirmInfoElement } from "../common/CustomModal/InfoModal";
import ChangePasswordForm from "./ChangePasswordForm";
import { useStyles } from "./changePasswordStyles";

export const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Least 8 characters")
    .matches(/[a-z]+/, "Lowercase (a-z) and Uppercase (A-Z)")
    .matches(/[A-Z]+/, "Lowercase (a-z) and Uppercase (A-Z)")
    .matches(/[@$!%*#?&]+/, "Least one number (0-9) and a symbol")
    .matches(/\d+/, "Least one number (0-9) and a symbol"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword: React.FC<ChangePasswordProps> = ({ infoModalRef }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { changePassword } = useAuth();
  const styles = useStyles();

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleResponse = ({ status, message, setSubmitting }) => {
    enqueueSnackbar(message, {
      variant: status,
    });
    setSubmitting(false);
    infoModalRef.current.close();
  };

  const onSubmit = (values, { setSubmitting }) => {
    const { oldPassword, newPassword } = values;
    changePassword(oldPassword, newPassword, (value) =>
      handleResponse({ ...value, setSubmitting })
    );
  };

  return (
    <>
      <InfoModal
        ref={infoModalRef}
        maxWidth="sm"
        className={styles.changePasswordModalWrapper}
        headerTitleText="Change Password"
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
          children={(props) => <ChangePasswordForm {...props} />}
        />
      </InfoModal>
    </>
  );
};

export default ChangePassword;

export interface ChangePasswordProps {
  data?: any;
  handleBackClick?: () => void;
  infoModalRef: { current: ConfirmInfoElement };
  onSubmit?: any;
}
