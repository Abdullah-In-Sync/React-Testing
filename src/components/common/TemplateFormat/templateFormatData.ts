import * as templateTypes from "./types";
import * as Yup from "yup";

export const TemplateFormat1Data: templateTypes.TemplateFormat = {
  data: <templateTypes.Format1>{
    intro:
      "People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.",
    scores: [
      {
        value: "Strongly disagree",
        label: "0",
      },
      {
        value: "Disagree",
        label: "1",
      },
      {
        value: "slightly disagree",
        label: "2",
      },
      {
        value: "Not Agree",
        label: "3",
      },
      {
        value: "Neutral",
        label: "4",
      },
      {
        value: "Agree",
        label: "5",
      },
      {
        value: "Slightly agree",
        label: "6",
      },
      {
        value: "Strongly agree",
        label: "7",
      },
      {
        value: "Strongly agree",
        label: "8",
      },
    ],
    questions: [],
    description:
      "The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.",
  },
  validationSchema: Yup.object({
    intro: Yup.string().required(`Intro is requried`),
    description: Yup.string().required(`Description is requried`),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
      })
    ),
    scores: Yup.array().of(
      Yup.object().shape({
        value: Yup.string().required("Value is required"),
      })
    ),
  }),
};
