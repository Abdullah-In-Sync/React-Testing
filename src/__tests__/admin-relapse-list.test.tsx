import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { GET_ORGANIZATION_LIST } from "../graphql/query/organization";
import { GET_RELAPSE_PLAN_LIST } from "../graphql/SafetyPlan/graphql";
import theme from "../styles/theme/theme";
import RelapsePlanPage from "../pages/admin/relapsePlan";

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
          _id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
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
    query: GET_RELAPSE_PLAN_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
    },
  },
  result: {
    data: {
      adminRelapsePlanList: {
        data: [
          {
            _id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
            created_date: "2023-03-01T11:48:30.945Z",
            description: "testing plan",
            name: "Dev Relapse plan",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            organization_name: "portal.dev-myhelp",
            plan_type: "fixed",
            status: 1,
            updated_date: "2023-03-01T11:48:30.945Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
        ],
        total: 1,
        __typename: "AdminRelapsePlansList",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_RELAPSE_PLAN_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      orgId: "73ccaf14b7cb4a5a9f9cf7534b358c51",
    },
  },
  result: {
    data: {
      adminRelapsePlanList: {
        data: [
          {
            _id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
            created_date: "2023-03-01T11:48:30.945Z",
            description: "testing plan",
            name: "Dev Relapse plan",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            organization_name: "portal.dev-myhelp",
            plan_type: "fixed",
            status: 1,
            updated_date: "2023-03-01T11:48:30.945Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
        ],
        total: 1,
        __typename: "AdminRelapsePlansList",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_RELAPSE_PLAN_LIST,
    variables: {
      limit: 10,
      searchText: "plan",
      pageNo: 1,
    },
  },
  result: {
    data: {
      adminRelapsePlanList: {
        data: [
          {
            _id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
            created_date: "2023-03-01T11:48:30.945Z",
            description: "testing plan",
            name: "Dev Relapse plan",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            organization_name: "portal.dev-myhelp",
            plan_type: "fixed",
            status: 1,
            updated_date: "2023-03-01T11:48:30.945Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
        ],
        total: 1,
        __typename: "AdminRelapsePlansList",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_RELAPSE_PLAN_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      planType: "fixed",
    },
  },
  result: {
    data: {
      adminRelapsePlanList: {
        data: [
          {
            _id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
            created_date: "2023-03-01T11:48:30.945Z",
            description: "testing plan",
            name: "Dev Relapse plan",
            org_id: "73ccaf14b7cb4a5a9f9cf7534b358c51",
            organization_name: "portal.dev-myhelp",
            plan_type: "fixed",
            status: 1,
            updated_date: "2023-03-01T11:48:30.945Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
        ],
        total: 1,
        __typename: "AdminRelapsePlansList",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <RelapsePlanPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

it("should render relapse plan data", async () => {
  await sut();
  await waitFor(async () => {
    expect(screen.getByText("Dev Relapse plan")).toBeInTheDocument();
  });
});

it("should search base on the search", async () => {
  await sut();
  await waitFor(async () => {
    const searchInput = screen.getByTestId("searchInput");
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: { value: "plan" },
    });

    expect(screen.getByText("Plan Name")).toBeInTheDocument();
  });
});

it("should change the plane type", async () => {
  await sut();
  await waitFor(async () => {
    const planTypeSelect = screen.getByTestId("planTypeSelect");

    const buttonPlanTypeSelect = within(planTypeSelect).getByRole("button");
    fireEvent.mouseDown(buttonPlanTypeSelect);

    const listboxPlanTypeSelect = within(
      screen.getByRole("presentation")
    ).getByRole("listbox");

    const optionsPlanTypeSelect = within(listboxPlanTypeSelect).getAllByRole(
      "option"
    );

    fireEvent.click(optionsPlanTypeSelect[1]);

    expect(screen.getByText("Plan Name")).toBeInTheDocument();
  });
});

it("should organization dropdown in the document type", async () => {
  await sut();
  await waitFor(async () => {
    const selectOrganization = screen.getByTestId("organizationSelect");
    expect(selectOrganization).toBeInTheDocument();
  });
});
