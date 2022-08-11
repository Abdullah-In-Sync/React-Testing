import Button from "@mui/material/Button";

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
      data-testid="createQuestion"
      size={size || "medium"}
      sx={buttonStyle}
      variant="contained"
      {...props}
    >
      {props.label || "Button"}
    </Button>
  );
};
