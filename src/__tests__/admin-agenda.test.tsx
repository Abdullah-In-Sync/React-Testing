import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import AgendaPage from "../pages/admin/agenda";
import { GET_ADMIN_AGENDA_LIST } from "../graphql/agenda/graphql";
import { GET_ORGANIZATION_LIST } from "../graphql/query/organization";
import { GET_THERAPIST_LIST_BY_ORG_ID } from "../graphql/mutation/admin";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];
// agenda list
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

//org list
mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
          contract: "Contract",
          created_date: "2022-12-22T06:26:48.828Z",
          logo: "20221228124410__admin_platform_-_preview_template.PNG",
          logo_url: null,
          name: "admin resource draw5",
          panel_color: "3",
          patient: "Pat",
          patient_plural: "Patis",
          patient_welcome_email: "Therapy",
          side_menu_color: "4",
          therapist: "Ther",
          therapy: "Therap",
          __typename: "Organization",
        },
      ],
    },
  },
});

// therapy list
mocksData.push({
  request: {
    query: GET_THERAPIST_LIST_BY_ORG_ID,
    variables: {
      orgId: "",
    },
  },
  result: {
    data: {
      getTherapyListByOrgId: [
        {
          _id: "c77ab990-c449-490c-af78-8c4355e9f44c",
          created_date: "2023-08-23T08:18:10.666Z",
          org_id: " b121273b-f0a9-4c24-89d2-796439923543]",
          therapy_name: "jabjabjabjab",
          therapy_status: 1,
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "TherapyList",
        },
      ],
    },
  },
});

// agenda filter by org
mocksData.push({
  request: {
    query: GET_ADMIN_AGENDA_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      orgId: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
    },
  },
  result: {
    data: {
      getAdminAgendaList: {
        agendalist: [
          {
            _id: "f0adacdc72384c7a9d79a8dd273f7524",
            session_id: "1",
            display_order: "0",
            agenda_detail: [
              {
                agenda_name: "agenda filter by org",
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
        ],
        total: "1",
        __typename: "AgendatListData",
      },
    },
  },
});

// therapy filter by org
mocksData.push({
  request: {
    query: GET_THERAPIST_LIST_BY_ORG_ID,
    variables: {
      orgId: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
    },
  },
  result: {
    data: {
      getTherapyListByOrgId: [
        {
          _id: "c77ab990-c449-490c-af78-8c4355e9f44c",
          created_date: "2023-08-23T08:18:10.666Z",
          org_id: " b121273b-f0a9-4c24-89d2-796439923543]",
          therapy_name: "jabjabjabjab",
          therapy_status: 1,
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "TherapyList",
        },
      ],
    },
  },
});

// agenda filter by org and therapy
mocksData.push({
  request: {
    query: GET_ADMIN_AGENDA_LIST,
    variables: {
      limit: 10,
      pageNo: 1,
      orgId: "d1f2bbd3-3388-4ca2-9d68-55b95574a269",
      therapy_id: "c77ab990-c449-490c-af78-8c4355e9f44c",
    },
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
                agenda_name: "agenda filter by org and therapy",
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
        ],
        total: "1",
        __typename: "AgendatListData",
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

const selectDropDown = async (dropdownTestId) => {
  const selectDropdown = await screen.findByTestId(dropdownTestId);
  expect(selectDropdown).toBeInTheDocument();
  const button = await within(selectDropdown).findByRole("button");
  fireEvent.mouseDown(button);
  const listbox = await within(
    await screen.findByRole("presentation")
  ).findByRole("listbox");
  const options = await within(listbox).findAllByRole("option");
  fireEvent.click(options[1]);
};

describe("Render admin agenda list screen", () => {
  it("should render agenda data", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByText("A1")).toBeInTheDocument();
      await selectDropDown("organizationSelect");
      expect(screen.getByText("agenda filter by org")).toBeInTheDocument();
    });
    await (async () => {
      await selectDropDown("therapySelect");
      expect(
        screen.getByText("agenda filter by org and therapy")
      ).toBeInTheDocument();
    });
  });
});
