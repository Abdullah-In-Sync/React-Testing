import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { Feedback } from "../pages/patient/feedback";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENTFEEDBACKLIST_DATA,
  GET_TOKEN_DATA,
} from "../graphql/query/common";
import { POST_PATIENT_FEEDBACK } from "../graphql/mutation";
import { GET_PATIENTSESSION_DATA } from "../graphql/query/patient";

const mocks = [
  {
    request: {
      query: GET_TOKEN_DATA,
      variables: {
        queryString: "javascript",
      },
    },
    result: {
      data: {
        getTokenData: [
          {
            _id: "9a6cdd23-0cef-4d4d-a94a-51d6896cabfd",
            user_type: ["patient"],
            parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
            perm_ids: "9,10,14,21,191,65,66",
            user_status: "1",
            created_date: "2021-12-20 16:20:55",
            updated_date: "2021-12-20 16:20:55",
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_PATIENTSESSION_DATA,
      variables: {
        pttherapyId: "f98a6095ca524338973da5f20f8d0ad3",
      },
    },
    result: {
      data: {
        getPatientSessionList: [
          {
            _id: "bc1199d296b9437d8db350d6bad68666",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            therapist_id: "15b2fce928064732a6df4ffd3e513ed2",
            pttherapy_id: "f98a6095ca524338973da5f20f8d0ad3",
            ptsession_no: 1,
            ptsession_status: 1,
            created_date: "2022-03-25T13:37:07.000Z",
            updated_date: null,
          },
        ],
      },
    },
  },
  {
    request: {
      query: POST_PATIENT_FEEDBACK,
      variables: {
        feedQuesAnsData: [
          {
            therapist_id: "15b2fce928064732a6df4ffd3e513ed2",
            session_no: 1,
            question_id: "e6d1cdc7bf7f4e91807d0ac97698ca78",
            answer: "ans1",
          },
          {
            therapist_id: "15b2fce928064732a6df4ffd3e513ed2",
            session_no: "1",
            question_id: "a0f9d71d37e846e6b9592b92ad8e3999",
            answer: "ans2",
          },
        ],
        sessionNo: 1,
        feedbackType: "session",
      },
      result: {
        data: {
          postPatientFeedback: [
            {
              _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
              answer_options: ["p", "q", "r", "s"],
              answer_type: "radio",
              created_date: "2022-07-09T15:39:07.173Z",
              feedback_ans: {
                _id: "29e9e456-20cb-4d0d-81fb-1e718342f74c",
                answer: "ans1",
                created_date: "2022-07-09T15:53:28.900Z",
                patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
                question_id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
                status: "active",
                therapist_id: "686802e5123a482681a680a673ef7f53",
                updated_date: "2022-07-09T15:53:28.900Z",
              },
              feedback_type: "session",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              question: "test1",
              session_no: 1,
              status: "active",
              updated_date: "2022-07-09T15:43:05.395Z",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            },
            {
              _id: "84f83722-5c4d-44ea-8b3a-9a724350238b",
              answer_options: ["a", "b", "c", "d"],
              answer_type: "list",
              created_date: "2022-07-09T15:39:07.402Z",
              feedback_ans: {
                _id: "12debf47-53cf-419c-a763-b19376db18d8",
                answer: "ans2",
                created_date: "2022-07-09T15:53:28.949Z",
                patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
                question_id: "84f83722-5c4d-44ea-8b3a-9a724350238b",
                status: "active",
                therapist_id: "686802e5123a482681a680a673ef7f53",
                updated_date: "2022-07-09T15:53:28.949Z",
              },
              feedback_type: "session",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              question: "test2",
              session_no: 1,
              status: "active",
              updated_date: "2022-07-09T15:39:07.402Z",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_PATIENTFEEDBACKLIST_DATA,
      variables: {
        sessionNo: 1,
        feedbackType: "session",
      },
    },
    result: {
      data: {
        getPatientFeedbackList: [
          {
            _id: "837878be-5cf9-4d1c-9593-8085a168946a",
            user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
            org_id: "c557283d1b5e4d7abf19625bf268cdf8",
            session_no: 1,
            feedback_type: "session",
            question: "test1",
            answer_type: "list",
            status: "active",
            created_date: "2022-07-09T03:28:50.619Z",
            updated_date: "2022-07-09T05:17:41.133Z",
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_PATIENTTHERAPY_DATA,
      variables: {
        patientId: "",
      },
    },
    result: {
      data: {
        getPatientTherapy: [
          {
            therapy_detail: {
              therapy_name: "localhost",
              _id: "305884c59f804bb6b93001f1bef958da",
            },
            disorder_detail: {
              _id: "449f01139fc44cc685c57068b585bdf4",
              disorder_name: "local order",
            },
            model_detail: {
              _id: "b8cfa7724af247a987d7ce01366fae4c",
              model_name: "local model",
            },
          },
        ],
      },
    },
  },
];

describe("Patient feedback list", () => {
  test("renders patient feedback list", async () => {
    const { container } = render(
      <MockedProvider mocks={mocks}>
        <Feedback />
      </MockedProvider>
    );

    await waitFor(() => new Promise((res) => setTimeout(res, 0)));
    expect(container).toMatchSnapshot();
  });
});
