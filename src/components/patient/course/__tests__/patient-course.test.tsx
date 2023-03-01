import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { useAppContext } from "../../../../contexts/AuthContext";

import Course from "../../../../pages/patient/course";

import theme from "../../../../styles/theme/theme";
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
        userToken: {
          sub: "5fec711d-e093-4c3e-b69f-336d3fa139bb",
          "cognito:groups": ["patient"],
          iss: "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_ydFFWFDwG",
          client_id: "4lsbc0ok4smv6g4vehkrrrg03l",
          origin_jti: "23b5bdab-60e1-48c7-b9de-8a78689a8e0b",
          event_id: "2d72df0c-0015-4262-9419-bfaf881dc762",
          token_use: "access",
          scope: "aws.cognito.signin.user.admin",
          auth_time: 1677220859 - 96400,
          exp: 1677224459,
          iat: 1677220859,
          jti: "220df1cd-04b2-469e-ba01-77e41b7fbb55",
          username: "5fec711d-e093-4c3e-b69f-336d3fa139bb",
        },
      },
    });
  });
  it("should render course", async () => {
    await sut();
    const pageBtbText = await screen.findByText(
      /Access Beating the Blues cCBT/i
    );

    const continueButton = await screen.findByRole("button", {
      name: "Continue",
    });

    fireEvent.click(continueButton);

    expect(pageBtbText).toBeInTheDocument();
  });
});
