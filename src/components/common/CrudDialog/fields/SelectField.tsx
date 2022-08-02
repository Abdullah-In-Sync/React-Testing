import React from "react";
import _isEmpty from "lodash/isEmpty";

const SelectField = (props) => {
  const { field, values = {} } = props;
  let _value =
    props.fieldValues[field.key] || values[field.key] || field.defaultValue;
  if (!field.multiple) {
    _value = typeof _value === "object" && _value !== null ? _value.id : _value;
  }

  return (
    <>
      {}
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
