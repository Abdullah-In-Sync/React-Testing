import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import * as useAuth from "../../../hooks/useAuth";
import SecurityCodePage from "../../../pages/forgotPassword/[username]";
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
          <SecurityCodePage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      username: "test@test.com",
    },
    push: pushMock,
  });
});

describe("Security code page", () => {
  (Auth.forgotPassword as jest.Mock).mockReturnValue("success");
  it("should render forgot password form", async () => {
    await sut();
    const resendCodeButton = await screen.getByTestId("resendCodeButton");
    fireEvent.click(resendCodeButton);
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
    const verifyCodeButton = screen.getByTestId("verifyCodeButton");
    for (let i = 1; i <= 6; i++) {
      fireEvent.change(screen.getByLabelText(`Character ${i}.`), {
        target: { value: i },
      });
    }
    fireEvent.click(verifyCodeButton);
    waitFor(() =>
      expect(pushMock).toHaveBeenCalledWith(
        "/forgotPassword/test@test.com/123456"
      )
    );
  });
});
