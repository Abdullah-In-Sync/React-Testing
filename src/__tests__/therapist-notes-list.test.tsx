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
import TherapistNotesList from "../pages/therapist/patient/view/[id]/notes";
import {
  ADD_HOMEWORK,
  ASSIGN_RESOURCE_HOMEWORK,
  COMPLETE_HOMEWORK,
  DELETE_HOMEWORK_TASK,
} from "../graphql/mutation/therapist";
import {
  GET_POPUP_RESOURCE_LIST_DATA,
  GET_THERAPIST_HOMEWORK,
  GET_THERAPIST_HOMEWORK_NOTE_OLD_SESSION_DATA,
  GET_THERAPIST_NOTES_DATA,
} from "../graphql/query/therapist";
import { GET_RISKS_LIST } from "../graphql/assessment/graphql";

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
        {
          _id: "da790381eeb14b5db6d75886ffbb807c",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 2,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "72d5de2b014e49e98e229539146787ff",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 3,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "18834c1137284450958ff52783c352ee",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 4,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "d83e1f973522401eb9b556eca85b8ba8",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 5,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
      ],
    },
  },
});

// Get prefilled data of notes
mocks.push({
  request: {
    query: GET_THERAPIST_NOTES_DATA,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "fc1197672b334ac3b142a3d0d46e97f5",
      pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
    },
  },
  result: {
    data: {
      data: {
        getPatientNotesData: {
          data: {
            patientmeasure: [
              {
                _id: "25c7994b-2d73-488f-b6e3-e01754bd65bc",
                added_by: "admin",
                created_date: "2023-06-19T08:43:10.871Z",
                description: "",
                patient_id: "9620ebf9279946678d4c5d64bdb973ed",
                score: 0,
                score_date: "",
                score_id: "",
                scores_list: null,
                session_no: "",
                share_status: 0,
                status: 1,
                template_data:
                  '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgopwyd6","col1":"how are you ?","col2":"1","col3":"2","col4":"3","col5":"4"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
                template_id: "format2",
                therapist_id: "686802e5123a482681a680a673ef7f53",
                title: "measure ",
                updated_date: "2023-06-19T08:43:10.871Z",
                __typename: "TherapistMeasures",
              },
              {
                _id: "b12cc12c-2c62-4426-ad67-5ebc9ceba25e",
                added_by: null,
                created_date: "2023-05-09T04:23:04.318Z",
                description: "",
                patient_id: "9620ebf9279946678d4c5d64bdb973ed",
                score: 0,
                score_date: "",
                score_id: "",
                scores_list: null,
                session_no: "",
                share_status: 1,
                status: 1,
                template_data:
                  '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"test","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"test","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
                template_id: "format2",
                therapist_id: "686802e5123a482681a680a673ef7f53",
                title: "new",
                updated_date: "2023-07-07T07:35:37.723Z",
                __typename: "TherapistMeasures",
              },
            ],
            patientmonitor: [
              {
                _id: "c5c7bede-f26e-4bd0-af1d-aeab4fac9cee",
                added_by: "therapist",
                created_date: "2023-06-27T12:42:26.025Z",
                name: "fvv",
                org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                patient_id: "9620ebf9279946678d4c5d64bdb973ed",
                status: 1,
                therapist_id: null,
                updated_date: "2023-06-27T12:42:26.025Z",
                __typename: "PatientMonitors",
              },
              {
                _id: "3daa1081-ed24-4690-bcdb-72d077ddc240",
                added_by: "therapist",
                created_date: "2023-06-12T14:05:24.386Z",
                name: "org 2",
                org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                patient_id: "9620ebf9279946678d4c5d64bdb973ed",
                status: 1,
                therapist_id: null,
                updated_date: "2023-06-12T14:05:24.386Z",
                __typename: "PatientMonitors",
              },
            ],
            patientnotes: [
              {
                _id: "d5b8e510-6173-4306-80cb-8c80bced6115",
                created_date: "2023-07-26T05:32:02.402Z",
                patient_id: "9620ebf9279946678d4c5d64bdb973ed",
                patnotes_comments: "",
                patnotes_risk_comment: "Please write the risk",
                patnotes_status: "1",
                patnotes_summary: "Summary 1",
                ptsession_id: "ccf97805-158b-4367-b798-58fbe5c3a7d0",
                pttherapy_id: "951f7fec-b87d-43f5-8860-bba9dd750e96",
                risk_id: "6474a37e19ef06b681dfbf91,6474a3ee19ef06b681dfbf93",
                therapist_id: "686802e5123a482681a680a673ef7f53",
                topic_id: "",
                updated_date: "2023-07-28T08:02:39.015Z",
                __typename: "PatientNotesData",
              },
            ],
            __typename: "PatientNotesList",
          },
        },
      },
    },
  },
});

