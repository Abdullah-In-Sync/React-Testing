import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import { UPDATE_PATIENT_GOAL_BY_ID } from "../graphql/mutation/patient";
import GoalIndex from "../pages/patient/goals";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENT_GOAL_DATA,
} from "../graphql/query/common";
import { Guid } from "guid-typescript";

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
//Goals data based on therapy id
mocksData.push({
  request: {
    query: GET_PATIENT_GOAL_DATA,
    variables: {
      pttherapyId: "fadb3fc55d1d4c698d0826a6767a7cd8",
    },
  },
  result: {
    data: {
      getPatientGoalList: [
        {
          _id: "fadb3fc55d1d4c698d0826a6767a7cd8",
          created_date: "2022-12-13T04:55:38.000Z",
          patient_id: "d8b2974bc1ce4540963851b118247a36",
          ptgoal_achievementdate: "2022-12-13",
          ptgoal_achievementgoal: "aaa1",
          ptgoal_audio: "",
          ptgoal_file: "",
          ptgoal_mygoal: "Did you talk with two person?",
          ptgoal_pregoal: "",
          ptgoal_reviewdate: "2022-12-02",
          ptgoal_status: "1",
          ptgoal_success: "3",
          ptsession_id: "1",
          pttherapy_id: "4285c508c1664763918ffffb71d90c3f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          updated_date: "2022-12-15T15:54:29.476Z",
          __typename: "PatientGoal",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PATIENT_GOAL_BY_ID,
    variables: {
      ptGoalId: undefined,
      update: {
        ptgoal_achievementgoal: "Show updated",
      },
    },
  },
  result: {
    data: {
      updatePatientGoalById: {
        _id: "6b3cf08d81594b7da1c20f73f433b5c2ass3",
        created_date: "2022-12-13T05:07:26.000Z",
        patient_id: "d8b2974bc1ce4540963851b118247a36",
        ptgoal_achievementdate: "2022-12-13",
        ptgoal_audio: "",
        ptgoal_achievementgoal: "Show updated 12345",
        ptgoal_file: "",
        ptgoal_mygoal: "T2/D2/M1 goal question",
        ptgoal_pregoal: "",
        ptgoal_status: "1",
        ptgoal_reviewdate: "2022-12-13",
        ptgoal_success: "3",
        ptsession_id: "1",
        pttherapy_id: "fadb3fc55d1d4c698d0826a6767a7cd8",
        updated_date: "2022-12-16T11:57:31.170Z",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        __typename: "PatientGoal",
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

  test("Renders goals data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "fadb3fc55d1d4c698d0826a6767a7cd8",
      },
    }));
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("goals-form")).toBeInTheDocument();

      expect(screen.getByTestId("ptgoal_mygoal")).toBeInTheDocument();

      expect(screen.getByTestId("ptgoal_mygoal")).toHaveValue(
        "Did you talk with two person?"
      );
      expect(screen.getByTestId("ptgoal_reviewdate")).toHaveValue("2022-12-02");
      expect(screen.getByTestId("ptgoal_achievementgoal")).toHaveValue("aaa1");
      expect(screen.getByTestId("ptgoal_achievementdate")).toHaveValue(
        "2022-12-13"
      );
    });
  });

  it("submit edited value", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        ptGoalId: "fadb3fc55d1d4c698d0826a6767a7cd8",
      },
    });

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("ptgoal_achievementgoal")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("ptgoal_achievementgoal"), {
        target: { value: "Show updated" },
      });

      expect(screen.getByTestId("ptgoal_success")).toBeInTheDocument();
    });
    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "safetyPlanSubmitButton_fadb3fc55d1d4c698d0826a6767a7cd8"
        )
      ).toBeInTheDocument();
    });

    fireEvent.click(
      screen.queryByTestId(
        "safetyPlanSubmitButton_fadb3fc55d1d4c698d0826a6767a7cd8"
      )
    );

    await waitFor(async () => {
      expect(screen.queryByTestId("sureModal")).toBeInTheDocument();
    });

    expect(screen.getByTestId("editGoalConfirmButton")).toBeVisible();

    fireEvent.click(screen.queryByTestId("editGoalConfirmButton"));
    await waitFor(async () => {
      expect(screen.getByText("Goal saved Successfully")).toBeInTheDocument();
    });
  });

  it("Cancle edited value", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        ptGoalId: "fadb3fc55d1d4c698d0826a6767a7cd8",
      },
    });

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("ptgoal_achievementgoal")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("ptgoal_achievementgoal"), {
        target: { value: "Show updated" },
      });
    });
    await waitFor(async () => {
      expect(
        screen.getByTestId(
          "safetyPlanSubmitButton_fadb3fc55d1d4c698d0826a6767a7cd8"
        )
      ).toBeInTheDocument();
    });

    fireEvent.click(
      screen.queryByTestId(
        "safetyPlanSubmitButton_fadb3fc55d1d4c698d0826a6767a7cd8"
      )
    );

    await waitFor(async () => {
      expect(screen.queryByTestId("sureModal")).toBeInTheDocument();
    });

    expect(screen.getByTestId("editGoalCancelButton")).toBeVisible();

    fireEvent.click(screen.queryByTestId("editGoalCancelButton"));
    expect(screen.queryByTestId("ptgoal_achievementdate")).toBeInTheDocument();
  });

  test("can select a different therapy", async () => {
    await sut();

    fireEvent.change(screen.queryByTestId("selectTherapy"), {
      target: { value: "38f5c75b3950498ab548c8ab72a5e2be" },
    });
    expect(screen.queryAllByTestId("boxId").length).toBe(1);
  });
});
