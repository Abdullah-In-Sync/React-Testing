import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";
import TherapyPatientFeedback from "../pages/therapist/feedback";
import { GET_PATIENTSESSION_DATA } from "../graphql/query/patient";
import { GET_THERAPISTFEEDBACKLIST_DATA } from "../graphql/query";
import { GET_PATIENTTHERAPY_DATA } from "../graphql/query/common";

jest.mock("../contexts/AuthContext");

// mocks
const mocksData = [];
export async function waitForPaint(times = 1): Promise<void> {
  for (let i = 0; i < times + 1; i++) {
    jest.advanceTimersByTime(1000);
    await Promise.resolve();
  }
}

mocksData.push({
  request: {
    query: GET_PATIENTTHERAPY_DATA,
    variables: {
      pttherapyId: "pt_therapy_id",
      patientId: "first_patient_id",
    },
  },
  result: {
    data: {
      getPatientTherapy: [
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "1",
          pttherapy_status: 1,
          created_date: "2022-05-29T15:17:42.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "45f52fa31a7f4884a9a5834f854480f8",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "4e110b3e7faa47c9be82540fe8e78fb0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "4e110b3e7faa47c9be82540fe8e78fb0",
            created_date: "2021-12-30 16:15:45",
            disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
            model_name: "test model",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "467925dfc1d34c9e9eecd3cd915588d9",
            created_date: "2021-12-30 16:15:05",
            disorder_name: "test mong edit",
            disorder_status: 1,
            therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "6",
          pttherapy_status: 1,
          created_date: "2022-05-29T15:15:15.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "28abbd5cf240405c94ffd35b189c7297",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "1cd8f335168b49838e42ca2cda555ef4",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "1cd8f335168b49838e42ca2cda555ef4",
            created_date: "2022-02-25T16:22:45.000Z",
            disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
            model_name: "testing",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "467925dfc1d34c9e9eecd3cd915588d9",
            created_date: "2021-12-30 16:15:05",
            disorder_name: "test mong edit",
            disorder_status: 1,
            therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "7",
          pttherapy_status: 1,
          created_date: "2022-05-29T04:37:57.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "ac8e81a741054bba9029ff02a3cc9bb9",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "1cd8f335168b49838e42ca2cda555ef4",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "1cd8f335168b49838e42ca2cda555ef4",
            created_date: "2022-02-25T16:22:45.000Z",
            disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
            model_name: "testing",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "467925dfc1d34c9e9eecd3cd915588d9",
            created_date: "2021-12-30 16:15:05",
            disorder_name: "test mong edit",
            disorder_status: 1,
            therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "3",
          pttherapy_status: 1,
          created_date: "2022-03-10T09:16:22.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "5917a53226c74b74a4d082e4b864864e",
          disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
          model_id: "4e110b3e7faa47c9be82540fe8e78fb0",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "4e110b3e7faa47c9be82540fe8e78fb0",
            created_date: "2021-12-30 16:15:45",
            disorder_id: "467925dfc1d34c9e9eecd3cd915588d9",
            model_name: "test model",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "467925dfc1d34c9e9eecd3cd915588d9",
            created_date: "2021-12-30 16:15:05",
            disorder_name: "test mong edit",
            disorder_status: 1,
            therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_PATIENTSESSION_DATA,
    variables: {
      pttherapyId: "45f52fa31a7f4884a9a5834f854480f8",
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getPatientSessionList: [
        {
          _id: "dcd59a2abf7a48ac9633d8ab656bfa88",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "45f52fa31a7f4884a9a5834f854480f8",
          ptsession_no: 1,
          ptsession_status: 1,
          created_date: "2022-05-29T15:17:42.000Z",
          updated_date: null,
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPISTFEEDBACKLIST_DATA,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
      sessionNo: 1,
      feedbackType: "session",
      pttherapyId: "45f52fa31a7f4884a9a5834f854480f8",
    },
  },
  result: {
    data: {
      getTherapistFeedbackList: [
        {
          _id: "02dcad6b-04d1-4e4e-9e36-78f2d84d8748",
          answer_options: ["d", "p"],
          answer_type: "list",
          created_date: "2022-10-27T15:09:00.192Z",
          feedback_ans: null,
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "dfdfdfdf",
          session_no: 1,
          status: "active",
          updated_date: "2022-10-27T15:09:00.192Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "fc2f449b-7551-4786-9254-a0b55cfe20ec",
          answer_options: ["d", "p"],
          answer_type: "list",
          created_date: "2022-10-27T15:09:00.184Z",
          feedback_ans: null,
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "dfdff",
          session_no: 1,
          status: "active",
          updated_date: "2022-10-27T15:09:00.184Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "efcfb5ed-737e-4104-9651-49e6e6f076c8",
          answer_options: [],
          answer_type: "list",
          created_date: "2022-10-26T15:58:48.463Z",
          feedback_ans: null,
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "asnbdandsabmmdsabmddddddd",
          session_no: 1,
          status: "active",
          updated_date: "2022-10-26T15:58:48.463Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "2eded5b1-6f71-4659-b9fd-43359ce5f0a5",
          answer_options: ["BA", "BSc", "MA"],
          answer_type: "list",
          created_date: "2022-10-10T15:51:25.515Z",
          feedback_ans: {
            _id: "e6f17803-3b6d-4ac5-85db-b975e7a83092",
            answer: "BA",
            created_date: "2022-10-10T16:03:00.252Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "2eded5b1-6f71-4659-b9fd-43359ce5f0a5",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-10-10T16:03:00.252Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "What is your qualification?",
          session_no: 1,
          status: "active",
          updated_date: "2022-10-10T15:51:25.515Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "97104f16-d266-43d2-818b-36e649e1ba48",
          answer_options: ["paly", "singing"],
          answer_type: "list",
          created_date: "2022-10-10T15:51:25.506Z",
          feedback_ans: {
            _id: "ed55c992-2831-4d70-bcb3-300380a0cf94",
            answer: "singing",
            created_date: "2022-10-10T16:04:46.509Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "97104f16-d266-43d2-818b-36e649e1ba48",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-10-10T16:04:46.509Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "What is your hobby",
          session_no: 1,
          status: "active",
          updated_date: "2022-10-10T15:51:25.506Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "384aba90-0a17-4b51-94e8-61046da3d484",
          answer_options: ["mumbai", "delhi", "noida"],
          answer_type: "list",
          created_date: "2022-10-10T15:49:31.745Z",
          feedback_ans: {
            _id: "610db9f3-4cb8-459c-964b-fb22928c5346",
            answer: "delhi",
            created_date: "2022-10-10T16:04:46.516Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "384aba90-0a17-4b51-94e8-61046da3d484",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-10-10T16:04:46.516Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "What is your city name",
          session_no: 1,
          status: "active",
          updated_date: "2022-10-10T15:49:31.745Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "dad7a9aa-e2ef-4854-a399-5bae1c33899e",
          answer_options: ["a", "b", "c", "d"],
          answer_type: "list",
          created_date: "2022-10-10T15:48:27.065Z",
          feedback_ans: {
            _id: "c3d0462d-adb7-44a9-84ff-345702d814d4",
            answer: "b",
            created_date: "2022-10-10T16:04:46.521Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "dad7a9aa-e2ef-4854-a399-5bae1c33899e",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-10-10T16:04:46.521Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "What is expectation?",
          session_no: 1,
          status: "active",
          updated_date: "2022-10-10T15:48:27.065Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "cbbaed12-742d-40c9-b9dc-b6030cf9c110",
          answer_options: ["a", "b", "c", "d"],
          answer_type: "list",
          created_date: "2022-10-10T15:46:58.402Z",
          feedback_ans: {
            _id: "76b0faa3-79d4-480d-b5e8-5a3289bf856a",
            answer: "b",
            created_date: "2022-10-10T16:04:46.530Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "cbbaed12-742d-40c9-b9dc-b6030cf9c110",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-10-10T16:04:46.530Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "What is your name",
          session_no: 1,
          status: "active",
          updated_date: "2022-10-10T15:46:58.402Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "65f8c262-3c3a-4a94-a3c7-8439cc7c40bf",
          answer_options: [],
          answer_type: "text",
          created_date: "2022-09-23T17:08:25.045Z",
          feedback_ans: {
            _id: "9dcd43e1-51a5-4aaa-b08a-a95a8bd75ccd",
            answer: "dsfdsfdsfsdfdsf",
            created_date: "2022-10-10T16:04:46.536Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "65f8c262-3c3a-4a94-a3c7-8439cc7c40bf",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-10-10T16:04:46.536Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "Test Anshita Text box answer",
          session_no: 1,
          status: "active",
          updated_date: "2022-09-23T17:08:25.045Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "b587233f-28d2-4af9-a2ac-6fbe5555ff39",
          answer_options: ["no", "yes"],
          answer_type: "list",
          created_date: "2022-09-13T15:35:23.958Z",
          feedback_ans: {
            _id: "d477f425-fac4-43b8-9086-d2808fd3ef9c",
            answer: "yes",
            created_date: "2022-09-13T15:36:15.614Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "b587233f-28d2-4af9-a2ac-6fbe5555ff39",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-09-13T15:36:15.614Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "Question is not deleted",
          session_no: 1,
          status: "deleted",
          updated_date: "2022-09-13T15:36:26.884Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        null,
        null,
        {
          _id: "17b99190-d27b-4d65-96dd-f27972ec6091",
          answer_options: ["a", "s", "f", "5"],
          answer_type: "list",
          created_date: "2022-09-09T13:50:27.300Z",
          feedback_ans: {
            _id: "ce3057bd-6ac5-4d21-9470-e0662726756a",
            answer: "f",
            created_date: "2022-09-10T04:21:28.119Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "17b99190-d27b-4d65-96dd-f27972ec6091",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-09-10T04:21:28.119Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "How was the quality?",
          session_no: 1,
          status: "deleted",
          updated_date: "2022-09-19T12:00:35.775Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "3b2e00f3-7a8a-4bef-bf46-c9c4fae865df",
          answer_options: [],
          answer_type: "text",
          created_date: "2022-09-07T09:06:54.907Z",
          feedback_ans: {
            _id: "c7a02a82-6dfb-4180-b354-78232fc16f1e",
            answer: "dsdsdfsdsfd fds f",
            created_date: "2022-09-10T04:21:28.124Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "3b2e00f3-7a8a-4bef-bf46-c9c4fae865df",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-09-10T04:21:28.124Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "Was the session useful?",
          session_no: 1,
          status: "deleted",
          updated_date: "2022-09-19T12:00:45.255Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
        {
          _id: "907c4ded-6f03-4812-8dd1-90fe985c5dc8",
          answer_options: ["a", "b", "c", "d"],
          answer_type: "list",
          created_date: "2022-09-03T17:04:10.938Z",
          feedback_ans: {
            _id: "ae208a51-0a9b-457b-b4d0-e5d998976ce8",
            answer: "d",
            created_date: "2022-09-10T04:21:28.129Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            question_id: "907c4ded-6f03-4812-8dd1-90fe985c5dc8",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            updated_date: "2022-09-10T04:21:28.129Z",
            __typename: "FeedbackQuestionAnswer",
          },
          feedback_type: "session",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          question: "What is your name?",
          session_no: 1,
          status: "deleted",
          updated_date: "2022-09-09T07:09:47.119Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FeedbackQuestionData",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <TherapyPatientFeedback />
      </SnackbarProvider>
    </MockedProvider>
  );
  //   await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
  //   );
};

describe("Therapist Resource page", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        therapist_data: {
          _id: "therapist_id",
          org_id: "myhelp",
        },
      },
    });
  });

  // check for Patient Session Resource list
  it("should render complete add resource form", async () => {
    await sut();
    // await waitForPaint(5);

    await waitFor(async () => {
      expect(screen.getByText("Feedback")).toBeInTheDocument();
      //   expect(screen.getByText("Session 1")).toBeInTheDocument();
      expect(screen.getByTestId("panel1bh-header")).toBeInTheDocument();
    });

    //    expect(screen.queryByTestId(panelName + "bh-header")).toHaveTextContent(
    //      "Session " + p
    //    );
    // });

    // expect(screen.getByTestId("resource-add-form")).toBeInTheDocument();

    // expect(screen.getByTestId("resource_name")).toBeInTheDocument();

    // expect(screen.getByTestId("resource_type")).toBeInTheDocument();

    // expect(screen.getByTestId("disorder_id")).toBeInTheDocument();

    // expect(screen.getByTestId("model_id")).toBeInTheDocument();

    // expect(screen.getByTestId("category_id")).toBeInTheDocument();

    // expect(screen.getByTestId("resource_desc")).toBeInTheDocument();

    // expect(screen.getByTestId("resource_instruction")).toBeInTheDocument();

    // expect(screen.getByTestId("resource_references")).toBeInTheDocument();

    // expect(screen.getByTestId("agenda")).toBeInTheDocument();

    // expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();

    // expect(screen.getByTestId("resource_avail_therapist")).toBeInTheDocument();

    // expect(screen.getByTestId("resource_avail_onlyme")).toBeInTheDocument();

    // expect(screen.getByTestId("addResourceSubmitButton")).toBeInTheDocument();
  });
});
