import {
  screen,
  render,
  waitFor,
  fireEvent,
  within,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import { useAppContext } from "../contexts/AuthContext";

import MeasureScoreList from "../pages/patient/measures/score/[id]";
import { VIEW_MEASURE_SCORE_BY_PATIENT } from "../graphql/Measure/graphql";
import { useRouter } from "next/router";

const pushMock = jest.fn();
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: VIEW_MEASURE_SCORE_BY_PATIENT,
  },
  result: {
    data: {
      viewMeasureScoreByPatient: {
        scale_data: [
          "[1673241390900, 0]",
          "[1673003679646, 1]",
          "[1672818347252, 1]",
          "[1672818296759, 2]",
          "[1672818289221, 2]",
          "[1672817045519, 2]",
          "[1672410699000, 0]",
        ],
        score_data: [
          {
            created_date: "2023-01-09T05:16:30.900Z",
            _id: "0aba91bc-c611-4bc2-9221-48da110e01ff",
            patmscore_value: "0",
            __typename: "PatientMeasureScore",
          },
          {
            created_date: "2023-01-06T11:14:39.646Z",
            _id: "18080a82-38bc-4e13-b8a1-06936a138676",
            patmscore_value: "1",
            __typename: "PatientMeasureScore",
          },
          {
            created_date: "2023-01-04T07:45:47.252Z",
            _id: "6829471c-a33b-4bb7-a30a-e43564eaa840",
            patmscore_value: "1",
            __typename: "PatientMeasureScore",
          },
          {
            created_date: "2023-01-04T07:44:56.759Z",
            _id: "90195ed0-27c6-457c-be09-4baec2ea681e",
            patmscore_value: "2",
            __typename: "PatientMeasureScore",
          },
          {
            created_date: "2023-01-04T07:44:49.221Z",
            _id: "989eaaa1-1804-4791-84b2-55b743da36ab",
            patmscore_value: "2",
            __typename: "PatientMeasureScore",
          },
          {
            created_date: "2023-01-04T07:24:05.519Z",
            _id: "11c03c36-6ed4-4ab3-967b-69a320e04386",
            patmscore_value: "2",
            __typename: "PatientMeasureScore",
          },
          {
            created_date: "2022-12-30T14:31:39.000Z",
            _id: "e2dedcb8409846acbacb69e3e5fe925e",
            patmscore_value: "0",
            __typename: "PatientMeasureScore",
          },
        ],
        __typename: "viewMeasureScore",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <MeasureScoreList />
      </SnackbarProvider>
    </MockedProvider>
  );

  await waitForElementToBeRemoved(() =>
    screen.queryByTestId("activity-indicator")
  );
};

describe("Measures score list", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
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
    jest.useFakeTimers().setSystemTime(new Date("2022-12-23"));
  });

  test("Renders measure score list & chart", async () => {
    await sut();
    expect(screen.queryByTestId("chart")).toBeInTheDocument();
    expect(screen.queryByTestId("table-list")).toBeInTheDocument();
  });

  test("on click view response redirect to response page", async () => {
    await sut();
    fireEvent.click(
      screen.queryByTestId("view-response-0aba91bc-c611-4bc2-9221-48da110e01ff")
    );
    expect(pushMock).toBeCalledWith(
      "response/0aba91bc-c611-4bc2-9221-48da110e01ff"
    );
  });
});
