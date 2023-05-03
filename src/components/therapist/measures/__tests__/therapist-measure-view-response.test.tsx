import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import Measures from "..";
import {
  GET_THERAPIST_MEASURES_LIST,
  GET_THERAPIST_MEASURES_SCORE_LIST,
} from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_LIST,
    variables: {
      patientId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
  },
  result: {
    data: {
      therapistListMeasures: [
        {
          _id: "7cff4b39-0668-4e8f-b63f-d4b2b496a059",
          created_date: "2023-04-29T12:35:59.449Z",
          description: "des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 16,
          score_date: "2023-04-29T12:38:25.426Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1ytgif","col1":"quest","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1yu5cv","col1":"test","col2":"4","col3":"5","col4":"5","col5":"8","answer":""},{"id":"lh1yufoc","col1":"some","col2":"2","col3":"8","col4":"6","col5":"4","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "new tets",
          updated_date: "2023-04-29T12:38:25.426Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "d80cde21-6867-45fb-a257-99dad0b965ac",
          created_date: "2023-04-29T11:30:31.267Z",
          description: "some des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 11,
          score_date: "2023-04-29T11:43:25.365Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1wgjyd","col1":"quest1","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1wi7rs","col1":"quest2","col2":"4","col3":"6","col4":"7","col5":"8","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "Testformat2",
          updated_date: "2023-04-29T11:43:25.365Z",
          __typename: "TherapistMeasures",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_SCORE_LIST,
    variables: { measure_id: "d80cde21-6867-45fb-a257-99dad0b965ac" },
  },
  result: {
    data: {
      therapistViewScoreList: {
        _id: "d80cde21-6867-45fb-a257-99dad0b965ac",
        created_date: "2023-04-29T11:30:31.267Z",
        description: "some des",
        patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
        score: 11,
        score_date: "2023-04-29T11:43:25.365Z",
        score_id: "52165cd7-5918-4112-a3e7-596a7c3e204b",
        scores_list: [
          {
            _id: "99503033-6e0f-4575-bd73-a86f421b1e63",
            added_by: "patient",
            created_date: "2023-04-29T12:38:25.426Z",
            measure_id: "7cff4b39-0668-4e8f-b63f-d4b2b496a059",
            score: 16,
            session_no: "2",
            status: 1,
            template_data:
              '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1ytgif","col1":"quest","col2":"1","col3":"2","col4":"3","col5":"4","answer":"col3"},{"id":"lh1yu5cv","col1":"test","col2":"4","col3":"5","col4":"5","col5":"8","answer":"col5"},{"id":"lh1yufoc","col1":"some","col2":"2","col3":"8","col4":"6","col5":"4","answer":"col4"}],"footerRows":[{"col1":"Column Total","col2":0,"col3":2,"col4":6,"col5":8,"":null},{"col1":"Total Score","colAvg":16}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":true},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":16}',
            template_id: "format2",
            __typename: "PatMeasuresScores",
          },
          {
            _id: "5a02fb07-c867-4f38-87ff-58bd241fc385",
            added_by: "therapist",
            created_date: "2023-05-01T11:56:49.726Z",
            measure_id: "28b958ba-89df-48b2-b35b-294a45db7ca7",
            score: 13,
            session_no: "start",
            status: 1,
            template_data:
              '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lh4sar76","question":"ques1","answer":7},{"id":"lh4saz58","question":"q2","answer":6}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":13}',
            template_id: "format1",
            __typename: "PatMeasuresScores",
          },
        ],
        session_no: "",
        share_status: 1,
        status: 1,
        template_data:
          '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1wgjyd","col1":"quest1","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1wi7rs","col1":"quest2","col2":"4","col3":"6","col4":"7","col5":"8","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
        template_id: "format2",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        title: "Testformat2",
        updated_date: "2023-04-29T11:43:25.365Z",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <Measures />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
    push: pushMock,
  });
});

describe("Therapist response measures", () => {
  it("Should render therapist view response format2 and format2", async () => {
    await sut();
    fireEvent.click(await screen.findByTestId("toggleContent1"));
    const viewSocre1 = await screen.findByTestId("view_score1");
    fireEvent.click(viewSocre1);
    const firstViewResponseButton = await screen.findByTestId(
      "view-response-99503033-6e0f-4575-bd73-a86f421b1e63"
    );
    expect(firstViewResponseButton).toBeInTheDocument();
    fireEvent.click(firstViewResponseButton);
    expect(await screen.findAllByText(/16/i)).toHaveLength(1);
    const backButton = await screen.findByTestId("backButton");
    fireEvent.click(backButton);
    expect(await screen.findByTestId("tableId")).toBeInTheDocument();
    const secondViewResponseButton = await screen.findByTestId(
      "view-response-5a02fb07-c867-4f38-87ff-58bd241fc385"
    );
    expect(secondViewResponseButton).toBeInTheDocument();
    fireEvent.click(secondViewResponseButton);
    expect(await screen.findAllByText(/13/i)).toHaveLength(1);
  });
});
