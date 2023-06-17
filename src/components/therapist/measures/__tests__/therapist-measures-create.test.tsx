import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import CreateMeasuresPage from "../../../../pages/therapist/patient/view/[id]/measures/create";

import { useRouter } from "next/router";
import { THERAPIST_CREATE_MEASURES } from "../../../../graphql/Measure/graphql";
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
    query: THERAPIST_CREATE_MEASURES,
    variables: {
      patientId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
      description: "test des",
      title: "test",
      templateId: "format1",
      templateData: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"some","question":"testquestion","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}`,
    },
  },
  result: {
    data: {
      therapistCreateMeasures: {
        duplicateNames: null,
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_CREATE_MEASURES,
    variables: {
      patientId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-full",
      description: "test des",
      title: "test",
      templateId: "format1",
      templateData: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"some","question":"testquestion","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}`,
    },
  },
  result: {
    data: {
      therapistCreateMeasures: {
        duplicateNames: null,
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_CREATE_MEASURES,
    variables: {
      patientId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-dup",
      description: "test des",
      title: "test",
      templateId: "format1",
      templateData: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"some","question":"testquestion","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}`,
    },
  },
  result: {
    data: {
      therapistCreateMeasures: {
        duplicateNames: [
          {
            _id: "72b6b276ee55481682cb9bf246294faa",
          },
          {
            _id: "517fa21a82c0464a92aaae90ae0d5c59",
          },
        ],
        result: false,
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <CreateMeasuresPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const fillUpperForm = async (formatType?: number) => {
  const titleInput = await screen.findByTestId("title");
  fireEvent.change(titleInput, {
    target: { value: "test" },
  });

  const descriptionInput = await screen.findByTestId("description");

  fireEvent.change(descriptionInput, {
    target: { value: "test des" },
  });

  const templateFormatSelect = await screen.findByTestId(
    "templateFormatSelect"
  );
  fireEvent.click(templateFormatSelect);
  expect(templateFormatSelect).toBeInTheDocument();

  const formatTypeSelect = within(templateFormatSelect).getByRole("button");
  fireEvent.mouseDown(formatTypeSelect);

  const listFormatTypeSelect = within(
    screen.getByRole("presentation")
  ).getByRole("listbox");
  const optionsFormatTypeSelect = await within(
    listFormatTypeSelect
  ).findAllByRole("option");

  fireEvent.click(optionsFormatTypeSelect[formatType ? formatType : 1]);
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
      id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
    push: pushMock,
  });
});

describe("Therapist create measures", () => {
  it("should show toast meessage if questions is empty in format 1", async () => {
    await submitForm();
    const questionsEmptyMsg = await screen.findByText("Please add a question.");
    expect(questionsEmptyMsg).toBeInTheDocument();
  });
  it("should render therapist create measures page and submit the form", async () => {
    (uniqueString as jest.Mock).mockReturnValue("some");
    await submitFullForm();
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should render duplicate info modal", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-dup",
      },
      push: pushMock,
    });
    (uniqueString as jest.Mock).mockReturnValue("some");
    await submitFullForm();
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const tableText = await screen.findByText(
      /This measure’s name already exists./i
    );
    expect(tableText).toBeInTheDocument();
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
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-full",
      },
      push: pushMock,
    });
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
    await sut();
    await fillUpperForm(2);
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