// Add task 1
mocks.push({
  request: {
    query: ADD_HOMEWORK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "da790381eeb14b5db6d75886ffbb807c",
      therapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
      pthomework_id: "[]",
      pthomewrk_task: "[]",
      lpthomework_id: '["fcce9721-531f-4473-8d5e-2331e9385042"]',
      pthomewrk_resp: "[]",
      therapist_resp: '["therapist response"]',
      notes_id: "",
      notes_risk_comment: undefined,
      notes_summary: undefined,
      risk_id: "",
      pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
    },
  },
  result: {
    data: {
      saveHomeworkTask: {
        result: true,
        __typename: "result",
      },
    },
  },
});

// Add therapist response
mocks.push({
  request: {
    query: ADD_HOMEWORK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "fc1197672b334ac3b142a3d0d46e97f5",
      therapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
      pthomework_id: "[]",
      pthomewrk_task: '["Task 1"]',
      lpthomework_id: "[]",
      pthomewrk_resp: "[]",
      therapist_resp: "[]",
      notes_id: "",
      notes_risk_comment: "risk assessment",
      notes_summary: "Session Summary 1",
      risk_id: "",
      pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
    },
  },
  result: {
    data: {
      saveHomeworkTask: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocks.push({
  request: {
    query: GET_THERAPIST_HOMEWORK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "da790381eeb14b5db6d75886ffbb807c",
      ptsession_no: 2,
      pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
    },
  },
  result: {
    data: {
      therapistViewPatientHomework: {
        data: {
          homework_detail: [],
          last_homework_count: [
            {
              _id: "fc1197672b334ac3b142a3d0d46e97f5",
              count: 1,
              __typename: "lastHomeworkCount",
            },
          ],
          last_homework_list: [
            {
              _id: "fcce9721-531f-4473-8d5e-2331e9385042",
              complete_status: 0,
              created_date: "2023-04-09T14:56:57.154Z",
              patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
              pthomewrk_date: "2023-04-09T14:56:57.154Z",
              pthomewrk_resp: "",
              pthomewrk_status: 1,
              pthomewrk_task: "Task 1",
              ptsession_id: "fc1197672b334ac3b142a3d0d46e97f5",
              ptsharres_id: "",
              resource_detail: null,
              resource_id: "",
              therapist_id: "686802e5123a482681a680a673ef7f53",
              therapist_resp: "",
              therapy_id: "199ca7dc71fe47649fc93e5255843f81",
              __typename: "homeworkList",
            },
          ],
          __typename: "therapistViewPatientHomework",
        },
      },
    },
  },
});

mocks.push({
  request: {
    query: GET_THERAPIST_HOMEWORK_NOTE_OLD_SESSION_DATA,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "fc1197672b334ac3b142a3d0d46e97f5",
      therapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
    },
  },
  result: {
    data: {
      getPatientHomeworkData: {
        data: [
          {
            __typename: "Homework",
            _id: "aa075490-2d11-4293-b18a-a6a3d93a83b4",
            complete_status: "0",
            created_date: "2023-04-11T06:13:09.780Z",
            patient_id: "c318269da3024855b2c74876eb57d296",
            pthomewrk_date: "2023-04-11T11:25:55.988Z",
            pthomewrk_resp: "Res P 2",
            pthomewrk_status: 1,
            pthomewrk_task: "Task 1 updated already exist1",
            ptsession_id: "d7102f5b7e6249bbbdb46e6b9e6285e5",
            ptshareres_id: "",
            resource_id: "",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            therapist_resp: "Res P 2",
            therapy_id: "1c8dfc275db54c9e8bbb4fe4db17e9fc",
          },
        ],
      },
    },
  },
});

mocks.push({
  request: {
    query: DELETE_HOMEWORK_TASK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      pthomework_id: "aa075490-2d11-4293-b18a-a6a3d93a83b4",
    },
  },
  result: {
    data: {
      saveHomeworkTask: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocks.push({
  request: {
    query: COMPLETE_HOMEWORK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      last_session_homeworkid: "fcce9721-531f-4473-8d5e-2331e9385042",
      complete_status: 1,
    },
  },
  result: {
    data: {
      saveHomeworkTask: {
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
      getPopupResourceList: {
        data: [
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
            resource_desc:
              "Add Amar Resource only meleknrflerlnvevnevkevnkvnke",
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
        ],
      },
    },
  },
});

mocks.push({
  request: {
    query: ASSIGN_RESOURCE_HOMEWORK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "fc1197672b334ac3b142a3d0d46e97f5",
      therapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
      session_no: "1",
      pthomework_id: "",
      ptshare_id: "",
      source_id: "3",
      restype: 0,
      resource_id: "6770a67a-22fd-4195-805b-249285d0f426",
    },
  },
  result: {
    data: {
      saveHomeworkTask: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocks.push({
  request: {
    query: GET_RISKS_LIST,
  },
  result: {
    data: {
      getRisksList: [
        {
          _id: "6474a3be19ef06b681dfbf92",
          name: "Risk of exploitation",
          status: 1,
          __typename: "masterRisks",
        },
      ],
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
          <TherapistNotesList setTherapy={"9edcc1cd374e44ab84cf5721a73748d3"} />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
  // await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
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

  test("Renders homework data", async () => {
    await sut();
    await waitFor(async () => {
      const tiles = await screen.findAllByTestId("list-tile");
      expect(tiles.length).toEqual(5);
    });
  });

  it("To get the prefilled data of notes", async () => {
    await sut();
    await waitFor(async () => {
      const list = await screen.findAllByTestId("list-tile");
      expect(list.length).toEqual(5);

      const firstAccordion = list[0];

      fireEvent.click(screen.getByTestId("toggleContent0"));

      expect(screen.getByTestId("add_homework_button")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("add_homework_button"));

      expect(
        within(firstAccordion).queryByTestId("risk_assessment")
      ).toBeInTheDocument();

      await waitFor(async () => {
        // expect(screen.getByTestId("risk_assessment")).toHaveValue(
        //   "Please write the risk"
        // );

        // expect(screen.getByText("Summary 1")).toBeInTheDocument();
        expect(
          within(firstAccordion).queryByTestId("risk_assessment")
        ).toBeInTheDocument();
      });
    });
  });

  it("Update notes and homwork", async () => {
    await sut();
    // await waitFor(async () => {
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(screen.getByTestId("toggleContent0"));

    expect(screen.getByTestId("add_homework_button")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("add_homework_button"));

    expect(
      within(firstAccordion).queryByTestId("homework_task0")
    ).toBeInTheDocument();

    fireEvent.change(screen.queryByTestId("homework_task0"), {
      target: { value: "Task 1" },
    });

    //

    expect(screen.getByTestId("relapsePlanDropdown")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("relapsePlanDropdown"));

    // await waitFor(async () => {
    //   expect(screen.getByText("Risk of exploitation")).toBeInTheDocument();
    // });

    fireEvent.change(screen.queryByTestId("risk_assessment"), {
      target: { value: "risk assessment" },
    });

    fireEvent.change(screen.queryByTestId("session_summary"), {
      target: { value: "Session Summary 1" },
    });

    fireEvent.click(await screen.findByTestId("editTemplateSubmitButton"));

    expect(
      screen.getByText("Are you sure you want to save session notes?")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    await waitFor(async () => {
      expect(screen.getByText("Saved Successfully.")).toBeInTheDocument();
    });

    // });
  });

  it("Get the previous task data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(screen.getByTestId("toggleContent0"));

    expect(screen.getByTestId("add_homework_button")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("add_homework_button"));

    expect(
      within(firstAccordion).queryByTestId("homework_task0")
    ).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByTestId("Pre_homework_task0")).toBeInTheDocument();

      expect(screen.getByTestId("Pre_homework_task0")).toHaveValue(
        "Task 1 updated already exist1"
      );
    });
  });

  it("Get data and update therapist response", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    fireEvent.click(await screen.findByTestId("toggleContent1"));

    await waitFor(async () => {
      expect(screen.getByText("Patient Response")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByTestId("therapist_resp")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("therapist_resp"), {
        target: { value: "therapist response" },
      });
    });

    fireEvent.click(await screen.findByTestId("editTemplateSubmitButton"));

    expect(
      screen.getByText("Are you sure you want to save session notes?")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    await waitFor(async () => {
      expect(screen.getByText("Saved Successfully.")).toBeInTheDocument();
    });
  });

  it("Cancle response", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    fireEvent.click(await screen.findByTestId("toggleContent1"));

    await waitFor(async () => {
      expect(screen.getByText("Patient Response")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByTestId("therapist_resp")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("therapist_resp"), {
        target: { value: "therapist response" },
      });
    });

    fireEvent.click(await screen.findByTestId("editTemplateCancelButton"));

    expect(
      screen.getByText("Are you sure you want to cancel without saving?")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    expect(screen.getByText("Cancel successfully")).toBeInTheDocument();
  });

  it("Delete Homework task", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(screen.getByTestId("toggleContent0"));

    expect(screen.getByTestId("add_homework_button")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("add_homework_button"));

    expect(
      within(firstAccordion).queryByTestId("homework_task0")
    ).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByTestId("button-delete-icon0")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("button-delete-icon0"));

      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(
        screen.getByText("Your task has been deleted successfully.")
      ).toBeInTheDocument();
    });
  });

  it("Compleated homework", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    fireEvent.click(await screen.findByTestId("toggleContent1"));

    // await waitFor(async () => {
    expect(await screen.findByText("Patient Response")).toBeInTheDocument();
    // });

    // await waitFor(async () => {
    expect(await screen.findByText("Completed")).toBeInTheDocument();

    fireEvent.click(await screen.findByText("Completed"));

    expect(
      await screen.findByText(
        "Are you sure, you want to mark last session's homework as completed?"
      )
    ).toBeInTheDocument();

    //   expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

    //   fireEvent.click(screen.queryByTestId("confirmButton"));

    //   expect(
    //     screen.getByText("Your task has been completed successfully.")
    //   ).toBeInTheDocument();
    // });
  });

  it("Get resource popup", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(screen.getByTestId("toggleContent0"));

    expect(screen.getByTestId("add_homework_button")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("add_homework_button"));

    expect(
      within(firstAccordion).queryByTestId("homework_task0")
    ).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByTestId("addResource2_0")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("addResource2_0"));

      expect(screen.getByText("Select Resources")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByTestId("resource_checkbox1")).toBeInTheDocument();
    });
  });

  it("Get resource popup and assign resource.", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(screen.getByTestId("toggleContent0"));

    expect(screen.getByTestId("add_homework_button")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("add_homework_button"));

    expect(
      within(firstAccordion).queryByTestId("homework_task0")
    ).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByTestId("addResource2_0")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("addResource2_0"));

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
        screen.getByText("Resource assigned successfully.")
      ).toBeInTheDocument();
    });
  });
});
