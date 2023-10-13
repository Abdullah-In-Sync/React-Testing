import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { GET_PATIENT_HOME_DATA } from "../graphql/query/resource";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import HomePage from "../pages/patient/home";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_HOME_DATA,
  },
  result: {
    data: {
      getPatientHomeData: [
        {
          appointment: [
            {
              _id: "c129d2bed7584e2b9d6e53b43826fa0c",
              app_finish: "07:30",
              app_start: "06:30",
              app_date: "2023-07-03T00:00:00.000Z",
              __typename: "Appointment",
            },
          ],
          __typename: "PatientHomeData",
        },
      ],
    },
  },
});

const sut = async () => {
  // localStorage.setItem("Cookies Policy", "true");
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <HomePage />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Admin edit template page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
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

  test("View detail button", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("viewDetailClick")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("viewDetailClick"));
      await expect(global.window.location.pathname).toContain("/");
    });
  });

  test("Accept Cookies", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("acceptCookiesButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("acceptCookiesButton"));
    });
  });

  test("Renders home page", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("goals_card")).toBeInTheDocument();
      expect(screen.getByTestId("homework_card")).toBeInTheDocument();
      expect(screen.getByTestId("resource_card")).toBeInTheDocument();
      expect(screen.getByTestId("goals_card")).toBeInTheDocument();
      expect(screen.getByTestId("review_card")).toBeInTheDocument();
      expect(screen.getByTestId("communication_card")).toBeInTheDocument();
      expect(screen.getByTestId("monitor_card")).toBeInTheDocument();
      expect(screen.getByTestId("relapse_card")).toBeInTheDocument();
      expect(screen.getByTestId("Main")).toBeInTheDocument();
    });
  });
});
