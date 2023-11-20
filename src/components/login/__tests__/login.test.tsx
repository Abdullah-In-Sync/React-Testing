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
import * as store from "../../../utility/storage";

jest.mock("../../../contexts/AuthContext");

export const idCustomJwtToken =
  "eyJraWQiOiJsXC9BY3BKVlJ6VGFmM1U0akhlUm8rUWZVZmlLbE9hSUphT3hjS0htNk9Rbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiZjY0ODc2OS00MjE5LTQyYzctOGNhYy1iMjBiMTBjNWZlOTEiLCJjb2duaXRvOmdyb3VwcyI6WyJjdXN0b20iXSwicm9sZV9kZXRhaWwiOiJ7XCJfaWRcIjpcIjFhNWQxN2ViLWZlNWUtNDFiNi1iZmU3LWJkYjAxNzZmYzdkMlwiLFwibmFtZVwiOlwidGVzdGFjY2Vzc3Rva2VuX3JvbGVcIixcIm9yZ19pZFwiOlwiNTE3ZmEyMWE4MmMwNDY0YTkyYWFhZTkwYWUwZDVjNTlcIixcImFjY2Vzc2liaWxpdHlcIjpcInBhdGllbnRcIixcInBvc2l0aW9uXCI6XCJzaWRlYmFyXCIsXCJzdGF0dXNcIjoxLFwiY3JlYXRlZF9kYXRlXCI6XCIyMDIzLTExLTEwVDA4OjAxOjM5LjYwNlpcIixcInVwZGF0ZWRfZGF0ZVwiOlwiMjAyMy0xMS0xMFQwODowMTozOS42MDZaXCJ9IiwiY3VzdG9tOmZpcnN0bmFtZSI6IlBpeXVzaCIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImF1dGhfdGltZSI6MTcwMDExMjI2NywiY3VzdG9tOmxhc3RuYW1lIjoiU2luZ2giLCJleHAiOjE3MDAxMTU4NjcsImlhdCI6MTcwMDExMjI2NywianRpIjoiNWU5YTgyYjgtMGVmYy00OTg3LWFkNjEtYzY4ZDZhNzk5ODcyIiwiZW1haWwiOiJwaXl1c2guc2luZ2grMUBteWhlbHAuY28udWsiLCJ0aGVyYXBpc3RfZGF0YSI6IiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJiZjY0ODc2OS00MjE5LTQyYzctOGNhYy1iMjBiMTBjNWZlOTEiLCJvcmlnaW5fanRpIjoiMDI3NGY2ZmItZmFlMS00ZmU1LTg4OTYtNGU3NDk0ZDNlODQxIiwicm9sZV9hY2Nlc3MiOiJbe1wiX2lkXCI6XCIwNmQzNjUxMS0zNGY0LTRlZDgtYjFlOC00NzVlMjc4YzM0OTNcIixcIm5hbWVcIjpcIkFncmVlbWVudFwiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjViOWM1NDViLWFjMGEtNDlhNC04ZTk0LTFkMzhiODc1N2Q5NVwiLFwibmFtZVwiOlwiVmlld1wifV19LHtcIl9pZFwiOlwiZjhlMTlmYzYtZWIzYS00YjMwLTg2NzItNmFkYTM2YjFjY2Q0XCIsXCJuYW1lXCI6XCJGaWxlc1wiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjViOWM1NDViLWFjMGEtNDlhNC04ZTk0LTFkMzhiODc1N2Q5NVwiLFwibmFtZVwiOlwiVmlld1wifSx7XCJfaWRcIjpcImY3NzY2Y2ZiLWVhMzgtNGM5MS1iOTNhLWFhZDU4OTU2Njg2OVwiLFwibmFtZVwiOlwiRG93bmxvYWRcIn1dfSx7XCJfaWRcIjpcIjBjNWY0Zjc3LThhODItNDkyZi1hN2UyLWE1NzhmZDliMWIzNFwiLFwibmFtZVwiOlwiUmVsYXBzZVwiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjc2YjljNDU0LTNkNjAtNGE5Zi1iOWJjLWU1Nzg4MTk2NWY5NFwiLFwibmFtZVwiOlwiQWRkXCJ9LHtcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9XX0se1wiX2lkXCI6XCIxZjQ4NThlZC1kMmFhLTRmZDktODFlYi1lMGY3NjE5MThiZDRcIixcIm5hbWVcIjpcIlNhZmV0eSBQbGFuXCIsXCJwcml2aWxlZ2VzXCI6W3tcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9LHtcIl9pZFwiOlwiNzZiOWM0NTQtM2Q2MC00YTlmLWI5YmMtZTU3ODgxOTY1Zjk0XCIsXCJuYW1lXCI6XCJBZGRcIn1dfSx7XCJfaWRcIjpcImU3YjZkY2Y0LTNlMmYtNDE3Zi04ZTllLTk5YjY0NGIzOGY1MFwiLFwibmFtZVwiOlwiTWVhc3VyZXNcIixcInByaXZpbGVnZXNcIjpbXX0se1wiX2lkXCI6XCI5ZDkwMTExNi0zYjAwLTQ2ZmEtOTg1MS03YWRhOTNlZDA2MGNcIixcIm5hbWVcIjpcIk1vbml0b3JzXCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiNDFhYzM0NzMtMzg1Ny00MzYxLWJkOTktMGZjMWUzMGQ5MzU2XCIsXCJuYW1lXCI6XCJBc3Nlc3NtZW50XCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiZGJmNmU4YzAtMjNkYi00NGE3LWEwZWEtNGVlNjE0NGM5MzBjXCIsXCJuYW1lXCI6XCJHb2Fsc1wiLFwicHJpdmlsZWdlc1wiOltdfSx7XCJfaWRcIjpcImM3MWM4YjQzLTY5M2YtNDIwMS04MWQxLTJjZjc2ZGUwNWQ5Y1wiLFwibmFtZVwiOlwiRm9ybXVsYXRpb25cIixcInByaXZpbGVnZXNcIjpbXX0se1wiX2lkXCI6XCIxYTY2NjhhNy1lYzA0LTQ5MDQtOTczMC1hMTRhZTRhYzE1NDFcIixcIm5hbWVcIjpcIkhvbWV3b3JrXCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiYTc1MjU0Y2EtZTNmMy00MDFhLThlMjAtYmJiNTBiM2QzOWUzXCIsXCJuYW1lXCI6XCJGZWVkYmFja1wiLFwicHJpdmlsZWdlc1wiOltdfSx7XCJfaWRcIjpcIjNhOWEwNWIyLTMwYzMtNGYzYS1iYWVjLTFiZTc5NjA4NTU0NFwiLFwibmFtZVwiOlwiUmVzb3VyY2VcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCJmNzc2NmNmYi1lYTM4LTRjOTEtYjkzYS1hYWQ1ODk1NjY4NjlcIixcIm5hbWVcIjpcIkRvd25sb2FkXCJ9LHtcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9XX0se1wiX2lkXCI6XCIzMzlhMzQzZi02M2M2LTQyNmYtODM1Ny1mMmZjNWEyNWFhMjBcIixcIm5hbWVcIjpcIlByb2ZpbGVcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn1dfV0iLCJhdWQiOiJxcG5sM25hNTRnc2VmZHZkb3VtMXM1MXRqIiwiZXZlbnRfaWQiOiI0OWY1YWJlZC1hNWVjLTQ0NDUtYWRjNS1iYmEwZDVkODk2NzkiLCJ0b2tlbl91c2UiOiJpZCIsIm5hbWUiOiJQaXl1c2ggU2luZ2giLCJwaG9uZV9udW1iZXIiOiIrOTE0NTE0NTQ1NDUxIiwicGF0aWVudF9kYXRhIjoie1wiX2lkXCI6XCI0OTM3YTI3ZGMwMGQ0OGJmOTgzZmRjZDRiMDc2MmViZFwiLFwibmFtZVwiOlwicmFuZG9tIG5hbWUgIFRlY2hcIixcImZpcnN0X25hbWVcIjpcInJhbmRvbSBuYW1lIFwiLFwibGFzdF9uYW1lXCI6XCJUZWNoXCIsXCJvcmdfaWRcIjpcIjUxN2ZhMjFhODJjMDQ2NGE5MmFhYWU5MGFlMGQ1YzU5XCIsXCJ0aGVyYXBpc3RfaWRcIjpcIjY4NjgwMmU1MTIzYTQ4MjY4MWE2ODBhNjczZWY3ZjUzXCJ9IiwiZmFtaWx5X25hbWUiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIifQ.PHKirYVtIOgu0xmktq2qPZRGXQ0UKpC7YBLKhmCqVPT3Oy5jx4l_R-XD2EL_zfILKEOT77Dg2v_xkjnhLX4ER3s8gIQTAuj3cQzq9RJK8QyvfcTsExPM_sC0Vix6o4aNfLGvxr-yVr6O3eQepu4Fpr1sxIVgLKrxgf8FjiDomDXHOOIZxtf0vuznkOS8igPvheFkNlY70pHkTOaQF2yY5UFsZ6wRjlRgZXYshONrRjkMutYYhSdks6eDERp6FAXGCVOGsPufZWSENAB_Sp4nL4Qio3HSFqm5gxezCZd7RxqKfZvSF1IpiEAPvLM364lwEQ4YYHugrrqlJF45g2doZA";

