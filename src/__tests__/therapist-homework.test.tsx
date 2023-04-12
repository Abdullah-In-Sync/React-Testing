import {
  screen,
  render,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/react-testing";
import { GET_PATIENTSESSION_DATA } from "../graphql/query/patient";
import TherapyPatientHomeworkIndex from "../pages/therapist/patient/view/[id]/homework";
import { GET_THERAPIST_HOMEWORK } from "../graphql/query/therapist";
import { ADD_HOMEWORK } from "../graphql/mutation/therapist";
import theme from "../styles/theme/theme";
import { ThemeProvider } from "@mui/styles";

jest.mock("../contexts/AuthContext");

const mocks = [];
mocks.push({
  request: {
    query: GET_PATIENTSESSION_DATA,
    variables: {
      pttherapyId: "9edcc1cd374e44ab84cf5721a73748d3",
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getPatientSessionList: [
        {
          _id: "fc1197672b334ac3b142a3d0d46e97f5",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 1,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "da790381eeb14b5db6d75886ffbb807c",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 2,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "72d5de2b014e49e98e229539146787ff",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 3,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "18834c1137284450958ff52783c352ee",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 4,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
        {
          _id: "d83e1f973522401eb9b556eca85b8ba8",
          patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          pttherapy_id: "199ca7dc71fe47649fc93e5255843f81",
          ptsession_no: 5,
          ptsession_status: 1,
          created_date: "2023-04-09T14:37:08.000Z",
          updated_date: null,
          __typename: "PatientSessionData",
        },
      ],
    },
  },
});

// Add task 1
mocks.push({
  request: {
    query: ADD_HOMEWORK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "fc1197672b334ac3b142a3d0d46e97f5",
      therapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
      pthomewrk_task: '["Task 1"]',
      lpthomework_id: "[]",
      pthomewrk_resp: "[]",
      therapist_resp: "[]",
    },
  },
  result: {
    data: {
      saveHomeworkTask: {
        result: true,
        __typename: "result",
      },
    },
  },
});

// Add therapist response
mocks.push({
  request: {
    query: ADD_HOMEWORK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "da790381eeb14b5db6d75886ffbb807c",
      therapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
      pthomewrk_task: '[""]',
      lpthomework_id: '["fcce9721-531f-4473-8d5e-2331e9385042"]',
      pthomewrk_resp: "[]",
      therapist_resp: '["therapist response"]',
    },
  },
  result: {
    data: {
      saveHomeworkTask: {
        result: true,
        __typename: "result",
      },
    },
  },
});

mocks.push({
  request: {
    query: GET_THERAPIST_HOMEWORK,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      ptsession_id: "da790381eeb14b5db6d75886ffbb807c",
      ptsession_no: 2,
      pttherapy_id: "9edcc1cd374e44ab84cf5721a73748d3",
    },
  },
  result: {
    data: {
      therapistViewPatientHomework: {
        homework_detail: [],
        last_homework_count: [
          {
            _id: "fc1197672b334ac3b142a3d0d46e97f5",
            count: 1,
            __typename: "lastHomeworkCount",
          },
        ],
        last_homework_list: [
          {
            _id: "fcce9721-531f-4473-8d5e-2331e9385042",
            complete_status: 0,
            created_date: "2023-04-09T14:56:57.154Z",
            patient_id: "0d4fa8280a3a4a67988bc4a5647dde1f",
            pthomewrk_date: "2023-04-09T14:56:57.154Z",
            pthomewrk_resp: "",
            pthomewrk_status: 1,
            pthomewrk_task: "Task 1",
            ptsession_id: "fc1197672b334ac3b142a3d0d46e97f5",
            ptsharres_id: "",
            resource_detail: null,
            resource_id: "",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            therapist_resp: "",
            therapy_id: "199ca7dc71fe47649fc93e5255843f81",
            __typename: "homeworkList",
          },
        ],
        __typename: "therapistViewPatientHomework",
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
          <TherapyPatientHomeworkIndex
            setTherapy={"9edcc1cd374e44ab84cf5721a73748d3"}
          />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
  // await waitForElementToBeRemoved(() =>
  screen.queryByTestId("activity-indicator");
  // );
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

  test("Renders homework data", async () => {
    await sut();
    await waitFor(async () => {
      const tiles = await screen.findAllByTestId("list-tile");
      expect(tiles.length).toEqual(5);
    });
  });

  it("Update safety plan data", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[0];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    expect(
      within(firstAccordion).queryByTestId("homework_task0")
    ).toBeInTheDocument();

    fireEvent.change(screen.queryByTestId("homework_task0"), {
      target: { value: "Task 1" },
    });

    fireEvent.click(await screen.findByTestId("editTemplateSubmitButton"));

    expect(
      screen.getByText("Are you sure you want to add the homework?")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    await waitFor(async () => {
      expect(
        screen.getByText("Your feedback has been submitted Successfully.")
      ).toBeInTheDocument();
    });

    fireEvent.click(await screen.findByTestId("SuccessOkBtn"));

    await waitFor(async () => {
      expect(screen.getByText("Add Homework")).toBeInTheDocument();
    });
  });

  it("Get data and update therapist response", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[1];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    await waitFor(async () => {
      expect(screen.getByText("Patient Response")).toBeInTheDocument();
    });

    // fireEvent.click(await screen.findByTestId("SuccessOkBtn"));

    await waitFor(async () => {
      expect(screen.getByTestId("therapist_resp")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("therapist_resp"), {
        target: { value: "therapist response" },
      });
    });

    fireEvent.click(await screen.findByTestId("editTemplateSubmitButton"));

    expect(
      screen.getByText("Are you sure you want to add the homework?")
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    await waitFor(async () => {
      expect(
        screen.getByText("Your feedback has been submitted Successfully.")
      ).toBeInTheDocument();
    });

    fireEvent.click(await screen.findByTestId("SuccessOkBtn"));

    await waitFor(async () => {
      expect(screen.getByText("Add Homework")).toBeInTheDocument();
    });
  });

  it("Cancle response", async () => {
    await sut();
    const list = await screen.findAllByTestId("list-tile");
    expect(list.length).toEqual(5);

    const firstAccordion = list[1];

    fireEvent.click(within(firstAccordion).queryByTestId("toggleContent"));

    await waitFor(async () => {
      expect(screen.getByText("Patient Response")).toBeInTheDocument();
    });

    // fireEvent.click(await screen.findByTestId("SuccessOkBtn"));

    await waitFor(async () => {
      expect(screen.getByTestId("therapist_resp")).toBeInTheDocument();

      fireEvent.change(screen.queryByTestId("therapist_resp"), {
        target: { value: "therapist response" },
      });
    });

    fireEvent.click(await screen.findByTestId("editTemplateCancelButton"));

    expect(
      screen.getByText(
        "Are you sure you are canceling the task without saving?"
      )
    ).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));

    expect(
      screen.getByText("Homework cancel successfully")
    ).toBeInTheDocument();
  });
});
