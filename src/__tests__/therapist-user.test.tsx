import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import TherapistUserMain from "../pages/therapist/userList";
import {
  ADD_THERAPIST_ADD_USER,
  GET_ROLE_LIST,
  GET_THERAPIST_USER_LIST,
  GET_USER_DATA_BY_ID,
  THERAPIST_EDIT_USER,
} from "../graphql/customerUsers/graphql";

const mocksData = [];

// Mock here roles dropdown data
mocksData.push({
  request: {
    query: GET_ROLE_LIST,
    variables: { org_id: undefined },
  },
  result: {
    data: {
      getRolesbyAccessbility: [
        {
          _id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
          accessibility: "therapist",
          created_date: "2023-10-18T13:47:28.301Z",
          name: "testn1",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          position: "sidebar",
          privileges:
            '{"Library":["65264f596fc24c909367859c1"],"Assessment":[],"Relapse":[],"Safety Plan":[],"Measures":[],"Monitors":[],"Notes":[],"Homework":[],"Goals":[],"Formulation":["65264f596fc24c909367859c1"],"Resources":[]}',
          status: 1,
          updated_date: "2023-10-20T17:36:31.984Z",
          __typename: "AdminRole",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_USER_LIST,
    variables: {
      org_id: undefined,
      limit: 10,
      page_no: 1,
      name: undefined,
      role_id: "",
    },
  },
  result: {
    data: {
      getCustomUsersList: {
        total: 11,
        data: [
          {
            _id: "d2f84b2a-845f-4abc-8ab6-aa3107c58514",
            first_name: "scs10",
            last_name: "cs",
            role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
            role_detail: {
              name: "testn1",
              __typename: "AdminRole",
            },
            __typename: "CustomUser",
          },
          {
            _id: "f9e4b2a6-9dc6-4466-aa38-6555d2b38133",
            first_name: "scs9",
            last_name: "cs",
            role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
            role_detail: {
              name: "testn1",
              __typename: "AdminRole",
            },
            __typename: "CustomUser",
          },
          {
            _id: "f01c6733-8df5-43bb-ad4d-b46374cc4d5e",
            first_name: "Nvang",
            last_name: "Nvang",
            role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
            role_detail: {
              name: "testn1",
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

mocksData.push({
  request: {
    query: GET_THERAPIST_USER_LIST,
    variables: {
      org_id: undefined,
      limit: 10,
      page_no: 1,
      name: undefined,
      role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
    },
  },
  result: {
    data: {
      getCustomUsersList: {
        total: 1,
        data: [
          {
            _id: "d2f84b2a-845f-4abc-8ab6-aa3107c58514",
            first_name: "scs10",
            last_name: "cs",
            role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
            role_detail: {
              name: "testn1",
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

mocksData.push({
  request: {
    query: GET_THERAPIST_USER_LIST,
    variables: {
      org_id: undefined,
      limit: 10,
      page_no: 1,
      name: "mega name",
      role_id: "",
    },
  },
  result: {
    data: {
      getCustomUsersList: {
        total: 1,
        data: [
          {
            _id: "d2f84b2a-845f-4abc-8ab6-aa3107c58514",
            first_name: "mega name",
            last_name: "cs",
            role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
            role_detail: {
              name: "testn1",
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

mocksData.push({
  request: {
    query: ADD_THERAPIST_ADD_USER,
    variables: {
      first_name: "first",
      last_name: "last",
      email: "email@gmail.com",
      role_id: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a",
      org_id: undefined,
      phone_no: "+444323334234",
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

mocksData.push({
  request: {
    query: GET_USER_DATA_BY_ID,
    variables: { custom_user_id: "d2f84b2a-845f-4abc-8ab6-aa3107c58514" },
  },
  result: {
    data: {
      getCustomUserById: {
        _id: "aa9f8005-f555-4747-81d5-c520f6ac14b9",
        added_by: "therapist",
        created_by: "dbdd2446-093c-4ec4-abc9-df275634a817",
        created_date: "2023-10-27T07:17:53.390Z",
        email_id: null,
        first_name: "scs10",
        last_name: "Name",
        phone_no: "+444323334231",
        __typename: "CustomUser",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_EDIT_USER,
    variables: {
      custom_user_id: "d2f84b2a-845f-4abc-8ab6-aa3107c58514",
      update: { first_name: "change name", last_name: "Name" },
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
          <TherapistUserMain />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist user list", () => {
  it("User list", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByText("scs10")).toBeInTheDocument();
    });
  });

  it("User list role filter", async () => {
    await sut();
    await waitFor(async () => {
      fireEvent.change(screen.queryByTestId("select_role"), {
        target: { value: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a" },
      });

      expect(screen.getByText("scs10")).toBeInTheDocument();
    });
  });

  it("User list search with name", async () => {
    await sut();
    await waitFor(async () => {
      const searchInput = screen.getByTestId("searchInput");
      expect(searchInput).toBeInTheDocument();

      fireEvent.change(searchInput, {
        target: { value: "mega name" },
      });

      expect(screen.getByText("mega name")).toBeInTheDocument();
    });
  });

  it("Add user", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("addPlanButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("addPlanButton"));
      expect(screen.getByTestId("first_name")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("first_name"), {
        target: { value: "first" },
      });

      fireEvent.change(screen.queryByTestId("last_name"), {
        target: { value: "last" },
      });
      fireEvent.change(screen.queryByTestId("email"), {
        target: { value: "email@gmail.com" },
      });
      fireEvent.change(screen.queryByTestId("phone"), {
        target: { value: "+444323334234" },
      });

      fireEvent.change(screen.queryByTestId("select_roledsd"), {
        target: { value: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a" },
      });
      await expect(
        screen.queryByTestId("select_roledsd").getAttribute("value")
      ).toBe("dd25567c-4b33-4e08-9d78-9bebd9f37b9a");

      expect(screen.getByTestId("role-add-form")).toBeInTheDocument();

      fireEvent.click(screen.queryByText("Save"));

      expect(screen.queryByTestId("confirmButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(screen.getByText("User added Successfully!")).toBeInTheDocument();
    });
  });

  it("To see the pre filled data before edit", async () => {
    await sut();

    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "iconButton_edit_d2f84b2a-845f-4abc-8ab6-aa3107c58514"
        )
      ).toBeInTheDocument();
      fireEvent.click(
        screen.queryByTestId(
          "iconButton_edit_d2f84b2a-845f-4abc-8ab6-aa3107c58514"
        )
      );
      await expect(screen.getByTestId("first_name")).toBeInTheDocument();

      expect(screen.getByTestId("first_name")).toHaveValue("scs10");
    });
  });

  it("Edit user", async () => {
    await sut();

    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "iconButton_edit_d2f84b2a-845f-4abc-8ab6-aa3107c58514"
        )
      ).toBeInTheDocument();
      fireEvent.click(
        screen.queryByTestId(
          "iconButton_edit_d2f84b2a-845f-4abc-8ab6-aa3107c58514"
        )
      );
      await expect(screen.getByTestId("first_name")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("first_name"), {
        target: { value: "change name" },
      });

      expect(screen.getByTestId("role-add-form")).toBeInTheDocument();

      fireEvent.click(screen.queryByText("Update"));

      expect(screen.queryByTestId("confirmButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(screen.getByText("User edit Successfully!")).toBeInTheDocument();
    });
  });
});
