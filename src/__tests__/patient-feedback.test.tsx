import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import Feedback from "../pages/patient/feedback";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_TOKEN_DATA,
  GET_PATIENT_FEEDBACKLIST_DATA_NEW,
} from "../graphql/query/common";
import { POST_PATIENT_FEEDBACK_NEW } from "../graphql/mutation";
import { GET_PATIENTSESSION_DATA } from "../graphql/query/patient";
import { Guid } from "guid-typescript";
import { useAppContext } from "../contexts/AuthContext";

jest.mock("../contexts/AuthContext");

interface MockOptions {
  getPatientFeedbackList: boolean;
  getPatientSessionList: boolean;
}

type GetPatientTherapyType = {
  patient_id: string;
  patientsTherapy: Record<string, any>[];
  mockOptions: MockOptions;
};

// test data

const getPatientTherapy = (
  _patient_id: string,
  _mockOptions: MockOptions
): GetPatientTherapyType => {
  return {
    patient_id: _patient_id,
    patientsTherapy: [
      {
        _id: "test-1",
        patient_id: _patient_id,
        therapy_detail: {
          therapy_name: "localhost",
          _id: "305884c59f804bb6b93001f1bef958da",
        },
        disorder_detail: {
          _id: "449f01139fc44cc685c57068b585bdf4",
          disorder_name: "local order",
        },
        model_detail: {
          _id: "b8cfa7724af247a987d7ce01366fae4c",
          model_name: "local model",
        },
      },
      {
        _id: Guid.create().toString(),
        patient_id: _patient_id,
        therapy_detail: {
          therapy_name: "some-therapy-name",
          _id: "some-therapy-id",
        },
        disorder_detail: {
          _id: "some-disorder-id",
          disorder_name: "some-disorder-name",
        },
        model_detail: {
          _id: "some-model-id",
          model_name: "some-model-name",
        },
      },
    ],
    mockOptions: _mockOptions,
  };
};

const getPatientSessionList = (
  _pt: Record<string, any>,
  _mockOptions: MockOptions
): Record<string, any>[] => {
  if (!_mockOptions.getPatientSessionList) return [];
  return [
    {
      _id: "bc1199d296b9437d8db350d6bad68666",
      patient_id: _pt.patient_id,
      therapist_id: "15b2fce928064732a6df4ffd3e513ed2",
      pttherapy_id: _pt._id,
      ptsession_no: 1,
      ptsession_status: 1,
      created_date: "2022-03-25T13:37:07.000Z",
      updated_date: null,
    },
  ];
};

// helper functions
const filteredPatientTherapy = (
  patient_id: string,
  index: number
): Record<string, any> => {
  return mockDataMap["patients"].filter(
    (_e: GetPatientTherapyType) => _e.patient_id === patient_id
  )[0].patientsTherapy[index];
};

const filteredPatientSessionList = (
  _pttherapy_id: string
): Record<string, any> => {
  return mockDataMap["patientSessionList:" + _pttherapy_id];
};

const sut = async (patient_id: string) => {
  // system under test
  sessionStorage.setItem("patient_id", patient_id);
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <Feedback />
      </SnackbarProvider>
    </MockedProvider>
  );
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

