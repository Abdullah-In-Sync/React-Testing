import React, { useEffect, useState } from "react";
import { TextField, Autocomplete } from "@mui/material";
import _ from "lodash";

const AsyncAutoComplete = ({ field, values = {}, onChange, ...props }) => {
  let _value = props.fieldValues[field?.key] || values[field?.key] || "";

  if (typeof _value === "object") {
    /* istanbul ignore next */
    _value = (_value || {}).id || "";
  }
  const _valueObj = field.options.find((x) => x.value == _value) || {};

  const [value, setValue] = useState(
    _value || _value == "Disable" || _value == "Enable" ? _valueObj : _value
  );
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    /* istanbul ignore next */
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
        data-testid="autoCompleteBox"
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
        getOptionLabel={
          /* istanbul ignore next */
          (option) => option.label
        }
        onChange={(_, val) => {
          /* istanbul ignore next */
          setValue(val);
          onChange(field, (val || {}).value);
        }}
        onInputChange={(_, val) => {
          /* istanbul ignore next */
          setInputValue(val);
          if (field.freeSolo === true) {
            /* istanbul ignore next */
            onChange(field, val);
          }
        }}
        disableClearable={true}
        loading={false}
        renderInput={(params) => (
          <TextField
            {...params}
            style={{ width: "100%" }}
            label={field.label}
            //inputProps={{}}
            variant="outlined"
            required={field.required}
            placeholder={field.label}
            // InputProps={{
            //   ...params.InputProps,
            //   endAdornment: (
            //     <React.Fragment>
            //       {false ? (
            //         <CircularProgress color="inherit" size={20} />
            //       ) : null}
            //       {params.InputProps.endAdornment}
            //     </React.Fragment>
            //   ),
            // }}
          />
        )}
      />
    </>
  );
};

export default AsyncAutoComplete;
