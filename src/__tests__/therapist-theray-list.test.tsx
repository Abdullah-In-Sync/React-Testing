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
  ASSIGN_RESOURCE_AGENDA,
  GET_PATIENT_AGENDA_DETAILS,
  GET_PATIENT_AGENDA_DETAILS_LIST,
  PATIENT_DELETE_AGENDA_BY_ID,
  PATIENT_SHARE_AGENDA_BY_ID,
  THERAPIST_ADD_ITEM_AGENDA,
} from "../graphql/SafetyPlan/graphql";
import { GET_POPUP_RESOURCE_LIST_DATA } from "../graphql/query/therapist";

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

mocks.push({
  request: {
    query: GET_POPUP_RESOURCE_LIST_DATA,
    variables: {
      therapyId: "9edcc1cd374e44ab84cf5721a73748d3",
      orgId: "myhelp",
      searchText: "",
      myResource: 0,
      myFav: 0,
    },
  },
  result: {
    data: {
      getPopupResourceList: [
        {
          _id: "48c8270d-e5cb-4c21-85b5-57b6fcd50018",
          agenda_id: "",
          category_id: "add7bfe989374f5593ab2167aa4e0669",
          created_date: "2022-12-20T05:25:09.337Z",
          disorder_id: "83b2cc7813764aa9a095e79386805467",
          download_resource_url: null,
          fav_res_detail: [],
          model_id: "60d4284b33f24874a21f20144cd682fc",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          resource_avail_onlyme: "0",
          resource_avail_therapist: "1",
          resource_desc: "AD5567",
          resource_instruction: "AD5567AD5567",
          resource_isformualation: "0",
          resource_issmartdraw: "0",
          resource_name: "AD5567",
          resource_references: "AD5567",
          resource_returnurl: "",
          resource_session_no: "",
          resource_status: 1,
          resource_type: 2,
          resource_url: "",
          updated_date: "2022-12-20T05:25:09.337Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "AdminResourceData",
        },
        {
          _id: "6770a67a-22fd-4195-805b-249285d0f426",
          agenda_id: "",
          category_id: "add7bfe989374f5593ab2167aa4e0669",
          created_date: "2022-11-19T16:09:08.212Z",
          disorder_id: "83b2cc7813764aa9a095e79386805467",
          download_resource_url: null,
          fav_res_detail: [],
          model_id: "60d4284b33f24874a21f20144cd682fc",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          resource_avail_onlyme: "1",
          resource_avail_therapist: "0",
          resource_desc: "Add Amar Resource only meleknrflerlnvevnevkevnkvnke",
          resource_instruction: "Add Amar Resource only me",
          resource_isformualation: "0",
          resource_issmartdraw: "0",
          resource_name: "Add Amar Resource only me",
          resource_references: "Add Amar Resource only me",
          resource_returnurl: "",
          resource_session_no: "",
          resource_status: 1,
          resource_type: 2,
          resource_url: "",
          updated_date: "2022-11-19T16:09:08.212Z",
          user_id: "c0452f3d-a74b-4522-bc60-280278436021",
          user_type: "therapist",
          __typename: "AdminResourceData",
        },
        {
          _id: "15d0c846-f593-41e9-ae3d-bcda5396131f",
          agenda_id: "",
          category_id: "",
          created_date: "2022-10-26T19:46:14.204Z",
          disorder_id: "83b2cc7813764aa9a095e79386805467",
          download_resource_url: null,
          fav_res_detail: [],
          model_id: "60d4284b33f24874a21f20144cd682fc",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          resource_avail_onlyme: "1",
          resource_avail_therapist: "1",
          resource_desc: "",
          resource_instruction: "",
          resource_isformualation: "0",
          resource_issmartdraw: "0",
          resource_name: "admim resource 110",
          resource_references: "",
          resource_returnurl: "",
          resource_session_no: "",
          resource_status: 1,
          resource_type: 4,
          resource_url: "",
          updated_date: "2022-11-05T01:54:06.321Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "AdminResourceData",
        },
      ],
    },
  },
});

mocks.push({
  request: {
    query: ASSIGN_RESOURCE_AGENDA,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptagenda_id: "68c1c055-d2a8-4d02-8977-7af0e9446335",
      ptsharres_id: "",
      resource_id: "6770a67a-22fd-4195-805b-249285d0f426",
      session: 1,
    },
  },
  result: {
    data: {
      patientAgendaAssignResource: {
        message: null,
        result: true,
        __typename: "result",
      },
    },
  },
});

mocks.push({
  request: {
    query: PATIENT_SHARE_AGENDA_BY_ID,
    variables: {
      ptsharres_id: "",
      ptagenda_id: "68c1c055-d2a8-4d02-8977-7af0e9446335",
    },
  },
  result: {
    data: {
      patientAgendaShareResource: {
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

  it("Get resource popup and assign resource.", async () => {
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
      expect(screen.getByTestId("edit-icon-button")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("edit-icon-button"));
    });

    await waitFor(async () => {
      expect(screen.getByText("Select Resources")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByTestId("resource_checkbox1")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("resource_checkbox1"));

      expect(screen.getByTestId("assign_resource_button")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("assign_resource_button"));
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Resource assigned successfully!")
      ).toBeInTheDocument();
    });
  });

  test("Share agenda item", async () => {
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
        expect(screen.getByTestId("share-agenda-button")).toBeInTheDocument();
        fireEvent.click(screen.queryByTestId("share-agenda-button"));
      });

      await waitFor(async () => {
        expect(screen.getByTestId("confirmButton")).toBeInTheDocument();
        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Resource shared successfully!")
        ).toBeInTheDocument();
      });
    });
  });
});
