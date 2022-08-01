import { TextareaAutosize, Typography } from '@mui/material'

export default function QuestionTypeText({ fv, fk, disable }): JSX.Element {
  return (
    <Typography gutterBottom component="div">
      <Typography
        sx={{ color: "#6EC9DB !important", fontSize: "15px", paddingLeft: "5px", fontWeight: "700 !important" }}
      >
        {fv.question}
      </Typography>

      <Typography>
        {
          <TextareaAutosize
            aria-labelledby={`question-radio-${fv._id}`}
            id={`question-text-${fv._id}`}
            disabled={disable}
            value={fv.feedback_ans && fv.feedback_ans.answer ? fv.feedback_ans.answer : ''}
            style={{ width: "100%", height: 216, left: 454.32, top: 1044, backgroundColor: "rgb(196 196 196 / 22%)", borderRadius: "8px", border: 'none' }}
          />
        }
      </Typography>
    </Typography>
  )
}
