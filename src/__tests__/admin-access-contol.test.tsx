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
import theme from "../styles/theme/theme";
import { GET_ORGANIZATION_LIST } from "../graphql/query/organization";
import {
  GET_USER_ROLE_LIST,
  ADMIN_UPDATE_USER_ROLE,
} from "../graphql/userRole/graphql";
import AccessControlPage from "../pages/admin/accessControl";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];
// user role list
mocksData.push({
  request: {
    query: GET_USER_ROLE_LIST,
    variables: { limit: 10, pageNo: 1 },
  },
  result: {
    data: {
      getUserRoleList: {
        rolelist: [
          {
            _id: "e95a7f5d-e3d3-4d45-bdf6-1e0d062503e9",
            accessibility: "therapist",
            created_date: "2023-10-19T07:26:03.077Z",
            name: "test3",
            org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
            organization_name: "admin resource draw5",
            position: "tabs",
            updated_date: "2023-10-19T07:26:03.077Z",
            status: 1,
            privileges:
              '{"Goals":["65264f596fc24c909367859c1"],"Assessment":[],"Notes":[],"Homework":[],"Monitors":[],"Safety Plan":[],"Relapse":[],"Library":[],"Resources":[],"Measures":[],"Formulation":[]}',
            __typename: "adminRole",
          },
          {
            _id: "bcade31a-decd-4227-a39c-a455027fed4b",
            accessibility: "admin",
            created_date: "2023-10-19T06:51:29.237Z",
            name: "test5",
            org_id: "df139464-0f74-4532-a489-c87e5b64144e",
            organization_name: "Add org editedkdjnsk",
            position: "sidebar",
            updated_date: "2023-10-19T06:51:29.237Z",
            status: 1,
            privileges:
              '{"Goals":[],"Assessment":["65264f596fc24c909367859c1"],"Notes":[],"Homework":[],"Monitors":[],"Safety Plan":[],"Relapse":[],"Library":[],"Resources":[],"Measures":[],"Formulation":[]}',
            __typename: "adminRole",
          },
          {
            _id: "6b08c57d-dbce-4614-8eae-07805af244ab",
            accessibility: "admin",
            created_date: "2023-10-19T04:19:49.481Z",
            name: "tesusername",
            org_id: "3c4054dc-1888-4af5-8af2-586cadeecf2b",
            organization_name: "orgName",
            position: "sidebar",
            updated_date: "2023-10-19T04:19:49.481Z",
            status: 1,
            privileges:
              '{"Goals":["65264f596fc24c909367859c1"],"Assessment":["65264f596fc24c909367859c9"],"Notes":[],"Homework":[],"Monitors":[],"Safety Plan":[],"Relapse":[],"Library":[],"Resources":[],"Measures":[],"Formulation":[]}',
            __typename: "adminRole",
          },
          {
            _id: "372a1a61-7146-4f32-baf1-c0eefee750b3",
            accessibility: "admin",
            created_date: "2023-10-19T04:19:49.196Z",
            name: "tesusername1",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            organization_name: "portal.dev-myhelp",
            position: "sidebar",
            updated_date: "2023-10-19T04:19:49.196Z",
            status: 1,
            privileges:
              '{"Goals":["65264f596fc24c909367859c1"],"Assessment":["65264f596fc24c909367859c9"],"Notes":[],"Homework":[],"Monitors":[],"Safety Plan":[],"Relapse":[],"Library":[],"Resources":[],"Measures":[],"Formulation":[]}',
            __typename: "adminRole",
          },
          {
            _id: "a7e80173-6053-4be5-b2ac-f2ef861d2e6d",
            accessibility: "therapist",
            created_date: "2023-10-18T13:47:28.365Z",
            name: "test8",
            org_id: "72b6b276ee55481682cb9bf246294faa",
            organization_name: "arti real",
            position: "sidebar",
            updated_date: "2023-10-18T13:47:28.365Z",
            status: 1,
            privileges:
              '{"Library":["65264f596fc24c909367859c1"],"Assessment":[],"Relapse":[],"Safety Plan":[],"Measures":[],"Monitors":[],"Notes":[],"Homework":[],"Goals":[],"Formulation":["65264f596fc24c909367859c1"],"Resources":[]}',
            __typename: "adminRole",
          },
          {
            _id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
            accessibility: "therapist",
            created_date: "2023-10-18T13:47:28.301Z",
            name: "test9",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            organization_name: "portal.dev-myhelp",
            position: "sidebar",
            updated_date: "2023-10-18T13:47:28.301Z",
            status: 1,
            privileges:
              '{"Library":["65264f596fc24c909367859c1"],"Assessment":[],"Relapse":[],"Safety Plan":[],"Measures":[],"Monitors":[],"Notes":[],"Homework":[],"Goals":[],"Formulation":["65264f596fc24c909367859c1"],"Resources":[]}',
            __typename: "adminRole",
          },
        ],
        totalcount: 6,
        __typename: "UserRoleList",
      },
    },
  },
});

