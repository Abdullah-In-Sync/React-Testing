import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import TherapyPatientMonitorList from "..";
import { useAppContext } from "../../../../../contexts/AuthContext";
import {
  THERAPIST_ADD_MONITOR,
  THERAPIST_ADMIN_MONITOR_LIST,
} from "../../../../../graphql/Monitor/graphql";
import theme from "../../../../../styles/theme/theme";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../../../../../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: THERAPIST_ADMIN_MONITOR_LIST,
    variables: {
      orgId: "517fa21a82c0464a92aaae90ae0d5c59",
      patientId: "patient-id",
    },
  },
  result: {
    data: {
      getAdminMonitorList: [
        {
          status: 1,
          organization_name: null,
          org_id: "org1",
          name: "test org1",
          created_date: "2023-06-02T08:08:36.056Z",
          _id: "list-item-1",
        },
        {
          status: 1,
          organization_name: null,
          org_id: "org2",
          name: "test org2",
          _id: "list-item-2",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_ADD_MONITOR,
    variables: {
      monitorId: "list-item-1",
      patientId: "patient-id",
    },
  },
  result: {
    data: {
      therapistAddMonitor: {
        message: "",
        status: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_ADD_MONITOR,
    variables: {
      monitorId: "list-item-2",
      patientId: "patient-id",
    },
  },
  result: {
    data: {
      therapistAddMonitor: {
        message: "Monitor already added",
        status: false,
      },
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

describe("Therapist add monitor modal", () => {
  it("should render add monitor modal", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "patient-id",
        tab: "monitor",
        subTab1: "patient-monitor",
      },
      push: pushMock,
    });
    await sut();

    const addMonitorBtn = await screen.findByTestId("addMonitorBtn");
    fireEvent.click(addMonitorBtn);
    const addMonitorSelect = await screen.findByTestId("addMonitorDropdown");

    const buttonAddMonitorSelect = await within(addMonitorSelect).findByRole(
      "button"
    );
    fireEvent.mouseDown(buttonAddMonitorSelect);

    const listboxAddMonitorSelect = within(
      screen.getByRole("presentation")
    ).getByRole("listbox");

    const optionsAddMonitorSelect = await within(
      listboxAddMonitorSelect
    ).findAllByRole("option");

    fireEvent.click(optionsAddMonitorSelect[0]);
    const addMonitorSubmit = await screen.findByTestId("addMonitorSubmit");
    fireEvent.click(addMonitorSubmit);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Monitor successfully added./i)
    ).toBeInTheDocument();
  });

  it("should render add monitor modal", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "patient-id",
        tab: "monitor",
        subTab1: "patient-monitor",
      },
      push: pushMock,
    });
    await sut();

    const addMonitorBtn = await screen.findByTestId("addMonitorBtn");
    fireEvent.click(addMonitorBtn);
    const addMonitorSelect = await screen.findByTestId("addMonitorDropdown");

    const buttonAddMonitorSelect = await within(addMonitorSelect).findByRole(
      "button"
    );
    fireEvent.mouseDown(buttonAddMonitorSelect);

    const listboxAddMonitorSelect = within(
      screen.getByRole("presentation")
    ).getByRole("listbox");

    const optionsAddMonitorSelect = await within(
      listboxAddMonitorSelect
    ).findAllByRole("option");

    fireEvent.click(optionsAddMonitorSelect[1]);
    const addMonitorSubmit = await screen.findByTestId("addMonitorSubmit");
    fireEvent.click(addMonitorSubmit);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Monitor already added/i)
    ).toBeInTheDocument();
  });
});
