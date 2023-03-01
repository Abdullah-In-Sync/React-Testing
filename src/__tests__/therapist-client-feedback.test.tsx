import { screen, render, fireEvent } from "@testing-library/react";

import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import ClientFeedback from "../pages/therapist/feedback/ClientFeedback";
import { MockedProvider } from "@apollo/react-testing";
import {
  GET_CLIENT_THERAPY_SESSION_LIST,
  GET_THERAPIST_FEEDBACKLIST_DATA_NEW,
} from "../graphql/Feedback/graphql";

jest.mock("../contexts/AuthContext");

const mocks = [];
mocks.push({
  request: {
    query: GET_CLIENT_THERAPY_SESSION_LIST,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
      pttherapyId: "45f52fa31a7f4884a9a5834f854480f8",
    },
  },
  result: {
    data: {
      getClientTherapysessionList: [
        {
          session_no: "1",
          __typename: "sessionList",
        },
        {
          session_no: "after_therapy",
          __typename: "sessionList",
        },
      ],
    },
  },
});

mocks.push({
  request: {
    query: GET_THERAPIST_FEEDBACKLIST_DATA_NEW,
    variables: {
      sessionNo: "after_therapy",
      feedbackType: "client",
      pttherapyId: "45f52fa31a7f4884a9a5834f854480f8",
    },
  },
  result: {
    data: {
      therapistGetFeedbackList: [
        {
          _id: "4ecf48f4-fccf-4376-acdb-9b4e30de9230",
          created_date: "2023-02-20T09:44:46.026Z",
          description: "Instruction",
          name: "I am the feedback. ",
          feedback_type: "client",
          org_id: "2301536c4d674b3598814174d8f19593",
          organization_name: null,
          patient_name: null,
          questions: [
            {
              _id: "15bf95a0-9b2b-4570-9112-0bf9a3676f3c",
              answer: null,
              answer_options: "",
              answer_type: "text",
              created_date: "2023-02-20T09:44:46.032Z",
              feedback_id: "4ecf48f4-fccf-4376-acdb-9b4e30de9230",
              question: "Question Type 1",
              status: "active",
              updated_date: "2023-02-20T09:44:46.032Z",
              __typename: "FeedbackQuestions",
            },
            {
              _id: "186360c0-6e7c-4691-a8e0-af2c879eb0fe",
              answer: null,
              answer_options: "",
              answer_type: "list",
              created_date: "2023-02-20T09:44:46.037Z",
              feedback_id: "4ecf48f4-fccf-4376-acdb-9b4e30de9230",
              question: "Question Type 1b",
              status: "active",
              updated_date: "2023-02-20T09:44:46.037Z",
              __typename: "FeedbackQuestions",
            },
            {
              _id: "ed4fe9bb-280c-413a-a2fb-1453977a2371",
              answer: null,
              answer_options: "a,b,c,d",
              answer_type: "list",
              created_date: "2023-02-20T09:44:46.042Z",
              feedback_id: "4ecf48f4-fccf-4376-acdb-9b4e30de9230",
              question: "Question Type 2",
              status: "active",
              updated_date: "2023-02-20T09:44:46.042Z",
              __typename: "FeedbackQuestions",
            },
            {
              _id: "397a1245-3f32-47fa-aff1-31ab27d90325",
              answer: null,
              answer_options: "q,w,e,r",
              answer_type: "list",
              created_date: "2023-02-20T09:44:46.047Z",
              feedback_id: "4ecf48f4-fccf-4376-acdb-9b4e30de9230",
              question: "Question Type 2b",
              status: "active",
              updated_date: "2023-02-20T09:44:46.047Z",
              __typename: "FeedbackQuestions",
            },
          ],
          session_no: "after_therapy",
          status: 1,
          therapist_name: null,
          therapy_name: null,
          updated_date: "2023-02-20T09:44:46.026Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          visibility: 0,
          __typename: "Feedback",
        },
      ],
    },
  },
});

mocks.push({
  request: {
    query: GET_THERAPIST_FEEDBACKLIST_DATA_NEW,
    variables: {
      sessionNo: "1",
      feedbackType: "client",
      pttherapyId: "45f52fa31a7f4884a9a5834f854480f8",
    },
  },
  result: {
    data: {
      therapistGetFeedbackList: [
        {
          _id: "bb0615e8-e7c9-4743-af12-38d637571f0b",
          created_date: "2023-02-20T05:28:59.912Z",
          description: "Instruction",
          name: "I am the feedback. ",
          feedback_type: "client",
          org_id: "2301536c4d674b3598814174d8f19593",
          organization_name: null,
          patient_name: null,
          questions: [
            {
              _id: "3e562701-3e70-484c-b19e-2586084a0047",
              answer: {
                _id: "fa92cef1-8b8f-4443-be58-c763f68a1510",
                answer: "Session 1 answer",
                created_date: "2023-02-20T05:29:40.274Z",
                patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
                pttherapy_id: "45f52fa31a7f4884a9a5834f854480f8",
                question_id: "3e562701-3e70-484c-b19e-2586084a0047",
                status: "active",
                therapist_id: "686802e5123a482681a680a673ef7f53",
                updated_date: "2023-02-20T05:29:40.274Z",
                __typename: "FeedbackQuestionAnswer",
              },
              answer_options: "",
              answer_type: "text",
              created_date: "2023-02-20T05:28:59.919Z",
              feedback_id: "bb0615e8-e7c9-4743-af12-38d637571f0b",
              question: "Question Type 1",
              status: "active",
              updated_date: "2023-02-20T05:28:59.919Z",
              __typename: "FeedbackQuestions",
            },
          ],
          session_no: "1",
          status: 1,
          therapist_name: null,
          therapy_name: null,
          updated_date: "2023-02-20T05:28:59.912Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          visibility: 0,
          __typename: "Feedback",
        },
      ],
    },
  },
});

const sut = async () => {
  // system under test
  sessionStorage.setItem("patient_id", "4937a27dc00d48bf983fdcd4b0762ebd");
  sessionStorage.setItem("patient_name", "test");
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <ClientFeedback therapyId={"45f52fa31a7f4884a9a5834f854480f8"} />
      </SnackbarProvider>
    </MockedProvider>
  );
  // await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
  // );
};

// tests
describe("Therapist client feedback list", () => {
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

  test("Feedback List", async () => {
    await sut();
    const listTilesToggleButtons = await screen.findAllByTestId(
      "toggleContent"
    );
    fireEvent.click(listTilesToggleButtons[1]);
  });
});
