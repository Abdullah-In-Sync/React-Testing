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
import * as useAuth from "../../../hooks/useAuth";
import LoginPage from "../../../pages/account";
import theme from "../../../styles/theme/theme";
import { GET_TOKEN_DATA } from "../../../graphql/query/common";
import { useAppContext } from "../../../contexts/AuthContext";
import * as getOrgNameFromCurrentUrl from "../../../utility/helper";
import { GET_ORG_PUBLIC_DATA } from "../../../graphql/org/graphql";

jest.mock("../../../contexts/AuthContext");

const mocksData = [];
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

mocksData.push({
  request: {
    query: GET_ORG_PUBLIC_DATA,
    variables: {
      name: "portal",
    },
  },
  result: jest.fn().mockReturnValue({
    data: {
      getOrgByDomain: {
        _id: "orgid1",
        logo: "080432161__logo.png",
        logo_url: "https://logo",
        name: "portal.dev-myhelp",
        panel_color: "#6ec9db",
        patient: "Patient",
        patient_plural: "patients",
        patient_welcome_email: "",
        side_menu_color: "#6ec9db",
      },
    },
  }),
});

mocksData.push({
  request: {
    query: GET_ORG_PUBLIC_DATA,
    variables: {
      name: "resteasy",
    },
  },
  result: jest.fn().mockReturnValue({
    data: {
      getOrgByDomain: {
        _id: "orgid2",
        logo: "080432161__logo.png",
        logo_url: "https://logo",
        name: "portal.dev-myhelp",
        panel_color: "#6ec9db",
        patient: "Patient",
        patient_plural: "patients",
        patient_welcome_email: "",
        side_menu_color: "#6ec9db",
      },
    },
  }),
});

mocksData.push({
  request: {
    query: GET_TOKEN_DATA,
  },
  result: jest.fn().mockReturnValue({
    data: {
      getTokenData: {
        _id: "token1",
        user_type: "patient",
        parent_id: "patientid1",
        organization_settings: {
          _id: "orgid1",
        },
      },
    },
  }),
});

const mockSpy = mocksData[0].result;
const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <LoginPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Login page", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      setUser: jest.fn,
      setIsAuthenticated: jest.fn,
    });
  });

  it("should render login form", async () => {
    const orgNameSpy = jest.spyOn(
      getOrgNameFromCurrentUrl,
      "getOrgNameFromCurrentUrl"
    );
    orgNameSpy.mockReturnValue("portal");
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
    const loginButton = await screen.findByTestId("loginButton");
    expect(loginButton).toBeInTheDocument();
    await waitFor(() => expect(mockSpy).toBeCalledTimes(1));
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

  it("should fail authentication on comparing orgid", async () => {
    const orgNameSpy = jest.spyOn(
      getOrgNameFromCurrentUrl,
      "getOrgNameFromCurrentUrl"
    );
    orgNameSpy.mockReturnValue("resteasy");
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
    const loginButton = await screen.findByTestId("loginButton");
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
    expect(await screen.findByText(/Not allowed!/i)).toBeInTheDocument();
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
