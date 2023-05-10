import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";
import { PATIENT_ADD_UPDATE_GOALS } from "../graphql/mutation/patient";
import GoalIndex from "../components/patient/therapyPages/goals";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENT_GOAL_DATA,
} from "../graphql/query/common";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENTTHERAPY_DATA,
  },
  result: {
    data: {
      getPatientTherapy: [
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "10",
          pttherapy_status: 1,
          created_date: "2022-12-13T05:02:22.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "fadb3fc55d1d4c698d0826a6767a7cd8",
          disorder_id: "83b2cc7813764aa9a095e79386805467",
          model_id: "60d4284b33f24874a21f20144cd682fc",
          patient_id: "d8b2974bc1ce4540963851b118247a36",
          therapy_id: "38f5c75b3950498ab548c8ab72a5e2be",
          therapy_detail: {
            _id: "38f5c75b3950498ab548c8ab72a5e2be",
            created_date: "2022-05-31T03:28:28.000Z",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "T2",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "60d4284b33f24874a21f20144cd682fc",
            created_date: "2022-05-31T03:28:53.000Z",
            disorder_id: "83b2cc7813764aa9a095e79386805467",
            model_name: "M1",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "83b2cc7813764aa9a095e79386805467",
            created_date: "2022-05-31T03:28:40.000Z",
            disorder_name: "D2",
            disorder_status: 1,
            therapy_id: "38f5c75b3950498ab548c8ab72a5e2be",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "1",
          pttherapy_status: 1,
          created_date: "2022-12-06T17:01:09.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "4285c508c1664763918ffffb71d90c3f",
          disorder_id: "4af58b3923074fd2bd111708e0145e2a",
          model_id: "bd0d22a6c2a44124a524699c74e5909c",
          patient_id: "d8b2974bc1ce4540963851b118247a36",
          therapy_id: "a8bf94e308d04c598d0a06413cf30ef1",
          therapy_detail: {
            _id: "a8bf94e308d04c598d0a06413cf30ef1",
            created_date: "2021-12-30 16:13:56",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "testing mongo",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "bd0d22a6c2a44124a524699c74e5909c",
            created_date: "2022-10-28T10:22:42.000Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            model_name: "28th amar model",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "4af58b3923074fd2bd111708e0145e2a",
            created_date: "2022-10-28T10:20:38.000Z",
            disorder_name: "28th amar disorder",
            disorder_status: 1,
            therapy_id: "37c3e0ac4f7443a2b2f12afd404936f8",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
      ],
    },
  },
});

// Add Goal
mocksData.push({
  request: {
    query: PATIENT_ADD_UPDATE_GOALS,
    variables: {
      patient_id: null,
      pttherapy_id: "",
      achievement_date: null,
      achievement_goal: "efgh",
      goal_id: "",
      goal_success: undefined,
      patient_goal: "abcd",
      review_date: null,
    },
  },
  result: {
    data: {
      addUpdatePatientGoal: {
        result: true,
        __typename: "result",
      },
    },
  },
});

// Get goals data
mocksData.push({
  request: {
    query: GET_PATIENT_GOAL_DATA,
    variables: { pttherapyId: "fadb3fc55d1d4c698d0826a6767a7cd8" },
  },
  result: {
    data: {
      getPatientGoalList: [
        {
          _id: "3baa11c2-054a-4167-b97b-0b8a9b7fdec3",
          created_date: "2023-05-09T06:00:38.624Z",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          ptgoal_achievementdate: "",
          ptgoal_achievementgoal: "Achivement",
          ptgoal_audio: "",
          ptgoal_file: "",
          ptgoal_mygoal: "Goal",
          ptgoal_pregoal: "0",
          ptgoal_status: "1",
          ptgoal_reviewdate: "",
          ptgoal_success: "0",
          ptsession_id: "1",
          pttherapy_id: "28abbd5cf240405c94ffd35b189c7297",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          updated_date: "2023-05-09T06:00:38.624Z",
          user_type: "patient",
          __typename: "PatientGoal",
        },
      ],
    },
  },
});

// Update Goal
mocksData.push({
  request: {
    query: PATIENT_ADD_UPDATE_GOALS,
    variables: {
      patient_id: null,
      pttherapy_id: "fadb3fc55d1d4c698d0826a6767a7cd8",
      achievement_date: "",
      achievement_goal: "Achivement",
      goal_id: "3baa11c2-054a-4167-b97b-0b8a9b7fdec3",
      patient_goal: "abcd1234",
      review_date: "",
      goal_success: "0",
    },
  },
  result: {
    data: {
      addUpdateTherapistGoal: {
        result: true,
        __typename: "result",
      },
    },
  },
});
const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <GoalIndex />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Admin edit template page", () => {
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
        patient_data: {
          therapist_id: "a8bf94e308d04c598d0a06413cf30ef1",
        },
      },
    });
  });

  it("Add goal", async () => {
    await sut();

    expect(screen.getByTestId("addGoalButton")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("addGoalButton"));

    expect(screen.getByTestId("addGoalTextInput0")).toBeInTheDocument();

    fireEvent.change(screen.queryByTestId("addGoalTextInput0"), {
      target: { value: "abcd" },
    });

    expect(screen.getByTestId("addAchievementTextInput0")).toBeInTheDocument();

    fireEvent.change(screen.queryByTestId("addAchievementTextInput0"), {
      target: { value: "efgh" },
    });

    expect(screen.getByTestId("addGoalSubmitButton")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("addGoalSubmitButton"));

    expect(
      screen.getByText("Are you sure, you want to save the Goal?")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    await waitFor(async () => {
      expect(
        screen.getByText("Your goal has been saved successfully.")
      ).toBeInTheDocument();
    });
  });

  it("Get goal data", async () => {
    await sut();

    expect(screen.getByTestId("addGoalButton")).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByTestId("ptgoal_mygoal")).toBeInTheDocument();
      expect(screen.getByText("Achievement of Goals")).toBeInTheDocument();
      expect(screen.getByTestId("ptgoal_mygoal")).toHaveValue("Goal");
    });
  });

  // it("Update goal data", async () => {
  //   await sut();

  //   expect(screen.getByTestId("addGoalButton")).toBeInTheDocument();

  //   await waitFor(async () => {
  //     fireEvent.change(screen.queryByTestId("ptgoal_mygoal"), {
  //       target: { value: "abcd1234" },
  //     });
  //   });

  //   fireEvent.click(screen.queryByTestId("upadteSaveGoalButton"));

  //   fireEvent.click(await screen.findByTestId("confirmButton"));

  //   expect(
  //     await screen.findByText("Your goal has been updated successfully.")
  //   ).toBeInTheDocument();
  // });
});
