import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import * as homeworkListTypes from "./types";

const TherapySelectBox: React.FC<homeworkListTypes.HomeworkListProps> = ({
  therapyData,
  onChangeTherapy,
}) => {
  const [therapy, setTherapy] = React.useState("");

  React.useEffect(() => {
    const value = therapyData[0]?._id;
    if (value) {
      updateSelectValue(value);
    }
  }, []);

  const options = () => {
    return therapyData.map((item, i) => {
      const {
        therapy_detail: { therapy_name = "" } = {},
        disorder_detail: { disorder_name = "" } = {},
        model_detail: { model_name = "" } = {},
        _id,
      } = item || {};
      return (
        <MenuItem
          value={_id}
          key={`therapy_option_${i}`}
        >{`${therapy_name}/${disorder_name}/${model_name}`}</MenuItem>
      );
    });
  };

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    updateSelectValue(value);
  };

  const updateSelectValue = (value: string) => {
    onChangeTherapy(value);
    setTherapy(value);
  };

  return (
    <Box justifyContent={"flex-end"}>
      <FormControl size="small">
        <InputLabel id="demo-simple-select-label">Select Therapy</InputLabel>
        <Select
          data-testid="selectTherapy"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue=""
          value={therapy}
          label="Select Therapy"
          onChange={handleChange}
        >
          {options()}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TherapySelectBox;
