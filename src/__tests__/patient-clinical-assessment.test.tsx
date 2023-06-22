import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";
import { GET_PATIENT_ASSESSMENT_CATOGARY_LIST_BY_ASSESSMENT_ID } from "../graphql/query/patient";
import PatientClinicalAssessment from "../pages/patient/assessment/clinicalAssessment/[id]";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENT_ASSESSMENT_CATOGARY_LIST_BY_ASSESSMENT_ID,
    variables: {
      assessment_id: undefined,
    },
  },
  result: {
    data: {
      patientAssessmentCategoryList: {
        _id: "57450002-c884-4c4a-9b32-4c536135231d",
        category: [
          {
            _id: "cd9cd52d-15cf-4364-ad16-1ea751713431",
            assessment_id: "57450002-c884-4c4a-9b32-4c536135231d",
            created_date: "2023-06-03T06:19:31.665Z",
            name: "update category",
            patient_id: "5aa455d5de8248848b71c8113118e3f5",
            share_status: 1,
            status: "1",
            updated_date: "2023-06-03T06:19:31.665Z",
            __typename: "PatientAssessmentCategory",
          },
          {
            _id: "6492b241283a82ebe9b5eeff",
            assessment_id: "57450002-c884-4c4a-9b32-4c536135231d",
            created_date: "2023-06-03T06:19:31.665Z",
            name: "update",
            patient_id: "5aa455d5de8248848b71c8113118e3f5",
            share_status: 1,
            status: "1",
            updated_date: "2023-06-03T06:19:31.665Z",
            __typename: "PatientAssessmentCategory",
          },
        ],
        created_date: "2023-06-03T06:19:31.370Z",
        name: "test assessment",
        patient_id: "5aa455d5de8248848b71c8113118e3f5",
        status: 1,
        updated_date: "2023-06-03T06:19:31.370Z",
        __typename: "PatientAssessment",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <PatientClinicalAssessment />
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

  it("To check the clint assessment list data", async () => {
    await sut();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "42a4964a-5ca6-4d18-9171-4a34d729e3d2",
      },
    }));

    await waitFor(async () => {
      expect(screen.getByTestId("expand_button")).toBeInTheDocument();

      expect(screen.getByTestId("collapse_button")).toBeInTheDocument();

      expect(screen.getByTestId("accordian_test_0")).toBeInTheDocument();
    });
  });
});
