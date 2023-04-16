import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";

import ViewMeasuresPage from "../../../../pages/admin/measures/view/[id]";

import { useRouter } from "next/router";
import { AdMIN_VIEW_MEASURE } from "../../../../graphql/Measure/graphql";
import theme from "../../../../styles/theme/theme";

const pushMock = jest.fn();

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

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
          '{"intro":"People\'s problems sometimes affect their ability to do certain day-to-day tasks in their lives.  To rate your problems look at each section and determine on the scale provided how much your problem impairs your ability to carry out the activity. This assessment is not intended to be a diagnosis. If you are concerned about your results in any way, please speak with a qualified health professional.","scores":[{"value":"Strongly disagree","label":"0"},{"value":"Disagree","label":"1"},{"value":"slightly disagree","label":"2"},{"value":"Not Agree","label":"3"},{"value":"Neutral","label":"4"},{"value":"Agree","label":"5"},{"value":"Slightly agree","label":"6"},{"value":"Strongly agree","label":"7"},{"value":"Strongly agree","label":"8"}],"questions":[],"description":"The  maximum  score  of  the  WSAS  is  40,  lower  scores  are  better.  Privacy  -  please  note  -  this  form  does not  transmit  any  information  about  you  or  your  assessment  scores.  If  you  wish  to  keep  your  results, either  print  this  document  or  save  this  file  locally  to  your  computer.  If  you  click ‘save’ before closing, your results will be saved in this document. These results are intended as a guide to your health and are presented  for  educational  purposes  only.  They  are  not  intended  to  be  a  clinical  diagnosis.  If  you  are concerned in any way about your health, please consult with a qualified health professional."}',
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

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <ViewMeasuresPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e",
    },
    push: pushMock,
  });
});

describe("Admin view measures", () => {
  it("should render admin view measures", async () => {
    await sut();
    const textSlightlyAgree = await screen.findByText(/Slightly agree/i);
    expect(textSlightlyAgree).toBeInTheDocument();
  });

  it("when change to format 2", async () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {
        id: "04e25ccf-8f3e-48dd-b8ed-a4799a2c023e-format2",
      },
      push: pushMock,
    });
    await sut();
    const lastOptionText = await screen.findByText(/15-21 severe anxiety./i);

    expect(lastOptionText).toBeInTheDocument();
  });
});
