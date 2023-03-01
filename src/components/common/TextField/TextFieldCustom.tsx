import { TextField, TextFieldProps } from "@mui/material";

export default (props: TextFieldProps) => {
  const { size, ...rest } = props;
  return <TextField size={size ?? "medium"} {...rest} />;
};
