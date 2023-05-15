import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
  waitFor,
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
    variables: { measure_id: undefined },
  },
  result: {
    data: {
      patientViewScoreList: {
        _id: "79d558d1-7f67-4e44-8e4d-918448b1ed07",
        created_date: "2023-04-29T17:47:24.075Z",
        description: "",
        patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
        score: 2,
        score_date: "2023-05-02T11:19:19.714Z",
        score_id: "ac826d59-4244-4e84-b5b1-01a89cb3d91f",
        scores_list: [
          {
            _id: "99503033-6e0f-4575-bd73-a86f421b1e63",
            added_by: "patient",
            created_date: "2023-04-29T12:38:25.426Z",
            measure_id: "7cff4b39-0668-4e8f-b63f-d4b2b496a059",
            score: 16,
            session_no: "",
            status: 1,
            template_data:
              '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1ytgif","col1":"quest","col2":"1","col3":"2","col4":"3","col5":"4","answer":"col3"},{"id":"lh1yu5cv","col1":"test","col2":"4","col3":"5","col4":"5","col5":"8","answer":"col5"},{"id":"lh1yufoc","col1":"some","col2":"2","col3":"8","col4":"6","col5":"4","answer":"col4"}],"footerRows":[{"col1":"Column Total","col2":0,"col3":2,"col4":6,"col5":8,"":null},{"col1":"Total Score","colAvg":16}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":true},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":16}',
            template_id: "format2",
            __typename: "PatMeasuresScores",
          },
          {
            _id: "1e715a5a-ecb5-4035-97aa-65b02a9eb24d",
            added_by: "patient",
            created_date: "2023-05-01T05:09:01.487Z",
            measure_id: "7cff4b39-0668-4e8f-b63f-d4b2b496a059",
            score: 8,
            session_no: "start",
            status: 1,
            template_data:
              '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1ytgif","col1":"quest","col2":"1","col3":"2","col4":"3","col5":"4","answer":"col3"},{"id":"lh1yu5cv","col1":"test","col2":"4","col3":"5","col4":"5","col5":"8","answer":"col2"},{"id":"lh1yufoc","col1":"some","col2":"2","col3":"8","col4":"6","col5":"4","answer":"col2"}],"footerRows":[{"col1":"Column Total","col2":6,"col3":2,"col4":0,"col5":0,"":null},{"col1":"Total Score","colAvg":8}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":true},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":8}',
            template_id: "format2",
            __typename: "PatMeasuresScores",
          },
        ],
        session_no: "2",
        share_status: 1,
        status: 1,
        template_data:
          '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh29yqqu","col1":"q","col2":"1","col3":"2","col4":"3","col5":"4","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
        template_id: "format2",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        title: "ff",
        updated_date: "2023-05-02T11:19:19.714Z",
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
    await waitFor(async () => {
      expect(screen.queryByTestId("chart")).toBeInTheDocument();
      expect(screen.queryByTestId("table-list")).toBeInTheDocument();
    });
  });

  test("on click view response redirect to response page", async () => {
    await sut();

    await waitFor(async () => {
      expect(
        screen.queryByTestId(
          "view-response-99503033-6e0f-4575-bd73-a86f421b1e63"
        )
      ).toBeInTheDocument();
      fireEvent.click(
        screen.queryByTestId(
          "view-response-99503033-6e0f-4575-bd73-a86f421b1e63"
        )
      );
      expect(pushMock).toBeCalledWith(
        "response/99503033-6e0f-4575-bd73-a86f421b1e63"
      );
    });
  });
});
