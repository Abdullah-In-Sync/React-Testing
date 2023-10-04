import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import Measures from "..";

import { useRouter } from "next/router";
import {
  THERAPIST_MEASURE_SUBMIT_TEST,
  GET_THERAPIST_MEASURES_LIST,
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
          _id: "a6e9bf54-76fe-49e0-8872-a7ff0681ccf7",
          created_date: "2023-04-18T05:38:05.573Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgyvu5tg","question":"some text","answer":1}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":1}`,
          template_id: "format1",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test4",
          updated_date: "2023-04-18T05:38:05.573Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "da31d1fa-48ca-4b67-b406-dd29db30ca9f",
          created_date: "2023-04-18T05:35:59.027Z",
          description: "",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 0,
          score_date: "",
          scores_list: null,
          share_status: 0,
          status: 1,
          template_data: `{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgyvok2l","col1":"ques 1","col2":"1","col3":"2","col4":"3","col5":"4","answer":""}],"footerRows":[{"col1":"Column Total","col2":1,"col3":0,"col4":0,"col5":0,"":null},{"col1":"Total Score","colAvg":1}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":true},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":1}`,
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "test3",
          updated_date: "2023-04-18T05:35:59.027Z",
          __typename: "TherapistMeasures",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_MEASURE_SUBMIT_TEST,
    variables: {
      measureId: "a6e9bf54-76fe-49e0-8872-a7ff0681ccf7",
      score: 1,
      templateData: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgyvu5tg","question":"some text","answer":1}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":1}`,
      sessionNo: "start",
      templateId: "format1",
    },
  },
  result: {
    data: {
      therapistMeasureSubmitTest: {
        _id: "180a65ac-a777-4e82-b13e-5cea79e62608",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_MEASURE_SUBMIT_TEST,
    variables: {
      measureId: "da31d1fa-48ca-4b67-b406-dd29db30ca9f",
      score: 1,
      templateData: `{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgyvok2l","col1":"ques 1","col2":"1","col3":"2","col4":"3","col5":"4","answer":"col2"}],"footerRows":[{"col1":"Column Total","col2":1,"col3":0,"col4":0,"col5":0,"":null},{"col1":"Total Score","colAvg":1}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":true},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":1}`,
      sessionNo: "start",
      templateId: "format2",
    },
  },
  result: {
    data: {
      therapistMeasureSubmitTest: {
        _id: "180a65ac-a777-4e82-b13e-5cea79e62608",
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
  it("should render therapist format 1 response", async () => {
    await sut();
    const firstTitleText = await screen.findByText(/test4/i);
    expect(firstTitleText).toBeInTheDocument();

    const firstPlusIcon = await screen.findByTestId("toggleContent0");
    fireEvent.click(firstPlusIcon);
    const takeTestButton = await screen.findByTestId("takeTest0");
    fireEvent.click(takeTestButton);
    expect(
      await screen.findByText(/Choose your scores from/i)
    ).toBeInTheDocument();

    const templateFormatSelect = await screen.findByTestId(
      "templateData.questions.0.answer"
    );
    fireEvent.click(templateFormatSelect);
    expect(templateFormatSelect).toBeInTheDocument();

    const selectAnswer = await within(templateFormatSelect).findByRole(
      "button"
    );
    fireEvent.mouseDown(selectAnswer);

    const answerOptionList = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );
    const optionsSelect = await within(answerOptionList).findAllByRole(
      "option"
    );

    fireEvent.click(optionsSelect[1]);

    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    const firstTitleText2 = await screen.findByText(/test3/i);
    expect(firstTitleText2).toBeInTheDocument();
  });

  it("should render therapist format 2 response", async () => {
    await sut();
    const firstTitleText = await screen.findByText(/test3/i);
    expect(firstTitleText).toBeInTheDocument();

    const firstPlusIcon = await screen.findByTestId("toggleContent1");
    fireEvent.click(firstPlusIcon);
    const takeTestButton = await screen.findByTestId("takeTest1");
    fireEvent.click(takeTestButton);
    expect(
      await screen.findByText(
        /Over the last 2 weeks how often have you been bothered by the following problems?/i
      )
    ).toBeInTheDocument();

    const colAns = await screen.findByTestId(
      "row_templateData.questions.bodyRows.0_col2"
    );
    expect(colAns).toBeInTheDocument();
    fireEvent.click(colAns);

    const radioAns = await screen.findByTestId(
      "templateData.optionsQuestions.0.labels.1.answer"
    );
    fireEvent.click(radioAns);

    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    // await waitFor(async () => {
    //   const firstTitleText2 = await screen.findByText(/test4/i);
    //   expect(firstTitleText2).toBeInTheDocument();
    // });
  });
});
