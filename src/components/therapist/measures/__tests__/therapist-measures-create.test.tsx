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
      templateData:
        '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
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
      templateData: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"some","question":"testquestion"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}`,
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
      templateData:
        '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
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

const fillUpperForm = (formatType?: number) => {
  const templateFormatSelect = screen.getByTestId("templateFormatSelect");
  fireEvent.click(templateFormatSelect);
  expect(templateFormatSelect).toBeInTheDocument();

  const formatTypeSelect = within(templateFormatSelect).getByRole("button");
  fireEvent.mouseDown(formatTypeSelect);

  const listFormatTypeSelect = within(
    screen.getByRole("presentation")
  ).getByRole("listbox");
  const optionsFormatTypeSelect =
    within(listFormatTypeSelect).getAllByRole("option");

  fireEvent.click(optionsFormatTypeSelect[formatType ? formatType : 1]);

  const titleInput = screen.getByTestId("title");
  fireEvent.change(titleInput, {
    target: { value: "test" },
  });

  const descriptionInput = screen.getByTestId("description");

  fireEvent.change(descriptionInput, {
    target: { value: "test des" },
  });

  expect(descriptionInput).toBeInTheDocument();
};

const fillQuestionForm = async () => {
  await fillUpperForm();
  const addQuestionButton = await screen.findByTestId("addQuestionButton");
  fireEvent.click(addQuestionButton);
  const firstQuestionInput = screen.getByTestId(
    "templateData.questions.0.question"
  );
  fireEvent.change(firstQuestionInput, {
    target: { value: "testquestion" },
  });
};

const submitForm = async () => {
  await sut();
  fillUpperForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

const submitFullForm = async () => {
  await sut();
  fillQuestionForm();
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
  it("should render therapist create measures page and submit the form", async () => {
    submitForm();

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
    await sut();
    fillUpperForm();
    const submitFormButton = screen.getByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const tableText = await screen.findByText(
      /This measure name already exist./i
    );
    expect(tableText).toBeInTheDocument();
  });

  it("when cancel button press", async () => {
    await sut();
    fillUpperForm();
    const cancelButton = screen.getByTestId("cancelForm");
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
    submitFullForm();
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should render delete", async () => {
    submitFullForm();
    const deleteIntroButton = await screen.findByTestId(
      "iconButtonQuestion_intro"
    );
    expect(deleteIntroButton).toBeInTheDocument();
    fireEvent.click(deleteIntroButton);
    expect(deleteIntroButton).not.toBeInTheDocument();

    const questionFirstDeleteButton = screen.getByTestId(
      "iconButtonQuestion_0"
    );
    expect(questionFirstDeleteButton).toBeInTheDocument();
    fireEvent.click(questionFirstDeleteButton);
    const confirmButton = screen.getByTestId("confirmButton");
    fireEvent.click(confirmButton);
    expect(questionFirstDeleteButton).not.toBeInTheDocument();

    const templateDescriptionDeleteButton = screen.getByTestId(
      "iconButtonQuestion_templateDataDescription"
    );
    expect(templateDescriptionDeleteButton).toBeInTheDocument();
    fireEvent.click(templateDescriptionDeleteButton);
    expect(templateDescriptionDeleteButton).not.toBeInTheDocument();
  });

  it("when change to format 2", async () => {
    await sut();
    fillUpperForm(2);
    const lastOptionText = screen.getByText(/15-21 severe anxiety./i);
    expect(lastOptionText).toBeInTheDocument();
    const firstQuestionDeleteButton = screen.getByTestId(
      "iconButtonQuestion_templateData.questions.bodyRows.0"
    );
    fireEvent.click(firstQuestionDeleteButton);
    const addQuestionButton = screen.getByTestId("addQuestionButton");
    fireEvent.click(addQuestionButton);
    const row1Col1Input = screen.getByTestId(
      "templateData.questions.bodyRows.0.col1"
    );
    fireEvent.change(row1Col1Input, {
      target: { value: "testquestion" },
    });
    const row1Col2Input = screen.getByTestId(
      "templateData.questions.bodyRows.0.col2"
    );
    fireEvent.change(row1Col2Input, {
      target: { value: "0" },
    });
    const row1Col3Input = screen.getByTestId(
      "templateData.questions.bodyRows.0.col1"
    );
    fireEvent.change(row1Col3Input, {
      target: { value: "1" },
    });
    const row1Col4Input = screen.getByTestId(
      "templateData.questions.bodyRows.0.col2"
    );
    fireEvent.change(row1Col4Input, {
      target: { value: "2" },
    });
    const row1Col5Input = screen.getByTestId(
      "templateData.questions.bodyRows.0.col2"
    );
    fireEvent.change(row1Col5Input, {
      target: { value: "3" },
    });

    const submitFormButton = screen.getByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const cancelButton = screen.getByTestId("cancelButton");
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();

    const optionsQuestionsDelete = screen.getByTestId(
      "iconButtonQuestion_templateData.optionsQuestions.1.question"
    );
    fireEvent.click(optionsQuestionsDelete);
    const optionConfirmButton = screen.getByTestId("confirmButton");
    fireEvent.click(optionConfirmButton);
    expect(lastOptionText).not.toBeInTheDocument();
  });
});
