import {
  screen,
  render,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/react-testing";
import { GET_PATIENTSESSION_DATA } from "../graphql/query/patient";
import TherapyPatientHomeworkIndex from "../pages/therapist/patient/view/[id]/homework";
import {
  GET_POPUP_RESOURCE_LIST_DATA,
  GET_THERAPIST_HOMEWORK_NOTE,
  GET_THERAPIST_HOMEWORK_NOTE_OLD_SESSION_DATA,
} from "../graphql/query/therapist";
import {
  ADD_HOMEWORK,
  ASSIGN_RESOURCE_HOMEWORK,
  COMPLETE_HOMEWORK,
  DELETE_HOMEWORK_TASK,
} from "../graphql/mutation/therapist";
import theme from "../styles/theme/theme";
import { ThemeProvider } from "@mui/styles";

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

// Add task 1
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
      ptsession_id: "da790381eeb14b5db6d75886ffbb807c",
      therapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
      pthomework_id: "[]",
      pthomewrk_task: "[]",
      lpthomework_id: '["fcce9721-531f-4473-8d5e-2331e9385042"]',
      pthomewrk_resp: "[]",
      therapist_resp: '["therapist response"]',
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
    query: GET_THERAPIST_HOMEWORK_NOTE,
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
          {
            _id: "06196d59-bf21-4659-8566-d92d312be257",
            agenda_id: "2994f8c8e92641d09c816bc9f509793b",
            category_id: "377e2ecb5ecd4a50928bbbc4a909b4c3",
            created_date: "2022-10-27T15:52:34.657Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Admin Resource Fourth Data",
            resource_instruction: "Admin Resource Fourth Data",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Admin Resource Fourth Data",
            resource_references: "Admin Resource Fourth Data",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-11-16T11:43:29.721Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "AdminResourceData",
          },
          {
            _id: "a27b328b-39fc-4d50-ba8a-83a543950a4a",
            agenda_id: "",
            category_id: "",
            created_date: "2023-02-24T10:34:36.428Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "ANJALI",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-02-24T10:34:36.428Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "55534a58-a590-4ca3-84bb-7f75f66c119d",
            agenda_id: "",
            category_id: "",
            created_date: "2023-04-10T07:14:56.246Z",
            disorder_id: "f21fb142812544309fb64ee47054333f",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "c5813b8f9d82402eac48e49ba4f066bf",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "ANJALI",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-04-10T07:14:56.246Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "9ad6f3f9-7314-4b76-b48c-ef13a5618ccc",
            agenda_id: "",
            category_id: "",
            created_date: "2023-04-10T09:15:18.674Z",
            disorder_id: "3f577eb0417e437289eb595187a00563",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "85261fd4882749e28d79962e7df358e8",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "ANJALI",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-04-10T09:15:18.674Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "ecf43045-1f6d-4685-b64c-8d2c230788d0",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-11-23T14:09:00.565Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Adding to create Therapist Resource/Worksheet Flow",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Anshita Test 23-11-22",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2022-11-23T14:09:00.565Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "9590f514-7a1e-458a-882a-b99a7a3136a0",
            agenda_id: "",
            category_id: "",
            created_date: "2022-11-25T13:43:33.062Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "Testing for Approval ",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Approval Flow ",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-11-25T13:43:33.062Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "5f9ce338-0ee5-4cd4-9264-2f882a16cf05",
            agenda_id: "1b45473145ef4787b4e82590db95d1cb",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2023-04-17T08:06:19.920Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "April Arrow template",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-04-17T08:06:19.920Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "AdminResourceData",
          },
          {
            _id: "4434514d-c649-4b30-9f5e-c5c45ff85c1c",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-21T09:44:37.718Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Arti ",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-03-21T09:44:37.718Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "0c8cf41d-d10b-4ffd-975d-1ef0f5098a11",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-30T05:16:15.352Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Arti Ch",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-03-30T05:16:15.352Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "52d55f0d-77ae-4580-ac40-a5cda900454e",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-30T05:11:52.159Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Arti Ch ",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-03-30T05:11:52.159Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "b562e09f-94af-4df9-846c-2292f8827732",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-30T05:29:18.195Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Audio testing ",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 3,
            resource_url: "",
            updated_date: "2023-03-30T05:29:18.195Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "386caca6-3b9e-4427-b5f7-74e86d8517f8",
            agenda_id: "",
            category_id: "",
            created_date: "2023-01-31T13:13:27.397Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Create resource 31.1.23",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-01-31T13:13:27.397Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "1c40feae-11df-4309-b357-d3f08391a2ce",
            agenda_id: "",
            category_id: "",
            created_date: "2022-11-07T07:06:33.586Z",
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
            resource_name: "dev test 10",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 4,
            resource_url: "",
            updated_date: "2022-11-07T07:06:33.586Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "AdminResourceData",
          },
          {
            _id: "8382083e-1f17-45b5-90cc-e43f2f7f8478",
            agenda_id: "",
            category_id: "377e2ecb5ecd4a50928bbbc4a909b4c3",
            created_date: "2022-10-27T14:44:55.009Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "GRP Admin Resource",
            resource_instruction: "GRP Admin Resource",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "GRP Admin Resource",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-11-05T02:19:16.508Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "AdminResourceData",
          },
          {
            _id: "2bcfcd52-670e-4278-b1fc-13cc88744286",
            agenda_id: "4d0feab2afcb429085f5638e24c67ebb",
            category_id: "377e2ecb5ecd4a50928bbbc4a909b4c3",
            created_date: "2022-10-27T03:58:14.630Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "GRP Resource",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-10-31T06:05:46.359Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "9b0d75df-0406-4f21-87c8-eeeeb6aae057",
            agenda_id: "",
            category_id: "",
            created_date: "2023-02-27T21:15:44.189Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "1",
            resource_name: "Indi Create 27",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-02-27T21:17:43.295Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "033ae567-e1be-4a43-894b-e78999a194bd",
            agenda_id: "",
            category_id: "",
            created_date: "2023-01-05T12:47:17.820Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "Test",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Indi create resource",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-01-05T12:47:17.820Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "5a9bd358-e762-4308-9dd2-060b0e19ff47",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-08T14:39:22.586Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Indi create resource2",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-03-08T14:39:22.586Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "ca51b5ad-fc99-4398-a7ef-897a8f243bfd",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-08T14:39:22.770Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Indi create resource2",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-03-08T14:39:22.770Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "6aea944b-15fd-4e9c-95c9-e391ce37facc",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-03T06:18:29.189Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Indi Test Data New Data",
            resource_instruction: "Indi Test Data New Data",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Indi Test Data New Data",
            resource_references: "Indi Test Data New Data",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-03T06:22:26.400Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "44803633-7160-44f3-8fe0-c20e6b8251c5",
            agenda_id: "",
            category_id: "",
            created_date: "2022-12-26T13:56:57.355Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "mongo patient",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-26T13:56:57.355Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "e6c93097-4b9a-411e-96ce-97b3df30221f",
            agenda_id: "",
            category_id: "",
            created_date: "2022-12-08T15:29:55.021Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Name",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-08T15:29:55.021Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "770c77e0-d8d8-429e-b5f0-2857bbd937e4",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-09T05:48:06.595Z",
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
            resource_name: "Name therapist",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-09T05:49:00.490Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "7607b598-8fff-429c-886b-389a3b28a036",
            agenda_id: "",
            category_id: "",
            created_date: "2022-12-07T09:07:56.819Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Organization Resource",
            resource_instruction: "Organization Resource",
            resource_isformualation: "Organization Resource",
            resource_issmartdraw: "Organization Resource",
            resource_name: "Organization Update Resource",
            resource_references: "Organization Resource",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-07T09:10:06.646Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "f85ef0d7-a03d-438e-a13f-b5ec96ffc35c",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-10-31T05:33:11.497Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "D",
            resource_instruction: "I",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Patient",
            resource_references: "R",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 3,
            resource_url: "",
            updated_date: "2022-12-08T15:34:04.622Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "813404d963354966a2c5ea3dea03d69b",
            agenda_id: "0",
            category_id: "0",
            created_date: "2022-11-01T09:59:11.000Z",
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
            resource_name: "php side resource",
            resource_references: "",
            resource_returnurl: "therapist/resource/resourcemodel",
            resource_session_no: "0",
            resource_status: 2,
            resource_type: 4,
            resource_url: "",
            updated_date: null,
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "fcb6dfd0-98a2-4b7b-84a5-63aac6f8c2b0",
            agenda_id: "4d0feab2afcb429085f5638e24c67ebb",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-11-17T15:15:10.873Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "test",
            resource_instruction: "test",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "prasanna",
            resource_references: "testt",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 3,
            resource_url: "",
            updated_date: "2022-11-17T15:15:10.873Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "f53330ab-f92d-4f1e-a764-6222103e2e99",
            agenda_id: "",
            category_id: "",
            created_date: "2022-11-01T10:03:07.845Z",
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
            resource_name: "react side resource",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 4,
            resource_url: "",
            updated_date: "2022-11-01T10:03:07.845Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "01c82154-7dbc-4611-820e-585cb7833a76",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-10-28T10:07:11.690Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "sarim_resource",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-10-28T10:07:11.690Z",
            user_id: "fdcd5fc8-3d22-45a7-bf97-2fa787f02ea7",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "823a2072-d29b-45a1-834c-b0256d577bf4",
            agenda_id: "",
            category_id: "",
            created_date: "2022-12-20T12:18:56.063Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "sf",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "sfdsdfsdf",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-20T12:18:56.063Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "516b42d6-0127-4793-b21a-020f34c4395c",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-30T05:31:44.244Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Shinoy ",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-03-30T05:31:44.244Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "c31b2ba4-2d13-4871-99b3-989f17b427ca",
            agenda_id: "c1a36dc34b164168afb8ae14831bfbda",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-20T07:40:40.748Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "Add resource to the Home work",
            resource_instruction: "Follow the Plan",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "smriti test",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-20T07:40:40.748Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "AdminResourceData",
          },
          {
            _id: "e026c8f9-7170-4fb2-a905-8f35d88f035e",
            agenda_id: "4d0feab2afcb429085f5638e24c67ebb",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-07T09:41:45.295Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "Tan ",
            resource_instruction: "Tan",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Tan tan tada",
            resource_references: "Tada",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-07T09:41:45.295Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "AdminResourceData",
          },
          {
            _id: "7ac22f3b-d618-4c0a-b951-4ea48768c1dc",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-10T15:56:02.285Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "template",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-03-10T15:56:02.285Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "7c40c7c5-2c5f-4df7-8e49-aa46c0f1aff2",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-12T05:35:19.204Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "template",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-03-12T05:35:19.204Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "9b8f3af5-789f-481f-99fe-d3e0c2c1d469",
            agenda_id: "",
            category_id: "",
            created_date: "2022-12-18T10:25:54.360Z",
            disorder_id: "f21fb142812544309fb64ee47054333f",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "c5813b8f9d82402eac48e49ba4f066bf",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "sad",
            resource_instruction: "asd",
            resource_isformualation: "0",
            resource_issmartdraw: "1",
            resource_name: "Test Admin TOday",
            resource_references: "sd",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-19T12:22:45.951Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "48c43965-35fe-4e69-83db-ac7cfd87cd4e",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-05T07:01:30.173Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "Test Approve Resource",
            resource_instruction: "Test Approve Resource",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Test Approve Resource",
            resource_references: "Test Approve Resource",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-05T07:02:49.605Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "e0ea83ca-39cd-4e0c-ac93-bfb5ae0dd320",
            agenda_id: "",
            category_id: "",
            created_date: "2023-04-17T07:07:32.516Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "sdfsd",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Test Arrow therapist",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-04-17T07:07:32.516Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "8cbc5bfc-5074-4a5d-8e0c-288c130878fa",
            agenda_id: "",
            category_id: "",
            created_date: "2022-10-29T15:02:06.941Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Test Check Resource",
            resource_instruction: "Test Check Resource",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Test Check Resource",
            resource_references: "Test Check Resource",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-10-29T15:02:06.941Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "3b766889-112e-48a8-87ae-23d1578ef897",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-15T04:37:48.663Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "Test Data Table",
            resource_instruction: "Test Data Table",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Test Data Table",
            resource_references: "Test Data Table",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-15T04:37:48.663Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "0622a045-0696-4e9e-8212-a6b7cf982255",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-27T14:08:32.961Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "test description",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 4,
            resource_url: "",
            updated_date: "2023-03-27T14:08:32.961Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "32adabb9-14fc-418c-8323-2d9abb334eaa",
            agenda_id: "",
            category_id: "",
            created_date: "2022-11-03T03:52:02.137Z",
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
            resource_name: "test dev react 1",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 4,
            resource_url: "",
            updated_date: "2022-11-03T03:52:02.137Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "7531c839-4aa1-47c3-8165-22b8dec06392",
            agenda_id: "",
            category_id: "",
            created_date: "2022-12-28T12:45:11.644Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "Test",
            resource_instruction: "Test",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Test indi template 5",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 2,
            resource_url: "",
            updated_date: "2022-12-28T12:45:11.644Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "4bd48cd8-6625-4cd4-903f-ae30f2a6f4a5",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-17T05:21:50.204Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "fsdf",
            resource_instruction: "sdfsdf",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Test name",
            resource_references: "sdfdsf",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-17T05:21:50.204Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "f020ab84-931b-4f9b-9952-1c9d86a7cbfc",
            agenda_id: "",
            category_id: "",
            created_date: "2022-11-15T11:17:50.114Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Test",
            resource_instruction: "33",
            resource_isformualation: "33",
            resource_issmartdraw: "",
            resource_name: "Test Name Test",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 10,
            resource_url: "",
            updated_date: "2022-11-15T11:17:50.114Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "8b6ac7a9-e77d-459d-83f2-dc9aa52d0b17",
            agenda_id: "",
            category_id: "",
            created_date: "2022-11-16T11:44:24.275Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "dfsf",
            resource_instruction: "sdf",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Test Resource RB - Therapist",
            resource_references: "sdfdf",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-11-16T11:44:24.275Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "d1fdfc65-7311-464a-a88f-0f2cb36c8a58",
            agenda_id: "4d0feab2afcb429085f5638e24c67ebb",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-11-16T11:46:30.776Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "dfsdfds",
            resource_instruction: "dsfds",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Test Resource RB - Therapist",
            resource_references: "sdfdf",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-11-16T11:46:30.776Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "9cc2f108-c73b-4391-862d-5694c083093c",
            agenda_id: "",
            category_id: "",
            created_date: "2022-10-31T04:41:32.581Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "D",
            resource_instruction: "I",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Test therapist ",
            resource_references: "R",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-10-31T04:41:32.581Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "a3ead685-f5be-48bd-bc75-cd7fdb8e9c2b",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2023-02-03T13:06:12.075Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "testing ",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 2,
            resource_url: "",
            updated_date: "2023-02-20T05:46:09.460Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "d504f29e-a482-47af-84dd-d3b40db579ad",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-30T05:06:49.701Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Testing ",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-03-30T05:06:49.701Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "908d3b34-8fc4-4380-b568-c4884d2743cf",
            agenda_id: "",
            category_id: "",
            created_date: "2023-03-21T09:51:01.532Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "0",
            resource_desc: "",
            resource_instruction: "",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Testing 1",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-03-21T09:51:01.532Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "e2114714-18dc-4c91-83e0-7cbd5c98c33e",
            agenda_id: "",
            category_id: "",
            created_date: "2023-01-09T10:57:28.114Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "bd0d22a6c2a44124a524699c74e5909c",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "0",
            resource_avail_therapist: "1",
            resource_desc: "a",
            resource_instruction: "",
            resource_isformualation: "",
            resource_issmartdraw: "1",
            resource_name: "Testing Template view",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2023-01-09T10:57:28.114Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "26f0baf6-08fe-4b4b-804c-9c3d2a0d611b",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-03T09:21:56.227Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Therapist Data",
            resource_instruction: "Therapist Data",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Therapist Data",
            resource_references: "Therapist Data",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 2,
            resource_url: "",
            updated_date: "2022-12-03T09:22:37.168Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "1a7a7c39-76c4-4da1-9b51-540fb97c67d6",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-10T09:50:40.168Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Description ",
            resource_instruction: "Instruction",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Therapist Dev Edit",
            resource_references: "Reference",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-15T06:07:53.769Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "37281e7b-6d7c-404c-9aed-631a163e2668",
            agenda_id: "4d0feab2afcb429085f5638e24c67ebb",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-09T07:44:51.255Z",
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
            resource_name: "Therapist push 1",
            resource_references: "",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-09T07:45:19.825Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "e24518b6-0409-4b06-a5e3-a380a702469b",
            agenda_id: "",
            category_id: "377e2ecb5ecd4a50928bbbc4a909b4c3",
            created_date: "2022-10-27T15:50:48.377Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "Therapist Resource Data",
            resource_instruction: "Therapist Resource Data",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Therapist Resource Data",
            resource_references: "Therapist Resource Data",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 1,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-10-27T15:54:25.806Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            user_type: "therapist",
            __typename: "AdminResourceData",
          },
          {
            _id: "178783d4-ce1f-4d57-a67c-fb85397f3c8e",
            agenda_id: "",
            category_id: "add7bfe989374f5593ab2167aa4e0669",
            created_date: "2022-12-09T12:29:48.702Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            download_resource_url: null,
            fav_res_detail: [],
            model_id: "60d4284b33f24874a21f20144cd682fc",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            resource_avail_onlyme: "1",
            resource_avail_therapist: "1",
            resource_desc: "D",
            resource_instruction: "I",
            resource_isformualation: "0",
            resource_issmartdraw: "0",
            resource_name: "Therapist Resource Edit",
            resource_references: "R",
            resource_returnurl: "",
            resource_session_no: "",
            resource_status: 2,
            resource_type: 1,
            resource_url: "",
            updated_date: "2022-12-09T12:31:14.649Z",
            user_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
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
const sut = async () => {
  // system under test
  sessionStorage.setItem("patient_id", "4937a27dc00d48bf983fdcd4b0762ebd");
  sessionStorage.setItem("patient_name", "test");
  render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapyPatientHomeworkIndex
            setTherapy={"9edcc1cd374e44ab84cf5721a73748d3"}
          />
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

  it("Update safety plan data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    expect(screen.getByTestId("add_homework_button")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("add_homework_button"));

    expect(
      within(firstAccordion).queryByTestId("homework_task0")
    ).toBeInTheDocument();

    fireEvent.change(screen.queryByTestId("homework_task0"), {
      target: { value: "Task 1" },
    });

    fireEvent.click(await screen.findByTestId("editTemplateSubmitButton"));

    expect(
      screen.getByText("Are you sure you want to save?")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    await waitFor(async () => {
      expect(screen.getByText("Saved Successfully.")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByText("Add Homework")).toBeInTheDocument();
    });
  });

  it("Get the previous task data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

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

    const firstAccordion = list[1];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

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
      screen.getByText("Are you sure you want to save?")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    await waitFor(async () => {
      expect(screen.getByText("Saved Successfully.")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByText("Add Homework")).toBeInTheDocument();
    });
  });

  it("Cancle response", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[1];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

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

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

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

    const firstAccordion = list[1];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    await waitFor(async () => {
      expect(screen.getByText("Patient Response")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByText("Completed")).toBeInTheDocument();

      fireEvent.click(screen.queryByText("Completed"));

      expect(
        screen.getByText(
          "Are you sure, you want to mark last session's homework as completed?"
        )
      ).toBeInTheDocument();

      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(
        screen.getByText("Your task has been completed successfully.")
      ).toBeInTheDocument();
    });
  });

  it("Get resource popup", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

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

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

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
  });
});
