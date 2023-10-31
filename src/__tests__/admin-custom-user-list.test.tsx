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
import CustomUserListPage from "../pages/admin/customUsers";
import { GET_CUSTOM_USERS_LIST } from "../graphql/customUsers/graphql";
import {
  ADD_THERAPIST_ADD_USER,
  GET_ROLE_LIST,
} from "../graphql/customerUsers/graphql";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];
// user role list
mocksData.push({
  request: {
    query: GET_CUSTOM_USERS_LIST,
    variables: { limit: 10, pageNo: 1 },
  },
  result: {
    data: {
      getCustomUsersList: {
        total: 2,
        data: [
          {
            _id: "50baaa6a-5cd9-4941-9395-b7152a12b432",
            first_name: "firstNvang",
            last_name: "LastNvang",
            role_detail: {
              _id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
              name: "testn1",
              organization_name: "admin resource draw5",
              status: 1,
              __typename: "AdminRole",
            },
            __typename: "CustomUser",
          },
          {
            _id: "7c7dc511-c086-4cf1-ac79-09773416a29e",
            first_name: "firstNiixon",
            last_name: "lastVakng",
            role_detail: {
              _id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
              name: "testn1",
              organization_name: null,
              status: 1,
              __typename: "AdminRole",
            },
            __typename: "CustomUser",
          },
        ],
        __typename: "CustomUserList",
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

// search users
mocksData.push({
  request: {
    query: GET_CUSTOM_USERS_LIST,
    variables: {
      limit: 10,
      searchText: "nii",
      pageNo: 1,
    },
  },
  result: {
    data: {
      getCustomUsersList: {
        total: 1,
        data: [
          {
            _id: "7c7dc511-c086-4cf1-ac79-09773416a29e",
            first_name: "Niixon",
            last_name: "test by search",
            role_detail: {
              _id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
              name: "testn1",
              organization_name: null,
              status: 1,
              __typename: "AdminRole",
            },
            __typename: "CustomUser",
          },
        ],
        __typename: "CustomUserList",
      },
    },
  },
});

// user role filter by org
mocksData.push({
  request: {
    query: GET_CUSTOM_USERS_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      orgId: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
    },
  },
  result: {
    data: {
      getCustomUsersList: {
        total: 1,
        data: [
          {
            _id: "50baaa6a-5cd9-4941-9395-b7152a12b432",
            first_name: "Nvang",
            last_name: "filter by org",
            role_detail: {
              _id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
              name: "testn1",
              organization_name: "admin resource draw5",
              status: 1,
              __typename: "AdminRole",
            },
            __typename: "CustomUser",
          },
        ],
        __typename: "CustomUserList",
      },
    },
  },
});

// role dropdown for add user
mocksData.push({
  request: {
    query: GET_ROLE_LIST,
    variables: {
      org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
    },
  },
  result: {
    data: {
      getRolesbyAccessbility: [
        {
          _id: "372a1a61-7146-4f32-baf1-c0eefee750b3",
          accessibility: "admin",
          created_date: "2023-10-19T04:19:49.196Z",
          name: "tesusername",
          org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
          organization_name: null,
          position: "sidebar",
          privileges:
            '{"Goals":["65264f596fc24c909367859c1"],"Assessment":["65264f596fc24c909367859c9"],"Notes":[],"Homework":[],"Monitors":[],"Safety Plan":[],"Relapse":[],"Library":[],"Resources":[],"Measures":[],"Formulation":[]}',
          status: 1,
          updated_date: "2023-10-19T04:19:49.196Z",
          __typename: "AdminRole",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ADD_THERAPIST_ADD_USER,
    variables: {
      first_name: "first-name-1",
      last_name: "last-name-1",
      email: "firstLast@mail.com",
      role_id: "372a1a61-7146-4f32-baf1-c0eefee750b3",
      org_id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
      phone_no: "+441212121212",
    },
  },
  result: {
    data: {
      addCustomUser: {
        message: "User created successfully",
        result: true,
        __typename: "result",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <CustomUserListPage />
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

describe("Render admin custom users list screen", () => {
  it("should filter with org", async () => {
    await sut();
    expect(await screen.findByText("firstNvang")).toBeInTheDocument();
    await waitFor(async () => {
      await selectDropDown("organizationSelect");
      expect(screen.getByText("filter by org")).toBeInTheDocument();
    });
  });

  it("should search custom users base on search", async () => {
    await sut();
    await waitFor(async () => {
      const searchInput = screen.getByTestId("searchInput");
      expect(searchInput).toBeInTheDocument();

      fireEvent.change(searchInput, {
        target: { value: "nii" },
      });

      expect(screen.getByText("test by search")).toBeInTheDocument();
    });
  });

  it("Add user", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("addUserRoleButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("addUserRoleButton"));
      expect(screen.getByTestId("first_name")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("first_name"), {
        target: { value: "first-name-1" },
      });

      fireEvent.change(screen.queryByTestId("last_name"), {
        target: { value: "last-name-1" },
      });
      fireEvent.change(screen.queryByTestId("email"), {
        target: { value: "firstLast@mail.com" },
      });
      fireEvent.change(screen.queryByTestId("phone"), {
        target: { value: "+441212121212" },
      });

      fireEvent.change(screen.queryByTestId("select_org"), {
        target: { value: "d1f2bbd3-3388-4ca2-9d68-55b95574a269" },
      });
      await expect(
        screen.queryByTestId("select_org").getAttribute("value")
      ).toBe("d1f2bbd3-3388-4ca2-9d68-55b95574a269");

      fireEvent.change(screen.queryByTestId("select_role_dropdown"), {
        target: { value: "372a1a61-7146-4f32-baf1-c0eefee750b3" },
      });
      await expect(
        screen.queryByTestId("select_role_dropdown").getAttribute("value")
      ).toBe("372a1a61-7146-4f32-baf1-c0eefee750b3");

      expect(screen.getByTestId("role-add-form")).toBeInTheDocument();

      fireEvent.click(screen.queryByText("Save"));

      expect(screen.queryByTestId("confirmButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(screen.getByText("User added Successfully!")).toBeInTheDocument();
    });
  });
});
