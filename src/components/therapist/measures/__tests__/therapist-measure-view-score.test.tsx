import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import Measures from "..";
import { useRouter } from "next/router";
import {
  GET_THERAPIST_MEASURES_LIST,
  GET_THERAPIST_MEASURES_SCORE_LIST,
} from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_LIST,
    variables: {
      patientId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
  },
  result: {
    data: {
      therapistListMeasures: [
        {
          _id: "7cff4b39-0668-4e8f-b63f-d4b2b496a059",
          created_date: "2023-04-29T12:35:59.449Z",
          description: "des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 16,
          score_date: "2023-04-29T12:38:25.426Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1ytgif","col1":"quest","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1yu5cv","col1":"test","col2":"4","col3":"5","col4":"5","col5":"8","answer":""},{"id":"lh1yufoc","col1":"some","col2":"2","col3":"8","col4":"6","col5":"4","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "new tets",
          updated_date: "2023-04-29T12:38:25.426Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "d80cde21-6867-45fb-a257-99dad0b965ac",
          created_date: "2023-04-29T11:30:31.267Z",
          description: "some des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 11,
          score_date: "2023-04-29T11:43:25.365Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1wgjyd","col1":"quest1","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1wi7rs","col1":"quest2","col2":"4","col3":"6","col4":"7","col5":"8","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "Testformat2",
          updated_date: "2023-04-29T11:43:25.365Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "785d651b-0399-49c2-abe0-27697873c5f5",
          created_date: "2023-04-28T06:17:36.578Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 7,
          score_date: "2023-04-29T09:57:36.985Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lh1lsm2g","question":"quwston1","answer":0},{"id":"lh1lsqxg","question":"quest2","answer":0},{"id":"lh1lsv9x","question":"quest3","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "testasdf",
          updated_date: "2023-04-29T09:57:36.985Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "9776be15-4e15-4573-9c45-9868dad0e50a",
          created_date: "2023-04-27T17:18:06.070Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 1,
          score_date: "2023-04-28T10:31:29.016Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgze1k8e","question":"test","answer":0},{"id":"lgze1oqo","question":"test2","answer":0},{"id":"lgze1rsp","question":"test3","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "format21",
          updated_date: "2023-04-28T10:31:29.016Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "b8423205-7a90-4cd6-8324-65f8372880be",
          created_date: "2023-04-27T11:26:41.522Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 1,
          score_date: "2023-04-28T11:55:31.833Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgz1fu2u","col1":"tst","col2":"0","col3":"1","col4":"2","col5":"3","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "some2",
          updated_date: "2023-04-28T11:55:31.833Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "8799729c-79ec-47f3-b94c-c16a20dceddc",
          created_date: "2023-04-27T09:59:59.979Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 3,
          score_date: "2023-04-27T10:25:35.675Z",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgz1g5im","col1":"asd","col2":"0","col3":"2","col4":"3","col5":"4","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "new format 2",
          updated_date: "2023-04-27T11:25:37.944Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "70e8f334-01bf-4b1d-b1a8-47bbac872288",
          created_date: "2023-04-27T08:47:57.822Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 1,
          score_date: "2023-04-27T09:40:05.682Z",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgyvu5tg","question":"some text","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "check",
          updated_date: "2023-04-27T09:40:05.682Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "6d7d19f9-4a69-491c-87fb-2628420bd8a1",
          created_date: "2023-04-27T08:44:20.954Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgyxa9zc","question":"tets","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "some test",
          updated_date: "2023-04-27T09:28:46.169Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "856c1d14-a56e-4213-91b4-59fb1792d5d4",
          created_date: "2023-04-26T06:32:57.865Z",
          description: "des test",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 14,
          score_date: "2023-04-26T12:19:03.651Z",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgxbjfcu","question":"ques1","answer":0},{"id":"lgxbjfvp","question":"ques2","answer":0},{"id":"lgxbjqid","question":"ques3","answer":0},{"id":"lgxbjqsp","question":"ques4","answer":0},{"id":"lgxbjr8x","question":"ques5","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "testformat1",
          updated_date: "2023-04-26T12:19:03.651Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "cc45385d-6685-410f-8dab-54f396899ea5",
          created_date: "2023-04-24T12:06:51.377Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 1,
          score_date: "2023-04-27T08:14:58.793Z",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgusclxe","col1":"quest 1","col2":"0","col3":"1","col4":"2","col5":"3"},{"id":"lguslbd6","col1":"ques 2","col2":"2","col3":"3","col4":"6","col5":"10"}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test format2",
          updated_date: "2023-04-27T08:14:58.793Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "aed426e1-c05d-4ff9-8ae1-19f938b6b066",
          created_date: "2023-04-24T12:03:21.241Z",
          description: "new des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 4,
          score_date: "2023-04-27T08:17:45.033Z",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgusflvq","question":"testques1","answer":3}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test some",
          updated_date: "2023-04-27T08:17:45.033Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "2d4d8b48-403a-44be-a55b-3ce2880638d3",
          created_date: "2023-04-21T09:06:04.038Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "yu9789y78y87y78",
          updated_date: "2023-04-23T14:51:19.108Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "8ae58a0d-5605-4cc1-89de-843eeebf55ac",
          created_date: "2023-04-21T08:58:27.938Z",
          description: "dddasdfsda SSSFFFFFFF",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgnrpnv5","question":"rrrrrreeeeeeeeeeeeeeeeeeeeeeal"}]}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "dfghjaaa GGHHHHH",
          updated_date: "2023-04-24T10:57:54.245Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "da31d1fa-48ca-4b67-b406-dd29db30ca9f",
          created_date: "2023-04-18T05:35:59.027Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\\\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgltzqyrky1itjq69dl","question":"test"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test6",
          updated_date: "2023-04-23T06:20:55.583Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "2f517811-adc3-4782-93c2-ce753d0827fc",
          created_date: "2023-04-18T05:34:57.558Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "some",
          updated_date: "2023-04-20T14:42:17.943Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "c456cbf0-e70f-48eb-8097-eec76c2c3105",
          created_date: "2023-04-17T11:19:53.291Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgkqsuol90sxxflsez9","col1":"test","col2":"1","col3":"2","col4":"3","col5":"3"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test osome as",
          updated_date: "2023-04-17T11:19:53.291Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "5854452c-c5db-4bde-b2a6-331c603b469e",
          created_date: "2023-04-17T11:19:17.622Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgkqsuol90sxxflsez9","col1":"test","col2":"1","col3":"2","col4":"3","col5":"3"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test osome",
          updated_date: "2023-04-17T11:19:17.622Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "dcdd9d26-adc4-450f-9420-fd76794bd155",
          created_date: "2023-04-17T11:15:30.621Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "testnass",
          updated_date: "2023-04-17T11:15:30.621Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "41180d15-65fc-479e-a611-66a6d357f5ca",
          created_date: "2023-04-17T11:08:30.084Z",
          description: "sasdf",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test",
          updated_date: "2023-04-23T12:57:50.266Z",
          __typename: "TherapistMeasures",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_SCORE_LIST,
    variables: { measure_id: "" },
  },
  result: {
    data: {
      therapistViewScoreList: {
        _id: "d80cde21-6867-45fb-a257-99dad0b965ac",
        created_date: "2023-04-29T11:30:31.267Z",
        description: "some des",
        patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
        score: 11,
        score_date: "2023-04-29T11:43:25.365Z",
        score_id: "52165cd7-5918-4112-a3e7-596a7c3e204b",
        scores_list: [[Object]],
        session_no: "",
        share_status: 1,
        status: 1,
        template_data:
          '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1wgjyd","col1":"quest1","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1wi7rs","col1":"quest2","col2":"4","col3":"6","col4":"7","col5":"8","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
        template_id: "format2",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        title: "Testformat2",
        updated_date: "2023-04-29T11:43:25.365Z",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <Measures />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
    push: pushMock,
  });
});

describe("Therapist response measures", () => {
  test("Renders measures list data", async () => {
    await sut();
    await waitFor(async () => {
      const tiles = await screen.findAllByTestId("list-tile");
      expect(tiles.length).toEqual(19);
    });
  });

  it("Update graph and table data", async () => {
    await sut();

    await waitFor(() => {
      expect(screen.getByTestId("toggleContent1")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("toggleContent1"));

      expect(screen.getByTestId("view_score1")).toBeInTheDocument();

      // const takeTestButton = await screen.findByTestId("view_score1");
      // fireEvent.click(takeTestButton);
      fireEvent.click(screen.getByTestId("view_score1"));

      expect(screen.queryByTestId("tableId")).toBeInTheDocument();

      expect(screen.queryAllByTestId("table-row").length).toBe(1);
    });
  });
});
