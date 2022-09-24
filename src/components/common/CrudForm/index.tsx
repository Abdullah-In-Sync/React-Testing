import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";

const FieldsLayout = dynamic(import("../CrudDialog/fields/FieldsLayout"), {
  ssr: false,
});

interface CrudFormProps {
  [x: string]: any;
  type?: string; // 👈️ marked optional
  values?: any;
  buttonText?: any;
  callBackFormValues?: (params: any) => any;
  open?: boolean;
  fields?: any;
  onClose?: () => void;
  onFieldChange?: (params: any) => void;
  title?: string;
  onsubmit?: (values: any) => void;
  okText?: string;
  cancelText?: string;
  mode?: string;
  hide?: boolean;
  description?: string;
  extraButtonText?: boolean;
  onExtraButton?: (params: any) => any;
  dynamicForm?: any;
  viewData?: any;
  submitButtonDisabled?: boolean;
}

const CrudForm = ({
  open = false,
  fields = [],
  onsubmit,
  onFieldChange,
  values = {},
  mode = "Add",
}: CrudFormProps) => {
  const [fieldValues, setFieldValues] = useState<any>({});

  useEffect(() => {
    if (open == false) {
      setFieldValues({});
    }
  }, [open]);
  /* istanbul ignore next */
  const handleFieldChange = (field, value) => {
    /* istanbul ignore else */
    if (field.type === "select") {
      if (field.multiple) {
        value = (value || []).includes("selectall")
          ? (field.options || []).map((x) => x.value)
          : value;
      }
    }
    const _fieldValues = { ...fieldValues };
    _fieldValues[field.key] = field.key === "is_open" ? !!value : value;
    onFieldChange(_fieldValues);
    setFieldValues(_fieldValues);
  };

  const onSubmit = (e) => {
    /* istanbul ignore next */
    e.preventDefault();
    onsubmit(fieldValues);
  };
  return (
    <div>
      <form onSubmit={onSubmit} data-testid="crudForm">
        <Box>
          <FieldsLayout
            fields={fields}
            values={values}
            fieldValues={fieldValues}
            // fieldErrors={this.state.fieldErrors}
            // validate={this.validate.bind(this)}
            onChange={handleFieldChange}
            mode={mode}
          />
        </Box>
      </form>
    </div>
  );
};
export default CrudForm;
