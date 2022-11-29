import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import EditTemplate from "../pages/admin/resource/editTemplate/[id]/index";
import { GET_TEMPLATE_DETAIL } from "../graphql/query/resource";
import { UPDATE_TEMPLATE_BY_ID } from "../graphql/mutation/resource";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_TEMPLATE_DETAIL,
    variables: { templateId: "750a6993f61d4e58917e31e1244711f5" },
  },
  result: {
    data: {
      getTemplateById: {
        _id: "750a6993f61d4e58917e31e1244711f5",
        name: "test name",
        category: "test desc",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_TEMPLATE_BY_ID,
    variables: {
      templateId: "750a6993f61d4e58917e31e124",
      update: { category: "Template Category", name: "Template name" },
    },
  },
  result: {
    data: {
      updateTemplateById: [{ name: "any", category: "my any" }],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <EditTemplate />
      </SnackbarProvider>
    </MockedProvider>
  );
  //   await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
  //   );
};

describe("Admin edit template page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
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

  it("should render complete edit template form", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
      },
    }));
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("edit-tamplate-form")).toBeInTheDocument();

      expect(screen.getByTestId("name")).toHaveValue("test name");

      expect(screen.getByTestId("category")).toHaveValue("test desc");

      expect(
        screen.getByTestId("editTemplateSubmitButton")
      ).toBeInTheDocument();
    });
  });

  it("submit edit template", async () => {
    (useRouter as jest.Mock).mockClear();
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "750a6993f61d4e58917e31e124",
      },
      push: pushMock,
    });

    await sut();
    fireEvent.change(screen.queryByTestId("name"), {
      target: { value: "Template name" },
    });
    fireEvent.change(screen.queryByTestId("category"), {
      target: { value: "Template Category" },
    });

    fireEvent.click(screen.queryByTestId("editTemplateSubmitButton"));

    await waitFor(async () => {
      expect(
        screen.getByText("Template edit successfully")
      ).toBeInTheDocument();
    });

    expect(pushMock).toHaveBeenCalledWith("/admin/resource/templateList");
  });

  it("submit edit template with null data", async () => {
    await sut();
    fireEvent.change(screen.queryByTestId("name"), {
      target: { value: null },
    });
    fireEvent.change(screen.queryByTestId("category"), {
      target: { value: null },
    });

    fireEvent.click(screen.queryByTestId("editTemplateSubmitButton"));

    await expect(window.alert("Please fill in this field."));
  });

  it("cancle edit template", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "750a6993f61d4e58917e31e124",
      },
      push: pushMock,
    });
    await sut();

    fireEvent.click(screen.queryByTestId("editTemplateCancelButton"));

    expect(pushMock).toHaveBeenCalledWith("/admin/resource/templateList");
  });
});
