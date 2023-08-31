import {
  screen,
  render,
  waitFor,
  fireEvent,
  within,
  act,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_TOKEN_DATA } from "../graphql/query/common";
import { useAppContext } from "../contexts/AuthContext";
import {
  ADD_FAV_FORMULATION,
  GET_FORMULATION_LIST,
  GET_PATIENT_SHARED_LIST,
  REMOVE_FAV_FORMULATION,
  THERAPIST_SHARE_FORMULATION_BY_ID,
  UPDATE_FORMULATION,
} from "../graphql/formulation/graphql";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme/theme";
import TherapistFormulation from "../pages/therapist/formulation";
import { useRouter } from "next/router";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  _mocks.push({
    request: {
      query: GET_TOKEN_DATA,
      variables: {},
    },
    result: {
      data: {
        getTokenData: {
          _id: "patient_id",
          user_type: "patient",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: "1",
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
          patient_data: {
            therapist_id: "therapist_id",
            _id: "patient_id",
          },
        },
      },
    },
  });

  // fetch formulation list query
  _mocks.push({
    request: {
      query: GET_FORMULATION_LIST,
      variables: {
        my_fav: 0,
        my_formulation: 0,
        search_text: "",
      },
    },
    result: {
      data: {
        getFormulationList: [
          {
            _id: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b",
            created_date: "2023-06-20T08:43:32.409Z",
            download_formulation_url: null,
            fav_for_detail: [
              // {
              //   _id: "b115383a-82c6-4a6f-98e8-8628eb6c4295",
              //   created_date: "2023-08-14T06:43:09.369Z",
              //   forfav_status: 1,
              //   formulation_id: "3695d9ee-ebd0-4ecf-9e10-a427cc4ad464",
              //   updated_date: null,
              //   user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
              //   __typename: "FavFormulationData",
              // },
            ],
            formulation_avail_for: "",
            formulation_desc: "description",
            formulation_img: "",
            formulation_instruction: "",
            formulation_name: "first description",
            formulation_returnurl: null,
            formulation_status: 1,
            formulation_type: 1,
            updated_date: "2023-06-20T08:43:32.409Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            __typename: "AdminFormulationData",
          },
          {
            _id: "589e8b42-a640-4daa-a39c-ad53f7a6b891",
            created_date: "2023-06-20T08:47:15.802Z",
            download_formulation_url: null,
            fav_for_detail: [],
            formulation_avail_for: "",
            formulation_desc: " second description2",
            formulation_img: "",
            formulation_instruction: "",
            formulation_name: "t",
            formulation_returnurl: null,
            formulation_status: 1,
            formulation_type: 1,
            updated_date: "2023-06-20T08:47:15.802Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            __typename: "AdminFormulationData",
          },
          {
            _id: "3bbc2640-2998-4c83-a11c-0d0456315b7c",
            created_date: "2023-06-20T08:50:12.427Z",
            download_formulation_url: null,
            fav_for_detail: [
              {
                _id: "b115383a-82c6-4a6f-98e8-8628eb6c4295",
                created_date: "2023-08-14T06:43:09.369Z",
                forfav_status: 1,
                formulation_id: "3695d9ee-ebd0-4ecf-9e10-a427cc4ad464",
                updated_date: null,
                user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
                __typename: "FavFormulationData",
              },
            ],
            formulation_avail_for: "",
            formulation_desc:
              "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            formulation_img: "",
            formulation_instruction: "",
            formulation_name: "third description3",
            formulation_returnurl: null,
            formulation_status: 1,
            formulation_type: 1,
            updated_date: "2023-06-20T08:50:12.427Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            __typename: "AdminFormulationData",
          },
          {
            _id: "2540459f-3ced-4133-98ca-1c2fbdf03e49",
            created_date: "2023-06-20T09:55:42.068Z",
            download_formulation_url: null,
            fav_for_detail: [
              {
                _id: "ea45d9807f8d4355a2b5a14594c964fc",
                created_date: "2022-12-26T15:27:12.000Z",
                forfav_status: 1,
                formulation_id: "306cd6f0b2d5454c9385c09d749bed17",
                updated_date: null,
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                __typename: "FavFormulationData",
              },
            ],
            formulation_avail_for: "",
            formulation_desc:
              "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
            formulation_img: "",
            formulation_instruction: "",
            formulation_name: "four description4",
            formulation_returnurl: null,
            formulation_status: 1,
            formulation_type: 1,
            updated_date: "2023-06-20T09:55:42.068Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            __typename: "AdminFormulationData",
          },
        ],
      },
    },
  });

  _mocks.push({
    request: {
      query: UPDATE_FORMULATION,
      variables: {
        formulation_id: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b",
        updateFormulation: { formulation_status: 0 },
      },
    },
    result: {
      data: {
        updateFormulationById: {
          _id: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b",
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: GET_PATIENT_SHARED_LIST,
      variables: {
        name: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b",
        share_type: "formulation",
      },
    },
    result: {
      data: {
        getPatientSharedList: [
          {
            _id: "003de6cefb794d90ad1fecc00b9e8da9",
            is_shared: false,
            patient_firstname: "54534",
            patient_lastname: "545",
            __typename: "SharePatientList",
          },
          {
            _id: "76e0f9ac97804e0eb5fc092f06a09d97",
            is_shared: false,
            patient_firstname: "API",
            patient_lastname: "testing",
            __typename: "SharePatientList",
          },
          {
            _id: "1e15482374dc43169b1581279b651179",
            is_shared: false,
            patient_firstname: "Aarti",
            patient_lastname: "chaudhary",
            __typename: "SharePatientList",
          },
        ],
      },
    },
  });

  _mocks.push({
    request: {
      query: THERAPIST_SHARE_FORMULATION_BY_ID,
      variables: {
        formulation_id: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b",
        patient_id: "003de6cefb794d90ad1fecc00b9e8da9",
      },
    },
    result: {
      data: {
        therapistShareFormulationById: {
          duplicateNames: null,
          message: null,
          result: true,
          __typename: "adminResult",
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: ADD_FAV_FORMULATION,
      variables: { formulation_id: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b" },
    },
    result: {
      data: {
        addFavouriteFormulation: {
          fav_formulation_id: "new-fav-id",
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: REMOVE_FAV_FORMULATION,
      variables: { fav_formulation_id: "b115383a-82c6-4a6f-98e8-8628eb6c4295" },
    },
    result: {
      data: {
        deleteFavouriteFormulation: {
          deleted: true,
        },
      },
    },
  });

  return { mocks: _mocks };
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistFormulation />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};
describe("Therapist Formulation page", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        therapist_data: {
          _id: "therapist_id",
          org_id: "myhelp",
        },
      },
    });
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "formulation-id-1",
      },
      push: pushMock,
    });
  });

  const clickSelect = async (element: HTMLElement) => {
    const button = await within(element).findByRole("button");
    expect(button).toBeInTheDocument();
    await act(async () => {
      fireEvent.mouseDown(button);
    });
    const listBox = await screen.findByRole("listbox");
    expect(listBox).toBeInTheDocument();
    const selectOption = await screen.findByTestId(
      "shareOrg_003de6cefb794d90ad1fecc00b9e8da9"
    );
    expect(selectOption).toBeInTheDocument();
    fireEvent.click(selectOption);
  };

  test("Renders Admin card wrapper container", async () => {
    await sut();
    await waitFor(() =>
      expect(screen.queryByTestId("cardWrapperContainer")).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.queryAllByTestId("card").length).toBe(4));

    const firstEditButton = await screen.findByTestId(
      "editIcon_589e8b42-a640-4daa-a39c-ad53f7a6b891"
    );
    fireEvent.click(firstEditButton);
    expect(pushMock).toHaveBeenCalledWith(
      "/therapist/formulation/edit/589e8b42-a640-4daa-a39c-ad53f7a6b891"
    );
  });

  test("should delete formulation", async () => {
    await sut();

    const firstDeleteButton = await screen.findByTestId(
      "deleteIcon_d1b60faa-c8aa-4258-ada0-cfdf18402b7b"
    );
    fireEvent.click(firstDeleteButton);
    const optionCancelButton = await screen.findByTestId("cancelButton");
    fireEvent.click(optionCancelButton);
    expect(optionCancelButton).not.toBeInTheDocument();
    fireEvent.click(firstDeleteButton);
    const optionConfirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(optionConfirmButton);
    expect(
      await screen.findByText(/Formulation deleted successfully./i)
    ).toBeInTheDocument();
  });

  it("Share formulation from list", async () => {
    await sut();
    const shareBtn = await screen.findByTestId(
      "shareBtn_d1b60faa-c8aa-4258-ada0-cfdf18402b7b"
    );
    expect(shareBtn).toBeInTheDocument();
    fireEvent.click(shareBtn);
    const saveBtn = await screen.findByTestId("addSubmitForm");
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    expect(screen.getByText("Patient cannot be empty")).toBeInTheDocument();

    const select = await screen.findByTestId("share_organisation_select_list");
    expect(select).toBeInTheDocument();
    await clickSelect(select);

    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    await waitFor(async () => {
      expect(
        screen.getByText("Are you sure you want to share the formulation?")
      ).toBeInTheDocument();
    });
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("confirmButton"));
    await waitFor(async () => {
      expect(
        screen.getByText("Formulation shared successfully!")
      ).toBeInTheDocument();
    });
  });

  test("Add and remove fav formulation", async () => {
    await sut();
    const favButton = await screen.findByTestId(
      "fav_btn_d1b60faa-c8aa-4258-ada0-cfdf18402b7b"
    );

    expect(favButton).toBeInTheDocument();

    fireEvent.click(favButton);
    expect(
      await screen.findByText(/Formulation added to favorites successfully/i)
    ).toBeInTheDocument();

    const favButton2 = await screen.findByTestId(
      "fav_btn_3bbc2640-2998-4c83-a11c-0d0456315b7c"
    );

    expect(favButton2).toBeInTheDocument();

    fireEvent.click(favButton2);
    expect(
      await screen.findByText(
        /Formulation removed from favorites successfully/i
      )
    ).toBeInTheDocument();
  });
});
