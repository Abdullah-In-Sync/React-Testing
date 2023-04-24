import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import EditMeasuresPage from "../../../../pages/admin/measures/edit/[id]";

import { useRouter } from "next/router";
import {
  AdMIN_VIEW_MEASURE,
  ADMIN_UPDATE_MEASURE,
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

mocksData.push({
  request: {
    query: AdMIN_VIEW_MEASURE,
    variables: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
  },
  result: {
    data: {
      adminViewMeasureById: {
        _id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
        created_date: "2023-04-10T18:08:28.798Z",
        description: "",
        org_id: "",
        organization_name: "portal.dev-myhelp",
        status: 1,
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
        template_id: "format1",
        title: "test",
        updated_date: "2023-04-10T18:08:28.798Z",
        __typename: "AdminMeasures",
      },
    },
  },
});

mocksData.push({
  request: {
    query: AdMIN_VIEW_MEASURE,
    variables: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-format2",
    },
  },
  result: {
    data: {
      adminViewMeasureById: {
        _id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
        created_date: "2023-04-12T18:00:33.727Z",
        description: "",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        organization_name: "portal.dev-myhelp",
        status: 1,
        template_data:
          '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"col1":"gg","col2":"2","col3":"5","col4":"7","col5":"50"}],"footerRows":[{"col1":"Column Total","col2":"0","col3":"1","col4":"2","col5":"3"},{"col1":"Total Score","colAvg":"0"}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":""},{"option":"Somewhat difficult","answer":""},{"option":"Very difficult","answer":""},{"option":"Extremely difficult","answer":""}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}]}',
        template_id: "format2",
        title: "new",
        updated_date: "2023-04-13T04:48:47.965Z",
        __typename: "AdminMeasures",
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_UPDATE_MEASURE,
    variables: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
      update: {
        org_id: "2301536c4d674b3598814174d8f19593",
        description: "test des",
        title: "test",
        template_id: "format1",
        template_data:
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
      },
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
    query: ADMIN_UPDATE_MEASURE,
    variables: {
      measureId: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
      update: {
        org_id: "2301536c4d674b3598814174d8f19593",
        description: "test des",
        title: "test",
        template_id: "format1",
        template_data: `{"intro":"People's problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"some","question":"testquestion"}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}`,
      },
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

const fillUpperForm = async (_?: number, orgOption?: number) => {
  const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
  expect(dropdownSelect).toBeInTheDocument();

  const titleInput = await screen.findByTestId("title");
  fireEvent.change(titleInput, {
    target: { value: "test" },
  });

  const descriptionInput = await screen.findByTestId("description");

  fireEvent.change(descriptionInput, {
    target: { value: "test des" },
  });

  expect(descriptionInput).toBeInTheDocument();
  const selectOrganization = await screen.findByTestId("organizationSelect");
  expect(selectOrganization).toBeInTheDocument();

  const button = within(selectOrganization).getByRole("button");
  fireEvent.mouseDown(button);

  const listbox = within(screen.getByRole("presentation")).getByRole("listbox");
  const options = await within(listbox).findAllByRole("option");

  fireEvent.click(options[orgOption ? orgOption : 1]);
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

describe("Admin update measures", () => {
  it("should render admin update measures page and submit the form", async () => {
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
    expect(deleteIntroButton).not.toBeInTheDocument();

    const questionFirstDeleteButton = await screen.findByTestId(
      "iconButtonQuestion_0"
    );
    expect(questionFirstDeleteButton).toBeInTheDocument();
    fireEvent.click(questionFirstDeleteButton);
    const confirmButton = await screen.findByTestId("confirmButton");
    fireEvent.click(confirmButton);
    expect(questionFirstDeleteButton).not.toBeInTheDocument();

    const templateDescriptionDeleteButton = await screen.findByTestId(
      "iconButtonQuestion_templateDataDescription"
    );
    expect(templateDescriptionDeleteButton).toBeInTheDocument();
    fireEvent.click(templateDescriptionDeleteButton);
    expect(templateDescriptionDeleteButton).not.toBeInTheDocument();
  });

  it("when change to format 2", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-format2",
      },
      push: pushMock,
    });
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
