import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { useAppContext } from "../../../../contexts/AuthContext";

import TakeTestMeasures from "../../../../pages/patient/measures/test/[id]";

import { useRouter } from "next/router";
import {
  PATIENT_MEASURE_SUBMIT_TEST,
  PATIENT_VIEW_MEASURE,
} from "../../../../graphql/Measure/graphql";
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
    query: PATIENT_VIEW_MEASURE,
    variables: {
      measureId: "9776be15-4e15-4573-9c45-9868dad0e50a",
    },
  },
  result: {
    data: {
      patientViewMeasure: {
        _id: "9776be15-4e15-4573-9c45-9868dad0e50a",
        description: "",
        created_date: "2023-04-27T17:18:06.070Z",
        patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
        score: 3,
        score_date: "2023-04-28T09:23:42.485Z",
        score_id: "7cc1eb5e-f319-4033-b04b-45f697e9de51",
        scores_list: null,
        session_no: "Session 1",
        share_status: 1,
        status: 1,
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgze1k8e","question":"test","answer":0},{"id":"lgze1oqo","question":"test2","answer":0},{"id":"lgze1rsp","question":"test3","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
        template_id: "format1",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        title: "format21",
        updated_date: "2023-04-28T09:23:42.485Z",
        __typename: "TherapistMeasures",
      },
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_MEASURE_SUBMIT_TEST,
    variables: {
      measureId: "9776be15-4e15-4573-9c45-9868dad0e50a",
      score: 1,
      templateData:
        '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lgze1k8e","question":"test","answer":1},{"id":"lgze1oqo","question":"test2","answer":0},{"id":"lgze1rsp","question":"test3","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":1}',
      sessionNo: "Session 4",
      templateId: "format1",
    },
  },
  result: {
    data: {
      paitentMeasureSubmitTest: {
        _id: "180a65ac-a777-4e82-b13e-5cea79e62608",
      },
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_VIEW_MEASURE,
    variables: {
      measureId: "b8423205-7a90-4cd6-8324-65f8372880be",
    },
  },
  result: {
    data: {
      patientViewMeasure: {
        _id: "b8423205-7a90-4cd6-8324-65f8372880be",
        description: "",
        created_date: "2023-04-27T11:26:41.522Z",
        patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
        score: 1,
        score_date: "2023-04-28T09:35:10.154Z",
        score_id: "a42dacc2-69b0-4f01-b0e7-d8c8e83df001",
        scores_list: null,
        session_no: "start",
        share_status: 1,
        status: 1,
        template_data:
          '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgz1fu2u","col1":"tst","col2":"0","col3":"1","col4":"2","col5":"3","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
        template_id: "format2",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        title: "some2",
        updated_date: "2023-04-28T09:35:10.154Z",
        __typename: "TherapistMeasures",
      },
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_MEASURE_SUBMIT_TEST,
    variables: {
      measureId: "b8423205-7a90-4cd6-8324-65f8372880be",
      score: 1,
      templateData:
        '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgz1fu2u","col1":"tst","col2":"0","col3":"1","col4":"2","col5":"3","answer":"col3"}],"footerRows":[{"col1":"Column Total","col2":0,"col3":1,"col4":0,"col5":0,"":null},{"col1":"Total Score","colAvg":1}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":true},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":1}',
      sessionNo: "start",
      templateId: "format2",
    },
  },
  result: {
    data: {
      paitentMeasureSubmitTest: {
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
          <TakeTestMeasures />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  // (useRouter as jest.Mock).mockReturnValue({
  //   query: {
  //     id: "9776be15-4e15-4573-9c45-9868dad0e50a",
  //   },
  //   push: pushMock,
  // });

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

describe("Therapist response measures", () => {
  it("should render therapist format 1 response", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "9776be15-4e15-4573-9c45-9868dad0e50a",
      },
      push: pushMock,
    });
    await sut();

    expect(await screen.findByText(/Total WSAS Score/i)).toBeInTheDocument();

    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);

    expect(
      await screen.findByText(/Please select your score/i)
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

    fireEvent.click(submitFormButton);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(pushMock).toHaveBeenCalledWith(`/patient/therapy/?tab=measures`);
  });

  it("should render therapist format 2 response", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "b8423205-7a90-4cd6-8324-65f8372880be",
      },
      push: pushMock,
    });
    await sut();
    expect(
      await screen.findByText(
        /Over the last 2 weeks how often have you been bothered by the following problems?/i
      )
    ).toBeInTheDocument();
    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);

    expect(
      await screen.findByText(/Please select your score/i)
    ).toBeInTheDocument();
    const colAns = await screen.findByTestId(
      "row_templateData.questions.bodyRows.0_col3"
    );
    expect(colAns).toBeInTheDocument();
    fireEvent.click(colAns);

    const radioAns = await screen.findByTestId(
      "templateData.optionsQuestions.0.labels.1.answer"
    );
    fireEvent.click(radioAns);

    fireEvent.click(submitFormButton);

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    expect(pushMock).toHaveBeenCalledWith(`/patient/therapy/?tab=measures`);
  });
});
