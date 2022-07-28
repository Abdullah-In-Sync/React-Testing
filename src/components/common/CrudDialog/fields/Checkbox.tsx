import React, { useState } from "react";
import { Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';

const CheckboxField = (props) => {
  const { field } = props;
  const [check, setCheck] = useState(
    Boolean(props.fieldValues[field.key] || field.value || false)
  );

  const handleChange = (_, value) => {
    props.onChange(field, value);
    if (field.onValueChange) {
      field.onValueChange(value);
    }
    setCheck(value);
  };

  return (
    <div className="d-flex align-items-center mb-3">
      <Checkbox
        onChange={handleChange}
        value={field.key}
        checked={props.fieldValues[field.key]|| check || field.value || false}
        required={field.required || false}
        color="primary"
        key={field.key}
        id={field.key}
        hidden={!field.visible}
        onBlur={props.validate.bind(this, field)}
        className="mr-2"
        disabled={field.disabled}
      />
      <Typography variant="body1">{field.label}</Typography>
    </div>
  );
};

export default CheckboxField;
