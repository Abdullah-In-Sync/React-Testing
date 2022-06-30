import React, { useState } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { FilterSelect } from "../CustomSelectBox";
import styles from "./styles";

let searchTimeout = null;

const SearchBox = ({
  className,
  size,
  placeholder = "Search",
  handleSearch = () => {},
  onChange = () => {},
  multiple = true,
  fields = [],
  selectedFields = [],
  query = "",
  setLoader = () => {},
}) => {
  const classes = styles();
  const [value, setValue] = useState("");
  const handleChange = ({ target: { value = "" } }) => {
    setValue(value);
    triggerSearch(value);
  };

  const triggerSearch = (val = "") => {
    clearTimeout(searchTimeout);
    setLoader(true);
    searchTimeout = setTimeout(() => {
      handleSearch(val.trim());
      setLoader(false);
    }, 1000);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(value);
      }}
    >
      <Paper className={classes.searchBar}>
        <InputBase
          value={value}
          onChange={handleChange}
          className={classes.input}
          placeholder={placeholder}
        />

        {fields.length > 1 && (
          <FilterSelect
            multiple={multiple}
            fields={fields}
            selectedFields={selectedFields}
            onChange={onChange}
          />
        )}
        <IconButton
          className={classes.iconButton}
          aria-label="search"
          onClick={(e) => {
            handleSearch(value.trim());
          }}
        >
          <SearchIcon className={classes.icon} />
        </IconButton>
      </Paper>
    </form>
  );
};

export default SearchBox;
