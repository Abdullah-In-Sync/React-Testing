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
import { THERAPIST_CREATE_MONITOR } from "../graphql/Monitor/graphql";
import theme from "../styles/theme/theme";
import TherapistCreateMonitor from "../pages/therapist/patient/view/[id]/monitors/create";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: THERAPIST_CREATE_MONITOR,
    variables: {
      name: "name",
      questions:
        '[{"question":"Description","question_type":"emoji","question_option":"[{\\"code\\":\\"1f97a\\",\\"text\\":\\"Very Sad\\"},{\\"code\\":\\"1f641\\",\\"text\\":\\"Sad\\"},{\\"code\\":\\"1f642\\",\\"text\\":\\"Fine\\"},{\\"code\\":\\"1f60a\\",\\"text\\":\\"Happy\\"},{\\"code\\":\\"1f604\\",\\"text\\":\\"Very Happy\\"}]"},{"question":"test","question_type":"yes_or_no","question_option":""}]',
    },
  },
  result: {
    data: {
      therapistCreateMonitor: {
        message: "",
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: THERAPIST_CREATE_MONITOR,
    variables: {
      name: "name fail",
      questions:
        '[{"question":"Description","question_type":"emoji","question_option":"[{\\"code\\":\\"1f97a\\",\\"text\\":\\"Very Sad\\"},{\\"code\\":\\"1f641\\",\\"text\\":\\"Sad\\"},{\\"code\\":\\"1f642\\",\\"text\\":\\"Fine\\"},{\\"code\\":\\"1f60a\\",\\"text\\":\\"Happy\\"},{\\"code\\":\\"1f604\\",\\"text\\":\\"Very Happy\\"}]"},{"question":"test","question_type":"yes_or_no","question_option":""}]',
    },
  },
  result: {
    data: {
      therapistCreateMonitor: {
        message: "Not allowed!",
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
          <TherapistCreateMonitor />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

describe("Admin create monitor", () => {
  it("Create monitor", async () => {
    await sut();

    expect(screen.getByTestId("name")).toBeInTheDocument();
    fireEvent.change(screen.queryByTestId("name"), {
      target: { value: "name" },
    });

    expect(screen.getByTestId("description")).toBeInTheDocument();
    fireEvent.change(screen.queryByTestId("description"), {
      target: { value: "Description" },
    });

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

    expect(screen.getByTestId("submitForm")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("submitForm"));

    await waitFor(async () => {
      expect(
        screen.getByText("Are you sure you want to create the monitor?")
      ).toBeInTheDocument();

      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));
    });
    await waitFor(async () => {
      expect(
        screen.getByText("Monitor created successfully")
      ).toBeInTheDocument();
    });
  });

  it("Create monitor fail", async () => {
    await sut();

    expect(await screen.findByTestId("name")).toBeInTheDocument();
    fireEvent.change(await screen.findByTestId("name"), {
      target: { value: "name fail" },
    });

    expect(await screen.findByTestId("description")).toBeInTheDocument();
    fireEvent.change(await screen.findByTestId("description"), {
      target: { value: "Description" },
    });

    const addQuestionButton = await screen.findByTestId("addNewQuestionBox");
    fireEvent.click(addQuestionButton);
    const firstQuestionInput = await screen.findByTestId(
      "questions.1.question"
    );
    fireEvent.change(firstQuestionInput, {
      target: { value: "test" },
    });

    const firstQuestionTypeSelect = await screen.findByTestId(
      "questions.1.questionType"
    );
    fireEvent.click(firstQuestionTypeSelect);
    expect(firstQuestionTypeSelect).toBeInTheDocument();

    const buttonfirstQuestionTypeSelect = await within(
      firstQuestionTypeSelect
    ).findByRole("button");
    fireEvent.mouseDown(buttonfirstQuestionTypeSelect);

    const listboxFirstQuestionTypeSelect = await within(
      await screen.getByRole("presentation")
    ).findByRole("listbox");
    const optionsFirstQuestionSelect = await within(
      listboxFirstQuestionTypeSelect
    ).findAllByRole("option");

    fireEvent.click(optionsFirstQuestionSelect[0]);

    expect(screen.getByTestId("submitForm")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("submitForm"));

    expect(
      await screen.findByText("Are you sure you want to create the monitor?")
    ).toBeInTheDocument();

    expect(await screen.findByTestId("confirmButton")).toBeInTheDocument();

    fireEvent.click(await screen.findByTestId("confirmButton"));
    expect(await screen.findByText("Not allowed!")).toBeInTheDocument();
  });
});
