import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  act,
  fireEvent,
  render,
  screen,
  renderHook,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import * as useAuth from "../../../hooks/useAuth";
import LoginPage from "../../../pages/login";
import theme from "../../../styles/theme/theme";

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
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render login form", async () => {
    global.fetch = () =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ tet: "t" }),
      } as Response);
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
    global.fetch = () =>
      Promise.resolve({
        status: 403,
        json: () =>
          Promise.resolve({ message: "Username or password incorrect!" }),
      } as Response);
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
