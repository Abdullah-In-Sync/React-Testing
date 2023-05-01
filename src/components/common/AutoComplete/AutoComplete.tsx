import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";

import { Field } from "formik";

type Props = React.PropsWithChildren<{
  initialOptions?: any;
  handleSelect?: (e, v) => void;
  label?: string;
  name?: string;
  defaultValue?: { label: string; value: string };
}>;

const CommonAutocomplete: React.FC<Props> = ({
  initialOptions,
  handleSelect,
  label = "",
  name,
  defaultValue,
}) => {
  // const [inputValue, setInputValue] = React.useState("");
  // const [options, setOptions] = React.useState(initialOptions);

  // const handleChange = (e, value) => {
  //   setInputValue(value);
  // }

  return (
    <Autocomplete
      fullWidth
      componentName={name}
      options={initialOptions}
      // noOptionsText="Enter to create a new option"
      onChange={handleSelect}
      defaultValue={defaultValue}
      getOptionLabel={(option) => {
        return option.label;
      }}
      // onInputChange={handleChange}
      renderInput={(params) => (
        <Field
          fullWidth
          name={name}
          {...params}
          component={TextField}
          label={label}
          variant="outlined"

          // onKeyDown={(e) => {
          //   if (
          //     e.key === "Enter" &&
          //     options.findIndex((o) => o.value === inputValue) === -1
          //   ) {
          //     setOptions((o) => o.concat({ value: inputValue, label: inputValue }));
          //   }
          // }}
        />
      )}
    />
  );
};

export default CommonAutocomplete;
