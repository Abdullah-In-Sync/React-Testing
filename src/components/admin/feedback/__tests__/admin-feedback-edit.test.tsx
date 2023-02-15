import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import {
  DELETE_FEEDBACK_QUESTION_BY_ADMIN,
  EDIT_FEEDBACK_BY_ADMIN,
  VIEW_FEEDBACK_BY_ID,
} from "../../../../graphql/Feedback/graphql";

import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { DELETE_SAFETY_PLAN_QUESTION } from "../../../../graphql/SafetyPlan/graphql";
import EditFeedbackPage from "../../../../pages/admin/feedback/edit/[id]";

import theme from "../../../../styles/theme/theme";
const pushMock = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "2301536c4d674b3598814174d8f19593",
          contract:
            "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>",
          created_date: "2022-12-05T09:47:11.000Z",
          logo: "",
          logo_url: null,
          name: "actions.dev-myhelp",
          panel_color: "#6ec9db",
          patient: "Patient",
          patient_plural: "Patients",
          side_menu_color: "#6ec9db",
          therapist: "Therapist",
          therapy: "Therapy",
          __typename: "Organization",
        },
      ],
    },
  },
});
// db9c7316-f406-4c2a-8da0-340e8c1fe465
mocksData.push({
  request: {
    query: VIEW_FEEDBACK_BY_ID,
    variables: {
      feedbackId: "36f94dd4-8d52-42ad-b502-a0b23e66f5b0",
    },
  },
  result: {
    data: {
      viewFeedbackByAdmin: {
        _id: "36f94dd4-8d52-42ad-b502-a0b23e66f5b0",
        created_date: "2023-02-10T05:16:44.401Z",
        description: "sdfdsf",
        feedback_type: "therapist",
        name: "Test",
        org_id: "4c784f6c-b5f4-4539-88b4-64a3ee044c18",
        organization_name: "admin org",
        session_no: "1",
        status: 1,
        updated_date: "2023-02-10T05:16:44.401Z",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        visibility: 1,
        questions: [
          {
            _id: "5ebf36c1-2010-4f3c-bebe-e7c406a08d7a",
            answer_options: "Test1,test2",
            answer_type: "2",
            created_date: "2023-02-10T05:16:44.406Z",
            feedback_id: "36f94dd4-8d52-42ad-b502-a0b23e66f5b0",
            question: "sdfdsf",
            status: "active",
            updated_date: "2023-02-10T05:16:44.406Z",
            answer: null,
            __typename: "FeedbackQuestions",
          },
        ],
        __typename: "Feedback",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "2301536c4d674b3598814174d8f19593",
          contract:
            "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>",
          created_date: "2022-12-05T09:47:11.000Z",
          logo: "",
          logo_url: null,
          name: "actions.dev-myhelp",
          panel_color: "#6ec9db",
          patient: "Patient",
          patient_plural: "Patients",
          side_menu_color: "#6ec9db",
          therapist: "Therapist",
          therapy: "Therapy",
          __typename: "Organization",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: DELETE_FEEDBACK_QUESTION_BY_ADMIN,
    variables: { questionId: "5ebf36c1-2010-4f3c-bebe-e7c406a08d7a" },
  },
  result: {
    data: {
      deleteFeedbackQuesByAdmin: {
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: EDIT_FEEDBACK_BY_ADMIN,
    variables: {
      feedbackId: "36f94dd4-8d52-42ad-b502-a0b23e66f5b0",
      feedBackName: "Test",
      feedBackDesc: "sdfdsf",
      feedQuesData:
        '[{"questionId":"5ebf36c1-2010-4f3c-bebe-e7c406a08d7a","question":"sdfdsf","answerType":"2","answerOptions":"Test1,test2"}]',
    },
  },
  result: {
    data: {
      editFeedbackByAdmin: {
        _id: "36f94dd4-8d52-42ad-b502-a0b23e66f5b0",
        __typename: "Feedback",
      },
    },
  },
});

mocksData.push({
  request: {
    query: DELETE_SAFETY_PLAN_QUESTION,
    variables: {
      questionId: "b769e78f-9c6e-4496-94e6-e672ec303d23",
    },
  },
  result: {
    data: {
      adminDeleteSafetyPlanQs: {
        _id: "db9c7316-f406-4c2a-8da0-340e8c1fe465",
        __typename: "viewMasterSafetyPlan",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <EditFeedbackPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin feedback edit", () => {
  it("should render admin edit feedback page and submit the form", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "36f94dd4-8d52-42ad-b502-a0b23e66f5b0",
      },
      push: pushMock,
    });
    await sut();
    const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
    expect(dropdownSelect).toBeInTheDocument();

    // await submitForm();

    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("when cancel button press", async () => {
    await sut();
    const cancelButton = await screen.findByTestId("cancelForm");
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });

    expect(confirmButton).toBeInTheDocument();
  });

  it("should render admin cancel the submission", async () => {
    await sut();
    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const cancelButton = await screen.findByTestId("cancelButton");
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });

  it("should remove question box on press of delete confirm", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "36f94dd4-8d52-42ad-b502-a0b23e66f5b0",
      },
      push: pushMock,
    });
    await sut();
    const deleteIconButton = await screen.findByTestId("iconButton_0");
    fireEvent.click(deleteIconButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });

    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    waitForElementToBeRemoved(async () => screen.queryByTestId("iconButton_0"));
  });
});
