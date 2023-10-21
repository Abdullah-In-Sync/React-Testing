import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { useRouter } from "next/router";
import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import {
  ADMIN_UPDATE_USER_ROLE,
  ADMIN_VIEW_ROLE,
  GET_ADMIN_MODULE_LIST,
} from "../../../graphql/userRole/graphql";
import AdminEditUserRole from "../../../pages/admin/userRole/edit/[id]";
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
      accessibility: "admin",
    },
  },
  result: {
    data: {
      getAdminModuleList: {
        modulelist: [
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
        privileges: [
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
        name: "testupdate",
        position: "sidebar",
        privileges:
          '{"Library":["prev1"],"Assessment":["prev2"],"Notes":["prev1"]}',
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_USER_ROLE,
    variables: {
      role_id: "roleid1",
      updateRole: {
        name: "testupdate",
        org_id: "orgid1",
        accessibility: "therapist",
        position: "sidebar",
        privileges:
          '{"Library":["prev1"],"Assessment":["prev2"],"Notes":["prev1"]}',
      },
    },
  },
  result: {
    data: {
      updateAdminRoleById: {
        message: "User Role added successfully!",
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_USER_ROLE,
    variables: {
      role_id: "roleid1",
      updateRole: {
        name: "testupdateerror",
        org_id: "orgid1",
        accessibility: "therapist",
        position: "sidebar",
        privileges:
          '{"Library":["prev1"],"Assessment":["prev2"],"Notes":["prev1"]}',
      },
    },
  },
  result: {
    data: {
      updateAdminRoleById: {
        message: "Error message!",
        result: false,
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_USER_ROLE,
    variables: {
      role_id: "roleid1",
      updateRole: {
        name: "servererror",
        org_id: "orgid1",
        accessibility: "therapist",
        position: "sidebar",
        privileges:
          '{"Library":["prev1"],"Assessment":["prev2"],"Notes":["prev1"]}',
      },
    },
  },
  result: {
    data: {
      updateAdminRoleById: null,
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AdminEditUserRole />
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

describe("Admin update user role", () => {
  it("should render error message", async () => {
    await sut();

    fireEvent.change(await screen.findByTestId("userRoleName"), {
      target: { value: "testupdateerror" },
    });

    fireEvent.click(await screen.findByTestId("submitForm"));
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(await screen.findByText("Error message!")).toBeInTheDocument();
  });

  it("should render admin module and update user role", async () => {
    await sut();
    fireEvent.click(await screen.findByTestId("submitForm"));
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText("User role updated successfully!")
    ).toBeInTheDocument();
  });

  it("should render server error", async () => {
    await sut();
    fireEvent.change(await screen.findByTestId("userRoleName"), {
      target: { value: "servererror" },
    });

    fireEvent.click(await screen.findByTestId("submitForm"));
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText("Server error please try later.")
    ).toBeInTheDocument();
  });

  it("when cancel button press", async () => {
    await sut();
    const cancelButton = await screen.findByTestId("cancelForm");
    fireEvent.click(cancelButton);
    const confirmButton = screen.getByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    expect(pushMock).toBeCalledWith("/admin/accessControl");
  });
});
