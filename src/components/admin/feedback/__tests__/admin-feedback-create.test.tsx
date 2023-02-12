import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";
import { CREATE_SAFETY_PLAN } from "../../../../graphql/SafetyPlan/graphql";
import CreateFeedbackPage from "../../../../pages/admin/feedback/create";

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
    query: CREATE_SAFETY_PLAN,
    variables: {
      orgId: "2301536c4d674b3598814174d8f19593",
      planDesc: "test des",
      planName: "test",
      planType: "fixed",
      questions:
        '[{"question":"test","description":"test des","questionType":"1"}]',
    },
  },
  result: {
    data: {
      data: {
        createSafetyPlan: {
          result: true,
          __typename: "result",
        },
      },
    },
  },
});

mocksData.push({
  request: {
    query: CREATE_SAFETY_PLAN,
    variables: {
      orgId: "2301536c4d674b3598814174d8f19593",
      planDesc: "test des",
      planName: "test",
      planType: "fixed",
      questions: "[]",
    },
  },
  result: {
    data: {
      data: {
        createSafetyPlan: {
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
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CreateFeedbackPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const fillUpperForm = async () => {
  const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
  expect(dropdownSelect).toBeInTheDocument();

  const planTypeSelect = screen.getByTestId("userType");
  fireEvent.click(planTypeSelect);
  expect(planTypeSelect).toBeInTheDocument();

  const buttonPlanTypeSelect = within(planTypeSelect).getByRole("button");
  fireEvent.mouseDown(buttonPlanTypeSelect);

  const planNameInput = await screen.findByTestId("FeedbackName");
  fireEvent.change(planNameInput, {
    target: { value: "test" },
  });

  const planDescriptionInput = await screen.findByTestId("instructions");
  expect(planDescriptionInput).toBeInTheDocument();

  fireEvent.change(planDescriptionInput, {
    target: { value: "test des" },
  });

  const selectOrganization = screen.getByTestId("organizationSelect");
  expect(selectOrganization).toBeInTheDocument();
  const button = await within(selectOrganization).findByTestId(
    "ArrowDropDownIcon"
  );
  fireEvent.mouseDown(button);
  const listbox = within(screen.getByRole("presentation")).getByRole("listbox");
  const options = within(listbox).getAllByRole("option");
  fireEvent.click(options[1]);
};

const fillQuestionForm = async () => {
  const addQuestionButton = screen.getByTestId("addNewQuestionBox");
  fireEvent.click(addQuestionButton);
  const firstQuestionInput = screen.getByTestId("questions.0.question");
  fireEvent.change(firstQuestionInput, {
    target: { value: "test" },
  });

  const firstDescriptionInput = screen.getByTestId("questions.0.description");
  fireEvent.change(firstDescriptionInput, {
    target: { value: "test des" },
  });

  const firstQuestionTypeSelect = screen.getByTestId(
    "questions.0.questionType"
  );
  fireEvent.click(firstQuestionTypeSelect);
  expect(firstQuestionTypeSelect).toBeInTheDocument();

  const buttonfirstQuestionTypeSelect = within(
    firstQuestionTypeSelect
  ).getByRole("button");
  fireEvent.mouseDown(buttonfirstQuestionTypeSelect);

  const listboxFirstQuestionTypeSelect = within(
    await screen.getByRole("presentation")
  ).getByRole("listbox");
  const optionsFirstQuestionSelect = await within(
    listboxFirstQuestionTypeSelect
  ).findAllByRole("option");

  fireEvent.click(optionsFirstQuestionSelect[0]);

  await fillUpperForm();
};

const submitForm = async () => {
  await sut();

  const selectUserType = screen.getByTestId("userType");
  expect(selectUserType).toBeInTheDocument();
  const arrowButtonUserType = await within(selectUserType).findByTestId(
    "ArrowDropDownIcon"
  );
  fireEvent.click(arrowButtonUserType);

  const selectSessionNo = screen.getByTestId("sessionNo");
  expect(selectSessionNo).toBeInTheDocument();
  const arrowButton = await within(selectSessionNo).findByTestId(
    "ArrowDropDownIcon"
  );
  fireEvent.click(arrowButton);
  const listboxsection = await screen.findAllByRole("presentation");
  const listboxSessionNo = within(listboxsection[1]).getByRole("listbox");
  const optionsSessionNo = within(listboxSessionNo).getAllByRole("option");
  fireEvent.click(optionsSessionNo[1]);

  await fillUpperForm();
  // const submitFormButton = await screen.findByTestId("submitForm");
  // fireEvent.click(submitFormButton);
};

const submitFullForm = async () => {
  await sut();

  await fillQuestionForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

describe("Admin safety plan list", () => {
  it.only("should render admin create safety plan page and submit the form", async () => {
    await submitForm();

    // const confirmButton = await screen.findByRole("button", {
    //   name: "Confirm",
    // });
    // fireEvent.click(confirmButton);
    // const okButton = await screen.findByTestId("SuccessOkBtn");
    // expect(okButton).toBeInTheDocument();
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

  it("should render admin cancel the submition", async () => {
    await submitForm();
    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });
});
