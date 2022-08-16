import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
import _isEmpty from "lodash/isEmpty";

const SelectField = (props) => {
  const { field, values = {} } = props;
  const { clearField = false } = field;
  const [isClearable, setClearable] = useState(false);
  const [isEditable, setEditValue] = useState(false);
  let _value =
    props.fieldValues[field.key] || values[field.key] || field.defaultValue;
  if (!field.multiple) {
    _value = typeof _value === "object" && _value !== null ? _value.id : _value;
  }

  const clear = () => {
    props.onChange(field, "");
    setClearable(false);
    if (!_isEmpty(values)) {
      setEditValue(true);
    }
  };

  useEffect(() => {
    if (clearField) {
      clear();
    }
  }, [clearField]);

  return (
    <>
      <FormControl
        size="small"
        variant="outlined"
        fullWidth
        required={field.required}
      >
        <InputLabel> {field.label} </InputLabel>

        <Select
          placeholder={field.label}
          label={field.label}
          size="small"
          variant="outlined"
          disabled={field.disabled}
          IconComponent={
            _value &&
            !field.unclosable &&
            (() => {
              return (
                <IconButton size="small" title="Clear All" onClick={clear}>
                  <Clear />
                </IconButton>
              );
            })
          }
          key={field.key}
          onOpen={() => {
            setClearable(!isClearable);
            setEditValue(false);
          }}
          open={isClearable}
          // defaultValue={field.defaultValue}
          // error={props.fieldErrors[field.key] ? true : false}
          value={!isEditable ? _value || [] : field.multiple ? [] : ""}
          fullWidth
          // helperText={props.fieldErrors[field.key] ? props.fieldErrors[field.key] : undefined}
          onChange={(e) => {
            setClearable(false);
            props.onChange(field, e.target.value);
          }}
          // onBlur={props.validate.bind(this, field)}
          // className="mb-3"
          hidden={!field.visible}
          onClose={() => setClearable(false)}
          required={field.required}
          multiple={field.multiple ? true : false}
          renderValue={field.multiple && ((selected) => selected.join(","))}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: "246px",
                left: "405px",
              },
            },
          }}
        >
          {field.multiple ? <MenuItem value="selectall">All</MenuItem> : null}

          {field?.options?.map((option, index) => {
            return (
              <MenuItem
                style={{ minHeight: 25, padding: "0px 7px" }}
                key={index}
                value={option.value}
              >
                {field.multiple && (
                  <Checkbox
                    color="primary"
                    checked={
                      field.multiple
                        ? !!_value?.find((x) => x === option.value)
                        : [] === option.value
                    }
                  />
                )}
                <ListItemText primary={option.label} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      {field.info && (
        <span
          style={{
            fontSize: 10,
            display: "block",
            marginTop: "-10px",
            marginLeft: 5,
            ...(field.infoStyle || {}),
          }}
        >
          {renderInfo(_value, props)}
        </span>
      )}
    </>
  );
};

const renderInfo = (value, props) => {
  const info = props.field.info;
  switch (typeof info) {
    case "function":
      return info(value);
    default:
      return info;
  }
};

export default SelectField;
