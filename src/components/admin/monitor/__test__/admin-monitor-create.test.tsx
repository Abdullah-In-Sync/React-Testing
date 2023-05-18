import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import { ADMIN_CREATE_MONITOR } from "../../../../graphql/Monitor/graphql";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";

import CreateMonitorPage from "../../../../pages/admin/monitor/create";

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
        {
          _id: "org2",
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
    query: ADMIN_CREATE_MONITOR,
    variables: {
      name: "test",
      orgId: "2301536c4d674b3598814174d8f19593",
      questions:
        '[{"question":"test des","question_type":"emoji","question_option":"[{\\"code\\":\\"code1\\",\\"text\\":\\"very sad\\"},{\\"code\\":\\"code2\\",\\"text\\":\\"very good\\"}]"}]',
    },
  },
  result: {
    data: {
      data: {
        adminCreateMonitor: {
          result: true,
          __typename: "result",
        },
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADMIN_CREATE_MONITOR,
    variables: {
      name: "test",
      orgId: "org2",
      questions:
        '[{"question":"test des","question_type":"emoji","question_option":"[{\\"code\\":\\"1f644\\",\\"text\\":\\"Very Sad\\"},{\\"code\\":\\"1f641\\",\\"text\\":\\"Sad\\"},{\\"code\\":\\"1f642\\",\\"text\\":\\"Fine\\"},{\\"code\\":\\"1f60a\\",\\"text\\":\\"Happy\\"},{\\"code\\":\\"1f604\\",\\"text\\":\\"Very Happy\\"}]"}]',
    },
  },
  result: {
    data: {
      adminCreateMonitor: {
        duplicateNames: [
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
          <CreateMonitorPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const fillUpperForm = async (orgId = 1) => {
  const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
  expect(dropdownSelect).toBeInTheDocument();

  const nameInput = await screen.findByTestId("name");
  fireEvent.change(nameInput, {
    target: { value: "test" },
  });

  const planDescriptionInput = await screen.findByTestId("description");

  fireEvent.change(planDescriptionInput, {
    target: { value: "test des" },
  });

  expect(planDescriptionInput).toBeInTheDocument();
  const selectOrganization = screen.getByTestId("organizationSelect");
  expect(selectOrganization).toBeInTheDocument();

  const button = within(selectOrganization).getByRole("button");
  fireEvent.mouseDown(button);

  const listbox = within(screen.getByRole("presentation")).getByRole("listbox");
  const options = within(listbox).getAllByRole("option");

  fireEvent.click(options[orgId]);
};

const fillQuestionForm = async () => {
  const addQuestionButton = screen.getByTestId("addNewQuestionBox");
  fireEvent.click(addQuestionButton);
  const firstQuestionInput = screen.getByTestId("questions.1.question");
  fireEvent.change(firstQuestionInput, {
    target: { value: "test" },
  });

  const firstQuestionTypeSelect = screen.getByTestId(
    "questions.1.questionType"
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
  await fillUpperForm(2);
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

const submitFullForm = async () => {
  await sut();

  await fillQuestionForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

describe("Admin create monitor", () => {
  it("should render admin create monitor page and submit the form", async () => {
    await submitForm();

    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
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
    expect(confirmButton).toBeInTheDocument();
  });

  it("should render admin cancel the submition", async () => {
    await submitForm();
    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });

  it("should render emoji selection", async () => {
    await sut();
    const emojiSecondButton = await screen.findByTestId("edit-emoji-1");
    fireEvent.click(emojiSecondButton);
    const inputCatption = await screen.findByTestId("caption-1");
    const emojiSaveButton = await screen.findByTestId("save-emoji-button-1");
    expect(emojiSaveButton).toBeInTheDocument();
    fireEvent.change(inputCatption, {
      target: { value: "emoji text" },
    });
    fireEvent.click(emojiSaveButton);
    expect(await screen.findByText(/emoji text/i)).toBeInTheDocument();
  });

  it("should render duplicate modal", async () => {
    await submitForm();
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("OkButton");
    expect(okButton).toBeInTheDocument();
    fireEvent.click(okButton);
  });
});
