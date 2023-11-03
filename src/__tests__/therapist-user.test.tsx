import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import TherapistUserMain from "../pages/therapist/userList";
import {
  ADD_THERAPIST_ADD_USER,
  GET_ROLE_LIST,
  GET_THERAPIST_USER_LIST,
  GET_USER_DATA_BY_ID,
  THERAPIST_EDIT_USER,
  THERAPIST_TAG_USER,
} from "../graphql/customerUsers/graphql";
import { GET_PATIENT_SHARED_LIST } from "../graphql/formulation/graphql";

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
          name: "testn1",
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
        email: null,
        first_name: "scs10",
        last_name: "Name",
        phone_no: "+444323334231",
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

mocksData.push({
  request: {
    query: GET_PATIENT_SHARED_LIST,
    variables: {
      name: "d2f84b2a-845f-4abc-8ab6-aa3107c58514",
      share_type: "customusers",
    },
  },
  result: {
    data: {
      getPatientSharedList: [
        {
          _id: "c23c9f27c6d94696bf6b86db389dc8de",
          is_shared: false,
          patient_firstname: "Ben",
          patient_lastname: "Stock",
          __typename: "SharePatientList",
        },
        {
          _id: "f0f426ffb1344c35b728f88ca9651e5a",
          is_shared: false,
          patient_firstname: "Ben s",
          patient_lastname: "smith",
          __typename: "SharePatientList",
        },
        {
          _id: "ee597ffa07cd43a8af1741dbe7c17b45",
          is_shared: false,
          patient_firstname: "Biku",
          patient_lastname: "Matree",
          __typename: "SharePatientList",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_TAG_USER,
    variables: {
      patient_id: "c23c9f27c6d94696bf6b86db389dc8de",
      custom_user_id: "d2f84b2a-845f-4abc-8ab6-aa3107c58514",
    },
  },
  result: {
    data: {
      tagCustomUser: {
        message: "User tagged successfully",
        result: true,
        __typename: "result",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_EDIT_USER,
    variables: {
      custom_user_id: "d2f84b2a-845f-4abc-8ab6-aa3107c58514",
      update: {
        status: 0,
      },
    },
  },
  result: {
    data: {
      updateCustomUserById: {
        message: "User deleted successfully!",
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

export const checkSelected = async (element: HTMLElement, id: string) => {
  const button = await within(element).findByRole("button");
  expect(button).toBeInTheDocument();
  await act(async () => {
    fireEvent.mouseDown(button);
  });
  const listBox = await screen.findByRole("listbox");
  expect(listBox).toBeInTheDocument();
  const selectOption = await screen.findByTestId(`shareOrg_${id}`);
  expect(selectOption).toBeInTheDocument();
  fireEvent.click(selectOption);
  const hideEle = await screen.findAllByRole("presentation");
  hideEle[0].style.display = "none";
  // expect(listBox).toBeUndefined();
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

      fireEvent.change(screen.queryByTestId("select_role_dropdown"), {
        target: { value: "dd25567c-4b33-4e08-9d78-9bebd9f37b9a" },
      });
      await expect(
        screen.queryByTestId("select_role_dropdown").getAttribute("value")
      ).toBe("dd25567c-4b33-4e08-9d78-9bebd9f37b9a");

      expect(screen.getByTestId("role-add-form")).toBeInTheDocument();

      fireEvent.click(screen.queryByText("Save"));

      expect(screen.queryByTestId("confirmButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(screen.getByText("User created successfully")).toBeInTheDocument();
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

  it("Tag user", async () => {
    await sut();

    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "iconButton_person_d2f84b2a-845f-4abc-8ab6-aa3107c58514"
        )
      ).toBeInTheDocument();
      fireEvent.click(
        screen.queryByTestId(
          "iconButton_person_d2f84b2a-845f-4abc-8ab6-aa3107c58514"
        )
      );

      const select = await screen.findByTestId("mainOrganizationSelect");
      expect(
        screen.queryByTestId("mainOrganizationSelect")
      ).toBeInTheDocument();

      await checkSelected(select, "c23c9f27c6d94696bf6b86db389dc8de");

      fireEvent.click(screen.queryByText("Tag"));

      expect(screen.queryByTestId("confirmButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("confirmButton"));

      await waitFor(async () => {
        expect(
          screen.getByText("User tagged successfully")
        ).toBeInTheDocument();
      });
    });
  });

  it("Delete user", async () => {
    await sut();

    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "iconButton_delete_d2f84b2a-845f-4abc-8ab6-aa3107c58514"
        )
      ).toBeInTheDocument();
      fireEvent.click(
        screen.queryByTestId(
          "iconButton_delete_d2f84b2a-845f-4abc-8ab6-aa3107c58514"
        )
      );

      expect(screen.queryByTestId("confirmButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("confirmButton"));

      await waitFor(async () => {
        expect(
          screen.getByText("User deleted successfully!")
        ).toBeInTheDocument();
      });
    });
  });
});
