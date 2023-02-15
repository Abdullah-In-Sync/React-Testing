import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/styles";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import {
  ADD_FEEDBACK,
  DELETE_FEEDBACK,
  UPDATE_FEEDBACK,
} from "../graphql/mutation";
import { GET_ADMIN_FEEDBACK_LIST, GET_ORG_DATA } from "../graphql/query";
import { GET_ADMIN_TOKEN_DATA } from "../graphql/query/common";
import Feedback from "../pages/admin/feedback";
import theme from "../styles/theme/theme";
import { useAppContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";

jest.mock("../contexts/AuthContext");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  const feedbackData = [
    {
      _id: "12274a23-4932-49b6-9eec-ae7f9f6b804d",
      answer_type: "list",
      created_date: "2022-06-23T08:26:33.663Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test1",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:26:33.663Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "8521b35e-9bbc-4f72-b054-c10935afd181",
      answer_type: "list",
      created_date: "2022-06-23T08:32:44.547Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test2",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:32:44.547Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "12274a23-4932-49b6-9eec-ae7f9f6b804d-3",
      answer_type: "list",
      created_date: "2022-06-23T08:26:33.663Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test1",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:26:33.663Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "8521b35e-9bbc-4f72-b054-c10935afd18-4",
      answer_type: "list",
      created_date: "2022-06-23T08:32:44.547Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test2",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:32:44.547Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "12274a23-4932-49b6-9eec-ae7f9f6b804d-5",
      answer_type: "list",
      created_date: "2022-06-23T08:26:33.663Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test1",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:26:33.663Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "8521b35e-9bbc-4f72-b054-c10935afd181-6",
      answer_type: "list",
      created_date: "2022-06-23T08:32:44.547Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test2",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:32:44.547Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "12274a23-4932-49b6-9eec-ae7f9f6b804d-7",
      answer_type: "list",
      created_date: "2022-06-23T08:26:33.663Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test1",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:26:33.663Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "8521b35e-9bbc-4f72-b054-c10935afd181-8",
      answer_type: "list",
      created_date: "2022-06-23T08:32:44.547Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test2",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:32:44.547Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "12274a23-4932-49b6-9eec-ae7f9f6b804d-9",
      answer_type: "list",
      created_date: "2022-06-23T08:26:33.663Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test1",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:26:33.663Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
    {
      _id: "8521b35e-9bbc-4f72-b054-c10935afd181-10",
      answer_type: "list",
      created_date: "2022-06-23T08:32:44.547Z",
      org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
      question: "test2",
      session_no: 1,
      status: 1,
      updated_date: "2022-06-23T08:32:44.547Z",
      user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
      description: "updated desc",
      feedback_type: "client",
      name: "Updated name",
      organization_name: "",
      user_type: "admin",
      visibility: 1,
      __typename: "Feedback",
    },
  ];

  // fetch patient feedback list query
  _mocks.push({
    request: {
      query: GET_ADMIN_FEEDBACK_LIST,
      variables: {
        pageNo: 1,
        limit: 10,
      },
    },
    result: {
      data: {
        getFeedbackListByAdmin: {
          totalcount: 12,
          feedbackdata: feedbackData,
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: GET_ADMIN_FEEDBACK_LIST,
      variables: {
        pageNo: 2,
        limit: 10,
      },
    },
    result: {
      data: {
        getFeedbackListByAdmin: {
          totalcount: 12,
          feedbackdata: [
            {
              _id: "12274a23-4932-49b6-9eec-ae7f9f6b804d-next",
              answer_type: "list",
              created_date: "2022-06-23T08:26:33.663Z",
              org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
              question: "test1",
              session_no: 1,
              status: 1,
              updated_date: "2022-06-23T08:26:33.663Z",
              user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
              description: "updated desc",
              feedback_type: "client",
              name: "Updated name",
              organization_name: "",
              user_type: "admin",
              visibility: 1,
              __typename: "Feedback",
            },
            {
              _id: "8521b35e-9bbc-4f72-b054-c10935afd181-next",
              answer_type: "list",
              created_date: "2022-06-23T08:32:44.547Z",
              org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
              question: "test2",
              session_no: 1,
              status: 1,
              updated_date: "2022-06-23T08:32:44.547Z",
              user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
              description: "updated desc",
              feedback_type: "client",
              name: "Updated name",
              organization_name: "",
              user_type: "admin",
              visibility: 1,
              __typename: "Feedback",
            },
          ],
        },
      },
    },
  });

  // Mock Add feedback result
  _mocks.push({
    request: {
      query: ADD_FEEDBACK,
      variables: {
        feedQuesData: [
          {
            org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
            session_no: ["1"],
            feedback_type: "session",
            question: "test1",
            answer_options: ["a", "b", "c", "d"],
            answer_type: "list",
          },
        ],
      },
    },
    result: {
      data: {
        adminCreateFeedback: {
          _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
          user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
          org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
          session_no: 1,
          question: "test1",
          answer_type: "list",
          status: "active",
          created_date: "2022-07-09T15:39:07.173Z",
          answer_options: ["a", "b", "c", "d"],
          feedback_type: "session",
          organization_name: "dev-myhelp",
        },
      },
    },
  });

  //update feedback
  _mocks.push({
    request: {
      query: UPDATE_FEEDBACK,
      variables: {
        feedbackId: "12274a23-4932-49b6-9eec-ae7f9f6b804d",
        update: {
          org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
          session_no: ["2"],
          feedback_type: "session",
          question: "test12",
          answer_options: ["a", "b", "c", "d"],
          answer_type: "list",
        },
      },
    },
    result: {
      data: {
        updateFeedbackQuestionById: {
          _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
          user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
          org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
          session_no: 2,
          question: "test1",
          answer_type: "list",
          status: "active",
          created_date: "2022-07-09T15:39:07.173Z",
          answer_options: ["a", "b", "c", "d"],
          feedback_type: "session",
          organization_name: "dev-myhelp",
        },
      },
    },
  });

  //Delete feedback
  // _mocks.push({
  //   request: {
  //     query: DELETE_FEEDBACK,
  //     variables: {
  //       feedbackId: "12274a23-4932-49b6-9eec-ae7f9f6b804d"
  //     },
  //   },
  //   result: {
  //     data: {
  //       updateFeedbackQuestionById: {
  //         _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
  //         user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
  //         org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
  //         session_no: 1,
  //         question: "test1",
  //         answer_type: "list",
  //         status: "deleted",
  //         created_date: "2022-07-09T15:39:07.173Z",
  //         answer_options: ["a", "b", "c", "d"],
  //         feedback_type: "session",
  //         organization_name: "dev-myhelp",
  //       },
  //     },
  //   },
  // });

  _mocks.push({
    request: {
      query: DELETE_FEEDBACK,
      variables: {
        feedbackId: "12274a23-4932-49b6-9eec-ae7f9f6b804d",
      },
    },
    result: {
      data: {
        deleteTherapistSafetyPlanQs: {
          result: true,
          __typename: "result",
        },
      },
    },
  });

  // Mock Add Org list result
  _mocks.push({
    request: {
      query: GET_ORG_DATA,
    },
    result: {
      data: {
        getOrganizationData: [
          {
            _id: "e7b5b7c0568b4eacad6f05f11d9c4884",
            name: "dev-myhelp",
          },
          {
            _id: "890baa07b0c847b2b883c9e1715e608e",
            name: "resteasy",
          },
        ],
      },
    },
  });

  _mocks.push({
    request: {
      query: GET_ADMIN_TOKEN_DATA,
      variables: {},
    },
    result: {
      data: [
        {
          _id: "7fcfbac1-82db-4366-aa76-bf8d649b2a24",
          user_type: "admin",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: 1,
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
        },
      ],
    },
  });

  return { mocks: _mocks };
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <Feedback />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

const mockRouter = {
  push: jest.fn(),
};

describe("Admin feedback page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
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
  // check for admin feedback list
  test("Renders Admin feedback list screen", async () => {
    await sut();
    expect(screen.queryByTestId("tableId")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(10)
    );
    expect(
      screen.queryByTestId("tableColumn_organization_name")
    ).toBeInTheDocument();
    // expect(screen.queryByTestId("tableColumn_question")).toBeInTheDocument();
    expect(
      screen.queryByTestId("tableColumn_feedback_type")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("tableColumn_created_date")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("tableColumn_actions")).toBeInTheDocument();
    expect(screen.queryByTestId("tableColumn_session_no")).toBeInTheDocument();
  });

  test("Click edit icon should open edit feedback page", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("editIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    expect(mockRouter.push).toBeCalledWith(
      "/admin/feedback/edit/12274a23-4932-49b6-9eec-ae7f9f6b804d"
    );
  });

  test("Click view icon should open view feedback page", async () => {
    await sut();
    fireEvent.click(
      screen.queryAllByTestId(
        "viewIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d"
      )[0]
    );
    expect(mockRouter.push).toBeCalledWith(
      "/admin/feedback/view/12274a23-4932-49b6-9eec-ae7f9f6b804d"
    );
  });

  test("Click create icon should open create feedback page", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("create-feedback"));
    expect(mockRouter.push).toBeCalledWith("/admin/feedback/create");
  });

  test("Click Delete icon should open Delete feedback popup", async () => {
    await sut();
    const deleteButton = screen.queryByTestId(
      "deleteIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d"
    );
    fireEvent.click(deleteButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
    fireEvent.click(okButton);
    expect(okButton).not.toBeInTheDocument();
  });

  test("Click delete feedback button with cancelButton", async () => {
    await sut();

    const deleteButton = screen.queryByTestId(
      "deleteIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d"
    );
    fireEvent.click(deleteButton);
    const cancelButton = await screen.findByRole("button", {
      name: "Cancel",
    });
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });
});
