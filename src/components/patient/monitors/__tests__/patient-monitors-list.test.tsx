import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { useAppContext } from "../../../../contexts/AuthContext";
import PatientMonitorsList from "../../therapyPages/monitors";
import { useRouter } from "next/router";

import { GET_PATIENT_MONITOR_LIST } from "../../../../graphql/Monitor/graphql";
import theme from "../../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../../../../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_MONITOR_LIST,
  },
  result: {
    data: {
      patientMonitorList: {
        status: true,
        data: [
          {
            _id: "a90330fd-5655-4904-bb7e-60a3db1ea3d5",
            name: "Final testing",
          },
        ],
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <PatientMonitorsList />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

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

describe("Patient monitors list", () => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      tab: "monitors",
    },
  });
  it("should render patient monitor list", async () => {
    await sut();
    expect(await screen.findAllByText(/Final testing/i)).toHaveLength(1);
  });
});
