import * as templateTypes from "./types";
import * as Yup from "yup";

export const format1: templateTypes.TemplateFormat = {
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

export const format2: templateTypes.TemplateFormat = {
  data: {
    questions: {
      headerRow: [
        {
          id: "col1",
          label:
            "Over the last 2 weeks how often have you been bothered by the following problems?",
        },
        {
          id: "col2",
          label: "Not at all",
        },
        {
          id: "col3",
          label: "Several days",
        },
        {
          id: "col4",
          label: "More than half days",
        },
        {
          id: "col5",
          label: "Nearly every day",
        },
      ],
      bodyRows: [
        {
          col1: "",
          col2: "",
          col3: "",
          col4: "",
          col5: "",
        },
      ],
      footerRows: [
        {
          col1: "Column Total",
          col2: "0",
          col3: "1",
          col4: "2",
          col5: "3",
        },
        {
          col1: "Total Score",
          colAvg: "0",
        },
      ],
    },
    optionsQuestions: [
      {
        type: "radio",
        question:
          "If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
        labels: [
          {
            option: "Not difcult at all",
            answer: "",
          },
          {
            option: "Somewhat difficult",
            answer: "",
          },
          {
            option: "Very difficult",
            answer: "",
          },
          {
            option: "Extremely difficult",
            answer: "",
          },
        ],
      },
      {
        type: "text",
        question: `This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of "not at all", "several days", "more than half the days", and "nearly every day" respectively. GAD-7 total score for the seven items ranges from 0 to 21.`,
        labels: [
          {
            option: "Scores represent: 0-5 mild",
            answer: "",
          },
          {
            option: "6-10 moderate",
            answer: "",
          },
          {
            option: "11-15 moderately severe anxiety",
            answer: "",
          },
          {
            option: "15-21 severe anxiety.",
            answer: "",
          },
        ],
      },
    ],
  },
  validationSchema: Yup.object({
    questions: Yup.object().shape({
      headerRow: Yup.array().of(
        Yup.object().shape({
          label: Yup.string().required("Question is required"),
        })
      ),
      bodyRows: Yup.array().of(
        Yup.object().shape({
          col1: Yup.string().required("Question is required"),
          col2: Yup.number().required("Question is required"),
          col3: Yup.number().required("Question is required"),
          col4: Yup.number().required("Question is required"),
          col5: Yup.number().required("Question is required"),
        })
      ),
      footerRows: Yup.array().of(
        Yup.object().shape({
          col1: Yup.string().required("Question is required"),
          // col2: Yup.number().required("Question is required"),
          // col3: Yup.number().required("Question is required"),
          // col4: Yup.number().required("Question is required"),
          // col5: Yup.number().required("Question is required"),
          // colAvg: Yup.number().required("Question is required")
        })
      ),
    }),
    optionsQuestions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        labels: Yup.array().of(
          Yup.object().shape({
            option: Yup.string().required("Option is required"),
          })
        ),
      })
    ),
  }),
};

export default {
  format1,
  format2,
};
