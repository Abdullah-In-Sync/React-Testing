import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { useAppContext } from "../../../../contexts/AuthContext";
import PatientMonitorsList from "../../therapyPages/monitors";
import { useRouter } from "next/router";
import {
  GET_PATIENT_MONITOR_LIST,
  PATIENT_SUBMIT_MONITOR,
  PATIENT_VIEW_MONITOR,
} from "../../../../graphql/Monitor/graphql";
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
    query: GET_PATIENT_MONITOR_LIST,
  },
  result: {
    data: {
      patientMonitorList: [
        {
          _id: "list-item-1",
          name: "Check 2",
        },
        {
          _id: "list-item-2",
          name: "Chech 1",
        },
        {
          _id: "list-item-3",
          name: "Check 3",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_VIEW_MONITOR,
    variables: {
      monitorId: "list-item-1",
    },
  },
  result: {
    data: {
      patientViewMonitor: {
        name: "Check 2",
        questions: [
          {
            updated_date: "2023-05-24T11:30:37.765Z",
            status: 1,
            question_type: "emoji",
            question_option:
              '[{"code":"1f97a","text":"Very Sad"},{"code":"1f641","text":"Sad"},{"code":"1f642","text":"Fine"},{"code":"1f60a","text":"Happy"},{"code":"1f604","text":"Very Happy"}]',
            question: "jjbjb",
            monitor_id: "5cfff924-a176-43b0-b6c5-9986ff3803cd",
            created_date: "2023-05-24T11:30:37.765Z",
            answers_list: [],
            answer: "",
            _id: "452d0f12-aa7a-40a2-b844-5a0029df4765",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_VIEW_MONITOR,
    variables: {
      monitorId: "list-item-2",
    },
  },
  result: {
    data: {
      patientViewMonitor: {
        _id: "50381de7-7392-4e11-80ce-5a5b7db5db29",
        created_date: "2023-05-24T11:31:07.074Z",
        name: "Chech 1",
        questions: [
          {
            question_type: "emoji",
            question_option:
              '[{"code":"1f97a","text":"Very Sad"},{"code":"1f641","text":"Sad"},{"code":"1f642","text":"Fine"},{"code":"1f60a","text":"Happy"},{"code":"1f604","text":"Very Happy"}]',
            question: "jgfh",
            answers_list: [
              {
                _id: "8c6db671-f3f1-4118-a147-88d7024c321d",
                answer: "",
                created_date: "2023-05-25T08:09:39.884Z",
                monitor_id: "50381de7-7392-4e11-80ce-5a5b7db5db29",
                question_id: "09135bf3-1fd2-469c-885c-aaaa197a212a",
              },
            ],
            answer: "",
            _id: "09135bf3-1fd2-469c-885c-aaaa197a212a",
          },
          {
            question_type: "hours",
            question_option: '""',
            question: "Hours type",
            answers_list: [
              {
                _id: "a27796c0-8c10-4c60-bd27-6fd55d290e70",
                answer: "20",
                created_date: "2023-05-25T08:09:39.897Z",
                monitor_id: "50381de7-7392-4e11-80ce-5a5b7db5db29",
                question_id: "d88effbc-e120-4bc4-816b-003a7d4f863a",
              },
            ],
            answer: "20",
            _id: "d88effbc-e120-4bc4-816b-003a7d4f863a",
          },
          {
            question_type: "list",
            question_option: '"hgghb],jhghg,jvjvgvvjhg,gfdfxxtdyt"',
            question: "List type question ",
            answers_list: [
              {
                _id: "0a50be12-9dd6-410e-af5b-43088b6468bc",
                answer: "",
                created_date: "2023-05-25T08:09:39.908Z",
                monitor_id: "50381de7-7392-4e11-80ce-5a5b7db5db29",
                question_id: "aeab669b-14f6-4308-8e0f-75aaec02dfc0",
              },
            ],
            answer: "",
            _id: "aeab669b-14f6-4308-8e0f-75aaec02dfc0",
          },
          {
            question_type: "list",
            question_option: '"mnb,jhg,khvb,khjb,mhhjjj,jhvjhv"',
            question: "List type 1",
            answers_list: [
              {
                _id: "26249db8-0fe8-498a-9756-6c546bd1272f",
                answer: "",
                created_date: "2023-05-25T08:09:39.917Z",
                monitor_id: "50381de7-7392-4e11-80ce-5a5b7db5db29",
                question_id: "e122153a-1bbf-42d5-a0fb-2d9311354a26",
              },
            ],
            answer: "",
            _id: "e122153a-1bbf-42d5-a0fb-2d9311354a26",
          },
          {
            question_type: "yes_or_no",
            question_option: '""',
            question: "Yes no question",
            answers_list: [
              {
                _id: "9d8f7b70-8407-4aa3-b379-9d35f0c2ec8d",
                answer: "1",
                created_date: "2023-05-25T08:09:39.928Z",
                monitor_id: "50381de7-7392-4e11-80ce-5a5b7db5db29",
                question_id: "92ad10f8-f782-4198-8c21-96a2122b07f9",
              },
            ],
            answer: "1",
            _id: "92ad10f8-f782-4198-8c21-96a2122b07f9",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_VIEW_MONITOR,
    variables: {
      monitorId: "list-item-3",
    },
  },
  result: {
    data: {
      patientViewMonitor: {
        name: "Check 3",
        questions: [
          {
            updated_date: "2023-05-24T11:30:37.765Z",
            status: 1,
            question_type: "emoji",
            question_option:
              '[{"code":"1f97a","text":"Very Sad"},{"code":"1f641","text":"Sad"},{"code":"1f642","text":"Fine"},{"code":"1f60a","text":"Happy"},{"code":"1f604","text":"Very Happy"}]',
            question: "jjbjb",
            monitor_id: "5cfff924-a176-43b0-b6c5-9986ff3803cd",
            created_date: "2023-05-24T11:30:37.765Z",
            answers_list: [],
            answer: "",
            _id: "452d0f12-aa7a-40a2-b844-5a0029df4765",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: PATIENT_SUBMIT_MONITOR,
    variables: {
      monitorId: "list-item-2",
      questions:
        // eslint-disable-next-line prettier/prettier
      "[{\"question_id\":\"09135bf3-1fd2-469c-885c-aaaa197a212a\",\"answer\":\"Very Happy\"},{\"question_id\":\"d88effbc-e120-4bc4-816b-003a7d4f863a\",\"answer\":12},{\"question_id\":\"aeab669b-14f6-4308-8e0f-75aaec02dfc0\",\"answer\":\"jhghg\"},{\"question_id\":\"e122153a-1bbf-42d5-a0fb-2d9311354a26\",\"answer\":\",khvb\"},{\"question_id\":\"92ad10f8-f782-4198-8c21-96a2122b07f9\",\"answer\":\"yes\"}]",
    },
  },
  result: {
    data: {
      patientSubmitMonitor: {
        _id: "list-item-2",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <PatientMonitorsList />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
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

describe("Patient monitor response submit", () => {
  it("should render patient monitor list", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        tab: "monitors",
      },
      push: pushMock,
    });
    await sut();
    expect(await screen.findAllByText(/Check 2/i)).toHaveLength(1);
    const completeButton = await screen.findByTestId("completeButton_0");
    fireEvent.click(completeButton);
    expect(pushMock).toHaveBeenCalledWith(
      "therapy/?mainTab=therapy&tab=monitors&view=complete&monitorId=list-item-1"
    );
  });

  it("should submit monitor view response", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        tab: "monitors",
        monitorId: "list-item-2",
        view: "complete",
      },
      push: pushMock,
    });
    await sut();

    expect(await screen.findByText(/Very Happy/i)).toBeInTheDocument();

    const lastEmoji = await screen.findByTestId("emojiOption_4");
    fireEvent.click(lastEmoji);

    const hourInput = await screen.findByTestId("hoursInput");
    fireEvent.change(hourInput, {
      target: { value: "12" },
    });

    const csvElement_2_1 = await screen.findByTestId("csvElement_2_1");
    fireEvent.click(csvElement_2_1);

    const csvElement_3_2 = await screen.findByTestId("csvElement_3_2");
    fireEvent.click(csvElement_3_2);

    const radioYes = await screen.findByTestId("radio_yes");
    fireEvent.click(radioYes);

    const saveMonitorBtn = await screen.findByTestId("saveMonitorBtn");
    fireEvent.click(saveMonitorBtn);
    const confirmBtn = await screen.findByTestId("confirmButton");

    fireEvent.click(confirmBtn);

    expect(
      await screen.findByText(/Response successfully submitted./i)
    ).toBeInTheDocument();
  });

  it("should render next monitor view", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        tab: "monitors",
        monitorId: "list-item-1",
        view: "complete",
      },
      push: pushMock,
    });
    await sut();

    const nextButton = await screen.findByTestId("nextMonitorBtn");
    fireEvent.click(nextButton);

    expect(pushMock).toHaveBeenCalledWith(
      "therapy/?mainTab=therapy&tab=monitors&view=complete&monitorId=list-item-2"
    );
  });

  it("should render back monitor view", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        tab: "monitors",
        monitorId: "list-item-2",
        view: "complete",
      },
      push: pushMock,
    });
    await sut();
    const backButton = await screen.findByTestId("backMonitorBtn");
    fireEvent.click(backButton);
    expect(pushMock).toHaveBeenCalledWith(
      "therapy/?mainTab=therapy&tab=monitors"
    );
  });
});
