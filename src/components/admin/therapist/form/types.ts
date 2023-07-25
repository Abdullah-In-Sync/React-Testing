import { FormikProps } from "formik";
import { ForwardedRef } from "react";
import { ConfirmInfoElement } from "../../../common/CustomModal/InfoModal";
import { ConfirmElement } from "../../../common/ConfirmWrapper";

export interface InitialFormValues {
  email: string;
  therapist_name: string;
  password: string;
  org_id: string;
  plan: string;
  trial_period: string;
  therapist_specialization: string;
  therapist_proofaccredition: number;
  accredited_body: string;
  therapist_totexp: string;
  therapist_add: string;
  therapist_inscover: string;
  therapist_poa_attachment: string;
  phone_number: string;
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
  edit?: boolean;
  masterData?: any;
}

export interface Questions {
  questionId?: string;
  question?: string;
  questionType?: string;
  questionOption?: any;
}

export interface ViewMonitorType {
  name: string;
  orgId: string;
  questions: Questions[];
  organizationName;
}
