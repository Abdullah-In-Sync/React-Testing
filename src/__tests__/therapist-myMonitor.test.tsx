import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import { useAppContext } from "../contexts/AuthContext";
import { GET_THRAPIST_MY_MONITOR_LIST } from "../graphql/query/patient";
import TherapyMyMonitorList from "../pages/therapist/patient/view/[id]/monitors/myMonitor";
import { DELETE_THERAPIST_MY_MONITOR } from "../graphql/mutation/therapist";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../contexts/AuthContext");
const mocksData = [];

mocksData.push({
  request: {
    query: GET_THRAPIST_MY_MONITOR_LIST,
  },
  result: {
    data: {
      therapistMyMonitorList: [
        {
          _id: "ce3b10f2-e867-4606-a9ab-634af57e280d",
          created_date: "2023-05-16T08:32:21.097Z",
          name: "Therapist Create Monitor",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          status: 1,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          updated_date: "2023-05-16T08:32:21.097Z",
          __typename: "TherapistMonitors",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: DELETE_THERAPIST_MY_MONITOR,
    variables: { monitor_id: "ce3b10f2-e867-4606-a9ab-634af57e280d" },
  },
  result: {
    data: {
      deleteTherapistMonitor: {
        deleted: true,
        __typename: "DeleteMonitor",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapyMyMonitorList />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist patient safety plan", () => {
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
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        },
      },
    });
  });

  it("should render safety plan data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("name")).toBeInTheDocument();
      // expect(screen.getByTestId("planTypeSelect")).toBeInTheDocument();
    });
  });

  it("Delete Homework task", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("button-edit-icon")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("button-edit-icon"));

      expect(
        screen.getByText("Are you sure you want to delete the monitor?")
      ).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(
        screen.getByText("Monitor deleted successfully")
      ).toBeInTheDocument();
    });
  });
});
