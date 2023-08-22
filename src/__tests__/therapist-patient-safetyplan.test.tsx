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
  ADD_THERAPIST_SAFETY_PLAN,
  CREATE_THERAPIST_SAFETY_PLAN,
  GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
  UPDATE_THERAPIST_SAFETY_PLAN,
  GET_THERAPIST_SAFETY_PLAN_LIST,
  VIEW_PATIENT_SAFETY_PLAN_BY_ID,
  UPDATE_THERAPIST_SAFETY_PLAN_QUESTION,
  DELETE_THERAPIST_SAFETY_PLAN,
  DELETE_THERAPIST_SAFETY_PLAN_QUESTION,
} from "../graphql/SafetyPlan/graphql";
import TherapistSafetyPlanIndex from "../pages/therapist/patient/view/[id]/safetyPlan";
import theme from "../styles/theme/theme";
import { useAppContext } from "../contexts/AuthContext";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../contexts/AuthContext");
const mocksData = [];

// First vanilla api
mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
          created_date: "2023-01-23T05:24:08.166Z",
          description: "Test New Data Text",
          plan_owner: "admin",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "custom",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "4f5bc4ca-5daf-422a-819f-04ea7580d628",
          created_date: "2023-01-23T05:26:20.179Z",
          description: "plans safety",
          plan_owner: "admin",
          name: "safety_plans",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-fail",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
          created_date: "2023-01-23T05:24:08.166Z",
          description: "Test New Data Text",
          plan_owner: "admin",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "custom",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-update-pat-res",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-update",
          created_date: "2023-01-23T05:24:08.166Z",
          description: "test-response -patient side",
          plan_owner: "admin",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "custom",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-patient-answer",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-patient-answer",
          created_date: "2023-01-23T05:24:08.166Z",
          description: "Test New Data Text",
          plan_owner: "admin",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "custom",
          __typename: "patientSafetyPlans",
          share_status: 1,
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: VIEW_PATIENT_SAFETY_PLAN_BY_ID,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd",
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
    },
  },
  result: {
    data: {
      viewPatientSafetyPlanById: [
        {
          _id: "3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e",
          created_date: "2023-02-03T05:22:57.823Z",
          patient_answer: null,
          patient_id: "7a27dc00d48bf983fdcd4b0762ebd",
          plan_id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
          safety_additional_details: "",
          safety_ques: "Question text",
          safety_ques_status: "1",
          safety_ques_type: "2",
          safety_ques_typeoption: "option1,option2",
          updated_date: "2023-02-03T05:22:57.823Z",
          __typename: "patientSafetyPlanQuestions",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: VIEW_PATIENT_SAFETY_PLAN_BY_ID,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-update-pat-res",
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-update",
    },
  },
  result: {
    data: {
      viewPatientSafetyPlanById: [
        {
          _id: "60f60b02-663f-4abd-8e90-0b324adcdadb-update",
          created_date: "2023-08-19T10:28:02.253Z",
          patient_answer: "I didnt excersize",
          patient_id: "7a27dc00d48bf983fdcd4b0762ebd-update-pat-res",
          plan_id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-update",
          safety_additional_details: "desc",
          safety_ques: "What did you done?",
          safety_ques_status: "1",
          safety_ques_type: "1",
          safety_ques_typeoption: "",
          updated_date: "2023-08-19T10:36:49.976Z",
          __typename: "patientSafetyPlanQuestions",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: VIEW_PATIENT_SAFETY_PLAN_BY_ID,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-fail",
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
    },
  },
  result: {
    data: {
      viewPatientSafetyPlanById: [
        {
          _id: "3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e-fail",
          created_date: "2023-02-03T05:22:57.823Z",
          patient_answer: null,
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_id: "f5e126b3-6c64-47ec-bbaa-b186a06f5879",
          safety_additional_details: "",
          safety_ques: "Question text",
          safety_ques_status: "1",
          safety_ques_type: "2",
          safety_ques_typeoption: "option1,option2",
          updated_date: "2023-02-03T05:22:57.823Z",
          __typename: "patientSafetyPlanQuestions",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: VIEW_PATIENT_SAFETY_PLAN_BY_ID,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-patient-answer",
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-patient-answer",
    },
  },
  result: {
    data: {
      viewPatientSafetyPlanById: [
        {
          _id: "3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e-patient-answer",
          created_date: "2023-02-03T05:22:57.823Z",
          patient_answer: "optionset2",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_id: "f5e126b3-6c64-47ec-bbaa-b186a06f5879",
          safety_additional_details: "Description text detail",
          safety_ques: "Question text",
          safety_ques_status: "1",
          safety_ques_type: "2",
          safety_ques_typeoption: "option1,optionset2",
          updated_date: "2023-02-03T05:22:57.823Z",
          __typename: "patientSafetyPlanQuestions",
        },
        {
          _id: "3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e-patient-answer3",
          created_date: "2023-02-03T05:22:57.823Z",
          patient_answer: "optionset3",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_id: "f5e126b3-6c64-47ec-bbaa-b186a06f5879",
          safety_additional_details: "Description text detail",
          safety_ques: "Question text2",
          safety_ques_status: "1",
          safety_ques_type: "2",
          safety_ques_typeoption: "option1,optionset3",
          updated_date: "2023-02-03T05:22:57.823Z",
          __typename: "patientSafetyPlanQuestions",
        },
        {
          _id: "3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e-patient-answer4",
          created_date: "2023-02-03T05:22:57.823Z",
          patient_answer: "optionset4",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_id: "f5e126b3-6c64-47ec-bbaa-b186a06f5879",
          safety_additional_details: "Description text detail",
          safety_ques: "Question text3",
          safety_ques_status: "1",
          safety_ques_type: "2",
          safety_ques_typeoption: "option1,optionset4",
          updated_date: "2023-02-03T05:22:57.823Z",
          __typename: "patientSafetyPlanQuestions",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: VIEW_PATIENT_SAFETY_PLAN_BY_ID,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-fail",
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
    },
  },
  result: {
    data: {
      viewPatientSafetyPlanById: [
        {
          _id: "3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e-fail",
          created_date: "2023-02-03T05:22:57.823Z",
          patient_answer: null,
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_id: "f5e126b3-6c64-47ec-bbaa-b186a06f5879",
          safety_additional_details: "",
          safety_ques: "Question text",
          safety_ques_status: "1",
          safety_ques_type: "2",
          safety_ques_typeoption: "option1,option2",
          updated_date: "2023-02-03T05:22:57.823Z",
          __typename: "patientSafetyPlanQuestions",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_SAFETY_PLAN_QUESTION,
    variables: {
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
      patientId: "7a27dc00d48bf983fdcd4b0762ebd",
      questions:
        '[{"questionId":"3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e","question":"Question text","description":"","questionType":"2","questionOption":"option1,option2"}]',
    },
  },
  result: {
    data: {
      createSafetyPlanQuestions: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_SAFETY_PLAN_QUESTION,
    variables: {
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail",
      patientId: "7a27dc00d48bf983fdcd4b0762ebd-fail",
      questions:
        '[{"questionId":"3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e","question":"Question text","description":"","questionType":"2","questionOption":"option1,option2"}]',
    },
  },
  result: {
    data: {
      createSafetyPlanQuestions: {
        result: false,
        __typename: "result",
      },
    },
  },
});

// plantype fixes
mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
      planType: "fixed",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
          created_date: "2023-01-23T05:24:08.166Z",
          description: "Test New Data Text",
          plan_owner: "admin",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "4f5bc4ca-5daf-422a-819f-04ea7580d628",
          created_date: "2023-01-23T05:26:20.179Z",
          description: "plans safety",
          plan_owner: "admin",
          name: "safety_plans",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

// while searching sa
mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "4937a27dc00d483fdcd4b0762ebd",
      searchText: "sa",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "4f5bc4ca-5daf-422a-819f-04ea7580d628",
          created_date: "2023-01-23T05:26:20.179Z",
          description: "plans safety",
          plan_owner: "admin",
          name: "safety_plans",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: CREATE_THERAPIST_SAFETY_PLAN,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
      planDesc: "test des",
      planName: "test",
    },
  },
  result: {
    data: {
      createTherapistSafetyPlan: {
        _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
        __typename: "result",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_SAFETY_PLAN,
    variables: {
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
      updatePlan: {
        description: "Test New Data Text",
        name: "Test Plan Data",
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

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_SAFETY_PLAN,
    variables: {
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
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

mocksData.push({
  request: {
    query: DELETE_THERAPIST_SAFETY_PLAN,
    variables: {
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
      updatePlan: { status: 0 },
    },
  },
  result: {
    data: {
      updateTherapistSafetyPlan: {
        share_status: 0,
        __typename: "patientSafetyPlans",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_SAFETY_PLAN_LIST,
    variables: {
      orgId: "517fa21a82c0464a92aaae90ae0d5c59",
    },
  },
  result: {
    data: {
      getTherapistSafetyPlanList: [
        {
          _id: "72ecbec9-9868-443a-8265-d7c3b9fe760b",
          description: "Test New Data Text",
          name: "Test Plan Data",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-01-05T06:05:35.531Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-03T07:00:31.445Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "ae10a89c-26e4-400e-b9c8-423aa4c01212",
          description: "test desc",
          name: "new plan version",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "1",
          status: 1,
          updated_date: "2023-01-12T11:04:18.429Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-12T11:04:18.429Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "2cebec06-c5b4-4a4b-8596-99654c3794ff",
          description: "test desc",
          name: "new plan version",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-01-12T11:09:58.524Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-12T11:09:58.524Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "c15132ab-a70f-44ca-8721-9342bc67278b",
          description: "test des",
          name: "jan plan",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-01-12T13:13:02.652Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-12T13:13:02.652Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "c6bd39e6-5e89-4d26-9a5e-0a672f799a99",
          description: "plans safety",
          name: "march plan",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-01-17T12:15:17.288Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-12T13:18:35.125Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "ecfc9a70-af75-4a94-8980-fb70c38fd34b",
          description: "asadf asdf",
          name: "k;k;",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "all",
          status: 1,
          updated_date: "2023-01-23T17:21:15.698Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-23T17:21:15.698Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "e65394b3-55cb-4fd1-84f9-348fc346fbf7",
          description: "",
          name: "asdf",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed, custom",
          status: 1,
          updated_date: "2023-01-24T05:05:41.345Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-24T05:05:41.345Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "a1f36035-9143-47e0-8f21-8ea83ba6d5cb",
          description: "des",
          name: "test check new ",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed, custom",
          status: 1,
          updated_date: "2023-01-24T13:09:10.873Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-24T13:09:10.873Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "b6412086-3b13-4dce-a633-7af5af05121f",
          description: "asdf",
          name: "test",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "custom",
          status: 1,
          updated_date: "2023-01-24T13:13:24.841Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-24T13:13:24.841Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "8ca1ed3e-e253-4995-80c1-f6574092bf40",
          description: "asdf",
          name: "test",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-01-24T14:29:45.060Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-24T14:29:45.060Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "2e0ab149-ce0f-4a10-9677-368301f0dba6",
          description: "adf",
          name: "test",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-01-24T14:44:53.311Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-24T14:44:53.311Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "ab695f8a-7a25-49b0-8ac4-e8a47969eb79",
          description: "this is the descirption for my new safety plan",
          name: "amar 30thJan",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-01-30T13:02:17.540Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-30T12:44:36.823Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "200f207a-90cf-468c-9497-330d9383a638",
          description: "and this is how it is ygm? descrition yeahh",
          name: "amarsafety 300122",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "custom",
          status: 1,
          updated_date: "2023-01-30T12:46:29.131Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-30T12:46:29.131Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "465bf7b7-7a5e-475c-9759-2eb562fad278",
          description:
            "this is the overall plan description for messi update 1234",
          name: "Plan Name update",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-01-31T06:25:26.800Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-30T12:48:44.814Z",
          __typename: "MasterSafetyPlans",
        },
        {
          _id: "389a1633-2fdc-4eae-9324-9e92a382ad5a",
          description: "this is the main description of the whole thingy majig",
          name: "amar 31stJan",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "custom",
          status: 1,
          updated_date: "2023-01-31T12:38:16.162Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          created_date: "2023-01-31T12:37:33.354Z",
          __typename: "MasterSafetyPlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ADD_THERAPIST_SAFETY_PLAN,
    variables: { patientId: undefined, planId: undefined },
  },
  result: {
    data: {
      addTherapistSafetyPlan: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocksData.push({
  request: {
    query: DELETE_THERAPIST_SAFETY_PLAN_QUESTION,
    variables: {
      questionId: "3d13474a-24fd-4ae6-adb9-d2a3ecdeed6e",
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

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistSafetyPlanIndex />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const fillCreateSafeyPlanModalForm = async () => {
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
  await fillCreateSafeyPlanModalForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

describe("Therapist patient safety plan", () => {
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

  it("should render safety plan data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
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
        target: { value: "sa" },
      });

      expect(screen.getByText("safety_plans")).toBeInTheDocument();
    });
  });

  it("should change the plane type", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
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

      expect(screen.getByText("Test Plan Data")).toBeInTheDocument();
    });
  });

  it("should render admin create safety plan page and submit the form", async () => {
    await submitForm();

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should render admin cancel the submition", async () => {
    await submitForm();
    const cancelButton = await screen.findByTestId("cancelForm");
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeInTheDocument();
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

  it("should submit edit safety form", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const updatePlanButton = await screen.findByTestId("button-edit-icon_0");
    expect(updatePlanButton).toBeInTheDocument();
    fireEvent.click(updatePlanButton);
    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should share safety plan", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
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
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("submit form with valid data to add safety plan.", async () => {
    const mockRouter = {
      push: jest.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("addPlanButton")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("addPlanButton"));

      expect(screen.getByTestId("addSubmitForm")).toBeInTheDocument();
      expect(screen.getByTestId("name")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("name"), {
        target: { value: "2" },
      });
      fireEvent.click(screen.queryByTestId("addSubmitForm"));

      await waitFor(async () => {
        expect(screen.getByText("Plan added Successfully")).toBeInTheDocument();
      });
    });
  });

  it("should delete safety plan", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
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
      expect(screen.getByTestId("SuccessOkBtn")).toBeInTheDocument();
    });
  });

  it("should update plan question", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const saveButton = await screen.findByTestId(
      "submitForm_b605e3f4-9f2a-48fe-9a76-9c7cebed6027"
    );
    fireEvent.click(saveButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    waitFor(() => {
      const okButton = screen.queryByTestId("SuccessOkBtn");
      expect(okButton).toBeInTheDocument();
    });
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
    const saveButton = await screen.findByTestId(
      "submitForm_b605e3f4-9f2a-48fe-9a76-9c7cebed6027-fail"
    );

    fireEvent.click(saveButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    const serverError = await screen.findByText(
      /Server error please try later./i
    );
    expect(serverError).toBeInTheDocument();
  });

  it("should cancel plan question", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const cancelButton = await screen.findByTestId(
      "cancelForm_b605e3f4-9f2a-48fe-9a76-9c7cebed6027"
    );

    fireEvent.click(cancelButton);
  });

  it("should delete safety plan question", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const deleteButton = await screen.findByTestId("iconButtonQuestion_0");

    fireEvent.click(deleteButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
    fireEvent.click(okButton);
  });

  it("should add and delete new safety plan question", async () => {
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);

    const addQuestionButton = await screen.findByTestId(
      "addNewQuestion_b605e3f4-9f2a-48fe-9a76-9c7cebed6027"
    );

    fireEvent.click(addQuestionButton);

    const firstQuestionInput = screen.getByTestId("questions.1.question");
    fireEvent.change(firstQuestionInput, {
      target: { value: "text" },
    });

    const firstDescriptionInput = screen.getByTestId("questions.1.description");
    fireEvent.change(firstDescriptionInput, {
      target: { value: "text des" },
    });

    const firstQuestionTypeSelect = screen.getByTestId(
      "questions.1.questionType"
    );
    fireEvent.click(firstQuestionTypeSelect);
    expect(firstQuestionTypeSelect).toBeInTheDocument();

    const deleteButton = await screen.findByTestId("iconButtonQuestion_1");

    fireEvent.click(deleteButton);
    expect(firstQuestionTypeSelect).not.toBeInTheDocument();
  });

  it("should delete safety plan question fail", async () => {
    (useRouter as jest.Mock).mockClear();
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

  it("should load patient response", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd-patient-answer",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    fireEvent.click(addButton);

    const patientResponse = await screen.findByText(/optionset2/i);
    const patientResponse2 = await screen.findByText(/optionset3/i);
    const patientResponse3 = await screen.findByText(/optionset4/i);
    expect(patientResponse).toBeInTheDocument();
    expect(patientResponse2).toBeInTheDocument();
    expect(patientResponse3).toBeInTheDocument();
  });

  it("should update patient response", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd-update-pat-res",
      },
    }));
    await sut();
    const addButton = await screen.findByTestId("button-add-icon_0");
    fireEvent.click(addButton);
    expect(
      await screen.findByTestId("iconEditButtonQuestion_1")
    ).toBeInTheDocument();

    const patientResponse = await screen.findByText(/I didnt excersize/i);
    fireEvent.change(patientResponse, {
      target: { value: "response3" },
    });
    expect(await screen.findByText(/response3/i)).toBeInTheDocument();
  });
});
