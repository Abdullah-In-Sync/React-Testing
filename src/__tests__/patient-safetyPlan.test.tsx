import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import SafetyPlan from "../pages/patient/safetyPlan/[id]/index";
import { GET_PATIENT_SAFETYPLAN_DETAIL_BY_ID } from "../graphql/query/resource";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AuthContext";
import { UPDATE_SAFETY_PLAN_QUESTION_DATA } from "../graphql/mutation/patient";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_SAFETYPLAN_DETAIL_BY_ID,
  },
  result: {
    data: {
      getPatientSafetyPlanList: [
        {
          _id: "750a6993f61d4e58917e31e1244711f5",
          safety_ans: "Answer",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_SAFETY_PLAN_QUESTION_DATA,
    variables: {
      quesData:
        '[{"_id":"750a6993f61d4e58917e31e1244711f5","safety_ans":"avbv"}]',
    },
  },
  result: {
    data: {
      updateSafetyPlanByPatient: [{ safety_ans: "any" }],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <SafetyPlan />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Admin edit template page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "admin",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
      },
    });
  });

  test("Renders safety plan data", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("safetyPlan-form")).toBeInTheDocument();

      expect(screen.getByTestId("safety_ans")).toHaveValue("Answer");

      expect(screen.getByTestId("safetyPlanSubmitButton")).toBeInTheDocument();
    });
  });

  test("Update safety plan data", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("safetyPlan-form")).toBeInTheDocument();
      fireEvent.change(screen.queryByTestId("safety_ans"), {
        target: { value: "avbv" },
      });

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("safetyPlanSubmitButton"));
      });

      await waitFor(async () => {
        expect(screen.getByText("Updated successfull.")).toBeInTheDocument();
      });
    });
  });
});
