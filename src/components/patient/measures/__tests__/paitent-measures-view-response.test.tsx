import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { useAppContext } from "../../../../contexts/AuthContext";

import ViewResponseMeasure from "../../../../pages/patient/measures/score/response/[id]";

import { useRouter } from "next/router";
import { PATIENT_VIEW_SCORE } from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
jest.mock("../../../../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: PATIENT_VIEW_SCORE,
    variables: {
      scoreId: "7cc1eb5e-f319-4033-b04b-45f697e9de51",
    },
  },
  result: {
    data: {
      patientViewScore: {
        data: {
          _id: "7cc1eb5e-f319-4033-b04b-45f697e9de51",
          description: "",
          score: 7,
          score_date: "2023-04-29T09:57:36.985Z",

          score_detail: {
            added_by: "patient",
            _id: "ddf500c1-438e-43e3-8c24-6c8f1d68e6b6",
            template_id: "format1",
            template_data:
              '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lh1lsm2g","question":"quwston1","answer":2},{"id":"lh1lsqxg","question":"quest2","answer":0},{"id":"lh1lsv9x","question":"quest3","answer":5}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":7}',
            status: 1,
            session_no: "",
            score: 7,
            measure_id: "785d651b-0399-49c2-abe0-27697873c5f5",
            created_date: "2023-04-29T09:57:36.985Z",
            __typename: "PatMeasuresScores",
          },
          session_no: "",
          title: "testasdf",
          __typename: "TherapistViewScore",
        },
        message: "success",
        result: true,
        __typename: "TherapistViewScoreResult",
      },
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_VIEW_SCORE,
    variables: {
      scoreId: "d80cde21-6867-45fb-a257-99dad0b965ac",
    },
  },
  result: {
    data: {
      patientViewScore: {
        data: {
          _id: "d80cde21-6867-45fb-a257-99dad0b965ac",
          description: "some des",
          score: 11,
          score_date: "2023-04-29T11:43:25.365Z",
          score_detail: {
            added_by: "patient",
            _id: "52165cd7-5918-4112-a3e7-596a7c3e204b",
            template_id: "format2",
            template_data:
              '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1wgjyd","col1":"quest1","col2":"1","col3":"2","col4":"3","col5":"4","answer":"col5"},{"id":"lh1wi7rs","col1":"quest2","col2":"4","col3":"6","col4":"7","col5":"8","answer":"col4"}],"footerRows":[{"col1":"Column Total","col2":0,"col3":0,"col4":7,"col5":4,"":null},{"col1":"Total Score","colAvg":11}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":11}',
            status: 1,
            session_no: "2",
            score: 11,
            measure_id: "d80cde21-6867-45fb-a257-99dad0b965ac",
            created_date: "2023-04-29T11:43:25.365Z",
            __typename: "PatMeasuresScores",
          },
          session_no: "",
          title: "Testformat2",
          __typename: "TherapistViewScore",
        },
        message: "success",
        result: true,
        __typename: "TherapistViewScoreResult",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <ViewResponseMeasure />
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
      user_type: "patient",
      parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
      perm_ids: "9,10,14,21,191,65,66",
      user_status: "1",
      created_date: "2021-12-20 16:20:55",
      updated_date: "2021-12-20 16:20:55",
    },
  });
});

describe("Patient view response measures", () => {
  it("should render patient format 1 response", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "7cc1eb5e-f319-4033-b04b-45f697e9de51",
      },
      push: pushMock,
    });
    await sut();

    expect(await screen.findAllByText(/7/i)).toHaveLength(2);
  });

  it("should render patient format 2 response", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "d80cde21-6867-45fb-a257-99dad0b965ac",
      },
      push: pushMock,
    });
    await sut();
    expect(await screen.findAllByText(/11/i)).toHaveLength(2);
  });
});