// mocks
const buildMocks = (): {
  mocks: MockedResponse[];
  mockDataMap: Record<string, any>;
} => {
  const _mocks: MockedResponse[] = [];
  const _mockDataMap: Record<string, any> = {};
  const _first_patient_id = Guid.create().toString();
  const _second_patient_id: string = Guid.create().toString();
  // fetch token for user query
  _mocks.push({
    request: {
      query: GET_TOKEN_DATA,
    },
    result: {
      data: {
        getTokenData: {
          _id: _first_patient_id, // use first "Patient" record
          user_type: "patient",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: "1",
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
          patient_data: {
            therapist_id: "686802e5123a482681a680a673ef7f53",
          },
        },
      },
    },
  });
  // setup and store "Patients" with "MockOptions"
  const _patients: GetPatientTherapyType[] = [];
  _patients.push(
    getPatientTherapy(_first_patient_id, {
      getPatientSessionList: true,
      getPatientFeedbackList: true,
    })
  );
  _patients.push(
    getPatientTherapy(_second_patient_id, {
      getPatientSessionList: true,
      getPatientFeedbackList: false,
    })
  );
  _mockDataMap["patients"] = _patients;
  // build mocks for each "Patient" record
  _patients.forEach((_p: GetPatientTherapyType) => {
    // fetch patient therapy query
    _mocks.push({
      request: {
        query: GET_PATIENTTHERAPY_DATA,
      },
      result: {
        data: {
          getPatientTherapy: _p.patientsTherapy,
        },
      },
    });

    _mocks.push({
      request: {
        query: POST_PATIENT_FEEDBACK_NEW,
        variables: {
          feedQuesAnsData:
            '[{"therapist_id":"686802e5123a482681a680a673ef7f53","session_no":1,"questionId":"cbf2dc7a-4d4c-4659-a132-033e76fc3779","answer":"abcd"}]',
          session: 1,
          pttherapyId: "test-1",
        },
      },
      result: {
        data: {
          answerFeedbackByPatient: [
            {
              questions: [
                {
                  answer: {
                    _id: "22c76745-b857-420b-8ae7-df53507f0989",
                    answer:
                      "AAnAnsAnswAnsweAnswerAnsweriAnswerinAnsweringAnswering Answering fAnswering foAnswering forAnswering for Answering for pAnswering for Answering for PAnswering for PyAnswering for PyuAnswering for PyusAnswering for PyushAnswering for Pyush Answering for Pyiush ",
                    created_date: "2023-02-15T07:36:51.542Z",
                    patient_id: "d8b2974bc1ce4540963851b118247a36",
                    pttherapy_id: "fadb3fc55d1d4c698d0826a6767a7cd8",
                    question_id: "cbf2dc7a-4d4c-4659-a132-033e76fc3779",
                    status: "active",
                    therapist_id: "686802e5123a482681a680a673ef7f53",
                    updated_date: "2023-02-15T07:36:51.542Z",
                    __typename: "FeedbackQuestionAnswer",
                  },
                  _id: "cbf2dc7a-4d4c-4659-a132-033e76fc3779",
                  answer_options: "",
                  answer_type: "1",
                  created_date: "2023-02-15T07:20:00.538Z",
                  feedback_id: "ea8b3f8a-0191-4491-80aa-2ef3428c537a",
                  question: "qustion for test 1",
                  status: "active",
                  updated_date: "2023-02-15T07:20:00.538Z",
                  __typename: "FeedbackQuestions",
                },
              ],
              _id: "ea8b3f8a-0191-4491-80aa-2ef3428c537a",
              created_date: "2023-02-15T07:20:00.533Z",
              description: "instruction 3",
              feedback_type: "client",
              name: "test new 3",
              org_id: "517fa21a82c0464a92aaae90ae0d5c59",
              organization_name: null,
              session_no: "1",
              status: 1,
              updated_date: "2023-02-15T07:20:00.533Z",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              visibility: 0,
              __typename: "Feedback",
            },
          ],
        },
      },
    });

    // build mocks for each "PatientTherapy" record
    _p.patientsTherapy.forEach((_pt: Record<string, any>) => {
      // fetch patient feedback list query

      _mocks.push({
        request: {
          query: GET_PATIENT_FEEDBACKLIST_DATA_NEW,
          variables: {
            session: 1,
            pttherapyId: "test-1",
          },
        },
        result: {
          data: {
            patientGetFeedbackList: [
              {
                __typename: "Feedback",
                _id: "ea8b3f8a-0191-4491-80aa-2ef3428c537a",
                created_date: "2023-02-15T07:20:00.533Z",
                description: "instruction 3",
                feedback_type: "client",
                name: "test new 3",
                org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                questions: [
                  {
                    __typename: "FeedbackQuestions",
                    _id: "cbf2dc7a-4d4c-4659-a132-033e76fc3779",
                    answer: {
                      __typename: "FeedbackQuestionAnswer",
                      _id: "22c76745-b857-420b-8ae7-df53507f0989",
                      answer: "Answer",
                      created_date: "2023-02-15T07:36:51.542Z",
                      patient_id: "d8b2974bc1ce4540963851b118247a36",
                      pttherapy_id: "fadb3fc55d1d4c698d0826a6767a7cd8",
                      question_id: "cbf2dc7a-4d4c-4659-a132-033e76fc3779",
                      status: "active",
                      therapist_id: "686802e5123a482681a680a673ef7f53",
                      updated_date: "2023-02-15T07:36:51.542Z",
                    },
                    answer_options: "",
                    answer_type: "1",
                    created_date: "2023-02-15T07:20:00.538Z",
                    feedback_id: "ea8b3f8a-0191-4491-80aa-2ef3428c537a",
                    question: "qustion for test 1",
                    status: "active",
                    updated_date: "2023-02-15T07:20:00.538Z",
                  },
                ],
                session_no: "1",
                status: 1,
                updated_date: "2023-02-15T07:20:00.533Z",
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                user_type: "admin",
                visibility: 0,
              },
            ],
          },
        },
      });

      // fetch patient session query
      const _patientSessionList = getPatientSessionList(_pt, _p.mockOptions);
      _mockDataMap["patientSessionList:" + _pt._id] = _patientSessionList;
      _mocks.push({
        request: {
          query: GET_PATIENTSESSION_DATA,
          variables: {
            pttherapyId: _pt._id,
          },
        },
        result: {
          data: {
            getPatientSessionList: _patientSessionList,
          },
        },
      });
    });
  });
  // finished building mocks
  _mockDataMap["first_patient_id"] = _first_patient_id;
  _mockDataMap["second_patient_id"] = _second_patient_id;
  return { mocks: _mocks, mockDataMap: _mockDataMap };
};
const { mocks, mockDataMap } = buildMocks();