//org list
mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
          contract: "Contract",
          created_date: "2022-12-22T06:26:48.828Z",
          logo: "20221228124410__admin_platform_-_preview_template.PNG",
          logo_url: null,
          name: "admin resource draw5",
          panel_color: "3",
          patient: "Pat",
          patient_plural: "Patis",
          patient_welcome_email: "Therapy",
          side_menu_color: "4",
          therapist: "Ther",
          therapy: "Therap",
          __typename: "Organization",
        },
      ],
    },
  },
});

// user role filter by org
mocksData.push({
  request: {
    query: GET_USER_ROLE_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      orgId: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
    },
  },
  result: {
    data: {
      getUserRoleList: {
        rolelist: [
          {
            _id: "e95a7f5d-e3d3-4d45-bdf6-1e0d062503e9",
            accessibility: "therapist",
            created_date: "2023-10-19T07:26:03.077Z",
            name: "test1",
            org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
            organization_name: "admin resource draw5",
            position: "tabs",
            updated_date: "2023-10-19T07:26:03.077Z",
            status: 1,
            privileges:
              '{"Goals":["65264f596fc24c909367859c1"],"Assessment":[],"Notes":[],"Homework":[],"Monitors":[],"Safety Plan":[],"Relapse":[],"Library":[],"Resources":[],"Measures":[],"Formulation":[]}',
            __typename: "adminRole",
          },
          {
            _id: "bcade31a-decd-4227-a39c-a455027fed4b",
            accessibility: "admin",
            created_date: "2023-10-19T06:51:29.237Z",
            name: "test2",
            org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
            organization_name: "admin resource draw5",
            position: "sidebar",
            updated_date: "2023-10-19T06:51:29.237Z",
            status: 1,
            privileges:
              '{"Goals":[],"Assessment":["65264f596fc24c909367859c1"],"Notes":[],"Homework":[],"Monitors":[],"Safety Plan":[],"Relapse":[],"Library":[],"Resources":[],"Measures":[],"Formulation":[]}',
            __typename: "adminRole",
          },
        ],
        totalcount: 6,
        __typename: "UserRoleList",
      },
    },
  },
});

// user role filter by accessibility
mocksData.push({
  request: {
    query: GET_USER_ROLE_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      accessibility: "admin",
    },
  },
  result: {
    data: {
      getUserRoleList: {
        rolelist: [
          {
            _id: "bcade31a-decd-4227-a39c-a455027fed4b",
            accessibility: "admin",
            created_date: "2023-10-19T06:51:29.237Z",
            name: "test88",
            org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
            organization_name: "admin resource draw5",
            position: "sidebar",
            updated_date: "2023-10-19T06:51:29.237Z",
            status: 1,
            privileges:
              '{"Goals":[],"Assessment":["65264f596fc24c909367859c1"],"Notes":[],"Homework":[],"Monitors":[],"Safety Plan":[],"Relapse":[],"Library":[],"Resources":[],"Measures":[],"Formulation":[]}',
            __typename: "adminRole",
          },
        ],
        totalcount: 6,
        __typename: "UserRoleList",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_USER_ROLE,
    variables: {
      role_id: "e95a7f5d-e3d3-4d45-bdf6-1e0d062503e9",
      updateRole: {
        status: 0,
      },
    },
  },
  result: {
    data: {
      updateAdminRoleById: {
        message: "Record has been successfully deleted!",
        result: true,
        role_id: "e95a7f5d-e3d3-4d45-bdf6-1e0d062503e9",
        __typename: "adminRoleUpdate",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AccessControlPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const selectDropDown = async (dropdownTestId) => {
  const selectDropdown = await screen.findByTestId(dropdownTestId);
  expect(selectDropdown).toBeInTheDocument();
  const button = await within(selectDropdown).findByRole("button");
  fireEvent.mouseDown(button);
  const listbox = await within(
    await screen.findByRole("presentation")
  ).findByRole("listbox");
  const options = await within(listbox).findAllByRole("option");
  fireEvent.click(options[1]);
};

describe("Render admin user role list screen", () => {
  it("should filter with org", async () => {
    await sut();
    expect(await screen.findByText("tesusername")).toBeInTheDocument();
    await waitFor(async () => {
      await selectDropDown("organizationSelect");
      expect(screen.getByText("test1")).toBeInTheDocument();
    });
  });

  it("should filter with org and accessibility", async () => {
    await sut();
    await selectDropDown("accessibilitySelect");
    await waitFor(async () => {
      expect(screen.getByText("test88")).toBeInTheDocument();
    });
  });

  it("should delete user role", async () => {
    await sut();
    const deleteBtn = await screen.findByTestId(
      "iconButton_delete_e95a7f5d-e3d3-4d45-bdf6-1e0d062503e9"
    );
    expect(deleteBtn).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    const confirmBtn = await screen.findByTestId("confirmButton");
    expect(confirmBtn).toBeInTheDocument();
    fireEvent.click(confirmBtn);
    expect(
      await screen.findByText("User Role deleted successfully!")
    ).toBeInTheDocument();
  });
});
