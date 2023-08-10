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
import LoginPage from "../../../pages/login";
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
          <LoginPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Login page", () => {
  it("should render login form", async () => {
    (Auth.signIn as jest.Mock).mockReturnValue({
      signInUserSession: {
        accessToken: {
          jwtToken: "dummyToken",
          payload: {
            "cognito:groups": ["patient"],
            exp: new Date().getTime() + 1 * 3600 * 1000,
          },
        },
      },
    });
    await sut();
    const loginButton = screen.getByTestId("loginButton");
    expect(loginButton).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("userName"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "patient" },
    });
    fireEvent.click(loginButton);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.login(
        { password: "patient", username: "test@test.com" },
        { setSubmitting: jest.fn, callback: jest.fn }
      );
    });
    expect(await screen.findByText(/Login successful!/i)).toBeInTheDocument();
  });

  it("should render login fail", async () => {
    (Auth.signIn as jest.Mock).mockImplementation(() => {
      throw new Error("Username or password incorrect!");
    });
    await sut();
    const loginButton = screen.getByTestId("loginButton");
    expect(loginButton).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("userName"), {
      target: { value: "test@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "patient" },
    });
    fireEvent.click(loginButton);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.login(
        { password: "patient", username: "test@test.com" },
        { setSubmitting: jest.fn, callback: jest.fn }
      );
    });
    expect(
      await screen.findByText(/Username or password incorrect!/i)
    ).toBeInTheDocument();
  });
});
