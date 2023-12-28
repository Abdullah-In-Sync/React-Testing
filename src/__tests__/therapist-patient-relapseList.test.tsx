import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import {
  CREATE_THERAPIST_RELAPSE_PLAN,
  GET_RELAPSE_LIST_FOR_THERAPIST,
} from "../graphql/SafetyPlan/graphql";
import theme from "../styles/theme/theme";
import { useAppContext } from "../contexts/AuthContext";
import TherapistRelapsePlanIndex from "../pages/therapist/patient/view/[id]/relapse";
import {
  THERAPIST_GET_ADMIN_RELAPSE_LIST,
  ADD_THERAPIST_RELAPSE_PLAN,
  UPDATE_THERAPIST_RELAPSE_PLAN,
  THERAPIST_VIEW_PATIENT_RELAPSE,
  THERAPIST_CREATE_RELAPSE_QUES,
  DELETE_THERAPIST_RELAPSE_PLAN_QUESTION,
  DELETE_THERAPIST_RELAPSE_PLAN,
} from "../graphql/Relapse/graphql";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

// First vanilla api
mocksData.push({
  request: {
    query: GET_RELAPSE_LIST_FOR_THERAPIST,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getRelapsePlanListByPatientId: {
        data: [
          {
            _id: "1beebad4-4e88-404a-ac8b-8797a300d250",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "Description text detail",
            name: "test name",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "fixed",
            questions: null,
            share_status: 2,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-16T08:11:54.110Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "64104026ceba90e4e27eea01",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "updated desc",
            name: "updated",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "custom",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-13T14:57:35.491Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "64104042ceba90e4e27eea02",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "updated desc",
            name: "updated",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "abcd admin",
            plan_type: "fixed",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-13T14:57:35.491Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "64104becceba90e4e27eea03",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "updated desc",
            name: "My Plan",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "abcd admin",
            plan_type: "fixed",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-13T14:57:35.491Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "649019c0-52df-41a1-9dfb-10bf8cacf339",
            created_date: "2023-03-16T10:20:14.107Z",
            description: "No",
            name: "abcd",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-16T10:20:14.107Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "58faebd8-921f-48eb-8b15-9715433a78aa",
            created_date: "2023-03-16T10:21:00.226Z",
            description: "Nothing",
            name: "abcd2",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-16T10:21:00.226Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "263f36ec-1ee9-4558-b63e-4d814fb1159c",
            created_date: "2023-03-16T10:22:31.511Z",
            description: "Description",
            name: "New 1",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-16T10:22:31.511Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "5af0bff5-ad4b-471d-a96d-664b122fe7a5",
            created_date: "2023-03-16T11:24:42.417Z",
            description: "No ",
            name: "Addition 1",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-16T11:24:42.417Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "8db22959-f9bf-449c-8bc2-f3f8ecd345d1",
            created_date: "2023-03-16T11:35:29.794Z",
            description: "test des",
            name: "test",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-16T11:35:29.794Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "524db97c-fad0-46c3-9db8-855227d1ad9b",
            created_date: "2023-03-17T05:23:08.518Z",
            description: "No",
            name: "Ninja 1",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-17T05:23:08.518Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "4e3988d4-e18e-401a-96ae-ea9df7a74c27",
            created_date: "2023-03-17T06:13:41.801Z",
            description: "No Every",
            name: "Ninja 2 Ninja 2",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-20T05:25:48.767Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "a0b454c2-a0a8-4176-9277-5076a6ce3941",
            created_date: "2023-03-17T06:49:18.510Z",
            description: "Test New Data Text",
            name: "Test Plan Data",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-20T05:52:39.116Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "012973f5-5385-4ed8-876f-dc57891f52ed",
            created_date: "2023-03-17T06:51:06.352Z",
            description: "ABCDEFGH",
            name: "new shubham update 1234 1234 1234",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: null,
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-20T05:20:48.684Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "47343557-14e5-45b5-82f0-5cfafdf42f7c",
            created_date: "2023-03-17T10:44:56.721Z",
            description: "test",
            name: "Test relapse first",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "fixed",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-17T10:44:56.721Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "76b641f9-bf2d-4fd9-ab8b-4922deb99ba4",
            created_date: "2023-03-17T10:45:08.405Z",
            description: "updated desc",
            name: "updated plan",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "fixed",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-17T10:45:08.405Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "69fdcb0d-fb2e-441f-9b45-38c64fdb98db",
            created_date: "2023-03-17T10:45:28.357Z",
            description: "descioprtionton again",
            name: "15thMarch Amar2",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "custom",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-17T10:45:28.357Z",
            __typename: "patientRelapsePlans",
          },
        ],
      },
    },
  },
});

