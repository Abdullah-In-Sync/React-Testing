import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { Auth } from "aws-amplify";
import * as useAuth from "../../../hooks/useAuth";
import ForgotPasswordPage from "../../../pages/forgotPassword";
import theme from "../../../styles/theme/theme";

jest.mock("aws-amplify");

jest.mock("next/router", () => {
  const router = {
    replace: jest.fn(),
  };
  return {
    __esModule: true,
    useRouter: jest.fn().mockReturnValue(router),
  };
});

const sut = async () => {
  render(
    <MockedProvider addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <ForgotPasswordPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Login page", () => {
  it("should render forgot password form", async () => {
    (Auth.forgotPassword as jest.Mock).mockReturnValue("success");
    await sut();
    const forgotPasswordButton = screen.getByTestId("forgotPasswordButton");
    expect(forgotPasswordButton).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("userName"), {
      target: { value: "test@test.com" },
    });
    fireEvent.click(forgotPasswordButton);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.forgotPassword(
        { username: "test@test.com" },
        jest.fn
      );
    });
    expect(
      await screen.findByText(/Security code has been sent to your email!/i)
    ).toBeInTheDocument();
  });

  it("should render forgot password fail", async () => {
    (Auth.forgotPassword as jest.Mock).mockImplementation(() => {
      throw new Error("Error!");
    });
    await sut();
    const forgotPasswordButton = screen.getByTestId("forgotPasswordButton");
    expect(forgotPasswordButton).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("userName"), {
      target: { value: "test@test.com" },
    });
    fireEvent.click(forgotPasswordButton);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.forgotPassword(
        { username: "test@test.com" },
        jest.fn
      );
    });
    expect(await screen.findByText(/Error!/i)).toBeInTheDocument();
  });
});
