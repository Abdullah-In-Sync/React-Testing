import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@material-ui/core/TextField";

import { Field } from "formik";

type Props = React.PropsWithChildren<{
  initialOptions?: any;
  handleSelect?: (e, v) => void;
  label?: string;
  name?: string;
  defaultValue?: any;
  multiple?: boolean;
  freeSolo?: boolean;
  isOptionEqualToValue?: any;
  classes?: object;
  disabled?: boolean;
}>;

const CommonAutocomplete: React.FC<Props> = ({
  initialOptions,
  handleSelect,
  label = "",
  name,
  defaultValue,
  ...rest
}) => {
  return (
    <Autocomplete
      fullWidth
      componentName={name}
      options={initialOptions}
      onChange={handleSelect}
      defaultValue={defaultValue}
      getOptionLabel={(option) => {
        return option.label;
      }}
      {...rest}
      renderInput={(params) => (
        <Field
          fullWidth
          name={name}
          {...params}
          component={TextField}
          label={label}
          variant="outlined"
        />
      )}
    />
  );
};

export default CommonAutocomplete;
