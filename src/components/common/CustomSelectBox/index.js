import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import {
  Select,
  MenuItem,
  InputBase,
  Checkbox,
  ListItemText,
  FormControl,
} from "@material-ui/core";

export const FilterSelect = ({
  fields = [],
  selectedFields = [],
  onChange = () => {},
  multiple = true,
}) => {
  const [selectedAll, setSelectedAll] = useState(
    selectedFields.length === fields.length
  );

  useEffect(() => {
    setSelectedAll(selectedFields.length === fields.length);
  }, [selectedFields]);

  const handleChange = (event) => {
    if (fields.length > 1) {
      if (selectedAll && (event.target.value || []).includes("Select All")) {
        setSelectedAll(false);
        onChange([]);
      } else if (
        (event.target.value || []).includes("Select All") ||
        (event.target.value || []).length === fields.length
      ) {
        setSelectedAll(true);
        onChange(fields);
      } else {
        setSelectedAll(false);
        onChange(event.target.value);
      }
    }
  };

  return (
    <FormControl>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        className="ml-3"
        style={{ width: 30, border: "none !important" }}
        onChange={handleChange}
        multiple={multiple}
        IconComponent={(props) => (
          <i {...props} className={`material-icons ${props.className} mr-1`}>
            filter_list
          </i>
        )}
        input={<SelectInput />}
        value={selectedFields}
        renderValue={(selected) => ""}
      >
        {!multiple ? null : (
          <MenuItem
            style={{ minHeight: 25, padding: "0px 7px" }}
            value={"Select All"}
          >
            <Checkbox color="primary" checked={selectedAll} />
            <ListItemText primary={"Select All"} />
          </MenuItem>
        )}
        {fields.map((name) => {
          return (
            <MenuItem
              style={{ minHeight: 25, padding: "0px 7px" }}
              key={name}
              value={name}
            >
              <Checkbox
                color="primary"
                checked={
                  multiple
                    ? !!selectedFields.find((x) => x === name)
                    : selectedFields === name
                }
              />
              <ListItemText
                primary={name
                  .toLowerCase()
                  .split("_")
                  .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(" ")}
              />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const SelectInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "none",
    fontSize: 16,
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      backgroundColor: "#fff",
    },
  },
}))(InputBase);

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    marginLeft: "20px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const CustomSelectBox = ({
  value = null,
  values = [],
  onChange = () => {},
  style = {},
  disabled = false,
}) => {
  const handleChange = ({ target }) => {
    const val = target.value;
    onChange(val);
  };

  return (
    <Select
      disabled={disabled}
      style={style}
      input={<BootstrapInput />}
      onChange={handleChange}
      value={value}
      defaultValue={value}
    >
      {values.map(({ value = "", label = "", unselect = false }) => (
        <MenuItem disabled={unselect} key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default CustomSelectBox;
