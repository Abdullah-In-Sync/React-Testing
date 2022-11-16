import Resource from "../pages/therapist/resource";

import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_THERAPIST_TOKEN_DATA } from "../graphql/query/common";
import { GET_RESOURCE_DATA, GET_PATIENT_LIST } from "../graphql/query/resource";
import {
  ADD_FAVOURITE,
  DELETE_RESOURCE,
  REMOVE_FAVOURITE,
  SHARE_RESOURCE,
} from "../graphql/mutation/resource";
import { useAppContext } from "../contexts/AuthContext";

jest.mock("../contexts/AuthContext");

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
} => {
  const _mocks: MockedResponse[] = [];

  // fetch token for user query
  _mocks.push({
    request: {
      query: GET_THERAPIST_TOKEN_DATA,
      variables: {},
    },
    result: {
      data: {
        getTokenData: {
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
      },
    },
  });

  // fetch therapist Resource list query
  _mocks.push({
    request: {
      query: GET_RESOURCE_DATA,
      variables: {
        categoryId: "",
        disorderId: "",
        modelId: "",
        myFav: 0,
        myResource: 0,
        resourceType: 0,
        searchText: "",
        orgId: "myhelp",
      },
    },
    result: {
      data: {
        getResourceList: [
          {
            _id: "fffe8041-fc77-40fa-a83e-cf76197d1499",
            fav_res_detail: [
              {
                _id: "test",
              },
            ],
            resource_desc: "Therapist Description",
            resource_name: "Therapist Resource",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            resource_status: 1,
            user_type: "admin",
            org_id: "myhelp",
          },
          {
            _id: "abfd4ef5-66f2-463c-be2e-86fe8fa449b2",
            fav_res_detail: [],
            resource_desc: "Resource Description",
            resource_name: "Resource Name",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            resource_status: 1,
            user_type: "admin",
            org_id: "myhelp",
          },
          {
            _id: "ba3dd2f3-1fc2-45bb-bf4b-60889c530d54",
            fav_res_detail: [],
            resource_desc: "",
            resource_name: "test",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            resource_status: 1,
            user_type: "admin",
            org_id: "myhelp",
          },
        ],
      },
    },
  });

  _mocks.push({
    request: {
      query: ADD_FAVOURITE,
      variables: {
        resourceId: "abfd4ef5-66f2-463c-be2e-86fe8fa449b2",
      },
    },
    result: {
      data: {
        addFavouriteResource: {
          resourceId: "any-id",
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: GET_PATIENT_LIST,
      variables: {},
    },
    result: {
      data: {
        therapistPatientList: [
          {
            _id: "patient-1",
            first_name: "test 1",
            last_name: "last 2",
          },
          {
            _id: "patient-2",
            first_name: "test 2",
            last_name: "last 2",
          },
        ],
      },
    },
  });

  // Delete Resource By Id
  _mocks.push({
    request: {
      query: DELETE_RESOURCE,
      variables: {
        resourceId: "ba3dd2f3-1fc2-45bb-bf4b-60889c530d54",
      },
    },
    result: {
      data: {
        deleteResource: {
          deleted: true,
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: REMOVE_FAVOURITE,
      variables: {
        resfavId: "test",
      },
    },
    result: {
      data: {
        deleteFavouriteResource: {
          deleted: true,
        },
      },
    },
  });

  _mocks.push({
    request: {
      query: SHARE_RESOURCE,
      variables: {
        resourceId: "abfd4ef5-66f2-463c-be2e-86fe8fa449b2",
        patientId: "patient-1",
      },
    },
    result: {
      data: {
        therapistShareResource: {
          result: true,
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
      <SnackbarProvider>
        <Resource />
      </SnackbarProvider>
    </MockedProvider>
  );
};
describe("Therapist Resource page", () => {
  beforeEach(() => {
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
  test("Renders Therapist card wrapper container", async () => {
    await sut();
    await waitFor(() =>
      expect(screen.queryByTestId("cardWrapperContainer")).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.queryAllByTestId("card").length).toBe(3));
  });

  test("Click Delete icon should open Delete resource popup", async () => {
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("deleteIcon_ba3dd2f3-1fc2-45bb-bf4b-60889c530d54")
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.queryByTestId("deleteIcon_ba3dd2f3-1fc2-45bb-bf4b-60889c530d54")
    );
    expect(
      screen.queryByTestId("deleteResourceModalConfirmButton")
    ).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("deleteResourceModalConfirmButton"));

    await waitFor(() =>
      expect(
        screen.queryByText("Resource has been deleted successfully!")
      ).toBeInTheDocument()
    );
  });

  test("Click Close icon should close Delete resource popup", async () => {
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("deleteIcon_ba3dd2f3-1fc2-45bb-bf4b-60889c530d54")
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.queryByTestId("deleteIcon_ba3dd2f3-1fc2-45bb-bf4b-60889c530d54")
    );
    expect(
      screen.queryByTestId("deleteResourceModalCancelButton")
    ).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("deleteResourceModalCancelButton"));
    expect(screen.queryByTestId("DeletesureModal")).not.toBeInTheDocument();
  });

  // check for therapist add fav
  test("should add to favourites", async () => {
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("fav_abfd4ef5-66f2-463c-be2e-86fe8fa449b2")
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.queryByTestId("fav_abfd4ef5-66f2-463c-be2e-86fe8fa449b2")
    );
    await waitFor(() =>
      expect(
        screen.queryByTestId("fav_abfd4ef5-66f2-463c-be2e-86fe8fa449b2")
      ).toHaveStyle(`color: red`)
    );
  });

  test("should remove from favourites", async () => {
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("fav_fffe8041-fc77-40fa-a83e-cf76197d1499")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      fireEvent.click(
        screen.queryByTestId("fav_fffe8041-fc77-40fa-a83e-cf76197d1499")
      )
    );

    await waitFor(() =>
      expect(
        screen.queryByTestId("fav_fffe8041-fc77-40fa-a83e-cf76197d1499")
      ).toHaveAttribute("aria-hidden", "true")
    );
  });

  // share resource
  test("should share resource to patient", async () => {
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("shareIcon_abfd4ef5-66f2-463c-be2e-86fe8fa449b2")
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.queryByTestId("shareIcon_abfd4ef5-66f2-463c-be2e-86fe8fa449b2")
    );
    await waitFor(() =>
      expect(screen.queryByTestId("shareButton")).toBeInTheDocument()
    );

    fireEvent.change(screen.queryByTestId("selectPatient"), {
      target: { value: ["patient-1"] },
    });

    fireEvent.click(screen.queryByTestId("shareButton"));
    await waitFor(() =>
      expect(
        screen.queryByText("Resource has been shared successfully!")
      ).toBeInTheDocument()
    );
  });

  test("should close share resource popup", async () => {
    await sut();
    await waitFor(() =>
      expect(
        screen.queryByTestId("shareIcon_abfd4ef5-66f2-463c-be2e-86fe8fa449b2")
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.queryByTestId("shareIcon_abfd4ef5-66f2-463c-be2e-86fe8fa449b2")
    );
    await waitFor(() =>
      expect(screen.queryByTestId("closeIcon")).toBeInTheDocument()
    );

    fireEvent.click(screen.queryByTestId("closeIcon"));
    await waitFor(() =>
      expect(screen.queryByTestId("closeIcon")).toHaveAttribute(
        "aria-hidden",
        "true"
      )
    );
  });
});
