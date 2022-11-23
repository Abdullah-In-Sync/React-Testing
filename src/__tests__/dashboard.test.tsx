import { MockedProvider } from "@apollo/react-testing";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { useAppContext } from "../contexts/AuthContext";
import Dashboard from "../pages/dashboard";
jest.mock("../contexts/AuthContext");

const mocksData = [];

describe("Checks the Dashboard page", () => {
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

  const sut = async () => {
    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <SnackbarProvider>
          <Dashboard />
        </SnackbarProvider>
      </MockedProvider>
    );
  };

  it("should render", async () => {
    await sut();
  });
});
