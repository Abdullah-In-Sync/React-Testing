import { screen, render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import ResourcePreview from "../pages/template/preview/[id]";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <ResourcePreview />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Template preview on button on admin and therapist", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "test-id",
      },
    });

    sessionStorage.setItem(
      "test-id",
      JSON.stringify({
        name: "Test",
        data: {
          rows: [
            {
              cells: [
                {
                  type: "header",
                  title: "Activities",
                },
                {
                  type: "header",
                  title: "Rating",
                  description: "Add rating based on activities",
                },
              ],
            },
            {
              cells: [
                {
                  type: "header",
                  title: "Did you take break fast",
                },
                {
                  type: "answer",
                  answerType: "list",
                  answerValues: ["banana", "mengo", "papita"],
                },
              ],
            },
          ],
        },
      })
    );

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

  it("should render the template", async () => {
    await sut();
    expect(screen.getByTestId("row-1")).toBeInTheDocument();
  });
});
