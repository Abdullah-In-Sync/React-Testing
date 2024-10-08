import Button from "@mui/material/Button";

const buttonStyle = {
  minWidth: 100,
  marginLeft: 1,
  marginBottom: 1,
  color: "custom.light",
  textTransform: "none",
};

export const AddButton = ({
  color,
  size,
  ...props
}: {
  [x: string]: any;
  size?: any;
  color?: any;
}) => {
  return (
    <Button
      data-testid="createQuestion"
      size={size || "medium"}
      sx={buttonStyle}
      color={color || "secondary"}
      variant="contained"
      {...props}
    >
      {props.label || "Button"}
    </Button>
  );
};