// tests
describe("Patient feedback list", () => {
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
          therapist_id: "686802e5123a482681a680a673ef7f53",
        },
      },
    });
  });

  test("is collaped by default", async () => {
    const patient_id = mockDataMap["first_patient_id"];

    await sut(patient_id);
    const _pt = filteredPatientTherapy(patient_id, 0);
    filteredPatientSessionList(_pt._id).forEach((_v, _k) => {
      const p = _k + 1;
      const panelName = "panel" + p;
      expect(screen.queryByTestId(panelName + "bh-header")).toHaveTextContent(
        "Session " + p
      );
      expect(screen.queryByTestId(panelName + "bh-header")).toHaveAttribute(
        "aria-expanded",
        "false"
      );
      expect(screen.queryByTestId(panelName + "bh-header")).toHaveAttribute(
        "aria-controls",
        panelName + "bh-content"
      );
    });
  });

  test("can expand and collapse when clicked", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    const _pt = filteredPatientTherapy(patient_id, 0);
    filteredPatientSessionList(_pt._id).forEach((_v, _k) => {
      const p = _k + 1;
      const panelName = "panel" + p;
      fireEvent.click(screen.queryByTestId(panelName + "bh-header"));
      expect(screen.queryByTestId(panelName + "bh-header")).toHaveAttribute(
        "aria-expanded",
        "true"
      );
      fireEvent.click(screen.queryByTestId(panelName + "bh-header"));
      expect(screen.queryByTestId(panelName + "bh-header")).toHaveAttribute(
        "aria-expanded",
        "false"
      );
    });
  });

  test("Feedback form check inputs validation", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    await waitFor(async () => {
      const _pt = filteredPatientTherapy(patient_id, 0);
      filteredPatientSessionList(_pt._id).forEach((_v, _k) => {
        const p = _k + 1;
        const panelName = "panel" + p;
        fireEvent.click(screen.queryByTestId(panelName + "bh-header"));
        fireEvent.submit(screen.queryByTestId("feedbackForm"));
        expect(
          screen.getByText("Field can not be left blank")
        ).toBeInTheDocument();
      });
    });
  });

  test("Feedback form should submit with valid data", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);

    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("panel1bh-header"));

      expect(screen.getByTestId("instruction")).toBeInTheDocument();
      expect(screen.getByTestId("texBoxInput")).toBeInTheDocument();
      fireEvent.change(screen.queryByTestId("texBoxInput"), {
        target: { value: "abcd" },
      });
      fireEvent.submit(screen.queryByTestId("feedbackForm"));
      expect(screen.queryByTestId("sureModal")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("feedbackConfirmButton"));

      await waitFor(async () => {
        expect(screen.queryByTestId("SuccessOkBtn")).toBeInTheDocument();
      });

      await waitFor(async () => {
        expect(
          screen.getByText("Your feedback has been submited Successfully")
        ).toBeInTheDocument();
      });

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("SuccessOkBtn"));
      });

      await waitFor(() =>
        expect(screen.queryByTestId("panel1bh-header")).toBeInTheDocument()
      );
    });
  });
});
