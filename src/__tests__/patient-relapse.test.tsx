import {
  screen,
  render,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import Relapse from "../components/patient/therapyPages/relapse";
import {
  ANSWER_RELAPSE_PLAN_BY_PATIENT_ID,
  GET_PATIENT_RELAPSE_PLANS,
} from "../graphql/Relapse/graphql";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_RELAPSE_PLANS,
  },
  result: {
    data: {
      getPatientRelapsePlans: [
        {
          _id: "64104026ceba90e4e27eea01",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updatedasca",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "admin",
          plan_type: "custom",
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-21T06:14:34.486Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104042ceba90e4e27eea02",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updated",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-20T08:56:40.798Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104becceba90e4e27eea03",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "My Plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-20T08:58:29.133Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "a0b454c2-a0a8-4176-9277-5076a6ce3941",
          created_date: "2023-03-17T06:49:18.510Z",
          description: "Test New Data Text",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-22T04:53:53.657Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "012973f5-5385-4ed8-876f-dc57891f52ed",
          created_date: "2023-03-17T06:51:06.352Z",
          description: "ABCDEFGH",
          name: "new shubham update 1234 1234 1234",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-22T04:53:40.203Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "0242c6f5-c2ea-415a-bf0d-3919d05d9bfe",
          created_date: "2023-03-20T07:20:43.524Z",
          description: "",
          name: "My Plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "8c7b42ab-069f-43bc-96bf-79e17c360c5c",
              created_date: "2023-03-21T06:44:26.774Z",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "0242c6f5-c2ea-415a-bf0d-3919d05d9bfe",
              relapse_additional_details: "new",
              relapse_ques: "test as test",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-21T17:23:04.413Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "4cde17b8-715f-4a6c-8c6d-26ed5eaa402b",
              created_date: "2023-03-21T08:48:04.326Z",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "0242c6f5-c2ea-415a-bf0d-3919d05d9bfe",
              relapse_additional_details: "test",
              relapse_ques: "there",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption: "option1,option3,option5",
              updated_date: "2023-03-21T17:23:04.451Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "938e2819-616f-4f34-86d7-053ef9cc4183",
              created_date: "2023-03-21T17:07:38.657Z",
              patient_answer: null,
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "0242c6f5-c2ea-415a-bf0d-3919d05d9bfe",
              relapse_additional_details: "",
              relapse_ques: "3rd",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-21T17:23:04.461Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-22T04:50:23.622Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "f96731e1-f6c1-4f45-984f-47d3611af542",
          created_date: "2023-03-21T11:02:16.075Z",
          description: "R1",
          name: "R1",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "a1d5b3b8-c38a-41e2-b535-a70efe095c82",
              created_date: "2023-03-22T03:24:38.108Z",
              patient_answer: "test respnonse update",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "f96731e1-f6c1-4f45-984f-47d3611af542",
              relapse_additional_details: "some des",
              relapse_ques: "test",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-23T09:46:18.828Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "8798909b-8f35-434a-948d-5de998f8af3f",
              created_date: "2023-03-22T03:32:31.239Z",
              patient_answer: "test2",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "f96731e1-f6c1-4f45-984f-47d3611af542",
              relapse_additional_details: "check",
              relapse_ques: "radio",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption: "test1,test2,test3",
              updated_date: "2023-03-23T09:46:18.865Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-21T11:20:57.502Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "f8d8df61-ed65-4f2a-b648-32c72305846b",
          created_date: "2023-03-22T04:46:27.812Z",
          description: "asdfasdf ",
          name: "test",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "adcf68b0-ece0-451b-adef-78630aee9684",
              created_date: "2023-03-22T05:01:02.704Z",
              patient_answer: "some",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "f8d8df61-ed65-4f2a-b648-32c72305846b",
              relapse_additional_details: "test",
              relapse_ques: "test",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-22T11:31:16.001Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "11d4f76c-1723-4af2-ad76-931fdf58f741",
              created_date: "2023-03-22T05:06:33.075Z",
              patient_answer: "",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "f8d8df61-ed65-4f2a-b648-32c72305846b",
              relapse_additional_details: "",
              relapse_ques: "new question",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-22T11:31:16.051Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-22T04:50:17.998Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "5f8daf65-60d7-47ba-bace-942ddacc2e04",
          created_date: "2023-03-22T08:18:47.155Z",
          description: "test",
          name: "new ",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T07:32:50.693Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "7d6874f5-b357-44bb-a78a-9e991910025f",
          created_date: "2023-03-22T08:23:41.355Z",
          description: "asdvsvsd",
          name: "test",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "9cffd450-8d0d-4de4-bef9-0d77b8438d23",
              created_date: "2023-03-23T17:01:42.759Z",
              patient_answer: "",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "7d6874f5-b357-44bb-a78a-9e991910025f",
              relapse_additional_details: "",
              relapse_ques: "Question Type 1",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption: "apple,dapple,chapple,kapple,sapple",
              updated_date: "2023-03-23T17:01:42.759Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T07:28:42.275Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "b1bad07d-9b11-478c-b2c4-ad92667ef6dd",
          created_date: "2023-03-22T09:36:33.942Z",
          description: "some",
          name: "test options",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "084a294a-8409-473c-9c5a-e79107a17221",
              created_date: "2023-03-22T12:55:31.839Z",
              patient_answer: "",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "b1bad07d-9b11-478c-b2c4-ad92667ef6dd",
              relapse_additional_details: "test ques description",
              relapse_ques: "ques1",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-22T16:16:39.116Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "c301be90-51c8-4f35-8994-9797353cbb83",
              created_date: "2023-03-22T12:55:32.082Z",
              patient_answer: "option1",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "b1bad07d-9b11-478c-b2c4-ad92667ef6dd",
              relapse_additional_details: "test ques des 2",
              relapse_ques: "ques 2",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption: "option1,option2",
              updated_date: "2023-03-22T16:16:39.127Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T05:36:27.480Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "3e59388d-0fa6-46fe-94f0-41a8177fa8f3",
          created_date: "2023-03-23T06:46:46.961Z",
          description: "Any one",
          name: "Jocker",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "2b35afff-5a8b-47ea-9159-c0048f9316c1",
              created_date: "2023-03-23T07:25:23.847Z",
              patient_answer: "abcd 1234",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "3e59388d-0fa6-46fe-94f0-41a8177fa8f3",
              relapse_additional_details: "Text type question",
              relapse_ques: "Question Type 1",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-23T15:27:11.111Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "92bc7b27-5043-4074-998e-dbd174885348",
              created_date: "2023-03-23T07:25:23.877Z",
              patient_answer: "AppleApple",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "3e59388d-0fa6-46fe-94f0-41a8177fa8f3",
              relapse_additional_details: "List type question",
              relapse_ques: "Question Type 2",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption:
                "Apple,AppleApple,AppleAppleApple,AppleAppleAppleApple,AppleAppleAppleAppleApple",
              updated_date: "2023-03-23T15:27:11.119Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T07:37:09.084Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "8052a023-ba91-4d85-8245-9c7017eba980",
          created_date: "2023-03-23T16:25:14.183Z",
          description: "",
          name: "Very New",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T16:25:20.805Z",
          __typename: "patientRelapsePlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ANSWER_RELAPSE_PLAN_BY_PATIENT_ID,
    variables: {
      quesData:
        '[{"answer":"answer","questionId":"084a294a-8409-473c-9c5a-e79107a17221"},{"answer":"option1","questionId":"c301be90-51c8-4f35-8994-9797353cbb83"}]',
    },
  },
  result: {
    data: {
      answerRelapsePlanByPatient: [
        {
          _id: "64104026ceba90e4e27eea01",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updatedasca",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "admin",
          plan_type: "custom",
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-21T06:14:34.486Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104042ceba90e4e27eea02",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updated",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-20T08:56:40.798Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104becceba90e4e27eea03",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "My Plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-20T08:58:29.133Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "a0b454c2-a0a8-4176-9277-5076a6ce3941",
          created_date: "2023-03-17T06:49:18.510Z",
          description: "Test New Data Text",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-22T04:53:53.657Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "012973f5-5385-4ed8-876f-dc57891f52ed",
          created_date: "2023-03-17T06:51:06.352Z",
          description: "ABCDEFGH",
          name: "new shubham update 1234 1234 1234",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-22T04:53:40.203Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "0242c6f5-c2ea-415a-bf0d-3919d05d9bfe",
          created_date: "2023-03-20T07:20:43.524Z",
          description: "",
          name: "My Plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "8c7b42ab-069f-43bc-96bf-79e17c360c5c",
              created_date: "2023-03-21T06:44:26.774Z",
              patient_answer: "Abxd",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "0242c6f5-c2ea-415a-bf0d-3919d05d9bfe",
              relapse_additional_details: "new",
              relapse_ques: "test as test",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-24T05:46:30.542Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "4cde17b8-715f-4a6c-8c6d-26ed5eaa402b",
              created_date: "2023-03-21T08:48:04.326Z",
              patient_answer: "option1",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "0242c6f5-c2ea-415a-bf0d-3919d05d9bfe",
              relapse_additional_details: "test",
              relapse_ques: "there",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption: "option1,option3,option5",
              updated_date: "2023-03-24T05:46:30.800Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "938e2819-616f-4f34-86d7-053ef9cc4183",
              created_date: "2023-03-21T17:07:38.657Z",
              patient_answer: "Masenc",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "0242c6f5-c2ea-415a-bf0d-3919d05d9bfe",
              relapse_additional_details: "",
              relapse_ques: "3rd",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-24T05:46:30.807Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-22T04:50:23.622Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "f96731e1-f6c1-4f45-984f-47d3611af542",
          created_date: "2023-03-21T11:02:16.075Z",
          description: "R1",
          name: "R1",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "a1d5b3b8-c38a-41e2-b535-a70efe095c82",
              created_date: "2023-03-22T03:24:38.108Z",
              patient_answer: "test respnonse update",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "f96731e1-f6c1-4f45-984f-47d3611af542",
              relapse_additional_details: "some des",
              relapse_ques: "test",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-23T09:46:18.828Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "8798909b-8f35-434a-948d-5de998f8af3f",
              created_date: "2023-03-22T03:32:31.239Z",
              patient_answer: "test2",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "f96731e1-f6c1-4f45-984f-47d3611af542",
              relapse_additional_details: "check",
              relapse_ques: "radio",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption: "test1,test2,test3",
              updated_date: "2023-03-23T09:46:18.865Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-21T11:20:57.502Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "f8d8df61-ed65-4f2a-b648-32c72305846b",
          created_date: "2023-03-22T04:46:27.812Z",
          description: "asdfasdf ",
          name: "test",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "adcf68b0-ece0-451b-adef-78630aee9684",
              created_date: "2023-03-22T05:01:02.704Z",
              patient_answer: "some",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "f8d8df61-ed65-4f2a-b648-32c72305846b",
              relapse_additional_details: "test",
              relapse_ques: "test",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-22T11:31:16.001Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "11d4f76c-1723-4af2-ad76-931fdf58f741",
              created_date: "2023-03-22T05:06:33.075Z",
              patient_answer: "",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "f8d8df61-ed65-4f2a-b648-32c72305846b",
              relapse_additional_details: "",
              relapse_ques: "new question",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-22T11:31:16.051Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-22T04:50:17.998Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "5f8daf65-60d7-47ba-bace-942ddacc2e04",
          created_date: "2023-03-22T08:18:47.155Z",
          description: "test",
          name: "new ",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T07:32:50.693Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "7d6874f5-b357-44bb-a78a-9e991910025f",
          created_date: "2023-03-22T08:23:41.355Z",
          description: "asdvsvsd",
          name: "test",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "9cffd450-8d0d-4de4-bef9-0d77b8438d23",
              created_date: "2023-03-23T17:01:42.759Z",
              patient_answer: "",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "7d6874f5-b357-44bb-a78a-9e991910025f",
              relapse_additional_details: "",
              relapse_ques: "Question Type 1",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption: "apple,dapple,chapple,kapple,sapple",
              updated_date: "2023-03-23T17:01:42.759Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T07:28:42.275Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "b1bad07d-9b11-478c-b2c4-ad92667ef6dd",
          created_date: "2023-03-22T09:36:33.942Z",
          description: "some",
          name: "test options",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "084a294a-8409-473c-9c5a-e79107a17221",
              created_date: "2023-03-22T12:55:31.839Z",
              patient_answer: "",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "b1bad07d-9b11-478c-b2c4-ad92667ef6dd",
              relapse_additional_details: "test ques description",
              relapse_ques: "ques1",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-22T16:16:39.116Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "c301be90-51c8-4f35-8994-9797353cbb83",
              created_date: "2023-03-22T12:55:32.082Z",
              patient_answer: "option1",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "b1bad07d-9b11-478c-b2c4-ad92667ef6dd",
              relapse_additional_details: "test ques des 2",
              relapse_ques: "ques 2",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption: "option1,option2",
              updated_date: "2023-03-22T16:16:39.127Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T05:36:27.480Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "3e59388d-0fa6-46fe-94f0-41a8177fa8f3",
          created_date: "2023-03-23T06:46:46.961Z",
          description: "Any one",
          name: "Jocker",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [
            {
              _id: "2b35afff-5a8b-47ea-9159-c0048f9316c1",
              created_date: "2023-03-23T07:25:23.847Z",
              patient_answer: "abcd 1234",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "3e59388d-0fa6-46fe-94f0-41a8177fa8f3",
              relapse_additional_details: "Text type question",
              relapse_ques: "Question Type 1",
              relapse_ques_status: "1",
              relapse_ques_type: "1",
              relapse_ques_typeoption: "",
              updated_date: "2023-03-23T15:27:11.111Z",
              __typename: "patientRelapsePlanQuestions",
            },
            {
              _id: "92bc7b27-5043-4074-998e-dbd174885348",
              created_date: "2023-03-23T07:25:23.877Z",
              patient_answer: "AppleApple",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              plan_id: "3e59388d-0fa6-46fe-94f0-41a8177fa8f3",
              relapse_additional_details: "List type question",
              relapse_ques: "Question Type 2",
              relapse_ques_status: "1",
              relapse_ques_type: "2",
              relapse_ques_typeoption:
                "Apple,AppleApple,AppleAppleApple,AppleAppleAppleApple,AppleAppleAppleAppleApple",
              updated_date: "2023-03-23T15:27:11.119Z",
              __typename: "patientRelapsePlanQuestions",
            },
          ],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T07:37:09.084Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "8052a023-ba91-4d85-8245-9c7017eba980",
          created_date: "2023-03-23T16:25:14.183Z",
          description: "",
          name: "Very New",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "therapist",
          plan_type: null,
          questions: [],
          share_status: 1,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-23T16:25:20.805Z",
          __typename: "patientRelapsePlans",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <Relapse />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Patient relapse page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "patient",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });

  test("Renders relapse data", async () => {
    await sut();
    await waitFor(async () => {
      const tiles = await screen.findAllByTestId("list-tile");
      expect(tiles.length).toEqual(13);
    });
  });

  it("Cancle relapse plan data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(13);

    const firstAccordion = list[5];

    expect(
      within(firstAccordion).queryByTestId("cancel-form")
    ).not.toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    expect(
      within(firstAccordion).queryByTestId("cancel-form")
    ).toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("cancel-form"));

    expect(
      screen.getByText(
        "Are you sure you are canceling the response without submitting?"
      )
    ).toBeInTheDocument();

    const confirmButton = await screen.findByTestId("confirmButton");

    fireEvent.click(confirmButton);

    expect(screen.getByText("Relapse cancel successfully")).toBeInTheDocument();
  });

  it("Info relapse plan ", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(13);

    const firstAccordion = list[5];

    expect(
      within(firstAccordion).queryByTestId("cancel-form")
    ).not.toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    expect(
      within(firstAccordion).queryByTestId("button-edit-icon_new")
    ).toBeInTheDocument();

    fireEvent.click(
      within(firstAccordion).queryByTestId("button-edit-icon_new")
    );

    expect(screen.getByText("test as test")).toBeInTheDocument();

    await waitFor(async () => {
      expect(
        screen.getByTestId("editTemplateCancelButton")
      ).toBeInTheDocument();
    });

    const confirmButton = await screen.findByTestId("editTemplateCancelButton");

    fireEvent.click(confirmButton);

    expect(list.length).toEqual(13);
  });

  it("Update safety plan data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(13);

    const firstAccordion = list[10];

    expect(
      within(firstAccordion).queryByTestId("submit-form")
    ).not.toBeInTheDocument();

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    expect(
      within(firstAccordion).queryByTestId("submit-form")
    ).toBeInTheDocument();

    expect(
      within(firstAccordion).queryByTestId("questions.0.patient_answer")
    ).toBeInTheDocument();

    fireEvent.change(screen.queryByTestId("questions.0.patient_answer"), {
      target: { value: "answer" },
    });

    fireEvent.click(await screen.findByTestId("submit-form"));

    const confirmButton = await screen.findByTestId(
      "editSafetyPlanConfirmButton"
    );

    fireEvent.click(confirmButton);

    expect(await screen.findByTestId("SuccessOkBtn")).toBeInTheDocument();

    await screen.findByTestId("SuccessOkBtn");

    fireEvent.click(screen.getByTestId("SuccessOkBtn"));
  });
});
