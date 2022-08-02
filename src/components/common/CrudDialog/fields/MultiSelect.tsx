import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import {
  Select,
  MenuItem,
  InputBase,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const FilterSelect = ({
  fields,
  selectedFields = [],
  onChange,
  multiple = true,
}) => {
  const [selectedAll, setSelectedAll] = useState(
    selectedFields.length === fields.length
  );

  useEffect(() => {
    setSelectedAll(selectedFields.length === fields.length);
  }, [selectedFields, fields]);

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
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Tag</InputLabel>
      <Select
        label={"Tag"}
        variant="outlined"
        style={{ display: "block" }}
        onChange={handleChange}
        multiple={multiple}
        value={selectedFields}
        fullWidth
        className="mb-3"
        renderValue={() => ""}
      >
        {!multiple ? null : (
          <MenuItem
            value={"Select All"}
          >
            <Checkbox color="primary" checked={selectedAll} />
            <ListItemText primary={"Select All"} />
          </MenuItem>
        )}
        {fields.map((name) => {
          return (
            <MenuItem
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
                  .map((s, key) =>
                    key === 0 && s.length === 2
                      ? s.toUpperCase()
                      : s.charAt(0).toUpperCase() + s.substring(1)
                  ) // for Vm to VM
                  .join(" ")}
              />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FilterSelect;
