import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import theme from "../styles/theme/theme";
import { useAppContext } from "../contexts/AuthContext";
import { GET_THRAPIST_MY_MONITOR_LIST } from "../graphql/query/patient";
import TherapyMyMonitorList from "../pages/therapist/patient/view/[id]/monitors/myMonitor";
import {
  DELETE_THERAPIST_MY_MONITOR,
  SHARE_THERAPIST_MY_MONITOR,
} from "../graphql/mutation/therapist";
import {
  GET_THERAPIST_MONITOR_SHARE_PATIENT_LIST,
  GET_THERAPIST_MY_MONITOR_VIEW,
} from "../graphql/SafetyPlan/graphql";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../contexts/AuthContext");
const mocksData = [];

mocksData.push({
  request: {
    query: GET_THRAPIST_MY_MONITOR_LIST,
  },
  result: {
    data: {
      therapistMyMonitorList: [
        {
          _id: "ce3b10f2-e867-4606-a9ab-634af57e280d",
          created_date: "2023-05-16T08:32:21.097Z",
          name: "Therapist Create Monitor",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          status: 1,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          updated_date: "2023-05-16T08:32:21.097Z",
          __typename: "TherapistMonitors",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_MY_MONITOR_VIEW,

    variables: { monitor_id: "ce3b10f2-e867-4606-a9ab-634af57e280d" },
  },
  result: {
    data: {
      viewMonitorById: [
        {
          _id: "e99e67c5-4d3a-41d1-a586-d71242d47c20",
          created_date: "2023-05-24T08:30:38.333Z",
          monitor_question: [
            {
              _id: "4c951016-4d73-4be8-817b-4ddd7e30d2c5",
              created_date: "2023-05-24T08:30:38.345Z",
              monitor_id: "e99e67c5-4d3a-41d1-a586-d71242d47c20",
              question: "Question type 1",
              question_option: "a,b,c,d",
              question_type: "list",
              status: 1,
              updated_date: "2023-05-24T08:30:38.345Z",
              __typename: "TherapistMonitorsQues",
            },
          ],
          name: "vjj",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          status: 1,
          therapist_id: "686802e5123a482681a680a673ef7f53",
          updated_date: "2023-05-24T08:30:38.333Z",
          __typename: "TherapistViewMonitors",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: DELETE_THERAPIST_MY_MONITOR,
    variables: { monitor_id: "ce3b10f2-e867-4606-a9ab-634af57e280d" },
  },
  result: {
    data: {
      deleteTherapistMonitor: {
        deleted: true,
        __typename: "DeleteMonitor",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_MONITOR_SHARE_PATIENT_LIST,
    variables: { monitor_id: "ce3b10f2-e867-4606-a9ab-634af57e280d" },
  },
  result: {
    data: {
      patientListForMonitor: [
        {
          _id: "003de6cefb794d90ad1fecc00b9e8da9",
          moniter_detail: null,
          patient_firstname: "patient name",
          patient_lastname: "last",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: SHARE_THERAPIST_MY_MONITOR,
    variables: {
      monitor_id: "ce3b10f2-e867-4606-a9ab-634af57e280d",
      patient_id: "003de6cefb794d90ad1fecc00b9e8da9",
    },
  },
  result: {
    data: {
      shareTherapistMonitor: {
        message: "Monitor Shared Successfully",
        status: true,
        __typename: "TherapistMonitorResult",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapyMyMonitorList />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Therapist patient safety plan", () => {
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

  it("should render monitor data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("name")).toBeInTheDocument();
    });
  });

  it("should render view accordian data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("toggleContent")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("toggleContent"));
      expect(screen.getByText("Monitor question*")).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(screen.getByText("Question type 1")).toBeInTheDocument();
    });
  });

  it("Delete monitor", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("button-edit-icon")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("button-edit-icon"));

      expect(
        screen.getByText("Are you sure you want to delete the monitor?")
      ).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));

      expect(
        screen.getByText("Monitor deleted successfully")
      ).toBeInTheDocument();
    });
  });

  it("Share monitor", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("share-button-icon")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("share-button-icon"));

      await waitFor(async () => {
        const dropdownInput = screen.getByLabelText("Select Patient");

        fireEvent.mouseDown(dropdownInput);

        await waitFor(async () => {
          const firstOption = screen.getByRole("option", {
            name: /patient name/i,
          });
          fireEvent.click(firstOption);
        });

        expect(screen.getByTestId("addSubmitForm")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("addSubmitForm"));

        expect(
          screen.getByText("Are you sure you want to share the monitor?")
        ).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("confirmButton"));

        expect(
          screen.getByText("Monitor shared successfully")
        ).toBeInTheDocument();
      });
    });
  });
});
