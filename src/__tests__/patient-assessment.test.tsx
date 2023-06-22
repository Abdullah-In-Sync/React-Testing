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
      patientAssessmentList: [
        {
          _id: "ab8f28d9-412d-4789-b48f-59fb860fd4e6",
          category: null,
          created_date: "2023-06-20T07:51:32.617Z",
          name: "All",
          patient_id: "5aa455d5de8248848b71c8113118e3f5",
          status: 1,
          updated_date: "2023-06-20T07:51:32.617Z",
          __typename: "PatientAssessment",
        },
      ],
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
