import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React from "react";

/* istanbul ignore next */
type propTypes = {
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  id: string;
  labelId: string;
  label?: string;
  name?: string;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
  inputProps?: any;
  extraProps?: any;
  options: Option[];
  mappingKeys: [string, string];
  size: "small" | "medium";
  disabled?: boolean;
  showDefaultSelectOption?: boolean;
  menuItemClassName?: string;
  toolTipText?: string;
};

/* istanbul ignore next */
export type Option = {
  id: any;
  value: string;
  activeKey?: string;
};

/* istanbul ignore next */
const mapping = (options: Option[], keys = []) => {
  return options.reduce((mappingOptions: Option[], option) => {
    mappingOptions.push({
      id: option[keys[0]],
      value: option[keys[1]],
      activeKey: option[keys[2]],
    });
    return mappingOptions;
  }, []);
};

export default function SingleSelectComponent(props: propTypes) {
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
        name={props.name}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        inputProps={props.inputProps}
        className={props.className}
        disabled={props.disabled}
        {...props.extraProps}
      >
        {props.showDefaultSelectOption !== false && (
          <MenuItem value="">Select</MenuItem>
        )}
        {mapping(props.options, props.mappingKeys).map(
          ({ id, value, activeKey }) => {
            return activeKey && props?.toolTipText ? (
              <Tooltip title={`${props.toolTipText}`} placement="bottom-end">
                <MenuItem
                  className={activeKey && "selectOptionActive"}
                  key={`${id}-${value}`}
                  value={id}
                >
                  {value}
                </MenuItem>
              </Tooltip>
            ) : (
              <MenuItem key={`${id}-${value}`} value={id}>
                {value}
              </MenuItem>
            );
          }
        )}
      </Select>
    </FormControl>
  );
}
