import LoadingButton from "@mui/lab/LoadingButton";

export default (props) => {
  const { size, ...rest } = props;
  return <LoadingButton size={size ?? "medium"} {...rest} />;
};
