import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import CreateMeasuresPage from "../../../../pages/admin/measures/create";

import { CREATE_MEASURE_TEMPLATE } from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";

import { uniqueString } from "../../../../utility/helper";

jest.mock("../../../../utility/helper", () => ({
  uniqueString: jest.fn(),
}));

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "2301536c4d674b3598814174d8f19593",
          contract:
            "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>",
          created_date: "2022-12-05T09:47:11.000Z",
          logo: "",
          logo_url: null,
          name: "actions.dev-myhelp",
          panel_color: "#6ec9db",
          patient: "Patient",
          patient_plural: "Patients",
          side_menu_color: "#6ec9db",
          therapist: "Therapist",
          therapy: "Therapy",
          __typename: "Organization",
        },
        {
          _id: "72b6b276ee55481682cb9bf246294faa",
          contract:
            "<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet similique cum totam culpa placeat explicabo ratione unde quas itaque, perferendis. Eos, voluptatum in repellat dolore. Vero numquam odio, enim reiciendis.</p>",
          created_date: "2022-12-05T09:47:11.000Z",
          logo: "",
          logo_url: null,
          name: "second",
          panel_color: "#6ec9db",
          patient: "Patient",
          patient_plural: "Patients",
          side_menu_color: "#6ec9db",
          therapist: "Therapist",
          therapy: "Therapy",
          __typename: "Organization",
        },
      ],
    },
  },
});
//"[]"
mocksData.push({
  request: {
    query: CREATE_MEASURE_TEMPLATE,
    variables: {
      orgId: "2301536c4d674b3598814174d8f19593",
      description: "test des",
      title: "test",
      templateId: "format1",
      templateData:
        '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
    },
  },
  result: {
    data: {
      adminCreateMeasures: {
        duplicateNames: null,
        result: true,
        __typename: "adminResult",
      },
    },
  },
});

mocksData.push({
  request: {
    query: CREATE_MEASURE_TEMPLATE,
    variables: {
      orgId: "2301536c4d674b3598814174d8f19593",
      description: "test des",
      title: "test",
      templateId: "format1",
      templateData: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"some","question":"testquestion"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}`,
    },
  },
  result: {
    data: {
      adminCreateMeasures: {
        duplicateNames: null,
        result: true,
        __typename: "adminResult",
      },
    },
  },
});

mocksData.push({
  request: {
    query: CREATE_MEASURE_TEMPLATE,
    variables: {
      orgId: "72b6b276ee55481682cb9bf246294faa",
      description: "test des",
      title: "test",
      templateId: "format1",
      templateData:
        '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
    },
  },
  result: {
    data: {
      adminCreateMeasures: {
        duplicateNames: [
          {
            _id: "72b6b276ee55481682cb9bf246294faa",
            name: "arti",
            __typename: "OrgDetails",
          },
          {
            _id: "517fa21a82c0464a92aaae90ae0d5c59",
            name: "portal.dev-myhelp",
            __typename: "OrgDetails",
          },
        ],
        result: false,
        __typename: "adminResult",
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

const fillUpperForm = async (formatType?: number, orgOption?: number) => {
  const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
  expect(dropdownSelect).toBeInTheDocument();

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
  const selectOrganization = screen.getByTestId("organizationSelect");
  expect(selectOrganization).toBeInTheDocument();

  const button = within(selectOrganization).getByRole("button");
  fireEvent.mouseDown(button);

  const listbox = within(screen.getByRole("presentation")).getByRole("listbox");
  const options = within(listbox).getAllByRole("option");

  fireEvent.click(options[orgOption ? orgOption : 1]);
};

const fillQuestionForm = async () => {
  fillUpperForm();
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
  await fillUpperForm();
  const submitFormButton = screen.getByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

const submitFullForm = async () => {
  await sut();

  await fillQuestionForm();
  const submitFormButton = screen.getByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

describe("Admin create measures", () => {
  it("should render admin create measures page and submit the form", async () => {
    await submitForm();

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should render duplicate info modal", async () => {
    await sut();
    await fillUpperForm(1, 2);
    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const tableText = await screen.findByText(/portal.dev-myhelp/i);
    expect(tableText).toBeInTheDocument();
  });

  it("when cancel button press", async () => {
    await sut();
    await fillUpperForm();
    const cancelButton = await screen.findByTestId("cancelForm");
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);

    const confirmButton = await screen.findByRole("button", {
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
    const deleteIntroButton = screen.getByTestId("iconButtonQuestion_intro");
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
    await fillUpperForm(2);
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
