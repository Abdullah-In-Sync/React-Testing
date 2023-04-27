import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import EditMeasuresPage from "../../../../pages/therapist/patient/view/[id]/measures/edit/[measureId]";

import { useRouter } from "next/router";
import {
  THERAPIST_VIEW_MEASURE,
  THERAPIST_UPDATE_MEASURE,
} from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";
import { uniqueString } from "../../../../utility/helper";

jest.mock("../../../../utility/helper", () => ({
  uniqueString: jest.fn(),
}));

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: THERAPIST_VIEW_MEASURE,
    variables: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
  },
  result: {
    data: {
      therapistViewMeasure: {
        _id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
        created_date: "2023-04-10T18:08:28.798Z",
        description: "",
        status: 1,
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
        template_id: "format1",
        title: "test",
        updated_date: "2023-04-10T18:08:28.798Z",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_VIEW_MEASURE,
    variables: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-format2",
    },
  },
  result: {
    data: {
      therapistViewMeasure: {
        _id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
        created_date: "2023-04-12T18:00:33.727Z",
        description: "",
        organization_name: "portal.dev-myhelp",
        status: 1,
        template_data: `{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lgyvok2l","col1":"ques 1","col2":"1","col3":"2","col4":"3","col5":"4","answer":""}],"footerRows":[{"col1":"Column Total","col2":1,"col3":0,"col4":0,"col5":0,"":null},{"col1":"Total Score","colAvg":1}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":true},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}`,
        template_id: "format2",
        title: "new",
        updated_date: "2023-04-13T04:48:47.965Z",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_UPDATE_MEASURE,
    variables: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
      update: {
        description: "test des",
        title: "test",
        template_id: "format1",
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
      },
    },
  },
  result: {
    data: {
      updateTherapistMeasure: {
        _id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_UPDATE_MEASURE,
    variables: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
      update: {
        description: "test des",
        title: "test",
        template_id: "format1",
        template_data: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"some","question":"testquestion","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}`,
      },
    },
  },
  result: {
    data: {
      updateTherapistMeasure: {
        _id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <EditMeasuresPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const fillUpperForm = async () => {
  const titleInput = await screen.findByTestId("title");
  fireEvent.change(titleInput, {
    target: { value: "test" },
  });

  const descriptionInput = await screen.findByTestId("description");
  fireEvent.change(descriptionInput, {
    target: { value: "test des" },
  });

  expect(descriptionInput).toBeInTheDocument();
};

const fillQuestionForm = async () => {
  await fillUpperForm();
  const addQuestionButton = await screen.findByTestId("addQuestionButton");
  fireEvent.click(addQuestionButton);
  const firstQuestionInput = await screen.findByTestId(
    "templateData.questions.0.question"
  );
  fireEvent.change(firstQuestionInput, {
    target: { value: "testquestion" },
  });
};

const submitForm = async () => {
  await sut();
  await fillUpperForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

const submitFullForm = async () => {
  await sut();
  await fillQuestionForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
    push: pushMock,
  });
});

describe("Therapist update measures", () => {
  it.only("should render therapist update measures page and submit the form", async () => {
    await submitForm();
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("when cancel button press", async () => {
    await sut();
    await fillUpperForm();
    const cancelButton = await screen.findByTestId("cancelForm");
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    const confirmButton = screen.getByRole("button", {
      name: "Confirm",
    });

    expect(confirmButton).toBeInTheDocument();
  });

  it("should submit full form data", async () => {
    (uniqueString as jest.Mock).mockReturnValue("some");
    await submitFullForm();
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should render delete", async () => {
    await submitFullForm();
    const deleteIntroButton = await screen.findByTestId(
      "iconButtonQuestion_intro"
    );
    expect(deleteIntroButton).toBeInTheDocument();
    fireEvent.click(deleteIntroButton);
    const optionConfirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(optionConfirmButton);
    expect(deleteIntroButton).not.toBeInTheDocument();

    const templateDescriptionDeleteButton = await screen.findByTestId(
      "iconButtonQuestion_templateDataDescription"
    );
    expect(templateDescriptionDeleteButton).toBeInTheDocument();
    fireEvent.click(templateDescriptionDeleteButton);
    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(templateDescriptionDeleteButton).not.toBeInTheDocument();

    const questionFirstDeleteButton = await screen.findByTestId(
      "iconButtonQuestion_0"
    );
    expect(questionFirstDeleteButton).toBeInTheDocument();
    fireEvent.click(questionFirstDeleteButton);

    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(questionFirstDeleteButton).not.toBeInTheDocument();
  });

  it("when change to format 2", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-format2",
      },
      push: pushMock,
    });
    await sut();
    await fillUpperForm();
    const lastOptionText = await screen.findByText(/15-21 severe anxiety./i);
    expect(lastOptionText).toBeInTheDocument();
    const firstQuestionDeleteButton = await screen.findByTestId(
      "iconButtonQuestion_templateData.questions.bodyRows.0"
    );
    fireEvent.click(firstQuestionDeleteButton);
    const addQuestionButton = await screen.findByTestId("addQuestionButton");
    fireEvent.click(addQuestionButton);
    const row1Col1Input = await screen.findByTestId(
      "templateData.questions.bodyRows.0.col1"
    );
    fireEvent.change(row1Col1Input, {
      target: { value: "testquestion" },
    });
    const row1Col2Input = await screen.findByTestId(
      "templateData.questions.bodyRows.0.col2"
    );
    fireEvent.change(row1Col2Input, {
      target: { value: "0" },
    });
    const row1Col3Input = await screen.findByTestId(
      "templateData.questions.bodyRows.0.col1"
    );
    fireEvent.change(row1Col3Input, {
      target: { value: "1" },
    });
    const row1Col4Input = await screen.findByTestId(
      "templateData.questions.bodyRows.0.col2"
    );
    fireEvent.change(row1Col4Input, {
      target: { value: "2" },
    });
    const row1Col5Input = await screen.findByTestId(
      "templateData.questions.bodyRows.0.col2"
    );
    fireEvent.change(row1Col5Input, {
      target: { value: "3" },
    });

    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const cancelButton = await screen.findByTestId("cancelButton");
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();

    const optionsQuestionsDelete = await screen.findByTestId(
      "iconButtonQuestion_templateData.optionsQuestions.1.question"
    );
    fireEvent.click(optionsQuestionsDelete);
    const optionConfirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(optionConfirmButton);
    expect(lastOptionText).not.toBeInTheDocument();
  });
});