// plantype fixes
mocksData.push({
  request: {
    query: GET_RELAPSE_LIST_FOR_THERAPIST,
    variables: {
      patientId: "4937a27dc00d48bf98b0762ebd",
      planType: "fixed",
    },
  },
  result: {
    data: {
      getRelapsePlanListByPatientId: {
        data: [
          {
            _id: "1beebad4-4e88-404a-ac8b-8797a300d250",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "Description text detail",
            name: "updated plan",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "fixed",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-13T14:57:35.491Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "64104042ceba90e4e27eea02",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "updated desc",
            name: "updated",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "fixed",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-13T14:57:35.491Z",
            __typename: "patientRelapsePlans",
          },
          {
            _id: "64104becceba90e4e27eea03",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "updated desc",
            name: "My Plan",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "fixed",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-13T14:57:35.491Z",
            __typename: "patientRelapsePlans",
          },
        ],
      },
    },
  },
});

// while searching My
mocksData.push({
  request: {
    query: GET_RELAPSE_LIST_FOR_THERAPIST,
    variables: { patientId: "4937a27dc00d483fdcd4b0762ebd", searchText: "My" },
  },
  result: {
    data: {
      getRelapsePlanListByPatientId: {
        data: [
          {
            _id: "64104becceba90e4e27eea03",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "Description text detail",
            name: "My Plan",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_owner: "therapist",
            plan_type: "fixed",
            questions: null,
            share_status: 0,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-13T14:57:35.491Z",
            __typename: "patientRelapsePlans",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: CREATE_THERAPIST_RELAPSE_PLAN,
    variables: {
      planName: "test",
      planDesc: "test des",
      patientId: "4937a27dc00d48bf98b0762ebd",
    },
  },
  result: {
    data: {
      therapistCreateRelapsePlan: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_GET_ADMIN_RELAPSE_LIST,
    variables: {
      orgId: "517fa21a82c0464a92aaae90ae0d5c59",
    },
  },
  result: {
    data: {
      therapistGetAdminRelapseList: {
        data: [
          {
            _id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
            created_date: "2023-03-01T11:48:30.945Z",
            description: "updated desc",
            name: "updated plan",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            organization_name: null,
            plan_type: "fixed",
            status: 1,
            updated_date: "2023-03-10T11:42:53.377Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
          {
            _id: "42680543-ee76-41d2-9b50-0042bdf4da56",
            created_date: "2023-03-15T15:32:45.898Z",
            description: "This is our plan",
            name: "15th March Amar Relapse",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            organization_name: null,
            plan_type: "fixed",
            status: 1,
            updated_date: "2023-03-15T15:32:45.898Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
          {
            _id: "3c2a4a65-521c-4429-bf53-cdcc1e26da8b",
            created_date: "2023-03-15T15:34:44.095Z",
            description: "descioprtionton again",
            name: "15thMarch Amar2",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            organization_name: null,
            plan_type: "custom",
            status: 1,
            updated_date: "2023-03-15T15:34:44.095Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
          {
            _id: "75cabb0d-3cf8-4270-bbac-64c894439965",
            created_date: "2023-03-16T04:34:54.066Z",
            description: "test",
            name: "Test relapse first",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            organization_name: null,
            plan_type: "fixed",
            status: 1,
            updated_date: "2023-03-16T04:34:54.066Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
          {
            _id: "576c2628-131a-4e29-a43f-98b6ff6959c8",
            created_date: "2023-03-17T06:02:53.255Z",
            description: "",
            name: "Withou quest des",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            organization_name: null,
            plan_type: "custom",
            status: 1,
            updated_date: "2023-03-17T06:02:53.255Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "MasterRelapsePlans",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADD_THERAPIST_RELAPSE_PLAN,
    variables: {
      patientId: "4937a27dc00d48bf98b0762ebd",
      planId: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
    },
  },
  result: {
    data: {
      data: {
        therapistAddRelapsePlan: {
          result: true,
          __typename: "result",
        },
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_RELAPSE_PLAN,
    variables: {
      planId: "649019c0-52df-41a1-9dfb-10bf8cacf339",
      updatePlan: { description: "No", name: "NEw value to be" },
    },
  },
  result: {
    data: {
      updateTherapistRelapsePlan: {
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_RELAPSE_PLAN,
    variables: {
      planId: "1beebad4-4e88-404a-ac8b-8797a300d250",
      updatePlan: {
        share_status: 1,
      },
    },
  },
  result: {
    data: {
      updateTherapistSafetyPlanById: {
        result: true,
      },
    },
  },
});

//form ******
mocksData.push({
  request: {
    query: THERAPIST_VIEW_PATIENT_RELAPSE,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
      planId: "1beebad4-4e88-404a-ac8b-8797a300d250",
    },
  },
  result: {
    data: {
      therapistViewPatientRelapse: {
        data: [
          {
            _id: "8c7b42ab-069f-43bc-96bf-79e17c360c5c",
            patient_answer: null,
            created_date: "2023-03-21T06:44:26.774Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            relapse_additional_details: "new",
            plan_id: "1beebad4-4e88-404a-ac8b-8797a300d250",
            relapse_ques: "test as test",
            relapse_ques_status: "1",
            relapse_ques_type: "1",
            relapse_ques_typeoption: "",
            updated_date: "2023-03-21T17:23:04.413Z",
            __typename: "patientRelapsePlanQuestions",
          },
          {
            _id: "4cde17b8-715f-4a6c-8c6d-26ed5eaa402b",
            patient_answer: null,
            created_date: "2023-03-21T08:48:04.326Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            relapse_additional_details: "test",
            plan_id: "1beebad4-4e88-404a-ac8b-8797a300d250",
            relapse_ques: "there",
            relapse_ques_status: "1",
            relapse_ques_type: "2",
            relapse_ques_typeoption: "option1,option3,option5",
            updated_date: "2023-03-21T17:23:04.451Z",
            __typename: "patientRelapsePlanQuestions",
          },
          {
            _id: "938e2819-616f-4f34-86d7-053ef9cc4183",
            patient_answer: null,
            created_date: "2023-03-21T17:07:38.657Z",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            relapse_additional_details: "",
            plan_id: "1beebad4-4e88-404a-ac8b-8797a300d250",
            relapse_ques: "3rd",
            relapse_ques_status: "1",
            relapse_ques_type: "1",
            relapse_ques_typeoption: "",
            updated_date: "2023-03-21T17:23:04.461Z",
            __typename: "patientRelapsePlanQuestions",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_RELAPSE_LIST_FOR_THERAPIST,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-fail",
    },
  },
  result: {
    data: {
      getRelapsePlanListByPatientId: {
        data: [
          {
            _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
            created_date: "2023-03-13T14:57:35.491Z",
            description: "Description text detail",
            name: "test name",
            patient_id: "7a27dc00d48bf983fdcd4b0762ebd-fail",
            plan_owner: "therapist",
            plan_type: "fixed",
            questions: null,
            share_status: 2,
            therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
            updated_date: "2023-03-16T08:11:54.110Z",
            __typename: "patientRelapsePlans",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_VIEW_PATIENT_RELAPSE,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-fail",
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
    },
  },
  result: {
    data: {
      therapistViewPatientRelapse: {
        data: [
          {
            _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
            created_date: "2023-02-03T05:22:57.823Z",
            patient_answer: null,
            patient_id: "7a27dc00d48bf983fdcd4b0762ebd-fail",
            plan_id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
            relapse_additional_details: "Description text detail",
            relapse_ques: "Question text",
            relapse_ques_status: "1",
            relapse_ques_type: "2",
            relapse_ques_typeoption: "option1,option2",
            updated_date: "2023-02-03T05:22:57.823Z",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_VIEW_PATIENT_RELAPSE,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-patient-answer",
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-patient-answer",
    },
  },
  result: {
    data: {
      therapistViewPatientRelapse: {
        data: [
          {
            _id: "3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e-patient-answer",
            created_date: "2023-02-03T05:22:57.823Z",
            patient_answer: "optionset2",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            plan_id: "f5e126b3-6c64-47ec-bbaa-b186a06f5879",
            relapse_additional_details: "Description text detail",
            relapse_ques: "Question text",
            relapse_ques_status: "1",
            relapse_ques_type: "2",
            relapse_ques_typeoption: "option1,optionset2",
            updated_date: "2023-02-03T05:22:57.823Z",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_VIEW_PATIENT_RELAPSE,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-fail",
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
    },
  },
  result: {
    data: {
      therapistViewPatientRelapse: {
        data: [
          {
            _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
            created_date: "2023-02-03T05:22:57.823Z",
            patient_answer: null,
            patient_id: "7a27dc00d48bf983fdcd4b0762ebd-fail",
            plan_id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
            relapse_additional_details: "Description text detail",
            relapse_ques: "Question text",
            relapse_ques_status: "1",
            relapse_ques_type: "2",
            relapse_ques_typeoption: "option1,option2",
            updated_date: "2023-02-03T05:22:57.823Z",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_CREATE_RELAPSE_QUES,
    variables: {
      planId: "1beebad4-4e88-404a-ac8b-8797a300d250",
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
      questions: `[{"questionId":"8c7b42ab-069f-43bc-96bf-79e17c360c5c","question":"test as test","description":"new","questionType":"1","questionOption":"","patientAnswer":null},{"questionId":"4cde17b8-715f-4a6c-8c6d-26ed5eaa402b","question":"there","description":"test","questionType":"2","questionOption":"option1,option3,option5","patientAnswer":null},{"questionId":"938e2819-616f-4f34-86d7-053ef9cc4183","question":"3rd","description":"","questionType":"1","questionOption":"","patientAnswer":null}]`,
    },
  },
  result: {
    data: {
      therapistCreateRelapseQues: {
        result: true,
        message: "Successfully created",
      },
    },
  },
});

mocksData.push({
  request: {
    query: DELETE_THERAPIST_RELAPSE_PLAN_QUESTION,
    variables: {
      questionId: "8c7b42ab-069f-43bc-96bf-79e17c360c5c",
    },
  },
  result: {
    data: {
      deleteTherapistSafetyPlanQs: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocksData.push({
  request: {
    query: DELETE_THERAPIST_RELAPSE_PLAN,
    variables: {
      planId: "1beebad4-4e88-404a-ac8b-8797a300d250",
      updatePlan: { status: 0 },
    },
  },
  result: {
    data: {
      updateTherapistRelapsePlan: {
        result: true,
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistRelapsePlanIndex />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const fillCreateRelapsePlanModalForm = async () => {
  const createPlanButton = await screen.findByTestId("createPlanButton");
  fireEvent.click(createPlanButton);
  //createPlanButton
  const planNameInput = await screen.findByTestId("planName");
  fireEvent.change(planNameInput, {
    target: { value: "test" },
  });

  const planDescriptionInput = await screen.findByTestId("planDescription");

  fireEvent.change(planDescriptionInput, {
    target: { value: "test des" },
  });

  expect(planDescriptionInput).toBeInTheDocument();
};

const submitForm = async () => {
  await sut();
  await fillCreateRelapsePlanModalForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

describe("Therapist patient relapse plan", () => {
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
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        },
      },
    });
  });

  it("should render relapse plan data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("panel1bh-header")).toBeInTheDocument();
      // expect(screen.getByTestId("planTypeSelect")).toBeInTheDocument();
    });
  });

  it("should search base on the search", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d483fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      const searchInput = screen.getByTestId("searchInput");
      expect(searchInput).toBeInTheDocument();

      fireEvent.change(searchInput, {
        target: { value: "My" },
      });

      expect(screen.getByText("Relapse")).toBeInTheDocument();
    });
  });

  it("should change the plane type", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf98b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      const planTypeSelect = screen.getByTestId("planTypeSelect");

      const buttonPlanTypeSelect = within(planTypeSelect).getByRole("button");
      fireEvent.mouseDown(buttonPlanTypeSelect);

      const listboxPlanTypeSelect = within(
        screen.getByRole("presentation")
      ).getByRole("listbox");

      const optionsPlanTypeSelect = within(listboxPlanTypeSelect).getAllByRole(
        "option"
      );

      fireEvent.click(optionsPlanTypeSelect[1]);

      expect(screen.getByText("Relapse")).toBeInTheDocument();
    });
  });

  it("should render therapsit create relapse plan page and submit the form", async () => {
    await submitForm();

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
  });

  it("should render therapist cancel the submition", async () => {
    await submitForm();
    const cancelButton = await screen.findByTestId("cancelForm");
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeInTheDocument();
  });

  it("should add new relapse plan", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf98b0762ebd",
      },
    }));
    await sut();

    const addPlanButton = screen.getByTestId("addPlanButton");
    fireEvent.click(addPlanButton);

    const planTypeSelect = await screen.findByTestId("relapsePlanDropdown");
    fireEvent.click(planTypeSelect);
    expect(planTypeSelect).toBeInTheDocument();

    const buttonPlanTypeSelect = within(planTypeSelect).getByRole("button");
    fireEvent.mouseDown(buttonPlanTypeSelect);

    const listboxPlanTypeSelect = within(
      screen.getByRole("presentation")
    ).getByRole("listbox");
    const optionsPlanTypeSelect = await within(
      listboxPlanTypeSelect
    ).findAllByRole("option");

    fireEvent.click(optionsPlanTypeSelect[0]);

    const addRelapsePlanSubmit = screen.getByTestId("addRelapsePlanSubmit");
    fireEvent.click(addRelapsePlanSubmit);

    expect(
      await screen.findByText(/Plan added Successfully/i)
    ).toBeInTheDocument();
  });

  it("should close modal when cross icon press", async () => {
    await sut();
    const createPlanButton = await screen.findByTestId("createPlanButton");
    fireEvent.click(createPlanButton);
    // fireEvent.click(cancelButton);
    const crossButton = await screen.findByTestId("modalCrossIcon");
    expect(crossButton).toBeInTheDocument();

    fireEvent.click(crossButton);
    expect(crossButton).toBeInTheDocument();
  });

  it("should submit edit relapse form", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const updatePlanButton = await screen.findByTestId("button-edit-icon_4");
    expect(updatePlanButton).toBeInTheDocument();
    fireEvent.click(updatePlanButton);
    const planNameInput = await screen.findByTestId("planName");
    fireEvent.change(planNameInput, {
      target: { value: "NEw value to be" },
    });
    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
  });

  it("should share relapse plan", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const sharePlanButton = await screen.findByTestId("button-share-icon_0");
    expect(sharePlanButton).toBeInTheDocument();
    fireEvent.click(sharePlanButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
  });

  it("should delete relapse plan", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    await waitFor(async () => {
      const deletePlanButton = await screen.findByTestId(
        "button-delete-icon_0"
      );
      expect(deletePlanButton).toBeInTheDocument();
      fireEvent.click(deletePlanButton);
      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("confirmButton"));
      });
    });
  });

  it("should update plan question", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const descTextDetail = await screen.findByText(/Description text detail/i);
    expect(descTextDetail).toBeInTheDocument();
    const editButton = await screen.findByTestId("iconEditButtonQuestion_1");
    fireEvent.click(editButton);
    const saveButton = await screen.findByTestId(
      "submitForm_1beebad4-4e88-404a-ac8b-8797a300d250"
    );
    fireEvent.click(saveButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
  });

  it("should update plan fail", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd-fail",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    const editButton = await screen.findByTestId("iconEditButtonQuestion_1");
    fireEvent.click(editButton);
    const saveButton = await screen.findByTestId(
      "submitForm_b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail"
    );

    fireEvent.click(saveButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const serverError = await screen.findByText(
      /Server error please try later./i
    );
    expect(serverError).toBeInTheDocument();
  });

  it("should cancel plan question", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const editButton = await screen.findByTestId("iconEditButtonQuestion_1");
    fireEvent.click(editButton);

    const descTextDetail = await screen.findByText(/Description text detail/i);
    expect(descTextDetail).toBeInTheDocument();
    const cancelButton = await screen.findByTestId(
      "cancelForm_1beebad4-4e88-404a-ac8b-8797a300d250"
    );

    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });

  it("should delete relapse plan question", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const deleteButton = await screen.findByTestId("iconButtonQuestion_0");

    fireEvent.click(deleteButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
  });

  it("should add and delete new safety plan question", async () => {
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const addQuestionButton = await screen.findByTestId(
      "addNewQuestion_1beebad4-4e88-404a-ac8b-8797a300d250"
    );

    fireEvent.click(addQuestionButton);

    const firstQuestionInput = screen.getByTestId("questions.3.question");
    fireEvent.change(firstQuestionInput, {
      target: { value: "text" },
    });

    const firstDescriptionInput = screen.getByTestId("questions.3.description");
    fireEvent.change(firstDescriptionInput, {
      target: { value: "text des" },
    });

    const firstQuestionTypeSelect = screen.getByTestId(
      "questions.3.questionType"
    );
    fireEvent.click(firstQuestionTypeSelect);
    expect(firstQuestionTypeSelect).toBeInTheDocument();

    const deleteButton = await screen.findByTestId("iconButtonQuestion_3");

    fireEvent.click(deleteButton);
    expect(firstQuestionTypeSelect).not.toBeInTheDocument();
  });

  it("should delete relapse plan question fail", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd-fail",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    fireEvent.click(addButton);
    const deleteButton = await screen.findByTestId("iconButtonQuestion_0");
    fireEvent.click(deleteButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const serverError = await screen.findByText(
      /Server error please try later./i
    );
    expect(serverError).toBeInTheDocument();
  });
});
