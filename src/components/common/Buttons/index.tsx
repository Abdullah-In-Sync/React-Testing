import { Button } from "@mui/material";

const buttonStyle = {
  minWidth: 100,
  backgrounColor: "primary.dark",
  color: "custom.light",
};

export const AddButton = ({
  size,
  ...props
}: {
  [x: string]: any;
  size?: any;
}) => {
  return (
    <Button
      size={size || "medium"}
      sx={buttonStyle}
      variant="contained"
      {...props}
    >
      {props.label || "Button"}
    </Button>
  );
};
