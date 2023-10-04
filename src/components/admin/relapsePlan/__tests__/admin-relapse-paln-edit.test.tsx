import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";

import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import {
  ADMIN_DELETE_RELAPSE_PLAN_QS,
  ADMIN_UPDATE_RELAPSE_BY_ID,
  VIEW_RELAPSE_BY_PLAN_ID,
} from "../../../../graphql/Relapse/graphql";

import EditRelapsePlanPage from "../../../../pages/admin/relapsePlan/edit/[id]";

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
// bb195607-1a1e-4d84-bed8-f6837b39ff1f
mocksData.push({
  request: {
    query: VIEW_RELAPSE_BY_PLAN_ID,
    variables: {
      planId: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
    },
  },
  result: {
    data: {
      adminViewRelapseById: {
        _id: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
        created_date: "2023-03-17T16:53:20.756Z",
        description: "",
        name: "AMAR17THMARCH PLAN2",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        organization_name: "portal.dev-myhelp",
        plan_type: "fixed",
        status: 1,
        updated_date: "2023-03-20T06:00:36.608Z",
        user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        questions: [
          {
            _id: "1a22d7bc-50df-4566-8f5e-dcb010748e41",
            created_date: "2023-03-17T16:53:20.782Z",
            plan_id: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
            relapse_additional_details: "TEXT 1",
            relapse_ques: "QUEST1 TEXT",
            relapse_ques_status: 1,
            relapse_ques_type: "text",
            relapse_ques_typeoption: "",
            updated_date: "2023-03-20T06:00:36.616Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "RelapsePlanQuestions",
          },
          {
            _id: "4041e7d0-81c8-4c64-ac1f-8c4868330401",
            created_date: "2023-03-17T16:53:20.787Z",
            plan_id: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
            relapse_additional_details: "LIST",
            relapse_ques: "QUEST2",
            relapse_ques_status: 1,
            relapse_ques_type: "list",
            relapse_ques_typeoption: "A,B,C",
            updated_date: "2023-03-20T06:00:36.622Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "RelapsePlanQuestions",
          },
          {
            _id: "179bcc29-a4c2-4f55-83c9-a26c5a5347a4",
            created_date: "2023-03-20T06:00:36.628Z",
            plan_id: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
            relapse_additional_details: "SDFSDF",
            relapse_ques: "NEW 3",
            relapse_ques_status: 1,
            relapse_ques_type: "list",
            relapse_ques_typeoption: "option 1,option 2",
            updated_date: "2023-03-20T06:00:36.628Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "RelapsePlanQuestions",
          },
        ],
        __typename: "adminViewRelapse",
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
    query: ADMIN_UPDATE_RELAPSE_BY_ID,
    variables: {
      planId: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
      updatePlan: {
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        description: "",
        name: "AMAR17THMARCH PLAN2",
        plan_type: "fixed",
      },
      questions:
        '[{"questionId":"1a22d7bc-50df-4566-8f5e-dcb010748e41","question":"QUEST1 TEXT","description":"TEXT 1","questionType":"text","questionOption":""},{"questionId":"4041e7d0-81c8-4c64-ac1f-8c4868330401","question":"QUEST2","description":"LIST","questionType":"list","questionOption":"A,B,C"},{"questionId":"179bcc29-a4c2-4f55-83c9-a26c5a5347a4","question":"NEW 3","description":"SDFSDF","questionType":"list","questionOption":"option 1,option 2"}]',
    },
  },
  result: {
    data: {
      adminUpdateRelapseById: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_DELETE_RELAPSE_PLAN_QS,
    variables: {
      questionId: "1a22d7bc-50df-4566-8f5e-dcb010748e41",
    },
  },
  result: {
    data: {
      adminDeleteSafetyPlanQs: {
        _id: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
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
          <EditRelapsePlanPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin safety plan list", () => {
  it("should render admin create relapse plan page and submit the form", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
      },
      push: pushMock,
    });
    await sut();
    const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
    expect(dropdownSelect).toBeInTheDocument();

    const loadedText = await screen.findByText(/SDFSDF/i);
    expect(loadedText).toBeInTheDocument();

    // await submitForm();

    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
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
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "bb195607-1a1e-4d84-bed8-f6837b39ff1f",
      },
      push: pushMock,
    });
    await sut();
    const deleteIconButton = await screen.findByTestId("iconButtonQuestion_0");
    fireEvent.click(deleteIconButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });

    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    const aloadedText = await screen.findByText(
      /Question has been deleted successfully./i
    );
    expect(aloadedText).toBeInTheDocument();
  });
});
