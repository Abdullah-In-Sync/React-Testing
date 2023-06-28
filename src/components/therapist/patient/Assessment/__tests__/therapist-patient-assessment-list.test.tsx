import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import TherapyPatientMonitorList from "..";
import { useAppContext } from "../../../../../contexts/AuthContext";
import {
  GET_RISKS_LIST,
  THERAPIST_ASSESSMENT_SUBMIT_ANSWER,
  THERAPIST_GET_PATIENT_ASSESSMENT,
  THERAPIST_SUBMIT_ASSESSMENT,
  THERAPIST_UPDATE_ASSESSMENT_CATEGORY,
  THERAPIST_UPDATE_ASSESSMENT_QUESTION,
  THERAPIST_VIEW_ASSESSMENT,
  THERAPIST_VIEW_ASSESSMENT_QUESTION,
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
            _id: "assessment-id-1",
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
    query: THERAPIST_VIEW_ASSESSMENT,
    variables: {
      assessmentId: "assessment-id-1",
    },
  },
  result: {
    data: {
      therapistviewAssessment: {
        _id: "57450002-c884-4c4a-9b32-4c536135231d",
        name: "test assessment",
        category: [
          {
            _id: "cat1",
            assessment_id: "57450002-c884-4c4a-9b32-4c536135231d",
            name: "update category",
            share_status: 1,
            status: 1,
          },
          {
            _id: "cat2",
            assessment_id: "assement2",
            name: "new cat name",
            share_status: 1,
            status: 1,
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_VIEW_ASSESSMENT_QUESTION,
    variables: {
      patientId: "patient-id",
      categoryId: "cat1",
    },
  },
  result: {
    data: {
      therapistviewAssessmentQs: [
        {
          _id: "ques1",
          added_by: "therapist",
          answer: "tets some",
          question: "1. How are you?",
          category_id: "cat1"
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_VIEW_ASSESSMENT_QUESTION,
    variables: {
      patientId: "patient-id",
      categoryId: "cat2",
    },
  },
  result: {
    data: {
      therapistviewAssessmentQs: [
        {
          _id: "que1cat2",
          added_by: "therapist",
          answer: "",
          question: "1. new ques?",
          category_id: "cat2"
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_ASSESSMENT_SUBMIT_ANSWER,
    variables: {
      categoryId: "cat1",
      patientId: "patient-id",
      quesData: '[{"question_id":"ques1","answer":"tets some"}]',
    },
  },
  result: {
    data: {
      therapistAssessmentSubmitAns: [
        {
          _id: "65169f1a-a68f-4c48-96d6-c2c5fe89e208",
          __typename: "patientAssessmentQs",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_SUBMIT_ASSESSMENT,
    variables: {
      overallAssesmentText: "some",
      pttherapySession: "38",
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

mocksData.push({
  request: {
    query: THERAPIST_UPDATE_ASSESSMENT_CATEGORY,
    variables: {
      categoryId: "cat1",
      patientId: "patient-id",
      updateCat: {
        share_status: 1,
      },
    },
  },
  result: {
    data: {
      therapistUpdateAssessmentCat: {
        _id: "6429593c-6525-4b5c-88f2-004c419d8975",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_UPDATE_ASSESSMENT_QUESTION,
    variables: {
      categoryId: "cat1",
      questionId: "ques1",
      patientId: "patient-id",
      update: { status: 0 }
    },
  },
  result: {
      "data": {
        "therapistUpdateAssessmentQs": [
          {
            "_id": "d3766254-a609-44f1-ad72-c0af8af33d56",
          }
        ]
      }
    }
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
    fireEvent.change(await screen.findByTestId("pttherapySession"), {
      target: { value: "38" },
    });
    const submitAssessmentForm = await screen.findByTestId("submitForm");
    fireEvent.click(submitAssessmentForm);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Overall assessment submitted successfully./i)
    ).toBeInTheDocument();

    const assessmentFirstItem = await screen.findByTestId(
      "assessment_list_item_0"
    );
    fireEvent.click(assessmentFirstItem);
    expect(pushMock).toHaveBeenCalledWith(
      "/therapist/patient/view/patient-id/?mainTab=assessment&assessmentView=clinical-assessment&assessmentId=assessment-id-1"
    );
  });

  it("should render clinical assessment list", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "patient-id",
        mainTab: "assessment",
        assessmentView: "clinical-assessment",
        assessmentId: "assessment-id-1",
      },
      push: pushMock,
    });
    await sut();
    expect(await screen.findByText(/update category/i)).toBeInTheDocument();

    const shareBtn = await screen.findByTestId("iconButton_cat1_0");
    fireEvent.click(shareBtn);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Assessment shared successfully./i)
    ).toBeInTheDocument();

    const toggleContent0 = await screen.findByTestId("toggleContent0");
    fireEvent.click(toggleContent0);

    expect(await screen.findByText(/1. How are you?/i)).toBeInTheDocument();

    const submitButton1 = await screen.findByTestId("submitQuestion_cat1");
    fireEvent.click(submitButton1);
    const tconfirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(tconfirmButton);
    expect(
      await screen.findByText(/Response submitted successfully./i)
    ).toBeInTheDocument();

    const cancelButton = await screen.findByTestId("cancelAddQuestion");
    fireEvent.click(cancelButton);
    const qconfirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(qconfirmButton);
    expect(cancelButton).not.toBeInTheDocument();

    const toggleContent1 = await screen.findByTestId("toggleContent1");
    fireEvent.click(toggleContent1);
    const submitButton2 = await screen.findByTestId("submitQuestion_cat2");
    fireEvent.click(submitButton2);
    expect(
      await screen.findByText(/At least one response required./i)
    ).toBeInTheDocument();

  });

  it("should render delete assessment question", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "patient-id",
        mainTab: "assessment",
        assessmentView: "clinical-assessment",
        assessmentId: "assessment-id-1",
      },
      push: pushMock,
    });
    await sut();
    const toggleContent0 = await screen.findByTestId("toggleContent0");
    fireEvent.click(toggleContent0);
    const deleteButton1 = await screen.findByTestId("iconButtonQuestion_0");
    fireEvent.click(deleteButton1);
    expect(
      await screen.findByText(/Question deleted successfully./i)
    ).toBeInTheDocument();
  })
});
