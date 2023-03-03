import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { useAppContext } from "../../../../contexts/AuthContext";

import Course from "../../../../pages/patient/course";

import { useRouter } from "next/router";
import theme from "../../../../styles/theme/theme";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../../.../../../../contexts/AuthContext");

const mocksData = [];

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <Course />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Patient course screen", () => {
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
        patient_data: {
          patient_consent: 0,
          patient_contract: 0,
        },
      },
    });
  });
  const mockRouter = {
    push: jest.fn(),
  };
  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  it("should render course and on press continue button show popup", async () => {
    await sut();
    const continueButton = await screen.findByRole("button", {
      name: "Continue",
    });
    fireEvent.click(continueButton);
    expect(
      await screen.findByText(
        /Before continuing, you must accept the Terms of Use./i
      )
    ).toBeInTheDocument();
    const useFulButton = await screen.findByTestId("useful-information-button");
    fireEvent.click(useFulButton);
    expect(mockRouter.push).toHaveBeenCalledWith("/patient/resource");
  });

  it("on press ok button should navigate to agreement screen", async () => {
    await sut();
    const continueButton = await screen.findByRole("button", {
      name: "Continue",
    });
    fireEvent.click(continueButton);
    const okButton = await screen.findByTestId("OkButton");
    fireEvent.click(okButton);
    expect(mockRouter.push).toHaveBeenCalledWith("/patient/view/");
  });
});
