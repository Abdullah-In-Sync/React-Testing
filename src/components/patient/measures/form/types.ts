import { FormikProps } from "formik";
import { ForwardedRef } from "react";
import { TherapistListMeasuresEntity } from "../../../../graphql/Measure/types";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import {
  TemplateDataFormat1,
  TemplateDataFormat2,
} from "../../../common/TemplateFormat/types";
import { ConfirmElement } from "../../../common/ConfirmWrapper";

export interface InitialFormValues {
  title: string;
  description: string;
  orgId?: string;
  templateId: string | number;
  templateData: TemplateDataFormat1 | TemplateDataFormat2;
  sessionNo?: string;
  score?: number;
}

export interface ModalRefs {
  confirmRef?: ForwardedRef<ConfirmElement>;
  infoModalRef?: ForwardedRef<ConfirmInfoElement>;
}

export interface CommonFormProps {
  submitForm?: (
    formData: InitialFormValues,
    formikHelper: FormikProps<InitialFormValues>
  ) => void;
  onPressCancel?: (value) => void;
  measureData?: TherapistListMeasuresEntity | any;
  formikProps?: FormikProps<InitialFormValues>;
  handleDeleteQuestion?: (v) => void;
  isEdit?: boolean;
}
