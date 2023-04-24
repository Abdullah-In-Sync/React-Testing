import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import Measures from "..";

import { useRouter } from "next/router";
import {
  GET_THERAPIST_MEASURES_LIST,
  UPDATE_THERAPIST_MEASURE,
} from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";
import {
  ADD_THERAPIST_MEASURE_PLAN_ADD,
  GET_THERAPIST_MEASURES_PLAN_LIST,
} from "../../../../graphql/SafetyPlan/graphql";

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
          _id: "a6e9bf54-76fe-49e0-8872-a7ff0681ccf7",
          created_date: "2023-04-18T05:38:05.573Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lglu2iohtqrvjvmgpun","question":"testquestion"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test4",
          updated_date: "2023-04-18T05:38:05.573Z",
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
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgltzqyrky1itjq69dl","question":"test"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test3",
          updated_date: "2023-04-18T05:35:59.027Z",
          __typename: "TherapistMeasures",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_MEASURE,
    variables: {
      measure_id: "a6e9bf54-76fe-49e0-8872-a7ff0681ccf7",
      update: {
        description: "",
        share_status: 0,
        status: 0,
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lglu2iohtqrvjvmgpun","question":"testquestion"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
        template_id: "format1",
        title: "test4",
      },
    },
  },
  result: {
    data: {
      updateTherapistMeasure: {
        _id: "a6e9bf54-76fe-49e0-8872-a7ff0681ccf7",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_MEASURE,
    variables: {
      measure_id: "da31d1fa-48ca-4b67-b406-dd29db30ca9f",
      update: {
        description: "",
        share_status: 1,
        status: 1,
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgltzqyrky1itjq69dl","question":"test"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
        template_id: "format1",
        title: "test3",
      },
    },
  },
  result: {
    data: {
      updateTherapistMeasure: {
        _id: "da31d1fa-48ca-4b67-b406-dd29db30ca9f",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_LIST,
    variables: {
      patientId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-no-data",
    },
  },
  result: {
    data: {
      therapistListMeasures: [],
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_PLAN_LIST,
  },
  result: {
    data: {
      therapistGetAdminMeasures: [
        {
          _id: "09f37702-12ee-47c4-898e-fe89cc45c6fa",
          created_date: "2023-04-20T06:29:07.124Z",
          description: "",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[],"footerRows":[{"col1":"Column Total","col2":"0","col3":"0","col4":"0","col5":"0"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "q3r545346",
          updated_date: "2023-04-20T06:29:07.124Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "f7b4e7a6-19ca-4528-9b35-fe7581636afb",
          created_date: "2023-04-20T06:06:27.324Z",
          description: "",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgopwyd6","col1":"how are you ?","col2":"1","col3":"2","col4":"3","col5":"4"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "measure ",
          updated_date: "2023-04-20T06:08:20.568Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "db465934-6417-429a-9fa3-ecf5229802ab",
          created_date: "2023-04-20T03:59:03.230Z",
          description: "",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"test","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"test","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "new",
          updated_date: "2023-04-20T04:00:54.616Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "e7aa036c-5985-4f94-9e61-5d940d85d080",
          created_date: "2023-04-17T16:29:15.366Z",
          description: "dddasdfsda SSSFFFFFFF",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgnrpnv5","question":"rrrrrreeeeeeeeeeeeeeeeeeeeeeal"}]}',
          template_id: "format1",
          title: "dfghjaaa GGHHHHH",
          updated_date: "2023-04-20T03:56:10.567Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "09771a21-2455-4666-8782-7d894dbc760a",
          created_date: "2023-04-17T14:24:19.623Z",
          description: "ghfhdf",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"col1":"a","col2":"1","col3":"2","col4":"3","col5":"4"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "dfghj",
          updated_date: "2023-04-17T14:25:09.851Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "8078ed97-3a49-4aa3-a6c2-3d5675d386b4",
          created_date: "2023-04-17T13:23:50.274Z",
          description: "descdipriton of a little bit",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"question":"Amarjeet questions one"},{"question":"Amarjeet question 2"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          title: "dfghj",
          updated_date: "2023-04-19T14:08:14.681Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "8d82cea5-67f4-4259-80c7-ebc1df3bc07f",
          created_date: "2023-04-17T11:49:43.772Z",
          description: "",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          title: "yu9789y78y87y78",
          updated_date: "2023-04-17T11:49:43.772Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "f7eabe9f-343a-4af9-9c69-8600a560a751",
          created_date: "2023-04-17T10:11:41.004Z",
          description: "",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "test format quest",
          updated_date: "2023-04-17T10:12:48.985Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "7179b1e2-cd9a-43fd-bff6-3c6cac79d1c2",
          created_date: "2023-04-17T10:11:40.963Z",
          description: "",
          org_id: "72b6b276ee55481682cb9bf246294faa",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgko9hm81bzj1l5yyql","col1":"tst","col2":"0","col3":"0","col4":"0","col5":"0"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "test format quest",
          updated_date: "2023-04-17T10:11:40.963Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "0abc7fb6-66b2-4d79-a644-9b6e5ec23e94",
          created_date: "2023-04-17T09:40:04.725Z",
          description: "some",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgkn9o6jibx4el2m4fq","question":"test 2"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          title: "new format1 some test",
          updated_date: "2023-04-17T09:40:49.806Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "10232335-a5ab-4eb5-a065-9ebd7c891bf6",
          created_date: "2023-04-14T08:52:54.265Z",
          description: "",
          org_id: "3c4054dc-1888-4af5-8af2-586cadeecf2b",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "testformat2",
          updated_date: "2023-04-17T10:06:55.241Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
          created_date: "2023-04-12T18:00:33.727Z",
          description:
            "This is the description , maybe long maybe short ,simple , watch anime and forgot  your stress , watch at night for better results. Everyone , do what .This is the description , maybe long maybe short ,simple , watch anime and forgot  your stress , watch at night for better results. ",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"col1":"gg","col2":"2","col3":"5","col4":"7","col5":"50"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "newtest ",
          updated_date: "2023-04-14T08:21:37.456Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "5861d63a-7db1-4362-af59-73cfe1348972",
          created_date: "2023-04-11T11:56:29.008Z",
          description:
            "des People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.edess",
          org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
          organization_name: null,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          title: "teest",
          updated_date: "2023-04-17T08:42:53.499Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "13bef7ce-eeca-4662-8b9c-1912411517be",
          created_date: "2023-04-11T11:50:16.187Z",
          description: "",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          title: "tetss",
          updated_date: "2023-04-17T09:36:09.476Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "62e4a69e-cc61-4aca-9d14-ca5c03182f12",
          created_date: "2023-04-11T08:03:00.436Z",
          description: "",
          org_id: "72b6b276ee55481682cb9bf246294faa",
          organization_name: null,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"col1":"test","col2":"0","col3":"1","col4":"2","col5":"3"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
          template_id: "format2",
          title: "test",
          updated_date: "2023-04-11T08:03:00.436Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "ab33b51e-76c1-4c15-a9e5-33719e921db9",
          created_date: "2023-04-06T04:15:56.843Z",
          description: "gthtrgj",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"question":"how are you ?\\n"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format1",
          title: "erewtgrdsgfsg",
          updated_date: "2023-04-06T04:15:56.843Z",
          __typename: "AdminMeasures",
        },
        {
          _id: "dcd05fb6-b4bf-4b58-b785-4ac88f9459ad",
          created_date: "2023-04-05T13:11:51.931Z",
          description: "yes descrpiton",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
          template_id: "format2",
          title: "5thApril Amar Test",
          updated_date: "2023-04-05T13:11:51.931Z",
          __typename: "AdminMeasures",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ADD_THERAPIST_MEASURE_PLAN_ADD,
    variables: {
      patient_id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
      measure_id: undefined,
    },
  },
  result: {
    data: { addTherapistSafetyPlan: { result: true, __typename: "result" } },
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

describe("Therapist patient measures", () => {
  it("should render therapist measures list", async () => {
    await sut();
    const firstTitleText = await screen.findByText(/test4/i);
    expect(firstTitleText).toBeInTheDocument();

    const firstPlusIcon = await screen.findByTestId("toggleContent0");
    fireEvent.click(firstPlusIcon);
    expect(await screen.findByText(/Current Score/i)).toBeInTheDocument();
  });

  it("click on share button", async () => {
    await sut();
    const shareButton = await screen.findByTestId(
      "iconButton_da31d1fa-48ca-4b67-b406-dd29db30ca9f_2"
    );
    fireEvent.click(shareButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);

    expect(
      await screen.findByText(/Your Measure has been shared successfully./i)
    ).toBeInTheDocument();
  });

  it("click on delete button", async () => {
    await sut();
    const deleteButton = await screen.findByTestId(
      "iconButton_a6e9bf54-76fe-49e0-8872-a7ff0681ccf7_1"
    );
    fireEvent.click(deleteButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Your Measure has been deleted successfully./i)
    ).toBeInTheDocument();
  });

  it("should render measures no data", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-no-data",
      },
      push: pushMock,
    });
    await sut();
    const noDataFoundText = await screen.findByText(/No data found./i);
    expect(noDataFoundText).toBeInTheDocument();
  });

  it("submit form with valid data to add safety plan.", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("addMeasureButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("addMeasureButton"));

      expect(screen.getByTestId("addSubmitForm")).toBeInTheDocument();
      expect(screen.getByTestId("title")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("title"), {
        target: { value: "2" },
      });
      fireEvent.click(screen.queryByTestId("addSubmitForm"));

      await waitFor(async () => {
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();
        expect(
          screen.getByText("Are you sure you want to add the measure?")
        ).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("confirmButton"));
      });
    });
  });
});
