import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { useRouter } from "next/router";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import {
  ADMIN_VIEW_ROLE,
  GET_ADMIN_MODULE_LIST,
} from "../../../graphql/userRole/graphql";
import AdminViewUserRole from "../../../pages/admin/userRole/view/[id]";
import theme from "../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const pushMock = jest.fn();

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "orgid1",
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
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_ADMIN_MODULE_LIST,
    variables: {
      accessibility: "",
    },
  },
  result: {
    data: {
      getAdminModuleList: {
        admin_modulelist: [
          {
            _id: "moduleId1",
            accessibility: ["admin", "therapist"],
            name: "Library",
            privileges: ["prev1", "prev2"],
            status: 1,
          },
          {
            _id: "moduleId2",
            accessibility: ["admin", "therapist", "patient"],
            name: "Assessment",
            privileges: ["prev1", "prev2"],
            status: 1,
          },
          {
            _id: "moduleId3",
            accessibility: ["admin", "therapist", "patient"],
            name: "Notes",
            privileges: ["prev2"],
            status: 1,
          },
        ],
        admin_privileges: [
          {
            _id: "prev1",
            name: "Add",
            status: 1,
          },
          {
            _id: "prev2",
            name: "View",
            status: 1,
          },
        ],
        patient_modulelist: [
          {
            _id: "moduleId1",
            accessibility: ["admin", "therapist"],
            name: "Library",
            privileges: ["prev1", "prev2"],
            status: 1,
          },
          {
            _id: "moduleId2",
            accessibility: ["admin", "therapist", "patient"],
            name: "Assessment",
            privileges: ["prev1", "prev2"],
            status: 1,
          },
          {
            _id: "moduleId3",
            accessibility: ["admin", "therapist", "patient"],
            name: "Notes",
            privileges: ["prev2"],
            status: 1,
          },
        ],
        patient_privileges: [
          {
            _id: "prev1",
            name: "Add",
            status: 1,
          },
          {
            _id: "prev2",
            name: "View",
            status: 1,
          },
        ],
        therapist_modulelist: [
          {
            _id: "moduleId1",
            accessibility: ["admin", "therapist"],
            name: "Library",
            privileges: ["prev1", "prev2"],
            status: 1,
          },
          {
            _id: "moduleId2",
            accessibility: ["admin", "therapist", "patient"],
            name: "Assessment",
            privileges: ["prev1", "prev2"],
            status: 1,
          },
          {
            _id: "moduleId3",
            accessibility: ["admin", "therapist", "patient"],
            name: "Notes",
            privileges: ["prev2"],
            status: 1,
          },
        ],
        therapist_privileges: [
          {
            _id: "prev1",
            name: "Add",
            status: 1,
          },
          {
            _id: "prev2",
            name: "View",
            status: 1,
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_VIEW_ROLE,
    variables: {
      role_id: "roleid1",
    },
  },
  result: {
    data: {
      adminViewRole: {
        _id: "roleid1",
        accessibility: "therapist",
        org_id: "orgid1",
        name: "testviewname",
        position: "sidebar",
        privileges:
          '{"Library":["prev1"],"Assessment":["prev2"],"Notes":["prev1"]}',
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AdminViewUserRole />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "roleid1",
    },
    push: pushMock,
  });
});

describe("Admin view user role", () => {
  it("should render user data", async () => {
    await sut();
    expect(await screen.findByTestId("userRoleName")).toBeInTheDocument();
  });
});
