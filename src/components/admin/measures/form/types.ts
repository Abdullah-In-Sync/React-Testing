import { FormikProps } from "formik";
import { ForwardedRef } from "react";
import { AdminViewMeasureById } from "../../../../graphql/Measure/types";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import { ConfirmElement } from "../../../common/TemplateFormat/ConfirmWrapper";
import {
  TemplateDataFormat1,
  TemplateDataFormat2,
} from "../../../common/TemplateFormat/types";

export interface InitialFormValues {
  title: string;
  description: string;
  orgId: string;
  templateId: string | number;
  templateData: TemplateDataFormat1 | TemplateDataFormat2;
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
  measureData?: AdminViewMeasureById;
  formikProps?: FormikProps<InitialFormValues>;
  handleDeleteQuestion?: (v) => void;
  isEdit?: boolean;
}
