import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";
import { GET_PATIENT_ASSESSMENT_LIST } from "../graphql/query/patient";
import PatientAssessment from "../pages/patient/assessment";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_ASSESSMENT_LIST,
  },
  result: {
    data: {
      patientAssessmentList: {
        data: [
          {
            _id: "267846d0-32a1-4418-b338-8cceb101d6fa",
            category: null,
            created_date: "2023-06-27T14:44:28.383Z",
            name: "All",
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            status: 1,
            updated_date: "2023-06-27T14:44:28.383Z",
            __typename: "PatientAssessment",
          },
        ],
        message: "success",
        result: true,
        __typename: "PatientAssessmentResult",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <PatientAssessment />
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

  it("To check the assessment list data", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByText("All")).toBeInTheDocument();
    });
  });
});
