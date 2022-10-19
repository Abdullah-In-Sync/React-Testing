import Resource from "../pages/admin/resource";

import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_ADMIN_TOKEN_DATA } from "../graphql/query/common";
import {
  GET_RESOURCE_DATA,
  GET_UNAPPROVE_RESOURCE,
} from "../graphql/query/resource";
import {
  ADD_FAVOURITE,
  DELETE_RESOURCE,
  REMOVE_FAVOURITE,
  APPROVE_RESOURCE,
} from "../graphql/mutation/resource";
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

  // fetch Admin Resource list query
  _mocks.push({
    request: {
      query: GET_RESOURCE_DATA,
      variables: {
        userType: "admin",
        categoryId: "",
        disorderId: "",
        modelId: "",
        myFav: 0,
        myResource: 0,
        resourceType: 0,
        searchText: "",
        orgId: "",
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
          },
          {
            _id: "abfd4ef5-66f2-463c-be2e-86fe8fa449b2",
            fav_res_detail: [],
            resource_desc: "Resource Description",
            resource_name: "Resource Name",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            resource_status: 1,
            user_type: "admin",
          },
          {
            _id: "ba3dd2f3-1fc2-45bb-bf4b-60889c530d54",
            fav_res_detail: [],
            resource_desc: "",
            resource_name: "test",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            resource_status: 1,
            user_type: "admin",
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

  //Get UnApprove Resource list
  _mocks.push({
    request: {
      query: GET_UNAPPROVE_RESOURCE,
      variables: {},
    },
    result: {
      data: {
        getAdminUnApproveResourceList: [
          {
            _id: "9be5d270b71041caac142fb4b2bbc0ec",
            resource_name: "TR1",
            agenda_id: "f55968a9f41d407e9a465a5ee17de5f8",
            category_id: "0",
            created_date: "2022-10-15T12:48:01.000Z",
            resource_status: 2,
            disorder_id: "f21fb142812544309fb64ee47054333f",
            model_id: "c5813b8f9d82402eac48e49ba4f066bf",
          },
          {
            _id: "85f84e4bc20649f789c6ecffddaf1c77",
            resource_name: "TR2",
            agenda_id: "737d98b95a2a4bf68b010ddf7c21f6bf",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-10-15T12:47:03.000Z",
            resource_status: 2,
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            model_id: "60d4284b33f24874a21f20144cd682fc",
          },
        ],
      },
    },
  });

  // Approve Resource
  _mocks.push({
    request: {
      query: APPROVE_RESOURCE,
      variables: {
        resourceId: "ba3dd2f3-1fc2-45bb-bf4b-60889c530d54",
      },
    },
    result: {
      data: {
        adminApproveResourceById: {
          _id: "ba3dd2f3-1fc2-45bb-bf4b-60889c530d54",
          resource_status: 1,
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
describe("Admin Resource page", () => {
  // check for Patient Session Resource list
  test("Renders Admin card wrapper container", async () => {
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
      screen.queryByText("Are you sure want to delete this resource?")
    ).toBeInTheDocument();
  });
  // check for admin add fav
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
      ).toHaveStyle(`color: rgba(0, 0, 0, 0.54)`)
    );
  });

  test("should display the unapprove resource list", async () => {
    await sut();
    await waitFor(() =>
      expect(screen.queryByTestId("approveresourcelist")).toBeInTheDocument()
    );
    fireEvent.click(screen.queryByTestId("approveresourcelist"));
    await waitFor(() =>
      expect(
        screen.queryByTestId("doneIcon_9be5d270b71041caac142fb4b2bbc0ec")
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.queryByTestId("doneIcon_9be5d270b71041caac142fb4b2bbc0ec")
    );
    expect(
      screen.queryByText("Are you sure want to approve this resource?")
    ).toBeInTheDocument();
  });
});
