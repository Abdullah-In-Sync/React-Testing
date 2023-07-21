import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import theme from "../../../../styles/theme/theme";

import { useRouter } from "next/router";
import { GET_ADMIN_THERAPIST_LIST } from "../../../../graphql/Therapist/graphql";
import TherapistListPage from "../../../../pages/admin/therapist/list";
const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ADMIN_THERAPIST_LIST,
    variables: {
      name: "",
      paginationtoken: "",
      limit: 10,
    },
  },
  result: {
    data: {
      getTherapistList: {
        pagination: "pagination_token_text",
        therapistlist: [
          {
            name: "Dodctor",
            phone_number: "+448989898989",
            specialization: "Psychodynamic(Psychoanalytic) Psychotheraphy",
            therapist_id: "26bb201aad294bdab928a06a5b5df2ce",
          },
          {
            name: "Rahul Therapist 80",
            phone_number: "+44896745343235",
            specialization: "Person Centred",
            therapist_id: "e21f34a6be3f4e11814ddcc6b2d097bf",
          },
        ],
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistListPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin therapist list", () => {
  it("should render list", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
    await sut();
    expect(await screen.findByText(/Dodctor/i)).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("createPlanButton"));
    expect(pushMock).toHaveBeenCalledWith("/admin/therapist/add");
  });
});
