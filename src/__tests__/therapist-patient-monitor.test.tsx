import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import { useAppContext } from "../contexts/AuthContext";
import { GET_THERAPIST_PATIENT_MONITOR_LIST } from "../graphql/SafetyPlan/graphql";
import TherapyPatientMonitorList from "../pages/therapist/patient/view/[id]/monitors/patientMonitor";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../contexts/AuthContext");
const mocksData = [];

mocksData.push({
  request: {
    query: GET_THERAPIST_PATIENT_MONITOR_LIST,
    variables: { patient_id: null },
  },
  result: {
    data: {
      therapistMonitorList: [
        {
          _id: "9b0fb6ae-eb54-4777-9c3b-d4b4b971aefb",
          added_by: "therapist",
          created_date: "2023-05-24T04:59:30.169Z",
          name: "unshared monitor",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          status: 1,
          therapist_id: null,
          updated_date: "2023-05-24T04:59:30.169Z",
          __typename: "PatientMonitors",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapyPatientMonitorList />
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

  it("should render monitor data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("patientMonitorName")).toBeInTheDocument();
    });
  });
});
