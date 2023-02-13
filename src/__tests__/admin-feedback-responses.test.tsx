import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";
import AdminFeedbackResponses from "../pages/admin/feedback/responses/[id]";
import { GET_ADMIN_FEEDBACK_RESPONSE_LIST } from "../graphql/query";
import { useRouter } from "next/router";

jest.mock("../contexts/AuthContext");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
// mocks
const mocksData = [];

mocksData.push({
  request: {
    query: GET_ADMIN_FEEDBACK_RESPONSE_LIST,
    variables: {
      feedbackId: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
      startDate: "",
      endDate: "",
      limit: 10,
      pageNo: 1,
    },
  },
  result: {
    data: {
      adminViewResponseByFeedbackId: {
        feedbackdata: [
          {
            _id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
            user_type: "admin",
            created_date: "2023-02-10T05:16:44.420Z",
            name: "Test",
            feedback_type: "therapist",
            description: "sdfdsf",
            org_detail: {
              _id: "3c4054dc-1888-4af5-8af2-586cadeecf2b",
              name: "orgName",
              __typename: "Organization",
            },
            __typename: "FeedbackData",
          },
        ],
        feedbackresponse: [
          {
            _id: "63e5f2d8084148a2491f810b",
            answer: "My name",
            feedbackquestion: {
              _id: "3f58209d-2bf4-4bf7-a260-da64da8d23f3",
              answer_type: "2",
              __typename: "FeedbackQuestion",
            },
            patient_detail: {
              _id: "4937a27dc00d48bf983fdcd4b0762ebd",
              created_date: "2022-03-02T09:17:12.000Z",
              hos_id: "611f662e3a6c1c3ffb3edc65",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              patient_firstname: "Ganga",
              patient_gender: "Male",
              patient_lastname: "Pal",
              __typename: "PatientData",
            },
            therapist_detail: {
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              therapist_name: "Indi test indi",
              __typename: "TherapistData",
            },
            therapist_id: "686802e5123a482681a680a673ef7f53",
            therapy_detail: {
              _id: "d52acb5ade3548a3bcb9cce310fef95a",
              created_date: "2023-01-03T09:00:46.000Z",
              therapy_name: "mental disorder 12345",
              __typename: "TherapyData",
            },
            __typename: "FeedbackDataResponse",
          },
          {
            _id: "63e5de1e99d99a10e1704e36",
            answer: "My name",
            feedbackquestion: {
              _id: "f7a7d060-869c-4da8-acd3-1318a82dffb5",
              answer_type: "list",
              __typename: "FeedbackQuestion",
            },
            patient_detail: {
              _id: "4937a27dc00d48bf983fdcd4b0762ebd",
              created_date: "2022-03-02T09:17:12.000Z",
              hos_id: "611f662e3a6c1c3ffb3edc65",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              patient_firstname: "Ganga",
              patient_gender: "Male",
              patient_lastname: "Pal",
              __typename: "PatientData",
            },
            therapist_detail: {
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              therapist_name: "Indi test indi",
              __typename: "TherapistData",
            },
            therapist_id: "686802e5123a482681a680a673ef7f53",
            therapy_detail: {
              _id: "d52acb5ade3548a3bcb9cce310fef95a",
              created_date: "2023-01-03T09:00:46.000Z",
              therapy_name: "mental disorder 12345",
              __typename: "TherapyData",
            },
            __typename: "FeedbackDataResponse",
          },
        ],
        __typename: "responseData",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <AdminFeedbackResponses />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("TemplateList Page", () => {
  beforeEach(() => {
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

  test("Renders template tab list screen", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "3b1a1dad-1d55-4ecd-add6-2b428bb74dcf",
      },
    }));
    await sut();
    await waitFor(() =>
      expect(screen.queryByTestId("tableId")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(2)
    );
    expect(screen.queryByText("Therapist Name")).toBeInTheDocument();
  });
});
