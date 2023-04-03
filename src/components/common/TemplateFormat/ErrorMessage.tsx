import { Box, Typography } from "@mui/material"

const ErrorMessage = ({errorMsg}) => {
    return errorMsg && <Box>
    <Typography className="invalid-input-message">{ typeof errorMsg === "string" ? errorMsg :  `All value required`}</Typography>
  </Box>
  }

export default ErrorMessage;