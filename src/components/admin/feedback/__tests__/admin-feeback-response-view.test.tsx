import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { useRouter } from "next/router";
import { VIEW_ADMIN_FEEDBACK_BY_ID } from "../../../../graphql/query";

import ResponseView from "../../../../pages/admin/feedback/responses/[id]/[pttherapyId]/[patientId]";

import theme from "../../../../styles/theme/theme";

import { useAppContext } from "../../../../contexts/AuthContext";
jest.mock("../../../../contexts/AuthContext");
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: VIEW_ADMIN_FEEDBACK_BY_ID,
    variables: {
      feedbackId: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
      pttherapyId: "4937a27dc00d48bf983fdcd4b0762ebd",
      userId: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
    },
  },
  result: {
    data: {
      adminViewResponseDetailById: {
        _id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
        created_date: "2023-02-10T05:16:44.420Z",
        description: "sdfdsf",
        feedback_type: "therapist",
        name: "Test",
        org_id: "3c4054dc-1888-4af5-8af2-586cadeecf2b",
        organization_name: "orgName",
        session_no: "1",
        status: 1,
        updated_date: "2023-02-10T05:16:44.420Z",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        visibility: 1,
        questions: [
          {
            _id: "f7a7d060-869c-4da8-acd3-1318a82dffb5",
            answer_options: null,
            answer_type: "1",
            created_date: "2023-02-02T10:19:22.637Z",
            feedback_id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
            question: "test1",
            status: "active",
            updated_date: "2023-02-02T10:19:22.637Z",
            answer: {
              answer: "answer text",
            },
            __typename: "FeedbackQuestions",
          },
          {
            _id: "3f58209d-2bf4-4bf7-a260-da64da8d23f3",
            answer_options: "Test1,test2",
            answer_type: "2",
            created_date: "2023-02-10T05:16:44.425Z",
            feedback_id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
            question: "sdfdsf",
            status: "active",
            updated_date: "2023-02-10T05:16:44.425Z",
            answer: {
              answer: null,
            },
            __typename: "FeedbackQuestions",
          },
          {
            _id: "f7a7d060-869c-4da8-acd3-1318a82dffb5-text",
            answer_options: null,
            answer_type: "text",
            created_date: "2023-02-02T10:19:22.637Z",
            feedback_id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
            question: "test1",
            status: "active",
            updated_date: "2023-02-02T10:19:22.637Z",
            answer: {
              answer: "answer text string",
            },
            __typename: "FeedbackQuestions",
          },
          {
            _id: "3f58209d-2bf4-4bf7-a260-da64da8d23f3-list",
            answer_options: "Test-list1,test-list2",
            answer_type: "list",
            created_date: "2023-02-10T05:16:44.425Z",
            feedback_id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
            question: "sdfdsf",
            status: "active",
            updated_date: "2023-02-10T05:16:44.425Z",
            answer: {
              answer: null,
            },
            __typename: "FeedbackQuestions",
          },
          {
            _id: "3f58209d-2bf4-4bf7-a260-da64da8d23f3-list",
            answer_options: "Test-list1,test-list2",
            answer_type: "",
            created_date: "2023-02-10T05:16:44.425Z",
            feedback_id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
            question: "sdfdsf",
            status: "active",
            updated_date: "2023-02-10T05:16:44.425Z",
            answer: {
              answer: null,
            },
            __typename: "FeedbackQuestions",
          },
        ],
        __typename: "Feedback",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <ResponseView />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin feedback Client/Therapist response view", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
        pttherapyId: "4937a27dc00d48bf983fdcd4b0762ebd",
        patientId: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946"
      },
      back: pushMock,
    });
    (useRouter as jest.Mock).mockClear();
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });
  it("should render admin feedback response data", async () => {
    await sut();
    const test2Text = await screen.findByText(/test-list2/i);
    expect(test2Text).toBeInTheDocument();
  });
  it("should back button click", async () => {
    await sut();
    const backButton = await screen.findByTestId("backButton");
    fireEvent.click(backButton);
    expect(pushMock).toHaveBeenCalled();
  });
});
