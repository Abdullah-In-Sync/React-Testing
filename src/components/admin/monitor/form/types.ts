import { FormikProps } from "formik";
import { ForwardedRef } from "react";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import { ConfirmElement } from "../../../common/ConfirmWrapper";

export interface InitialFormValues {
  name: string;
  orgId: string;
  questions: string | number;
}

export interface ModalRefs {
  confirmRef?: ForwardedRef<ConfirmElement> | any;
  infoModalRef?: ForwardedRef<ConfirmInfoElement>;
}

export interface CommonFormProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  organizationList?: Array<{
    [key: string]: any;
  }>;
  onPressCancel?: () => void;
  formikProps?: FormikProps<InitialFormValues>;
  handleDeleteQuestion?: (v) => void;
}
