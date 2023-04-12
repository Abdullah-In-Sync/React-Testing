import {
  TemplateDataFormat1,
  TemplateDataFormat2,
} from "../../../common/TemplateFormat/types";
import { Formik, FormikProps } from "formik";
import {ConfirmElement} from "../../../common/TemplateFormat/ConfirmWrapper";
import {
  ConfirmInfoElement,
} from "../../../common/CustomModal/InfoModal";
import { ForwardedRef } from "react";

export interface InitialFormValues {
  title: string;
  description: string;
  orgId: string;
  templateId: string | number;
  templateData: TemplateDataFormat1 | TemplateDataFormat2;
}

export interface ModalRefs {
  confirmRef?: ForwardedRef<ConfirmElement> ;
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
  measureData?: any;
  formikProps?: FormikProps<InitialFormValues>;
  handleDeleteQuestion?: (v) => void;
}
