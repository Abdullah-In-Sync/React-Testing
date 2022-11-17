import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import Feedback from "../pages/patient/feedback";
import {
  GET_PATIENTTHERAPY_DATA,
  GET_PATIENTFEEDBACKLIST_DATA,
  GET_TOKEN_DATA,
} from "../graphql/query/common";
import { POST_PATIENT_FEEDBACK } from "../graphql/mutation";
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

const getPatientFeedbackList = (
  _pt: Record<string, any>,
  _mockOptions: MockOptions
): Record<string, any>[] => {
  if (!_mockOptions.getPatientFeedbackList) return [];
  return [
    {
      _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
      answer_options: ["p", "q", "r", "s"],
      answer_type: "list",
      created_date: "2022-07-09T15:39:07.173Z",
      feedback_ans: {
        _id: "29e9e456-20cb-4d0d-81fb-1e718342f74c",
        answer: "p",
        created_date: "2022-07-09T15:53:28.900Z",
        patient_id: _pt.patient_id,
        question_id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
        pttherapy_id: _pt._id,
        status: "active",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        updated_date: "2022-07-09T15:53:28.900Z",
      },
      feedback_type: "session",
      org_id: "517fa21a82c0464a92aaae90ae0d5c59",
      question: "test1",
      session_no: 1,
      status: "active",
      updated_date: "2022-07-09T15:43:05.395Z",
      user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
    },
    {
      _id: "9b04def7-c012-44ca-98f2-6060d90b9a26",
      answer_options: "",
      answer_type: "text",
      created_date: "2022-07-09T15:39:07.173Z",
      feedback_ans: {
        _id: "29e9e456-20cb-4d0d-81fb-1e718342f74c",
        answer: "ans2",
        created_date: "2022-07-09T15:53:28.900Z",
        patient_id: _pt.patient_id,
        question_id: "9b04def7-c012-44ca-98f2-6060d90b9a26",
        pttherapy_id: _pt._id,
        status: "active",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        updated_date: "2022-07-09T15:53:28.900Z",
      },
      feedback_type: "session",
      org_id: "517fa21a82c0464a92aaae90ae0d5c59",
      question: "test2",
      session_no: 1,
      status: "active",
      updated_date: "2022-07-09T15:43:05.395Z",
      user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
    },
  ];
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

    // update feedback result
    _mocks.push({
      request: {
        query: POST_PATIENT_FEEDBACK,
        variables: {
          feedQuesAnsData: [
            {
              therapist_id: "686802e5123a482681a680a673ef7f53",
              answer: "s",
              session_no: 1,
              question_id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
            },
          ],
          sessionNo: 1,
          feedbackType: "session",
          pttherapyId: "test-1",
        },
      },
      result: {
        data: {
          postPatientFeedback: {
            _id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
            answer_options: ["p", "q", "r", "s"],
            answer_type: "radio",
            created_date: "2022-07-09T15:39:07.173Z",
            feedback_ans: {
              _id: "29e9e456-20cb-4d0d-81fb-1e718342f74c",
              answer: "p",
              created_date: "2022-07-09T15:53:28.900Z",
              patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
              question_id: "9b04def7-c012-44ca-98f2-6060d90b9a25",
              pttherapy_id: "test-1",
              status: "active",
              therapist_id: "686802e5123a482681a680a673ef7f53",
              updated_date: "2022-07-09T15:53:28.900Z",
            },
            feedback_type: "session",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            question: "test1",
            session_no: 1,
            status: "active",
            updated_date: "2022-07-09T15:43:05.395Z",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          },
        },
      },
    });

    // build mocks for each "PatientTherapy" record
    _p.patientsTherapy.forEach((_pt: Record<string, any>) => {
      // fetch patient feedback list query
      const _patientFeedbackList = getPatientFeedbackList(_pt, _p.mockOptions);
      _mockDataMap["patientFeedbackList:" + _pt._id] = _patientFeedbackList;
      _mocks.push({
        request: {
          query: GET_PATIENTFEEDBACKLIST_DATA,
          variables: {
            sessionNo: 1,
            feedbackType: "session",
            pttherapyId: "test-1",
          },
        },
        result: {
          data: {
            getPatientFeedbackList: _patientFeedbackList,
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

  test("to have the correct number of sessions shown", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    const _pt = filteredPatientTherapy(patient_id, 0);
    expect(screen.queryAllByTestId("SessionPanelItem").length).toBe(
      filteredPatientSessionList(_pt._id).length
    );
  });

  test("can select a different therapy", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    const patientTherapyId = filteredPatientTherapy(patient_id, 1)._id;
    fireEvent.change(screen.queryByTestId("selectTherapy"), {
      target: { value: patientTherapyId },
    });

    expect(screen.queryAllByTestId("SessionPanelItem").length).toBe(
      filteredPatientSessionList(patientTherapyId).length
    );
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

  test("when expanded the default view is session feedback", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    const _pt = filteredPatientTherapy(patient_id, 0);
    filteredPatientSessionList(_pt._id).forEach((_v, _k) => {
      const p = _k + 1;
      const panelName = "panel" + p;
      fireEvent.click(screen.queryByTestId(panelName + "bh-header"));
      expect(
        screen.queryByTestId(panelName + "bh-content-session-button")
      ).toHaveClass("bg-themegreen");
      expect(
        screen.queryByTestId(panelName + "bh-content-quality-button")
      ).not.toHaveClass("bg-themegreen");
    });
  });

  test("the session feedback is displayed correctly when expanded", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    const _pt = filteredPatientTherapy(patient_id, 0);
    filteredPatientSessionList(_pt._id).forEach((_v, _k) => {
      const p = _k + 1;
      const panelName = "panel" + p;
      fireEvent.click(screen.queryByTestId(panelName + "bh-header"));
      fireEvent.click(
        screen.queryByTestId(panelName + "bh-content-session-button")
      );
      expect(
        screen.queryByTestId(panelName + "bh-content-session-button")
      ).toHaveClass("bg-themegreen");
      expect(
        screen.queryByTestId(panelName + "bh-content-quality-button")
      ).not.toHaveClass("bg-themegreen");
      expect(
        screen.queryByTestId(panelName + "bh-content-session-button")
      ).toHaveTextContent("Session Feedback");
    });
  });

  test("the quality feedback is displayed correctly when expanded", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    const _pt = filteredPatientTherapy(patient_id, 0);
    filteredPatientSessionList(_pt._id).forEach((_v, _k) => {
      const p = _k + 1;
      const panelName = "panel" + p;
      fireEvent.click(screen.queryByTestId(panelName + "bh-header"));
      fireEvent.click(
        screen.queryByTestId(panelName + "bh-content-quality-button")
      );
      expect(
        screen.queryByTestId(panelName + "bh-content-session-button")
      ).not.toHaveClass("bg-themegreen");
      expect(
        screen.queryByTestId(panelName + "bh-content-quality-button")
      ).toHaveClass("bg-themegreen");
      expect(
        screen.queryByTestId(panelName + "bh-content-quality-button")
      ).toHaveTextContent("Quality Feedback");
    });
  });

  test("Feedback form check inputs validation", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
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

  test("Feedback form should submit with data", async () => {
    const patient_id = mockDataMap["first_patient_id"];
    await sut(patient_id);
    const _pt = filteredPatientTherapy(patient_id, 0);
    filteredPatientSessionList(_pt._id).forEach((_v, _k) => {
      const p = _k + 1;
      const panelName = "panel" + p;
      fireEvent.click(screen.queryByTestId(panelName + "bh-header"));
      fireEvent.click(screen.getByLabelText("s"));
      fireEvent.submit(screen.queryByTestId("feedbackForm"));
      expect(screen.queryByTestId("submitFeedback")).toBeDisabled();
    });
  });
});
