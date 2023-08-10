import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { GET_TEMPLATE_DETAIL } from "../graphql/query/resource";
import ViewTemplate from "../pages/admin/resource/template/view/[id]/index";
import { SnackbarProvider } from "notistack";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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
        component_name: "TemplateTable",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <ViewTemplate />
      </SnackbarProvider>
    </MockedProvider>
  );
};

describe("Admin view template page", () => {
  it("should render complete view template", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "750a6993f61d4e58917e31e1244711f5",
      },
    }));
    await sut();
    await waitFor(async () => {
      expect(screen.getAllByText(/test name/i)).toHaveLength(2);
    });
  });
});
