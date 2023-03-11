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
            _id: "b045f9cf-71dc-4b18-afbe-8e651259abc8",
            created_date: "2023-03-09T04:57:26.497Z",
            description: "",
            feedback_type: "client",
            name: "Arti Therapist feedback ",
            org_detail: {
              _id: "517fa21a82c0464a92aaae90ae0d5c59",
              contract:
                "<p>SUMMARY OF THE AGREEMENT </p><p>This Agreement is a legally binding contract between You and the Therapist for Therapy.  A summary of the main  Where you consent the Therapist may take audio or video recordings of the Therapy Sessions. These will be uploaded to the MyHelp platform to assist with the Therapy Services and will be stored in accordance with data protection legislation in place from time to time. You will be consulted and will have the option to decline prior to any audio or video recording being made. <br/></p>",
              created_date: "2021-12-31 05:54:13",
              logo: "20211130025242__logos.png",
              logo_url: null,
              name: "portal.dev-myhelp",
              panel_color: "#6ec9db",
              patient: "Patient",
              patient_plural: "patients",
              patient_welcome_email:
                "<p>Welcome to MyHelp</p><p>Your details have been given by [THERAPIST_NAME]  The MyHelp support team is available to help with the platform only. Unfortunately, we do not provide mental health services and cannot support you in this respect. Please contact your therapist in such cases.</p>",
              side_menu_color: "#6ec9db",
              therapist: "Therapist",
              therapy: "Therapy",
              __typename: "Organization",
            },
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            session_no: "3",
            status: 0,
            updated_date: "2023-03-09T04:57:26.497Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            visibility: 0,
            __typename: "FeedbackData",
          },
        ],
        feedbackresponse: [
          {
            _id: "b5c52326-efef-4477-9f49-2a1f020f86c5",
            answer: "Answer",
            created_date: "2023-03-09T11:56:22.593Z",
            feedbackquestion: {
              _id: "45ba585c-08eb-4381-a262-f6e791c9bc32",
              answer_options: "",
              answer_type: "text",
              created_date: "2023-03-09T04:57:26.529Z",
              feedback_type: "client",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              organization_name: null,
              question:
                "What do you experience when you start to think about suicide or feel extremely depressed",
              session_no: 3,
              status: "active",
              updated_date: "2023-03-09T04:57:26.529Z",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              __typename: "FeedbackQuestion",
            },
            patient_id: "74d1457556804f119f9eef43c82185f9",
            patient_name: "Shinoy Chaudhary",
            pttherapy_id: "9e7afe8a9b32429696ef269afa99c112",
            question_id: "45ba585c-08eb-4381-a262-f6e791c9bc32",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            therapist_name: "Indi test indi",
            therapy_name: "mental disorder",
            updated_date: "2023-03-09T11:56:22.593Z",
            __typename: "FeedbackDataResponse",
          },
          {
            _id: "e2dcde6d-3049-4699-9d53-9a4234277add",
            answer: "anxious ",
            created_date: "2023-03-09T11:04:06.261Z",
            feedbackquestion: {
              _id: "45ba585c-08eb-4381-a262-f6e791c9bc32",
              answer_options: "",
              answer_type: "text",
              created_date: "2023-03-09T04:57:26.529Z",
              feedback_type: "client",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              organization_name: null,
              question:
                "What do you experience when you start to think about suicide or feel extremely depressed",
              session_no: 3,
              status: "active",
              updated_date: "2023-03-09T04:57:26.529Z",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              __typename: "FeedbackQuestion",
            },
            patient_id: "47aedf8a20344f68b8f064c94160046d",
            patient_name: "Indi Singh",
            pttherapy_id: "b56eb0d8fa94474c93806a98bc731486",
            question_id: "45ba585c-08eb-4381-a262-f6e791c9bc32",
            status: "active",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            therapist_name: "Indi test indi",
            therapy_name: "mental disorder",
            updated_date: "2023-03-09T11:04:06.261Z",
            __typename: "FeedbackDataResponse",
          },
        ],
        totalcount: 2,
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
