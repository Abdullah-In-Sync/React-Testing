import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { GET_ORGANIZATION_LIST } from "../../../graphql/query/organization";
import {
  ADMIN_ADD_USER_ROLE,
  GET_ADMIN_MODULE_LIST,
} from "../../../graphql/userRole/graphql";
import AdminAddUserRole from "../../../pages/admin/userRole/add";
import theme from "../../../styles/theme/theme";
import { useRouter } from "next/router";

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
          contract: "<p>Lorem ipsum, </p>",
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
          {
            _id: "prev3",
            name: "Edit",
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
          {
            _id: "prev3",
            name: "Edit",
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
          {
            _id: "prev3",
            name: "Edit",
            status: 1,
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_ADD_USER_ROLE,
    variables: {
      name: "usertestname",
      org_id: "all",
      accessibility: "admin",
      position: "sidebar",
      privileges:
        '{"moduleId1":["prev2"],"moduleId2":["prev2"],"moduleId3":[]}',
    },
  },
  result: {
    data: {
      adminAddRole: {
        duplicateNames: null,
        message: "User Role added successfully!",
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_ADD_USER_ROLE,
    variables: {
      name: "usertestname",
      org_id: "orgid1",
      accessibility: "admin",
      position: "sidebar",
      privileges:
        '{"moduleId1":["prev1","prev2"],"moduleId2":["prev2"],"moduleId3":[]}',
    },
  },
  result: {
    data: {
      adminAddRole: {
        duplicateNames: [
          {
            _id: "dup1",
            name: "Add org editedkdjnsk",
          },
        ],
        message: "User Role already exists.",
        result: false,
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_ADD_USER_ROLE,
    variables: {
      name: "usertestname",
      org_id: "all",
      accessibility: "admin",
      position: "sidebar",
      privileges: '{"moduleId1":[],"moduleId2":[],"moduleId3":[]}',
    },
  },
  result: {
    data: {
      adminAddRole: null,
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AdminAddUserRole />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const selectDropdownByTestid = async (dropdonwTestid, value?: number) => {
  const selectDropdownSelect = await screen.findByTestId(dropdonwTestid);
  fireEvent.click(selectDropdownSelect);
  expect(selectDropdownSelect).toBeInTheDocument();

  const buttonSelectDropdown = await within(selectDropdownSelect).findByRole(
    "button"
  );
  fireEvent.mouseDown(buttonSelectDropdown);

  const listboxSelect = await within(
    await screen.findByRole("presentation")
  ).findByRole("listbox");
  const optionsSelect = await within(listboxSelect).findAllByRole("option");

  fireEvent.click(optionsSelect[value || 0]);
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
  });
});

describe("Admin add user role", () => {
  it("should render admin module and add user role", async () => {
    await sut();

    fireEvent.change(await screen.findByTestId("userRoleName"), {
      target: { value: "usertestname" },
    });
    await selectDropdownByTestid("accessibilitySelect");
    await selectDropdownByTestid("navPositionSelect");

    await selectDropdownByTestid("organizationSelect");

    fireEvent.click(await screen.findByTestId("moduleId1_prev1_check"));
    fireEvent.click(await screen.findByTestId("moduleId2_prev2_check"));
    fireEvent.click(await screen.findByTestId("moduleId1_prev1_check"));
    fireEvent.click(await screen.findByTestId("submitForm"));
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText("User role added successfully!")
    ).toBeInTheDocument();
  });

  it("should render alerady exist message", async () => {
    await sut();
    fireEvent.change(await screen.findByTestId("userRoleName"), {
      target: { value: "usertestname" },
    });
    await selectDropdownByTestid("accessibilitySelect", 1);
    await selectDropdownByTestid("accessibilitySelect");
    await selectDropdownByTestid("navPositionSelect");
    await selectDropdownByTestid("organizationSelect", 1);
    fireEvent.click(await screen.findByTestId("moduleId1_prev1_check"));
    fireEvent.click(await screen.findByTestId("moduleId2_prev2_check"));
    fireEvent.click(await screen.findByTestId("submitForm"));
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(
      await screen.findByText("User Role already exists.")
    ).toBeInTheDocument();
  });

  it("should render server error", async () => {
    await sut();
    fireEvent.change(await screen.findByTestId("userRoleName"), {
      target: { value: "usertestname" },
    });
    await selectDropdownByTestid("accessibilitySelect");
    await selectDropdownByTestid("navPositionSelect");
    await selectDropdownByTestid("organizationSelect");
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
