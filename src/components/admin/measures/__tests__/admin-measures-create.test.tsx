import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import CreateMeasuresPage from "../../../../pages/admin/measures/create";

import { CREATE_MEASURE_TEMPLATE } from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";

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
      templateId: 1,
      templateData:
        '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
    },
  },
  result: {
    data: {
      data: {
        createMeasures: {
          result: true,
          __typename: "result",
        },
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
      templateId: 1,
      templateData:
        '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"question":"testquestion"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
    },
  },
  result: {
    data: {
      data: {
        createMeasures: {
          result: true,
          __typename: "result",
        },
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

const fillUpperForm = async () => {
  const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
  expect(dropdownSelect).toBeInTheDocument();

  const templateFormatSelect = screen.getByTestId("templateFormatSelect");
  fireEvent.click(templateFormatSelect);
  expect(templateFormatSelect).toBeInTheDocument();

  const buttonPlanTypeSelect = within(templateFormatSelect).getByRole("button");
  fireEvent.mouseDown(buttonPlanTypeSelect);

  const listboxPlanTypeSelect = within(
    await screen.getByRole("presentation")
  ).getByRole("listbox");
  const optionsPlanTypeSelect = await within(
    listboxPlanTypeSelect
  ).findAllByRole("option");

  fireEvent.click(optionsPlanTypeSelect[1]);

  const planNameInput = await screen.findByTestId("title");
  fireEvent.change(planNameInput, {
    target: { value: "test" },
  });

  const descriptionInput = await screen.findByTestId("description");

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

  fireEvent.click(options[1]);
};

const fillQuestionForm = async () => {
  await fillUpperForm();
  const addQuestionButton = screen.getByTestId("addQuestionButton");
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
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

const submitFullForm = async () => {
  await sut();

  await fillQuestionForm();
  const submitFormButton = await screen.findByTestId("submitForm");
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
});
