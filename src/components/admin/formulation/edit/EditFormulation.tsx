import { Stack } from "@mui/material";
import { Formik, FormikProps } from "formik";
import * as React from "react";
import { ForwardedRef, useRef } from "react";
import * as Yup from "yup";
import { GetFormulationById } from "../../../../graphql/formulation/types";
import { ConfirmElement } from "../../../common/ConfirmWrapper";
import AdminFormulationForm from "../form/AdminFormulationForm";

interface ViewProps {
  data?: GetFormulationById;
  submitForm?: (
    formData: FormulationFormInitialData,
    formikHelper: FormikProps<FormulationFormInitialData>
  ) => void;
  organizationList?: Array<{
    [key: string]: any;
  }>;
  confirmRef?: ForwardedRef<ConfirmElement>;
  onPressCancel?: () => void;
}

export const validationSchema = Yup.object().shape(
  {
    name: Yup.string().required("Name is required"),
    all: Yup.bool().when("onlyMe", {
      is: false,
      then: Yup.bool().oneOf([true], "Availability of Resource is required"),
      otherwise: Yup.bool(),
    }),
    onlyMe: Yup.bool().when("all", {
      is: false,
      then: Yup.bool().oneOf([true], "Availability of Resource is required"),
      otherwise: Yup.bool(),
    }),
  },
  [["all", "onlyMe"]]
);

const EditFormulationComponent: React.FC<ViewProps> = ({
  data,
  submitForm,
  organizationList,
  confirmRef,
  onPressCancel,
}) => {
  const selectTemplateRef = useRef(null);
  const {
    template_id,
    org_id,
    formulation_type,
    formulation_name = "",
    formulation_instruction,
    formulation_desc = "",
    formulation_avail_for,
    template_data = null,
  } = data || {};
  const templateData = JSON.parse(template_data);
  const formationAvail = JSON.parse(formulation_avail_for);

  const initialValues = {
    name: formulation_name,
    description: formulation_desc,
    instruction: formulation_instruction,
    all: formationAvail.includes(2),
    onlyMe: formationAvail.includes(1),
    templateData,
    orgId: org_id,
    componentName: templateData.rows ? "TemplateTable" : "ArrowTemplate",
    template_id,
    formulation_type,
  } as FormulationFormInitialData;

  return (
    <Stack>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        children={(props) => (
          <AdminFormulationForm
            organizationList={organizationList}
            formikProps={props}
            selectTemplateRef={selectTemplateRef}
            confirmRef={confirmRef}
            onPressCancel={onPressCancel}
          />
        )}
      />
    </Stack>
  );
};

export default EditFormulationComponent;

export interface FormulationFormInitialData {
  name?: string;
  description?: string;
  instruction?: string;
  all?: boolean;
  onlyMe?: boolean;
  orgId?: string;
  componentName?: string;
  template_id?: string;
  formulation_type?: number;
  templateData?: any;
}
