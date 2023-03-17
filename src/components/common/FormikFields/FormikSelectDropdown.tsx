import { Stack } from "@mui/material";
import { ErrorMessage, useField } from "formik";
import MutiSelectComponent from "../SelectBox/MultiSelect/MutiSelectComponent";
import SingleSelectComponent from "../SelectBox/SingleSelect/SingleSelectComponent";

const FormikSelectDropdown = (props) => {
  const [field, touched] = useField(props);
  return (
    <Stack>
      {props.multiSelect || props.multiSelect == "" ? (
        <MutiSelectComponent
          {...field}
          {...props}
          extraProps={{
            ...(props.extraProps || {}),
            ...{ error: touched.touched && touched.error != undefined },
          }}
        />
      ) : (
        <SingleSelectComponent
          {...field}
          {...props}
          extraProps={{
            ...(props.extraProps || {}),
            ...{ error: touched.touched && touched.error != undefined },
          }}
        />
      )}
      <ErrorMessage
        name={props.name}
        component="div"
        className="invalid-input-message"
      />
    </Stack>
  );
};

export default FormikSelectDropdown;
