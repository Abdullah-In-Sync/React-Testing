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
import NavBar from "..";
import * as useAuth from "../../../hooks/useAuth";
import theme from "../../../styles/theme/theme";
import * as store from "../../../utility/storage";
import { useAppContext } from "../../../contexts/AuthContext";
jest.mock("../../../contexts/AuthContext");
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
          <NavBar />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Nav bar", () => {
  beforeEach(() => {
    jest
      .spyOn(store, "getSessionToken")
      .mockReturnValue({ userToken: "testToken", userType: "patient" });
    (Auth.currentAuthenticatedUser as jest.Mock).mockReturnValue({
      user: {},
    });
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "testid",
        user_type: "patient",
        parent_id: "patientid",
        user_status: "1",
        patient_data: {
          therapist_id: "therapistid",
        },
        organization_settings: {
          _id: "orgid",
          logo_url: "",
          panel_color: "",
          side_menu_color: "",
        },
      },
    });
  });

  it("should render logout", async () => {
    (Auth.signOut as jest.Mock).mockReturnValue("success");
    await sut();
    const menuOpenButton = await screen.findByTestId("accountCircleBtn");
    fireEvent.click(menuOpenButton);
    const logoutButton = await screen.findByTestId("btn_logout");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.logout(jest.fn);
    });
    expect(await screen.findByText(/Logout successful!/i)).toBeInTheDocument();
  });

  it("should render logout fail", async () => {
    (Auth.signOut as jest.Mock).mockImplementation(() => {
      throw new Error("Logout failed!");
    });
    await sut();
    const menuOpenButton = await screen.findByTestId("accountCircleBtn");
    fireEvent.click(menuOpenButton);
    const logoutButton = await screen.findByTestId("btn_logout");
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.logout(jest.fn);
    });
    expect(await screen.findByText(/Logout failed!/i)).toBeInTheDocument();
  });

  it("should render change password sccuess", async () => {
    (Auth.changePassword as jest.Mock).mockReturnValue("success");
    await sut();
    const menuOpenButton = await screen.findByTestId("accountCircleBtn");
    fireEvent.click(menuOpenButton);
    const changePasswordButton = await screen.findByTestId(
      "btn_changePassword"
    );
    fireEvent.click(changePasswordButton);
    const oldPasswordInput = await screen.findByTestId("oldPasswordInput");
    fireEvent.change(oldPasswordInput, {
      target: { value: "Happ1ness" },
    });
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
    const submitBtn = await screen.findByTestId("changePasswordSubmitBtn");
    fireEvent.click(submitBtn);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.changePassword("Happ1ness", "Myhelp@123", jest.fn);
    });
    expect(
      await screen.findByText(/Password changed successfully!/i)
    ).toBeInTheDocument();
  });

  it("should render change password fail", async () => {
    (Auth.changePassword as jest.Mock).mockImplementation(() => {
      throw new Error("Incorrect password!");
    });
    await sut();
    const menuOpenButton = await screen.findByTestId("accountCircleBtn");
    fireEvent.click(menuOpenButton);
    const changePasswordButton = await screen.findByTestId(
      "btn_changePassword"
    );
    fireEvent.click(changePasswordButton);
    const oldPasswordInput = await screen.findByTestId("oldPasswordInput");
    fireEvent.change(oldPasswordInput, {
      target: { value: "Happ1ness" },
    });
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
    const submitBtn = await screen.findByTestId("changePasswordSubmitBtn");
    fireEvent.click(submitBtn);
    const { result } = renderHook(() => useAuth.useAuth());
    await act(async () => {
      await result.current.changePassword("Happ1ness", "Myhelp@123", jest.fn);
    });
    expect(await screen.findByText(/Incorrect password!/i)).toBeInTheDocument();
  });

  it("should render logo", async () => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      orgData: {
        _id: "orgid2",
        logo: "080432161__logo.png",
        logo_url: "https://test.com/logo.png",
        name: "portal.dev-myhelp",
        panel_color: "#6ec9db",
        patient: "Patient",
        patient_plural: "patients",
        patient_welcome_email: "",
        side_menu_color: "#6ec9db",
      },
    });
    await sut();
    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "https://test.com/logo.png");
  });
});
