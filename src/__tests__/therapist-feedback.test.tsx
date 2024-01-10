import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import Feedback from "../pages/therapist/feedback";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_TOKEN_DATA,
} from "../graphql/query/common";
import { GET_PATIENTSESSION_DATA } from "../graphql/query/patient";
import { Guid } from "guid-typescript";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { POST_THERAPIST_FEEDBACK_NEW } from "../graphql/mutation";
import { GET_THERAPIST_FEEDBACKLIST_DATA_NEW } from "../graphql/Feedback/graphql";

jest.mock("../contexts/AuthContext");

interface MockOptions {
  getTherapistFeedbackList: boolean;
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
        _id: Guid.create().toString(),
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
  sessionStorage.setItem("patient_name", "test");
  render(
    <MockedProvider mocks={mocks}>
      <SnackbarProvider>
        <Feedback setTherapy={"45f52fa31a7f4884a9a5834f854480f8"} />
      </SnackbarProvider>
    </MockedProvider>
  );
  // await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
  // );
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
      variables: {},
    },
    result: {
      data: [
        {
          _id: _first_patient_id,
          user_type: "therapist",
          parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
          perm_ids: "9,10,14,21,191,65,66",
          user_status: "1",
          created_date: "2021-12-20 16:20:55",
          updated_date: "2021-12-20 16:20:55",
        },
      ],
    },
  });
  // setup and store "Patients" with "MockOptions"
  const _patients: GetPatientTherapyType[] = [];
  _patients.push(
    getPatientTherapy(_first_patient_id, {
      getPatientSessionList: true,
      getTherapistFeedbackList: true,
    })
  );
  _patients.push(
    getPatientTherapy(_second_patient_id, {
      getPatientSessionList: true,
      getTherapistFeedbackList: false,
    })
  );
  _mockDataMap["patients"] = _patients;
  // build mocks for each "Patient" record
  _patients.forEach((_p: GetPatientTherapyType) => {
    // fetch patient therapy query
    _mocks.push({
      request: {
        query: GET_PATIENTTHERAPY_DATA,
        variables: {
          patientId: _p.patient_id,
        },
      },
      result: {
        data: {
          getPatientTherapy: _p.patientsTherapy,
        },
      },
    });

    // build mocks for each "PatientTherapy" record
    _p.patientsTherapy.forEach((_pt: Record<string, any>) => {
      // fetch therapist feedback list query

      _mocks.push({
        request: {
          query: GET_THERAPIST_FEEDBACKLIST_DATA_NEW,
          variables: {
            sessionNo: 1,
            feedbackType: "therapist",
            pttherapyId: "45f52fa31a7f4884a9a5834f854480f8",
          },
        },
        result: {
          data: {
            therapistGetFeedbackList: [
              {
                _id: "18a90ddf-fb2c-47a1-b866-ebd4ef915617",
                created_date: "2023-02-21T05:13:42.591Z",
                description: "Instructions ",
                name: "I am the feedback. ",
                feedback_type: "therapist",
                org_id: "2301536c4d674b3598814174d8f19593",
                organization_name: null,
                patient_name: null,
                questions: [
                  {
                    _id: "e19ecb27-601f-49f0-b396-6ce232a97f44",
                    answer: {
                      _id: "8e0b9381-8ca5-431d-bb8d-5c90a4a18eb1",
                      answer: "Answer",
                      created_date: "2023-02-21T05:21:47.549Z",
                      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
                      pttherapy_id: "45f52fa31a7f4884a9a5834f854480f8",
                      question_id: "e19ecb27-601f-49f0-b396-6ce232a97f44",
                      status: "active",
                      therapist_id: "686802e5123a482681a680a673ef7f53",
                      updated_date: "2023-02-21T05:21:47.549Z",
                      __typename: "FeedbackQuestionAnswer",
                    },
                    answer_options: "",
                    answer_type: "text",
                    created_date: "2023-02-21T05:13:42.623Z",
                    feedback_id: "18a90ddf-fb2c-47a1-b866-ebd4ef915617",
                    question: "Question Type 1",
                    status: "active",
                    updated_date: "2023-02-21T05:13:42.623Z",
                    __typename: "FeedbackQuestions",
                  },
                ],
                session_no: "1",
                status: 1,
                therapist_name: null,
                therapy_name: null,
                updated_date: "2023-02-21T05:13:42.591Z",
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                user_type: "admin",
                visibility: 0,
                __typename: "Feedback",
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
            pttherapyId: "45f52fa31a7f4884a9a5834f854480f8",
            patientId: _pt.patient_id,
          },
        },
        result: {
          data: {
            getPatientSessionList: _patientSessionList,
          },
        },
      });
    });

    _mocks.push({
      request: {
        query: POST_THERAPIST_FEEDBACK_NEW,
        variables: {
          feedQuesAnsData:
            '[{"questionId":"e19ecb27-601f-49f0-b396-6ce232a97f44","answer":"abcd"}]',
          sessionNo: 1,
          pttherapyId: "45f52fa31a7f4884a9a5834f854480f8",
          patientId: "d5653f5a-8529-2c6c-3321-2569e5709745",
        },
      },
      result: {
        data: {
          answerFeedbackByTherapist: [
            {
              _id: "a8b7618b-9991-4ce2-81d5-2eab8c7c62e8",
              created_date: "2023-02-17T08:35:21.956Z",
              description: "Instruction",
              feedback_type: "therapist",
              name: "I am the feedback. ",
              org_id: "2301536c4d674b3598814174d8f19593",
              organization_name: null,
              patient_name: null,
              questions: [
                {
                  _id: "1f7d6c55-b1ab-43b4-b202-5b7b71e86187",
                  answer: null,
                  answer_options: "",
                  answer_type: "text",
                  created_date: "2023-02-17T08:35:21.983Z",
                  feedback_id: "a8b7618b-9991-4ce2-81d5-2eab8c7c62e8",
                  question: "Question Type 1",
                  status: "active",
                  updated_date: "2023-02-17T08:35:21.983Z",
                  __typename: "FeedbackQuestions",
                },
                {
                  _id: "44f0860c-dcc4-4dbf-bd52-286276300b67",
                  answer: null,
                  answer_options: "",
                  answer_type: "text",
                  created_date: "2023-02-17T08:35:22.007Z",
                  feedback_id: "a8b7618b-9991-4ce2-81d5-2eab8c7c62e8",
                  question: "Question Type 2",
                  status: "active",
                  updated_date: "2023-02-17T08:35:22.007Z",
                  __typename: "FeedbackQuestions",
                },
                {
                  _id: "48b9ab02-c495-44f7-a158-fa6dd614f26e",
                  answer: null,
                  answer_options: "",
                  answer_type: "text",
                  created_date: "2023-02-17T08:35:22.013Z",
                  feedback_id: "a8b7618b-9991-4ce2-81d5-2eab8c7c62e8",
                  question: "Question Type 2b",
                  status: "active",
                  updated_date: "2023-02-17T08:35:22.013Z",
                  __typename: "FeedbackQuestions",
                },
              ],
              session_no: "2",
              status: 1,
              therapist_name: null,
              therapy_name: null,
              updated_date: "2023-02-17T08:35:21.956Z",
              user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
              user_type: "admin",
              visibility: 1,
              __typename: "Feedback",
            },
          ],
        },
      },
    });
  });
  // finished building mocks
  _mockDataMap["first_patient_id"] = _first_patient_id;
  _mockDataMap["second_patient_id"] = _second_patient_id;
  return { mocks: _mocks, mockDataMap: _mockDataMap };
};
const { mocks, mockDataMap } = buildMocks();

// tests
describe("Therapist feedback list", () => {
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
  test("is collaped by default", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    // selectFromTherapyDropdown();
    const _pt = filteredPatientTherapy(patient_id, 0);
    await waitFor(async () => {
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
  });

  test("can expand and collapse when clicked", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);

    await waitFor(async () => {
      expect(screen.queryByTestId("panel1bh-header")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("panel1bh-header"));

      expect(screen.queryByTestId("panel1bh-header")).toHaveAttribute(
        "aria-expanded",
        "true"
      );
    });
  });

  test("can expand and collapse when clicked", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    await waitFor(async () => {
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
  });

  // test("Feedback form check inputs validation", async () => {
  //   const patient_id = mockDataMap["first_patient_id"];
  //   await sut(patient_id);
  //   await waitFor(async () => {
  //     fireEvent.click(screen.queryByTestId("panel1bh-header"));

  //     fireEvent.submit(screen.queryByTestId("feedbackForm"));
  //     expect(
  //       screen.getByText("Please attempt all questions")
  //     ).toBeInTheDocument();
  //   });
  // });

  test("Feedback form should submit with valid data", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    fireEvent.click(await screen.findByTestId("panel1bh-header"));
    fireEvent.change(await screen.findByTestId("texBoxInput"), {
      target: { value: "abcd" },
    });

    fireEvent.submit(await screen.findByTestId("feedbackForm"));
    expect(await screen.findByTestId("sureModal")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("confirmButton"));
  });
});
