import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import Measures from "..";
import { GET_THERAPIST_MEASURES_LIST } from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";
import {
  ADD_THERAPIST_MEASURE_PLAN_ADD,
  GET_THERAPIST_MEASURES_PLAN_LIST,
} from "../../../../graphql/SafetyPlan/graphql";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

// for listing
mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_LIST,
    variables: {
      patientId: "572b4bce-4a25-4c23-90d5-d85d6bc7fddf",
    },
  },
  result: {
    data: {
      therapistListMeasures: [
        {
          _id: "7cff4b39-0668-4e8f-b63f-d4b2b496a059",
          created_date: "2023-04-29T12:35:59.449Z",
          description: "des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 16,
          score_date: "2023-04-29T12:38:25.426Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1ytgif","col1":"quest","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1yu5cv","col1":"test","col2":"4","col3":"5","col4":"5","col5":"8","answer":""},{"id":"lh1yufoc","col1":"some","col2":"2","col3":"8","col4":"6","col5":"4","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "new tets",
          updated_date: "2023-04-29T12:38:25.426Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "d80cde21-6867-45fb-a257-99dad0b965ac",
          created_date: "2023-04-29T11:30:31.267Z",
          description: "some des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 11,
          score_date: "2023-04-29T11:43:25.365Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1wgjyd","col1":"quest1","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1wi7rs","col1":"quest2","col2":"4","col3":"6","col4":"7","col5":"8","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "Testformat2",
          updated_date: "2023-04-29T11:43:25.365Z",
          __typename: "TherapistMeasures",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ADD_THERAPIST_MEASURE_PLAN_ADD,
    variables: {
      patient_id: "572b4bce-4a25-4c23-90d5-d85d6bc7fddf",
      measure_id: "d80cde21-6867-45fb-a257-99dad0b965ac",
    },
  },
  result: {
    data: {
      therapistAddMeasure: {
        result: true,
        __typename: "adminResult",
      },
    },
  },
});

//  list for select dropdown
mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_PLAN_LIST,
  },
  result: {
    data: {
      therapistGetAdminMeasures: [
        {
          _id: "2da42e0f-95e1-402d-ae01-5102a6338c9f",
          created_date: "2023-05-01T05:00:32.390Z",
          description: "242",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          status: 1,
          template_data:
            '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"Slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Somewhat agree","label":"6"},{"value":"Slightly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[{"id":"lh4dgp30","question":"23526","answer":0}],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional.","totalScore":0}',
          template_id: "format1",
          title: "354235",
          updated_date: "2023-05-01T05:00:32.390Z",
          __typename: "AdminMeasures",
        },
      ],
    },
  },
});

//for check empty
mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_LIST,
    variables: {
      patientId: "572b4bce-4a25-4c23-90d5-d85d6bc7fddg",
    },
  },
  result: {
    data: {
      therapistListMeasures: [
        {
          _id: "7cff4b39-0668-4e8f-b63f-d4b2b496a059",
          created_date: "2023-04-29T12:35:59.449Z",
          description: "des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 16,
          score_date: "2023-04-29T12:38:25.426Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1ytgif","col1":"quest","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1yu5cv","col1":"test","col2":"4","col3":"5","col4":"5","col5":"8","answer":""},{"id":"lh1yufoc","col1":"some","col2":"2","col3":"8","col4":"6","col5":"4","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "new tets",
          updated_date: "2023-04-29T12:38:25.426Z",
          __typename: "TherapistMeasures",
        },
        {
          _id: "d80cde21-6867-45fb-a257-99dad0b965ab",
          created_date: "2023-04-29T11:30:31.267Z",
          description: "some des",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          score: 11,
          score_date: "2023-04-29T11:43:25.365Z",
          scores_list: null,
          share_status: 1,
          status: 1,
          template_data:
            '{"questions":{"headerRow":[{"id":"col1","label":"Over the last 2 weeks how often have you been bothered by the following problems?"},{"id":"col2","label":"Not at all"},{"id":"col3","label":"Several days"},{"id":"col4","label":"More than half days"},{"id":"col5","label":"Nearly every day"}],"bodyRows":[{"id":"lh1wgjyd","col1":"quest1","col2":"1","col3":"2","col4":"3","col5":"4","answer":""},{"id":"lh1wi7rs","col1":"quest2","col2":"4","col3":"6","col4":"7","col5":"8","answer":""}],"footerRows":[{"col1":"Column Total","col2":"","col3":"","col4":"","col5":""},{"col1":"Total Score","colAvg":""}]},"optionsQuestions":[{"type":"radio","question":"If you checked of any problems, how difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?","labels":[{"option":"Not difcult at all","answer":false},{"option":"Somewhat difficult","answer":false},{"option":"Very difficult","answer":false},{"option":"Extremely difficult","answer":false}]},{"type":"text","question":"This is calculated by assigning scores of 0, 1, 2, and 3, to the response categories of \\"not at all\\", \\"several days\\", \\"more than half the days\\", and \\"nearly every day\\" respectively. GAD-7 total score for the seven items ranges from 0 to 21.","labels":[{"option":"Scores represent: 0-5 mild","answer":""},{"option":"6-10 moderate","answer":""},{"option":"11-15 moderately severe anxiety","answer":""},{"option":"15-21 severe anxiety.","answer":""}]}],"totalScore":0}',
          template_id: "format2",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          title: "Testformat2",
          updated_date: "2023-04-29T11:43:25.365Z",
          __typename: "TherapistMeasures",
        },
      ],
    },
  },
});
mocksData.push({
  request: {
    query: GET_THERAPIST_MEASURES_PLAN_LIST,
  },
  result: {
    data: {
      therapistGetAdminMeasures: null,
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <Measures />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeAll(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "572b4bce-4a25-4c23-90d5-d85d6bc7fddf",
    },
    push: pushMock,
  });
});

describe("Therapist Add measure", () => {
  it("Should add measure", async () => {
    await sut();
    const addBtn = await screen.findByTestId("addMeasureButton");
    expect(addBtn).toBeInTheDocument();
    fireEvent.click(addBtn);
    const submitBtn = await screen.findByTestId("addSubmitForm");
    expect(submitBtn).toBeInTheDocument();
    const select = await screen.findByTestId("select_add_measure");

    fireEvent.click(select);
    expect(select).toBeInTheDocument();

    const buttonPlanTypeSelect = within(select).getByRole("button");
    expect(buttonPlanTypeSelect).toBeInTheDocument();
    fireEvent.mouseDown(buttonPlanTypeSelect);

    const listboxPlanTypeSelect = within(
      screen.getByRole("presentation")
    ).getByRole("listbox");
    const optionsPlanTypeSelect = await within(
      listboxPlanTypeSelect
    ).findAllByRole("option");

    fireEvent.click(optionsPlanTypeSelect[0]);
    fireEvent.click(submitBtn);
    expect(
      await screen.findByText("Are you sure you want to add the measure?")
    ).toBeInTheDocument();
    fireEvent.click(await screen.findByTestId("confirmButton"));
    await (async () => {
      expect(
        await screen.findByText("Your measure has been added successfully.")
      ).toBeInTheDocument();
    });
  });
  it("Check with null", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "572b4bce-4a25-4c23-90d5-d85d6bc7fddg",
      },
      push: pushMock,
    });
    await sut();
  });
});
