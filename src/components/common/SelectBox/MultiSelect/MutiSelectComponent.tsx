import React from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

/* istanbul ignore next */
type propTypes = {
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  id: string;
  labelId: string;
  label?: string;
  name: string;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
  inputProps?: any;
  extraProps?: any;
  options: Option[];
  mappingKeys: [string, string];
  size: "small" | "medium";
  disabled?: boolean;
  showDefaultSelectOption?: boolean;
  multiSelect?: any;
};

/* istanbul ignore next */
export type Option = {
  id: any;
  value: string;
};

/* istanbul ignore next */
const mapping = (options: Option[], keys = []) => {
  return options.reduce((mappingOptions: Option[], option) => {
    mappingOptions.push({ id: option[keys[0]], value: option[keys[1]] });
    return mappingOptions;
  }, []);
};

export default function MultiSelectComponent(props: propTypes) {
  const modifyOptions = mapping(props.options, props.mappingKeys);
  return (
    <FormControl
      fullWidth={props.fullWidth}
      required={props.required}
      size={props.size ?? "medium"}
      className="myhelp-select-control"
    >
      <InputLabel id={props.labelId}>{props.label}</InputLabel>
      <Select
        labelId={props.labelId}
        id={props.id}
        data-testid={props.id}
        name={props.name}
        value={props.multiSelect}
        label={props.label}
        onChange={props.onChange}
        inputProps={props.inputProps}
        className={props.className}
        disabled={props.disabled}
        multiple
        renderValue={(selected) => {
          let tempSelectedName = [];
          modifyOptions.forEach((el) => {
            if (((selected as Array<string>) || []).indexOf("all") > -1)
              tempSelectedName = ["All"];
            else if (((selected as Array<string>) || []).indexOf(el.id) > -1)
              tempSelectedName.push(el.value);
          });
          return tempSelectedName.join(", ");
        }}
        {...props.extraProps}
      >
        {/* {props.showDefaultSelectOption !== false && (
          <MenuItem value="">Select</MenuItem>
        )} */}

        {modifyOptions.map(({ id, value }) => (
          <MenuItem key={`${id}-${value}`} value={id}>
            <Checkbox
              checked={
                props.multiSelect.indexOf(id) > -1 ||
                props.multiSelect.indexOf("all") > -1
              }
            />
            <ListItemText primary={value} />
            {/* {value} */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