export const idPatientJwtToken =
  "eyJraWQiOiJsXC9BY3BKVlJ6VGFmM1U0akhlUm8rUWZVZmlLbE9hSUphT3hjS0htNk9Rbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIiLCJjb2duaXRvOmdyb3VwcyI6WyJwYXRpZW50Il0sImJpcnRoZGF0ZSI6IjEyLTAxLTIwMDUiLCJyb2xlX2RldGFpbCI6IiIsImN1c3RvbTpmaXJzdG5hbWUiOiJyYW5kb20gbmFtZSAiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV95ZEZGV0ZEd0ciLCJjdXN0b206cG9zdGFsX2NvZGUiOiIyMzQ1Njc4IiwiY3VzdG9tOmtpbl9jb250YWN0X25vIjoiOTcxODI4ODQyMiIsImN1c3RvbTpraW5fY2l0eSI6IkJhcmVpbGx5IE5vaWRhIiwiY3VzdG9tOmtpbl9wb3N0YWwiOiIxMjM0NTY4IiwiYXV0aF90aW1lIjoxNzAwMTEyNTg0LCJjdXN0b206YWRkcmVzc2xpbmUyIjoiQmFyZWlsbHkgTm9pZGEiLCJjdXN0b206YWRkcmVzc2xpbmUxIjoiQmFyZWlsbHkgTm9pZGEiLCJjdXN0b206bGFzdG5hbWUiOiJUZWNoIiwiZXhwIjoxNzAwMTE2MTg0LCJpYXQiOjE3MDAxMTI1ODQsImp0aSI6ImI3ZjViMTUyLWFjOGQtNGVlNy1iNjI5LTY2ODgzNzYyY2YyZSIsImVtYWlsIjoiZ3Jwc2UyMDEzQGdtYWlsLmNvbSIsInRoZXJhcGlzdF9kYXRhIjoiIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpraW5fYWRkcmVzc2xpbmUyIjoiQmFyZWlsbHkgTm9pZGEiLCJjdXN0b206a2luX2FkZHJlc3NsaW5lMSI6IkJhcmVpbGx5IE5vaWRhIDEiLCJjdXN0b206a2luX3JlbGF0aW9uc2hpcCI6IlNpYmxpbmciLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiI1ZmVjNzExZC1lMDkzLTRjM2UtYjY5Zi0zMzZkM2ZhMTM5YmIiLCJjdXN0b206bmhzbm8iOiI2ODY1NzgiLCJjdXN0b206aG9tZV9ubyI6IiQ3IiwiY3VzdG9tOmtpbl9lbWFpbF9hZGRyZXNzIjoia2luMUBnbWFpbC5jb20iLCJjdXN0b206Y2l0eSI6IkJhcmVpbGx5Iiwib3JpZ2luX2p0aSI6ImNkMjcyNTVmLTY0ZDUtNGIyNy1hNzUwLTY3ZDkyYWVhNDcxYyIsInJvbGVfYWNjZXNzIjoiIiwiYXVkIjoicXBubDNuYTU0Z3NlZmR2ZG91bTFzNTF0aiIsImN1c3RvbTpraW5fbmFtZSI6IkdSUCBraW4gMSIsImV2ZW50X2lkIjoiNjVkMTU0MjEtMWJjMS00YWE3LWExYmYtZDU3YmNmMjI1YmVhIiwidG9rZW5fdXNlIjoiaWQiLCJjdXN0b206cmVsaWdpb24iOiJub19yZWxpZ2lvbiIsInBob25lX251bWJlciI6Iis0NDk3MTgyODg0MTEiLCJwYXRpZW50X2RhdGEiOiJ7XCJfaWRcIjpcIjQ5MzdhMjdkYzAwZDQ4YmY5ODNmZGNkNGIwNzYyZWJkXCIsXCJuYW1lXCI6XCJyYW5kb20gbmFtZSAgVGVjaFwiLFwiZmlyc3RfbmFtZVwiOlwicmFuZG9tIG5hbWUgXCIsXCJsYXN0X25hbWVcIjpcIlRlY2hcIixcIm9yZ19pZFwiOlwiNTE3ZmEyMWE4MmMwNDY0YTkyYWFhZTkwYWUwZDVjNTlcIixcInRoZXJhcGlzdF9pZFwiOlwiNjg2ODAyZTUxMjNhNDgyNjgxYTY4MGE2NzNlZjdmNTNcIn0iLCJmYW1pbHlfbmFtZSI6IjY4NjgwMmU1MTIzYTQ4MjY4MWE2ODBhNjczZWY3ZjUzIn0.PQkinDBe7sbRlQMEnpacOrRGU8wB9EPj9eZDdJfmG1SphbiS1RWQhdTO6-ec_Z2OUnz7RatzbUBCDerkIXiHV4LwUSL3Yvy9kkM9kna6OIsMzM5k1X4qogqxKlRfSjL9enwTcgEH9Vak2ji1oWCq0_QrN1pnYrNdCv9q4ozI4P6q6IYoLu4RQCkf_z3QA9L6sBWXL99Mf5DzaspHKN-FK5nKwZ8NMk_tfZX53pOTzv3hmL0TSOuMagAmKCiYvilluFlL9DaVPOrNmKqW41qhoXvThgd9yMB0bCFbHhcguJBClyuTjOUiR3jxBdR2Zeky7BmsPPSiVREllz_x2m3WSw";

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
        _id: "517fa21a82c0464a92aaae90ae0d5c59",
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
          _id: "517fa21a82c0464a92aaae90ae0d5c59",
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
    jest.spyOn(store, "getSessionToken").mockReturnValue({
      userToken: "testToken",
      userType: "patient",
      userTokenId: idCustomJwtToken,
    });
    (useAppContext as jest.Mock).mockReturnValue({
      setUser: jest.fn,
      setIsAuthenticated: jest.fn,
      user: {
        _id: "userid1",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        user_type: "patient",
        patient_data: {
          therapist_id: "therapistid1",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        },
      },
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
        idToken: {
          jwtToken: idPatientJwtToken,
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
        idToken: {
          jwtToken: idCustomJwtToken,
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

  it("should return true when the user has the specified privilege for the given module", () => {
    const moduleName = "Resource";
    const privilege = "View";
    const expected = true;
    const result = getOrgNameFromCurrentUrl.checkPrivilageAccess(
      moduleName,
      privilege
    );
    expect(result).toBe(expected);
  });

  it("should return false when the user does not have the specified privilege for the given module", () => {
    const moduleName = "Assessment";
    const privilege = "examplePrivilege";
    const expected = false;
    const result = getOrgNameFromCurrentUrl.checkPrivilageAccess(
      moduleName,
      privilege
    );
    expect(result).toBe(expected);
  });
});
