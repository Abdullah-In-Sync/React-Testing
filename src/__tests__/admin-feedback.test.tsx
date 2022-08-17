import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import Feedback from "../pages/admin/feedback";

import { GET_FEEDBACK_DATA, GET_ORG_DATA } from "../graphql/query";
import {
  ADD_FEEDBACK,
  DELETE_FEEDBACK,
  UPDATE_FEEDBACK,
} from "../graphql/mutation";

const mockEnqueue = jest.fn();

jest.mock("notistack", () => ({
  ...jest.requireActual("notistack"),
  useSnackbar: () => {
    return {
      enqueueSnackbar: mockEnqueue,
    };
  },
}));

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  // fetch patient feedback list query
  _mocks.push({
    request: {
      query: GET_FEEDBACK_DATA,
      variables: {
        status: "active",
        pageNo: 1,
      },
    },
    result: {
      data: {
        getAdminFeedbackList: [
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
          },
        ],
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
  _mocks.push({
    request: {
      query: DELETE_FEEDBACK,
      variables: {
        feedbackId: "12274a23-4932-49b6-9eec-ae7f9f6b804d",
        update: {
          status: "deleted",
        },
      },
    },
    result: {
      data: {
        updateFeedbackQuestionById: {
          _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
          user_id: "e36871a1-9628-4e31-ad44-dd918ee84d83",
          org_id: "e7b5b7c0568b4eacad6f05f11d9c4884",
          session_no: 1,
          question: "test1",
          answer_type: "list",
          status: "deleted",
          created_date: "2022-07-09T15:39:07.173Z",
          answer_options: ["a", "b", "c", "d"],
          feedback_type: "session",
          organization_name: "dev-myhelp",
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
  return { mocks: _mocks };
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <Feedback />
      </SnackbarProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

describe("Admin feedback page", () => {
  // check for admin feedback list
  test("Renders Admin feedback list screen", async () => {
    await sut();
    expect(screen.queryByTestId("tableId")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(2)
    );
    expect(
      screen.queryByTestId("tableColumn_organization_name")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("tableColumn_question")).toBeInTheDocument();
    expect(
      screen.queryByTestId("tableColumn_feedback_type")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("tableColumn_created_date")
    ).toBeInTheDocument();
    expect(screen.queryByTestId("tableColumn_actions")).toBeInTheDocument();
    expect(screen.queryByTestId("tableColumn_session_no")).toBeInTheDocument();
  });

  test("Click add feedback button should open create feedback popup", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("createQuestion"));
    // Check that the dialog is open.
    expect(screen.queryByTestId("bootstrapModal")).toBeVisible();
  });

  test("Click view icon should open view feedback popup", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("viewIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    // Check that the dialog is open.
    expect(screen.getByText("View Question")).toBeInTheDocument();
  });

  test("Click Edit icon should open Edit feedback popup", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("editIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    // Check that the dialog is open.
    expect(screen.getByText("Edit Question")).toBeInTheDocument();
  });

  test("Click save button with data in edit feedback popup", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("editIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    fireEvent.change(screen.getByPlaceholderText("Session Name"), {
      target: { value: "2" },
    });
    fireEvent.submit(screen.queryByTestId("saveButton"));
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(2)
    );
  });

  test("Click Delete icon should open Delete feedback popup", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("deleteIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    expect(screen.getByText("Delete Question")).toBeInTheDocument();
  });

  test("Click Delete button should delete data and load list", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("deleteIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    fireEvent.submit(screen.queryByTestId("saveButton"));
    expect(screen.queryAllByTestId("table-row").length).toBe(2);
  });

  test("Click add feedback button with cancel button", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("createQuestion"));
    fireEvent.click(screen.queryByTestId("addField"));
    fireEvent.click(screen.queryByTestId("cancelButton"));
    await waitFor(() => expect(screen.getByRole("dialog")).not.toBeVisible());
  });

  test("Click add feedback button with cancel button", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("createQuestion"));
    fireEvent.click(screen.queryByTestId("addField"));
    fireEvent.click(screen.queryByTestId("CancelIcon"));
    fireEvent.click(screen.queryByTestId("cancelButton"));
    expect(screen.queryAllByTestId("table-row").length).toBe(2);
  });

  test("Click edit feedback button with saveButton", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("editIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    expect(screen.getByText("Edit Question")).toBeInTheDocument();
    fireEvent.submit(screen.queryByTestId("saveButton"));
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(2)
    );
  });

  test("Click view feedback button with cancelButton", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("viewIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    expect(screen.getByText("View Question")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("cancelButton"));
    await waitFor(() => expect(screen.getByRole("dialog")).not.toBeVisible());
  });

  test("Click delete feedback button with saveButton", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("deleteIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    expect(screen.getByText("Delete Question")).toBeInTheDocument();
    fireEvent.submit(screen.queryByTestId("saveButton"));
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(2)
    );
  });

  test("Click edit feedback button with cancelButton", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("editIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    expect(screen.getByText("Edit Question")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("cancelButton"));
    await waitFor(() => expect(screen.getByRole("dialog")).not.toBeVisible());
  });

  test("Click delete feedback button with cancelButton", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("deleteIcon_12274a23-4932-49b6-9eec-ae7f9f6b804d")
    );
    expect(screen.getByText("Delete Question")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("cancelButton"));
    await waitFor(() => expect(screen.getByRole("dialog")).not.toBeVisible());
  });

  test("Click add feedback button with data", async () => {
    await sut();
    fireEvent.click(screen.queryByTestId("createQuestion"));
    fireEvent.click(screen.queryByTestId("addField"));
    fireEvent.change(screen.getByTestId("answerType"), {
      target: { value: "list" },
    });
    fireEvent.click(screen.getByTestId("answerOptions"));
    fireEvent.change(
      screen.getByPlaceholderText(
        "Add a option by pressing enter after write it"
      ),
      { target: { value: "a,b,c,d" } }
    );
    fireEvent.change(screen.getByPlaceholderText("Feedback Type"), {
      target: { value: "session" },
    });
    fireEvent.change(screen.getByPlaceholderText("Organization Name"), {
      target: { value: "c557283d1b5e4d7abf19625bf268cdf8" },
    });
    fireEvent.change(screen.getByPlaceholderText("Session Name"), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText("Type your Question"), {
      target: { value: "test1" },
    });
    fireEvent.submit(screen.queryByTestId("saveButton"));
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(2)
    );
  });
});
