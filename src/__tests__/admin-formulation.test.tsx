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
import { GET_ADMIN_TOKEN_DATA } from "../graphql/query/common";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import Formulation from "../pages/admin/formulation";
import {
  ADD_FAV_FORMULATION,
  ADMIN_SHARE_FORMULATION,
  GET_FORMULATION_LIST,
  REMOVE_FAV_FORMULATION,
  UPDATE_ADMIN_FORMULATION_BY_ID,
} from "../graphql/formulation/graphql";
import { GET_ORGANISATION_SHARED_LIST } from "../graphql/assessment/graphql";
import { ThemeProvider } from "@mui/material";
import theme from "../styles/theme/theme";
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

  // fetch token for user query
  _mocks.push({
    request: {
      query: GET_ADMIN_TOKEN_DATA,
      variables: {},
    },
    result: {
      data: {
        getTokenData: {
          _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: "1",
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: UPDATE_ADMIN_FORMULATION_BY_ID,
      variables: {
        formulation_id: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b",
        updateFormulation: { formulation_status: 0 },
      },
    },
    result: {
      data: {
        updateFormulationById: {
          _id: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b",
          created_date: "2023-07-04T12:16:57.353Z",
          download_formulation_url: null,
          formulation_avail_for: "[1]",
          formulation_desc: "",
          formulation_img: "",
          formulation_instruction: "",
          formulation_returnurl: null,
          formulation_name: "testsome",
          formulation_status: 0,
          formulation_type: 1,
          formulation_url: null,
          updated_date: "2023-07-06T05:53:10.580Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          __typename: "FormulationData",
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
            fav_for_detail: [],
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
            fav_for_detail: [],
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
      variables: { fav_formulation_id: "new-fav-id" },
    },
    result: {
      data: {
        deleteFavouriteFormulation: {
          deleted: true,
        },
      },
    },
  });

  //for assessment share
  _mocks.push({
    request: {
      query: GET_ORGANISATION_SHARED_LIST,
      variables: {
        name: "first description",
        share_type: "formulation",
      },
    },
    result: {
      data: {
        getOrganisationSharedList: [
          {
            _id: "4b82eac1-6e57-4666-bce3-3b358a7f5ed1",
            is_shared: false,
            name: "A",
            __typename: "ShareOrganization",
          },
          {
            _id: "df139464-0f74-4532-a489-c87e5b64144e",
            is_shared: true,
            name: "Add org editedkdjnsk",
            __typename: "ShareOrganization",
          },
          {
            _id: "22e18602-147d-499e-85fd-8b265e412411",
            is_shared: true,
            name: "Add refactor 1",
            __typename: "ShareOrganization",
          },
        ],
      },
    },
  });

  _mocks.push({
    request: {
      query: ADMIN_SHARE_FORMULATION,
      variables: {
        formulation_id: "d1b60faa-c8aa-4258-ada0-cfdf18402b7b",
        org_id: "4b82eac1-6e57-4666-bce3-3b358a7f5ed1",
      },
    },
    result: {
      data: {
        adminShareFormulation: {
          duplicateNames: null,
          result: true,
          __typename: "adminResult",
        },
      },
    },
  });

  return { mocks: _mocks };
};

const clickSelect = async (element: HTMLElement) => {
  const button = await within(element).findByRole("button");
  expect(button).toBeInTheDocument();
  await act(async () => {
    fireEvent.mouseDown(button);
  });
  const listBox = await screen.findByRole("listbox");
  expect(listBox).toBeInTheDocument();
  const selectOption = await screen.findByTestId(
    "shareOrg_4b82eac1-6e57-4666-bce3-3b358a7f5ed1"
  );
  expect(selectOption).toBeInTheDocument();
  fireEvent.click(selectOption);
};

const { mocks } = buildMocks();
const sut = async () => {
  render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <Formulation />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};
describe(" Formulation page", () => {
  beforeEach(() => {
    const mockRouter = {
      push: pushMock,
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });
  // check for Patient Session Resource list
  test("Renders Admin card wrapper container", async () => {
    await sut();
    await waitFor(() =>
      expect(screen.queryByTestId("cardWrapperContainer")).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.queryAllByTestId("card").length).toBe(4));
  });

  test("Add and remove fav formulation", async () => {
    await sut();
    const favButton = await screen.findByTestId(
      "fav_btn_d1b60faa-c8aa-4258-ada0-cfdf18402b7b"
    );
    fireEvent.click(favButton);
    expect(
      await screen.findByText(/Formulation added to favorites successfully/i)
    ).toBeInTheDocument();
    fireEvent.click(favButton);
    expect(
      await screen.findByText(
        /Formulation removed from favorites successfully/i
      )
    ).toBeInTheDocument();
  });

  test("Delete formulation", async () => {
    await sut();
    await waitFor(async () => {
      expect(
        screen.queryByTestId("deleteIcon_d1b60faa-c8aa-4258-ada0-cfdf18402b7b")
      ).toBeInTheDocument();

      fireEvent.click(
        screen.queryByTestId("deleteIcon_d1b60faa-c8aa-4258-ada0-cfdf18402b7b")
      );

      expect(screen.queryByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));

      // expect(screen.queryByTestId("confirmButton")).not.toBeInTheDocument()
      await waitFor(async () => {
        expect(
          screen.queryByText("Formulation deleted successfully!")
        ).toBeInTheDocument();
      });
    });
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
    expect(
      screen.getByText("Organisation cannot be empty")
    ).toBeInTheDocument();

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

  test("should render view formulation", async () => {
    await sut();
    const cardButton = await screen.findByTestId("card-0");
    fireEvent.click(cardButton);
    expect(pushMock).toHaveBeenCalledWith(
      "/admin/formulation/view/d1b60faa-c8aa-4258-ada0-cfdf18402b7b"
    );
  });
});
