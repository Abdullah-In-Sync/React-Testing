import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AutoCompleteBox = ({
  field = {},
  values = {},
  onChange = () => {},
  ...props
}) => {
  let _value = props.fieldValues[field.key] || values[field.key] || "";
  if (typeof _value === "object") {
    _value = (_value || {}).id || "";
  }
  let _valueObj = field.options.find((x) => x.value == _value) || {};

  const [inputValue, setInputValue] = useState(
    !isNaN(Number(_value)) ? _valueObj.label || "" : _value || ""
  );

  useEffect(() => {
    if (!field.show) {
      onChange(field, null);
    }
  }, [field.show]);

  useEffect(() => {
    setInputValue(
      !isNaN(Number(_value)) ? _valueObj.label || "" : _value || ""
    );
  }, [_value]);

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={field.options}
        freeSolo={field.freeSolo === false ? false : true}
        className="mb-3"
        style={{ display: field.show ? "block" : "none" }}
        defaultValue={_valueObj}
        inputValue={inputValue}
        getOptionLabel={(option) => option.label}
        onChange={(_, val) => {
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
            variant="outlined"
          />
        )}
      />
    </>
  );
};

export default AutoCompleteBox;
