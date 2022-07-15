import React, { useState, useEffect } from "react";
import { withStyles } from '@mui/styles';
import {
  Select,
  MenuItem,
  InputBase,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  OutlinedInput
} from "@mui/material";
// {fields.length > 1 && (
//   <FilterSelect
//     multiple={multiple}
//     fields={fields}
//     selectedFields={selectedFields}
//     onChange={onChange}
//   />
// )}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterSelect = ({
  fields = ["dd","rer"],  
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
    <FormControl variant="outlined" fullWidth >
      <InputLabel >Tag</InputLabel>
      <Select
        label={"Tag"}
        variant="outlined"
        // size="small"
        // className="ml-3"
        // style={{ width: 30, border: "none !important" }}
        // className="mb-3"
        // style={{ display: field.show ? "block" : "none" }}
        style={{ display: "block" }}
// size="small"
        onChange={handleChange}
        multiple={multiple}
        // IconComponent={(props) => (
        //   <i {...props} className={`material-icons ${props.className} mr-1`}>
        //     filter_list
        //   </i>
        // )}
        // input={<OutlinedInput label="Tag" />}
        // input={<SelectInput />}
        value={selectedFields}
        // style={ { minWidth: '100%' }}
        fullWidth
        className="mb-3"
        renderValue={(selected) => ""}
        // MenuProps={MenuProps}
      >
        {!multiple ? null : (
          <MenuItem
          // style={{ width: "100%" }}
            // style={{ minHeight: 25, padding: "0px 7px" }}
            value={"Select All"}
          >
            <Checkbox color="primary" checked={selectedAll} />
            <ListItemText primary={"Select All"} />
          </MenuItem>
        )}
        {fields.map((name) => {
          return (
            <MenuItem
            // style={{ width: "100%" }}
              // style={{ minHeight: 25, padding: "0px 7px" }}
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
                  .map((s, key) => key === 0 && s.length === 2 ? s.toUpperCase() : s.charAt(0).toUpperCase() + s.substring(1)) // for Vm to VM
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

// const CustomSelectBox = ({
//   value = null,
//   values = [],
//   onChange = () => {},
//   style = {},
//   disabled = false,
// }) => {
//   const handleChange = ({ target }) => {
//     const val = target.value;
//     onChange(val);
//   };
//   return (
//     <Select
//       disabled={disabled}
//       style={style}
//       input={<BootstrapInput />}
//       onChange={handleChange}
//       value={value}
//       defaultValue={value}
//     >
//       {values.map(({ value = "", label = "", unselect = false }) => (
//         <MenuItem disabled={unselect} key={value} value={value}>
//           {label}
//         </MenuItem>
//       ))}
//     </Select>
//   );
// };

// export CustomSelectBox;
export default FilterSelect;