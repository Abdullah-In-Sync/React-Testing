import {
  screen,
  render,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/react-testing";
import { GET_PATIENTSESSION_DATA } from "../graphql/query/patient";
import theme from "../styles/theme/theme";
import { ThemeProvider } from "@mui/styles";
import TherapisTherapyList from "../pages/therapist/therapy";
import {
  GET_DISORDER_DATA_BY_ORG_ID,
  GET_MODEL_BY_DISORDERID_DATA,
} from "../graphql/query/common";
import {
  ADD_THERAPIST_ADD_AGENDA,
  GET_PATIENT_AGENDA_DETAILS,
  GET_PATIENT_AGENDA_DETAILS_LIST,
  PATIENT_DELETE_AGENDA_BY_ID,
  THERAPIST_ADD_ITEM_AGENDA,
} from "../graphql/SafetyPlan/graphql";

jest.mock("../contexts/AuthContext");

const mocks = [];
mocks.push({
  request: {
    query: GET_PATIENTSESSION_DATA,
    variables: {
      pttherapyId: "9edcc1cd374e44ab84cf5721a73748d3",
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getPatientSessionList: [
        {
          _id: "fc1197672b334ac3b142a3d0d46e97f5",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 1,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
      ],
    },
  },
});

mocks.push({
  request: {
    query: GET_DISORDER_DATA_BY_ORG_ID,
    variables: {
      orgId: "myhelp",
    },
  },
  result: {
    data: {
      getDisorderByOrgId: [
        {
          _id: "disorder_id_1",
          user_type: "therapist",
          disorder_name: "disorder 1",
        },
      ],
    },
  },
});

mocks.push({
  request: {
    query: GET_MODEL_BY_DISORDERID_DATA,
    variables: {
      disorderId: "disorder_id_1",
    },
  },
  result: {
    data: {
      getModelByDisorderId: [
        {
          _id: "model_id_1",
          model_name: "model_id_1",
        },
        {
          _id: "model_id_2",
          model_name: "model_id_2",
        },
      ],
    },
  },
});

mocks.push({
  request: {
    query: ADD_THERAPIST_ADD_AGENDA,
    variables: {
      disorder_id: "disorder_id_1",
      model_id: "model_id_1",
      patient_id: undefined,
    },
  },
  result: {
    data: { data: { addPatientAgenda: null } },
  },
});

mocks.push({
  request: {
    query: GET_PATIENT_AGENDA_DETAILS,
    variables: { patient_id: "4937a27dc00d48bf983fdcd4b0762ebd" },
  },
  result: {
    data: {
      data: {
        getPatientAgendaDetail: {
          message: null,
          result: true,
          __typename: "result",
        },
      },
    },
  },
});

mocks.push({
  request: {
    query: GET_PATIENT_AGENDA_DETAILS_LIST,
    variables: { session: 1, patient_id: "4937a27dc00d48bf983fdcd4b0762ebd" },
  },
  result: {
    data: {
      getPatientAgendaList: [
        {
          _id: "68c1c055-d2a8-4d02-8977-7af0e9446335",
          type: "agenda",
          agenda_id: "c68d0dca482f452f96c8cf6f24428d5a",
          agenda_name: "Agenda to beat blues ",
          display_order: 0,
          resource_id: "",
          ptsharres_id: "",
          share_status: 0,
          created_date: "2023-07-31T08:23:05.181Z",
          updated_date: "2023-07-31T08:23:05.181Z",
          __typename: "PatientAgenda",
        },
      ],
    },
  },
});
mocks.push({
  request: {
    query: PATIENT_DELETE_AGENDA_BY_ID,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptagenda_id: "68c1c055-d2a8-4d02-8977-7af0e9446335",
    },
  },
  result: {
    data: {
      patientDeleteAgenda: {
        message: null,
        result: true,
        __typename: "result",
      },
    },
  },
});

mocks.push({
  request: {
    query: THERAPIST_ADD_ITEM_AGENDA,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      display_order: 1,
      agenda_name: "My name is agenda",
      session: 1,
    },
  },
  result: {
    data: {
      addPatientAgendaItem: {
        message: null,
        result: true,
        __typename: "result",
      },
    },
  },
});
const sut = async () => {
  // system under test
  sessionStorage.setItem("patient_id", "4937a27dc00d48bf983fdcd4b0762ebd");
  sessionStorage.setItem("patient_name", "test");
  render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapisTherapyList
            setTherapy={"9edcc1cd374e44ab84cf5721a73748d3"}
          />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
  // await waitForElementToBeRemoved(() =>
  // screen.queryByTestId("activity-indicator");
  // );
};

