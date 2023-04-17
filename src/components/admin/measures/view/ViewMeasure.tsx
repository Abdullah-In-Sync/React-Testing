import { Formik } from "formik";
import React from "react";
import ContentHeader from "../../../common/ContentHeader";
import ViewForm from "../form/ViewForm";
import { CommonFormProps } from "../form/types";

type ViewProps = CommonFormProps;

const EditMeasuersForm: React.FC<ViewProps> = ({ measureData }) => {
  const {
    title = "",
    description = "",
    org_id: orgId = "",
    template_id: templateId = "",
    template_data = null,
    organization_name = "",
  } = measureData || {};

  const initialValues = {
    title,
    description,
    orgId,
    templateId,
    templateData: JSON.parse(template_data),
  };

  const commonform = () => {
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={null}
        children={(props: any) => <ViewForm formikProps={props} />}
      />
    );
  };

  return (
    <>
      <ContentHeader title={organization_name} />
      {commonform()}
    </>
  );
};

export default EditMeasuersForm;
