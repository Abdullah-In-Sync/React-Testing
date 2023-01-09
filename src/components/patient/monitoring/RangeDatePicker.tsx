import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, Button, Stack, Typography } from "@mui/material";

const RangeDatePicker = ({ onGoButton, initialDate }) => {
  const [fromDate, setFromDate] = React.useState<Dayjs | null>(
    dayjs(initialDate)
  );
  const [toDate, setToDate] = React.useState<Dayjs | null>(dayjs());

  return (
    <Stack alignItems={"center"} flexDirection="row" justifyContent="flex-end">
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From date"
            value={fromDate}
            onChange={(newValue) => {
              setFromDate(newValue);
            }}
            inputFormat="DD-MM-YYYY"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box>
        <Box className="dateRangeToWrapper">
          <Typography>To</Typography>
        </Box>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="To date"
            value={toDate}
            onChange={(newValue) => {
              setToDate(newValue);
            }}
            inputFormat="DD-MM-YYYY"
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </Box>
      <Box className="goButtonWrapper">
        <Button
          variant="contained"
          data-testid="goButton"
          onClick={() => onGoButton({ fromDate, toDate })}
        >
          Go
        </Button>
      </Box>
    </Stack>
  );
};

export default RangeDatePicker;