// tests
describe("Therapist client feedback list", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        therapist_data: {
          _id: "therapist_id",
          org_id: "myhelp",
        },
      },
    });
  });

  test("Renders agenda data", async () => {
    await sut();
    await waitFor(async () => {
      const tiles = await screen.findAllByTestId("list-tile");
      expect(tiles.length).toEqual(1);
    });
  });

  test("Add agenda", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("addAgendaButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("addAgendaButton"));

      await waitFor(async () => {
        expect(screen.getByTestId("addSubmitForm")).toBeInTheDocument();

        fireEvent.change(screen.queryByTestId("disorder_id"), {
          target: { value: "disorder_id_1" },
        });
        await expect(
          (await screen.findByTestId("disorder_id")).getAttribute("value")
        ).toBe("disorder_id_1");
      });

      await waitFor(async () => {
        fireEvent.change(screen.queryByTestId("model_id"), {
          target: { value: "model_id_1" },
        });
        expect(screen.queryByTestId("model_id").getAttribute("value")).toBe(
          "model_id_1"
        );
      });

      fireEvent.click(screen.queryByTestId("addSubmitForm"));

      await waitFor(async () => {
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText(
            "Agenda added Successfully, You can not add agenda again"
          )
        ).toBeInTheDocument();
      });
    });
  });

  test("Delete agenda item list", async () => {
    await sut();
    await waitFor(async () => {
      await sut();
      const list = await screen.findAllByTestId("list-tile");

      const firstAccordion = list[0];

      await fireEvent.click(
        within(firstAccordion).queryByTestId("toggleContent")
      );

      await waitFor(async () => {
        expect(screen.getByTestId("addAgendaItemButton")).toBeInTheDocument();
        expect(screen.queryAllByTestId("table-row").length).toBe(1);
        expect(screen.getByTestId("edit-icon-button")).toBeInTheDocument();
        expect(screen.getByTestId("delete-icon-button")).toBeInTheDocument();
        fireEvent.click(screen.queryByTestId("delete-icon-button"));
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

  test("Add agenda item", async () => {
    await sut();
    await waitFor(async () => {
      await sut();
      const list = await screen.findAllByTestId("list-tile");

      const firstAccordion = list[0];

      await fireEvent.click(
        within(firstAccordion).queryByTestId("toggleContent")
      );

      await waitFor(async () => {
        expect(screen.getByTestId("addAgendaItemButton")).toBeInTheDocument();
        fireEvent.click(screen.queryByTestId("addAgendaItemButton"));
      });

      await waitFor(async () => {
        expect(screen.getByTestId("display_order")).toBeInTheDocument();
        expect(screen.getByTestId("agenda_name")).toBeInTheDocument();

        fireEvent.change(screen.queryByTestId("display_order"), {
          target: { value: 1 },
        });
        fireEvent.change(screen.queryByTestId("agenda_name"), {
          target: { value: "My name is agenda" },
        });

        fireEvent.click(screen.queryByTestId("addSubmitForm"));
      });

      await waitFor(async () => {
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();
        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Agenda item added successfully!")
        ).toBeInTheDocument();
      });
    });
  });
});
