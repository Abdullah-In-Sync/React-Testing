import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

import { GET_ADMIN_TOKEN_DATA } from "../graphql/query/common";

import { useAppContext } from "../contexts/AuthContext";
import TemplateList from "../pages/admin/resource/template/list";
import { GET_TEMPLATE_LIST } from "../graphql/query/resource";

jest.mock("../contexts/AuthContext");

// mocks
const mocksData = [];

mocksData.push({
  request: {
    query: GET_ADMIN_TOKEN_DATA,
    variables: {},
  },
  result: {
    data: {
      getTokenData: {
        _id: "some-admin-id",
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

mocksData.push(
  {
    request: {
      query: GET_TEMPLATE_LIST,
    },
    result: {
      data: {
        listTemplates: [
          {
            _id: "750a6993f61d4e58917e31e1244711f5",
            name: "Name",
            category: "catagory",
          },
          {
            _id: "d74a507c18e441e0888645932f607e9e",
            name: "Name2",
            category: "catagory2",
          },
          {
            _id: "d74a507c18e441e088864597e9e",
            name: "",
            category: "",
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_TEMPLATE_LIST,
      variables: {},
    },
    result: {
      data: null,
    },
  }
);
const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <TemplateList />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("TemplateList Page", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "patient",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });

  test("Renders template tab list screen", async () => {
    await sut();
    await waitFor(() =>
      expect(screen.queryByTestId("tableId")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.queryAllByTestId("table-row").length).toBe(3)
    );
    expect(screen.queryByText("Template Name")).toBeInTheDocument();
  });

  test("Renders template when data is null", async () => {
    await sut();
    expect(screen.queryByText("No Data Found")).toBeInTheDocument();
  });

  test("Renders templates button", async () => {
    await sut();

    expect(screen.queryByTestId("addResource")).toBeInTheDocument();
    expect(screen.queryByTestId("createResource")).toBeInTheDocument();
    expect(screen.queryByText("Templates")).toBeInTheDocument();
  });
});
