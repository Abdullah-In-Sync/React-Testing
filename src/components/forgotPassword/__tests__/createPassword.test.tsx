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
import { useRouter } from "next/router";
import * as useAuth from "../../../hooks/useAuth";
import CreatePassword from "../../../pages/forgotPassword/[username]/[code]";
import theme from "../../../styles/theme/theme";
jest.mock("aws-amplify");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

const sut = async () => {
  render(
    <MockedProvider addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <CreatePassword />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      username: "test@test.com",
      code: "123456",
    },
    push: pushMock,
  });
});

describe("Create new password", () => {
  it("should render change password sccuess", async () => {
    (Auth.forgotPasswordSubmit as jest.Mock).mockReturnValue("success");

    await sut();

    const newPasswordInput = await screen.findByTestId("newPasswordInput");
    fireEvent.change(newPasswordInput, {
      target: { value: "Myhelp@123" },
    });
    const confirmPasswordInput = await screen.findByTestId(
      "confirmPasswordInput"
    );
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Myhelp@123" },
    });
    const submitBtn = await screen.findByTestId("newPasswordSubmitBtn");
    fireEvent.click(submitBtn);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.forgotPasswordSubmit(
        "test@test.com",
        "123456",
        "Myhelp@123",
        jest.fn
      );
    });
    expect(
      await screen.findByText(/Password changed successfully!/i)
    ).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/login");
  });

  it("should render change password fail", async () => {
    (Auth.forgotPasswordSubmit as jest.Mock).mockImplementation(() => {
      throw new Error("Incorrect password!");
    });

    await sut();

    const newPasswordInput = await screen.findByTestId("newPasswordInput");
    fireEvent.change(newPasswordInput, {
      target: { value: "Myhelp@123" },
    });
    const confirmPasswordInput = await screen.findByTestId(
      "confirmPasswordInput"
    );
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Myhelp@123" },
    });
    const submitBtn = await screen.findByTestId("newPasswordSubmitBtn");
    fireEvent.click(submitBtn);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.forgotPasswordSubmit(
        "test@test.com",
        "123456",
        "Myhelp@123",
        jest.fn
      );
    });
    expect(await screen.findByText(/Incorrect password!/i)).toBeInTheDocument();
  });
});
