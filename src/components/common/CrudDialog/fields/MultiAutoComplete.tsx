import React, { useEffect } from "react";
import { Chip, TextField, Autocomplete } from "@mui/material";

export default function MultiAutoComplete({
  field,
  values = {},
  onChange,
  ...props
}) {
  const _value = props.fieldValues[field.key] || values[field.key];

  const defaultValue = field.options.filter((x) =>
    (field.value || _value || []).includes(x.value)
  );

  useEffect(() => {
    if (!field.show) {
      onChange(field, null);
    }
  }, [field.show]);

  return (
    <Autocomplete
      multiple
      id="checkboxes-autocomplete"
      disableCloseOnSelect
      options={field.options}
      onChange={(e, val = []) => {
        onChange(
          field,
          val.map((x) => x.value)
        );
      }}
      defaultValue={defaultValue}
      limitTags={2}
      getOptionLabel={(option) => option.label}
      disabled={field.disabled}
      style={{ display: field.show ? "block" : "none" }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            variant="outlined"
            label={option.label}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          style={{ fontSize: "0.5rem" }}
          variant="outlined"
          label={field.label}
          placeholder={field.label}
        />
      )}
    />
  );
}
