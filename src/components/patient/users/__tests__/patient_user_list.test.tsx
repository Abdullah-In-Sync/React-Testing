import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import theme from "../../../../styles/theme/theme";
import PatientUsersListPage from "../../../../pages/patient/users";
import {
  GET_ROLES_ACCESSBILITY,
  PATIENT_CUSTOM_USER_LIST,
} from "../../../../graphql/userRole/graphql";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ROLES_ACCESSBILITY,
  },
  result: {
    data: {
      getRolesbyAccessbility: [
        {
          _id: "roleaccessbilityid1",
          created_date: "2023-10-25T10:27:28.356Z",
          name: "patient",
          accessibility: "patient",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          position: "tabs",
          privileges:
            '{"Safety Plan":["65264f596fc24c909367859c1"],"Measures":[],"Homework":[],"Monitors":[],"Resources":[],"Assessment":["65264f596fc24c909367859c1"],"Library":[],"Goals":["65264f596fc24c909367859c1"],"Notes":[],"Formulation":[],"Relapse":[]}',
          status: 1,
          updated_date: "2023-10-25T10:27:28.356Z",
          __typename: "AdminRole",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_CUSTOM_USER_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      name: "",
    },
  },
  result: {
    data: {
      getCustomUsersList: {
        data: [
          {
            _id: "customeruserid1",
            added_by: "patient",
            last_name: "Nvang",
            role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
            updated_date: "2023-10-25T07:18:24.622Z",
            user_id: "b5860117-3f9f-40a9-8b7f-1a7b69370be5",
            org_detail: {
              _id: "orgid1",
              name: "portal.dev-myhelp",
              patient: "Patient",
            },
            org_id: "orgid1",
            role_detail: {
              _id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
              accessibility: "therapist",
              name: "testn1",
              org_id: "orgid1",
              position: "sidebar",
              privileges:
                '{"Library":["65264f596fc24c909367859c1"],"Assessment":[],"Relapse":[],"Safety Plan":[],"Measures":[],"Monitors":[],"Notes":[],"Homework":[],"Goals":[],"Formulation":["65264f596fc24c909367859c1"],"Resources":[]}',
            },
          },
        ],
        total: 5,
      },
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_CUSTOM_USER_LIST,
    variables: {
      limit: 10,
      name: "plan",
      pageNo: 1,
      roleId: "roleaccessbilityid1",
    },
  },
  result: {
    data: {
      getCustomUsersList: {
        data: [
          {
            _id: "customeruserid1",
            added_by: "patient",
            last_name: "Nvang",
            role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
            updated_date: "2023-10-25T07:18:24.622Z",
            user_id: "b5860117-3f9f-40a9-8b7f-1a7b69370be5",
            org_detail: {
              _id: "orgid1",
              name: "portal.dev-myhelp",
              patient: "Patient",
            },
            org_id: "orgid1",
            role_detail: {
              _id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
              accessibility: "therapist",
              name: "testsearchtext",
              org_id: "orgid1",
              position: "sidebar",
              privileges:
                '{"Library":["65264f596fc24c909367859c1"],"Assessment":[],"Relapse":[],"Safety Plan":[],"Measures":[],"Monitors":[],"Notes":[],"Homework":[],"Goals":[],"Formulation":["65264f596fc24c909367859c1"],"Resources":[]}',
            },
          },
        ],
        total: 5,
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <PatientUsersListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const selectFromOrganizationDropdown = async () => {
  await sut();
  const button = within(await screen.findByTestId("selectRole")).getByRole(
    "button"
  );
  fireEvent.mouseDown(button);

  const listbox = within(screen.getByRole("presentation")).getByRole("listbox");
  const options = await within(listbox).findAllByRole("option");

  fireEvent.click(options[0]);

  const searchInput = screen.getByTestId("searchInput");
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, {
    target: { value: "plan" },
  });
};

describe("Patient user list", () => {
  it("should render admin users list", async () => {
    await sut();
    expect(await screen.findByText(/testn1/i)).toBeInTheDocument();
  });

  it("should render filter admin users list", async () => {
    await selectFromOrganizationDropdown();
    expect(await screen.findByText(/testsearchtext/i)).toBeInTheDocument();
  });
});
