import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import TherapyPatientMonitorList from "../TherapistAssessment";
import { useAppContext } from "../../../../../contexts/AuthContext";
import {
  GET_RISKS_LIST,
  THERAPIST_GET_PATIENT_ASSESSMENT,
  THERAPIST_SUBMIT_ASSESSMENT,
} from "../../../../../graphql/assessment/graphql";
import theme from "../../../../../styles/theme/theme";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../../../../../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_RISKS_LIST,
  },
  result: {
    data: {
      getRisksList: [
        {
          _id: "6474a3be19ef06b681dfbf92",
          name: "Risk of exploitation",
          status: 1,
          __typename: "masterRisks",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_GET_PATIENT_ASSESSMENT,
    variables: {
      patientId: "patient-id",
    },
  },
  result: {
    data: {
      therapistGetPatientAssessment: {
        risk: "6474a3be19ef06b681dfbf92",
        overall_assesment_text: "some",
        list: [
          {
            _id: "81323dss625445cbeb6333222",
            name: "patient assessment",
            patient_id: "patient-id",
          },
        ],
        therapies: [
          {
            _id: "d53615c3-53f0-4d83-86a5-76d2a1cc65c5",
            pttherapy_session: "35",
            pttherapy_status: 1,
            __typename: "PatientTherapy",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_SUBMIT_ASSESSMENT,
    variables: {
      overallAssesmentText: "some",
      pttherapySession: "35",
      risk: "6474a3be19ef06b681dfbf92",
      patientId: "patient-id",
    },
  },
  result: {
    data: {
      therapistSubmitAssessment: {
        risk: "6474a3be19ef06b681dfbf92",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapyPatientMonitorList />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

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

describe("Therapist patient add assessment", () => {
  it("should render patient add assessment form", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "patient-id",
      },
      push: pushMock,
    });
    await sut();
    expect(await screen.findByText(/patient assessment/i)).toBeInTheDocument();
    const submitAssessmentForm = await screen.findByTestId("submitForm");
    fireEvent.click(submitAssessmentForm);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Overall assessment submitted successfully./i)
    ).toBeInTheDocument();
  });
});
