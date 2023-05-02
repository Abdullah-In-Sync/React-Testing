import {
  screen,
  render,
  fireEvent,
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
    variables: {
      measure_id: "c7e03c04-e4ab-4c9e-b679-9e5ac8a128ed",
    },
  },
  result: {
    data: {
      patientViewScoreList: {
        _id: "c7e03c04-e4ab-4c9e-b679-9e5ac8a128ed",
        created_date: "2023-04-08T05:24:52.126Z",
        description: "update desc",
        patient_id: "baa80cb429924a32977c6f855abf59dd",
        score: 15,
        score_date: "2023-04-21T10:49:38.889Z",
        score_id: "6cd3c3d6-5e01-4f6b-b7bf-347ce616b4f7",
        scores_list: [
          {
            _id: "f563640d-8cee-49a7-b9a6-ba656ab3ef45",
            added_by: "therapist",
            created_date: "2023-04-17T13:36:32.117Z",
            measure_id: "c7e03c04-e4ab-4c9e-b679-9e5ac8a128ed",
            score: 10,
            session_no: null,
            status: 1,
            template_data: "testing json",
            template_id: "template-1",
            __typename: "PatMeasuresScores",
          },
          {
            _id: "6cd3c3d6-5e01-4f6b-b7bf-347ce616b4f7",
            added_by: "therapist",
            created_date: "2023-04-21T10:49:38.889Z",
            measure_id: "c7e03c04-e4ab-4c9e-b679-9e5ac8a128ed",
            score: 15,
            session_no: "1",
            status: 1,
            template_data: "json 4",
            template_id: "template-4",
            __typename: "PatMeasuresScores",
          },
        ],
        session_no: "1",
        share_status: 1,
        status: 1,
        template_data: "update json",
        template_id: "template-3",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        title: "update title",
        updated_date: "2023-04-21T10:49:38.889Z",
        __typename: "TherapistMeasures",
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
      screen.queryByTestId("view-response-f563640d-8cee-49a7-b9a6-ba656ab3ef45")
    );
    expect(pushMock).toBeCalledWith(
      "response/f563640d-8cee-49a7-b9a6-ba656ab3ef45"
    );
  });
});
