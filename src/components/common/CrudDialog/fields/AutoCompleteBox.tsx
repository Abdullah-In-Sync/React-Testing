import { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import _ from "lodash";

const AutoCompleteBox = ({ field, values = {}, onChange, ...props }) => {
  let _value = props.fieldValues[field?.key] || values[field?.key] || "";

  if (typeof _value === "object") {
    _value = (_value || {}).id || "";
  }
  const _valueObj = field.options.find((x) => x.value == _value) || {};

  const [value, setValue] = useState(
    _value || _value == "Disable" || _value == "Enable" ? _valueObj : _value
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (!field.show) {
      onChange(field, null);
    }
  }, [field.show]);

  useEffect(() => {
    setValue(
      _value || _value == "Disable" || _value == "Enable" ? _valueObj : _value
    );
  }, [_value]);

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        size="small"
        options={field.options}
        freeSolo={field.freeSolo === false ? false : true}
        className="mb-3"
        style={{ display: field.show ? "block" : "none" }}
        // defaultValue={_valueObj}
        defaultValue={_.isEmpty(value) ? field.defaultValue : value}
        inputValue={inputValue}
        disabled={field.disabled}
        getOptionLabel={(option) => option.label}
        onChange={(_, val) => {
          setValue(val);
          onChange(field, (val || {}).value);
        }}
        onInputChange={(_, val) => {
          setInputValue(val);
          if (field.freeSolo === true) {
            onChange(field, val);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ width: "100%" }}
            label={field.label}
            // inputProps={field.inputProps || {}}
            variant="outlined"
            required={field.required}
          />
        )}
      />
    </>
  );
};

export default AutoCompleteBox;
