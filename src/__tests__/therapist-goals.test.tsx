import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/react-testing";
import { GET_THERAPIST_GOALS_DATA } from "../graphql/query/therapist";
import {
  ADD_UPDATE_THERAPIST_GOALS,
  DELETE_THERAPIST_GOALS,
} from "../graphql/mutation/therapist";
import theme from "../styles/theme/theme";
import { ThemeProvider } from "@mui/styles";
import TherapistGoal from "../components/therapist/patient/therapistGoals";

jest.mock("../contexts/AuthContext");

const mocks = [];

// Add Goal
mocks.push({
  request: {
    query: ADD_UPDATE_THERAPIST_GOALS,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
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
      addUpdateTherapistGoal: {
        result: true,
        __typename: "result",
      },
    },
  },
});

// Get goals data
mocks.push({
  request: {
    query: GET_THERAPIST_GOALS_DATA,
    variables: {
      pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getTherapistGoalList: [
        {
          _id: "e15af50b-7a88-4fca-85d1-0cd256a9893e",
          created_date: "2023-05-04T06:19:23.362Z",
          patient_id: "077556c9afb74bf6b727878d50319376",
          ptgoal_achievementdate: "",
          ptgoal_achievementgoal: "vs",
          ptgoal_audio: "",
          ptgoal_file: "",
          ptgoal_mygoal: "ds",
          ptgoal_pregoal: "0",
          ptgoal_reviewdate: "",
          ptgoal_status: "1",
          ptgoal_success: "0",
          ptsession_id: "1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "57400b67aecb46b69358a3379d9b7369",
          updated_date: "2023-05-04T06:19:23.362Z",
          user_type: "therapist",
          __typename: "PatientGoal",
        },
      ],
    },
  },
});

// Update Goal
mocks.push({
  request: {
    query: ADD_UPDATE_THERAPIST_GOALS,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
      achievement_date: "",
      achievement_goal: "vs",
      goal_id: "e15af50b-7a88-4fca-85d1-0cd256a9893e",
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

mocks.push({
  request: {
    query: DELETE_THERAPIST_GOALS,
    variables: {
      goal_id: "e15af50b-7a88-4fca-85d1-0cd256a9893e",
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      deleteTherapistGoal: {
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
          <TherapistGoal setTherapy={"9edcc1cd374e44ab84cf5721a73748d3"} />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
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
      expect(screen.getByTestId("ptgoal_mygoal")).toHaveValue("ds");
    });
  });

  it("Update goal data", async () => {
    await sut();

    expect(screen.getByTestId("addGoalButton")).toBeInTheDocument();

    await waitFor(async () => {
      fireEvent.change(screen.queryByTestId("ptgoal_mygoal"), {
        target: { value: "abcd1234" },
      });

      fireEvent.click(screen.queryByTestId("upadteSaveGoalButton"));

      fireEvent.click(await screen.findByTestId("confirmButton"));

      await waitFor(async () => {
        expect(
          screen.getByText("Your goal has been updated successfully.")
        ).toBeInTheDocument();
      });
    });
  });

  it("Delete goal data", async () => {
    await sut();

    expect(screen.getByTestId("addGoalButton")).toBeInTheDocument();

    await waitFor(async () => {
      expect(screen.getByTestId("updateDelectIcon0")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("updateDelectIcon0"));

      fireEvent.click(await screen.findByTestId("confirmButton"));

      await waitFor(async () => {
        expect(
          screen.getByText("Your Goal has been deleted successfully.")
        ).toBeInTheDocument();
      });
    });
  });
});
