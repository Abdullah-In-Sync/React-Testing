import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import CheckboxField from "@material-ui/core/Checkbox";

const Checkbox = (props) => {
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
      <CheckboxField
        checked={check}
        onChange={handleChange}
        value={field.key}
        checked={props.fieldValues[field.key] || field.value || false}
        required={field.required || false}
        color="primary"
        key={field.key}
        id={field.key}
        hidden={!field.visible}
        onBlur={props.validate.bind(this, field)}
        className="mr-2"
        disabled={field.disabled}
      />
      <Typography variant="body">{field.label}</Typography>
    </div>
  );
};

export default Checkbox;
