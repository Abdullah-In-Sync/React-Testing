import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";

import TherpaistDashboard from "../../../../pages/therapist/dashboard";
import theme from "../../../../styles/theme/theme";
import { SnackbarProvider } from "notistack";

const sut = async () => {
  render(
    <MockedProvider addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherpaistDashboard />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist dashboard screen", () => {
  it("Should render thearpist dashboard cards", async () => {
    await sut();
    expect(screen.getByTestId("cardBox_record10")).toBeInTheDocument();
  });
});
