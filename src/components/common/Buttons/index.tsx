import { Button } from "@mui/material";

const buttonStyle = {
  minWidth: 100,
  backgrounColor: "primary.dark",
  color: "custom.light",
};

export const AddButton = ({
  className,
  size,
  ...props
}: {
  [x: string]: any;
  className: any;
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
