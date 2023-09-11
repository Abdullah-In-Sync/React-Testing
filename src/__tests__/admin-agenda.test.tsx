import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import AgendaPage from "../pages/admin/agenda";
import { GET_ADMIN_AGENDA_LIST } from "../graphql/agenda/graphql";
import { ADMIN_UPDATE_AGENDA_BY_ID } from "../graphql/mutation/resource";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ADMIN_AGENDA_LIST,
    variables: { limit: 10, pageNo: 1 },
  },
  result: {
    data: {
      getAdminAgendaList: {
        agendalist: [
          {
            _id: "f0adacdc72384c7a9d79a8dd273f7523",
            session_id: "1",
            display_order: "0",
            agenda_detail: [
              {
                agenda_name: "Agenda  111",
                created_date: "2023-07-13T11:01:52.000Z",
                _id: "ebff2f614d904c53be85bc1580b93901",
                __typename: "Agenda",
              },
            ],
            therapy_detail: [
              {
                therapy_name: "amar therapy",
                _id: "091886de6af2476daa50245033a4889a",
                __typename: "Therapy",
              },
            ],
            __typename: "AgendaList",
          },
          {
            _id: "15e5fad01d7e413f9e4dc267bff4d3ff",
            session_id: "1",
            display_order: "1",
            agenda_detail: [
              {
                agenda_name: "A1",
                created_date: "2022-05-31T03:29:42.000Z",
                _id: "4d0feab2afcb429085f5638e24c67ebb",
                __typename: "Agenda",
              },
            ],
            therapy_detail: [
              {
                therapy_name: "T2",
                _id: "38f5c75b3950498ab548c8ab72a5e2be",
                __typename: "Therapy",
              },
            ],
            __typename: "AgendaList",
          },
          {
            _id: "2dad98ab6fef46f48254da1184113363",
            session_id: "1",
            display_order: "2",
            agenda_detail: [
              {
                agenda_name: "today agenda",
                created_date: "2023-07-24T12:54:56.000Z",
                _id: "d300745f17dc4e1388c2ace23deba252",
                __typename: "Agenda",
              },
            ],
            therapy_detail: [
              {
                therapy_name: "testing mongo",
                _id: "a8bf94e308d04c598d0a06413cf30ef1",
                __typename: "Therapy",
              },
            ],
            __typename: "AgendaList",
          },
        ],
        total: "3",
        __typename: "AgendatListData",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_AGENDA_BY_ID,
    variables: {
      agenda_id: "ebff2f614d904c53be85bc1580b93901",
      updateAgenda: { agenda_status: 0 },
    },
  },
  result: {
    data: {
      updateAdminAgendaById: {
        message: "Agenda edited Successfully",
        result: true,
        __typename: "result",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AgendaPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Render admin agenda list screen", () => {
  it("should render agenda data", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByText("A1")).toBeInTheDocument();
    });
  });

  it("should render agenda data", async () => {
    await sut();
    await waitFor(async () => {
      expect(
        screen.getByTestId("iconButton_delete_f0adacdc72384c7a9d79a8dd273f7523")
      ).toBeInTheDocument();

      fireEvent.click(
        screen.queryByTestId(
          "iconButton_delete_f0adacdc72384c7a9d79a8dd273f7523"
        )
      );
    });

    await waitFor(async () => {
      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Agenda deleted successfully!")
      ).toBeInTheDocument();
    });
  });
});
