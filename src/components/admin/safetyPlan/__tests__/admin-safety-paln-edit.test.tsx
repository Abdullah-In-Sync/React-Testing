import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";

import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import {
  DELETE_SAFETY_PLAN_QUESTION,
  GET_SAFETY_PLAN_BY_ID,
  UPDATE_SAFETY_PLAN,
} from "../../../../graphql/SafetyPlan/graphql";

import EditSafetyPlanPage from "../../../../pages/admin/safetyPlan/edit/[id]";

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
    query: GET_SAFETY_PLAN_BY_ID,
    variables: {
      planId: "db9c7316-f406-4c2a-8da0-340e8c1fe465",
    },
  },
  result: {
    data: {
      viewSafetyPlanById: {
        _id: "db9c7316-f406-4c2a-8da0-340e8c1fe465",
        created_date: "2023-01-27T05:35:37.978Z",
        description: "no quesiton des",
        name: "no question",
        org_id: "2301536c4d674b3598814174d8f19593",
        status: 1,
        plan_type: "fixed",
        updated_date: "2023-01-27T07:37:29.662Z",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        questions: [
          {
            _id: "b769e78f-9c6e-4496-94e6-e672ec303d23",
            created_date: "2023-01-27T05:43:48.397Z",
            plan_id: "db9c7316-f406-4c2a-8da0-340e8c1fe465",
            safety_additional_details: "test some",
            safety_ques: "new",
            safety_ques_status: 1,
            safety_ques_type: "2",
            safety_ques_typeoption: "some,test",
            updated_date: "2023-01-27T07:37:29.693Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "SafetyPlanQuestions",
          },
        ],
        __typename: "viewMasterSafetyPlan",
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
    query: UPDATE_SAFETY_PLAN,
    variables: {
      planId: "db9c7316-f406-4c2a-8da0-340e8c1fe465",
      updatePlan: {
        org_id: "2301536c4d674b3598814174d8f19593",
        description: "no quesiton des",
        name: "no question",
        plan_type: "fixed",
      },
      questions:
        '[{"questionId":"b769e78f-9c6e-4496-94e6-e672ec303d23","question":"new","description":"test some","questionType":"2","questionOption":"some,test"}]',
    },
  },
  result: {
    data: {
      createSafetyPlan: {
        result: true,
        __typename: "result",
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
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <EditSafetyPlanPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin safety plan list", () => {
  it("should render admin create safety plan page and submit the form", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "db9c7316-f406-4c2a-8da0-340e8c1fe465",
      },
      push: pushMock,
    });
    await sut();
    const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
    expect(dropdownSelect).toBeInTheDocument();

    const loadedText = await screen.findByText(/no quesiton des/i);
    expect(loadedText).toBeInTheDocument();

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
    // await fillUpperForm();
    const cancelButton = await screen.findByTestId("cancelForm");
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });

    expect(confirmButton).toBeInTheDocument();
  });

  it("should render admin cancel the submition", async () => {
    await sut();
    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const cancelButton = await screen.findByTestId("cancelButton");
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });

  it("should remove question box on press of delete confirm", async () => {
    await sut();
    const loadedText = await screen.findByText(/test some/i);
    expect(loadedText).toBeInTheDocument();
    const deleteIconButton = await screen.findByTestId("iconButtonQuestion_0");
    fireEvent.click(deleteIconButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });

    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    const aloadedText = await screen.findByText(
      /Question successfully deleted./i
    );
    expect(aloadedText).toBeInTheDocument();
  });
});
