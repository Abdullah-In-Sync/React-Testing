jest.mock("notistack");
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MonitorFormShareBox from "../monitor/share/monitorShare";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@mui/material";
import theme from "../../../../styles/theme/theme";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
  useSnackbar: jest.fn(),
}));
const mockOnPressSubmit = jest.fn();
const mockOnChangePlanId = jest.fn();

const mocksData = [
  {
    __typename: "PatientListForMonitors",
    _id: "572b4bce-4a25-4c23-90d5-d85d6bc7fddf",
    moniter_detail: {
      __typename: "PatientMonitors",
      _id: "b2183470-0759-4b39-a852-4d9bd8e200e7",
      added_by: "therapist",
      created_date: "2023-10-04T14:24:20.854Z",
      name: "asa",
      org_id: "517fa21a82c0464a92aaae90ae0d5c59",
      patient_id: "572b4bce-4a25-4c23-90d5-d85d6bc7fddf",
      status: 1,
      therapist_id: null,
      updated_date: "2023-10-04T14:24:20.854Z",
    },
    patient_firstname: "ravindra",
    patient_lastname: "patient",
  },
];

const sut = async () => {
  render(
    <ThemeProvider theme={theme()}>
      <SnackbarProvider>
        <MonitorFormShareBox
          onPressSubmit={mockOnPressSubmit}
          therapistSafetyPlanList={{ patientListForMonitor: mocksData }}
        />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

describe("FormShareBox Component", () => {
  it("calls onPressSubmit when Share button is clicked with selected patients", async () => {
    await sut();
    await (async () => {
      const shareButton = await screen.findByTestId("addSubmitForm");
      fireEvent.click(shareButton);
    });

    await (async () => {
      expect(mockOnPressSubmit).toHaveBeenCalled();
    });
  });
  it("shows error snackbar if Share button is clicked without selecting patients", async () => {
    await sut();
    await (async () => {
      const shareButton = await screen.findByTestId("addSubmitForm");
      fireEvent.click(shareButton);
    });

    await (async () => {
      expect(
        await screen.findByText("Patient can not be empty.")
      ).toBeInTheDocument();
    });
  });

  it("updates selected patients when Autocomplete is used", async () => {
    await sut();
    await (async () => {
      const autocomplete = await screen.findByTestId("relapsePlanDropdown");
      fireEvent.change(autocomplete, { target: { value: "Patient 1" } });
    });

    await (() => {
      expect(mockOnChangePlanId).toHaveBeenCalledWith("1");
    });
  });
});
