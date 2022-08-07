import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function QuestionTypeRadiobox({ fv, fk, disable }): JSX.Element {
  return (
    <Typography gutterBottom component="div">
      <Typography
        sx={{
          backgroundColor: "#dadada52 !important",
          border: "1px solid #dadada52 !important",
          color: "#3f4040b0 !important",
          fontSize: "15px",
          paddingLeft: "5px",
          fontWeight: "1px !important",
        }}
      >
        {fk + 1}. {fv.question}
      </Typography>

      <FormControl>
        <RadioGroup
          row
          aria-labelledby={`question-radio-${fv._id}`}
          name={`question-radio-${fv._id}`}
          defaultValue={
            fv.feedback_ans && fv.feedback_ans.answer
              ? fv.feedback_ans.answer
              : ""
          }
        >
          {fv.answer_options &&
            fv.answer_options.map((av, ak) => {
              return (
                <FormControlLabel
                  sx={{ fontSize: "15px", color: "#3f4040b0 !important" }}
                  // name={"question_list_option" + fv._id + av}
                  key={"question_list_option" + fv._id + av}
                  disabled={disable}
                  value={av}
                  control={<Radio size="small" />}
                  label={av}
                />
              );
            })}
        </RadioGroup>
      </FormControl>
    </Typography>
  );
}
