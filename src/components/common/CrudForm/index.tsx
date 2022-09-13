import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
// import _flatten from "lodash/flatten";

// import { FieldsLayout } from './fields';
// import FieldsLayout from './fields/FieldsLayout'
const FieldsLayout = dynamic(import("../CrudDialog/fields/FieldsLayout"), { ssr: false });




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
    e.preventDefault();
    onsubmit(fieldValues);
  };
  return (
    <div>
    
    <form onSubmit={onSubmit} data-testid="feedForm">
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
