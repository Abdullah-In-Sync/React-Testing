import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";

import theme from "../../../../styles/theme/theme";

import { useRouter } from "next/router";
import {
  GET_MASTER_DATA,
  GET_THERAPIST_BY_ID,
} from "../../../../graphql/Therapist/graphql";
import ViewTherapistPage from "../../../../pages/admin/therapist/view/[id]";
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const pushMock = jest.fn();

const mocksData = [];

mocksData.push({
  request: {
    query: GET_ORGANIZATION_LIST,
  },
  result: {
    data: {
      getOrganizationData: [
        {
          _id: "org1",
          name: "portal.dev-myhelp",
        },
        {
          _id: "org2",
          name: "actions.dev-myhelp",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_MASTER_DATA,
    variables: {
      name: "plan_trial",
    },
  },
  result: {
    data: {
      getMasterData: [
        {
          _id: "64a6e45b7302e5c60f0ada47",
          display_name: "7 Days",
          name: "seven",
        },
        {
          _id: "64a6e4827302e5c60f0ada48",
          display_name: "14 Days",
          name: "fourteen",
        },
        {
          _id: "64a6e4b57302e5c60f0ada49",
          display_name: "30 Days",
          name: "thirty",
        },
        {
          _id: "64a6e4d87302e5c60f0ada4a",
          display_name: "Lifetime",
          name: "lifetime",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_MASTER_DATA,
    variables: {
      name: "professional",
    },
  },
  result: {
    data: {
      getMasterData: [
        {
          _id: "64a6e3167302e5c60f0ada44",
          display_name: "Student",
          name: "student",
        },
        {
          _id: "64a6e3497302e5c60f0ada45",
          display_name: "Provisional qualification",
          name: "provisional_qualification",
        },
        {
          _id: "64a6e3617302e5c60f0ada46",
          display_name: "Fully qualified",
          name: "fully_qualified",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_MASTER_DATA,
    variables: {
      name: "specialization",
    },
  },
  result: {
    data: {
      getMasterData: [
        {
          _id: "64a6e1a77302e5c60f0ada3d",
          display_name: "Psychodynamic(psychoanalytic) psychotherapy",
          name: "psychodynamic",
        },
        {
          _id: "64a6e1eb7302e5c60f0ada3e",
          display_name: "Cognitive Behavioral Therapy (CBT)",
          name: "cbt",
        },
        {
          _id: "64a6e20a7302e5c60f0ada3f",
          display_name: "Cognitive Analytical Therapy (CAT)",
          name: "cat",
        },
        {
          _id: "64a6e2337302e5c60f0ada40",
          display_name: "Interpersonal Psychotherapy (IPT)",
          name: "ipt",
        },
        {
          _id: "64a6e24d7302e5c60f0ada41",
          display_name: "Humanistic Therapies",
          name: "humanistic",
        },
        {
          _id: "64a6e2857302e5c60f0ada42",
          display_name: "Family & Couples (Systemic) Therapy",
          name: "family_couples",
        },
        {
          _id: "64a6e2e27302e5c60f0ada43",
          display_name: "Person Centred",
          name: "person_centred",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_THERAPIST_BY_ID,
    variables: {
      user_id: "user_id",
    },
  },
  result: {
    data: {
      getTherapistById: {
        user_id: "user_id",
        email: "test8@test.com",
        phone_number: "+46514",
        plan: "free",
        therapist_proofaccredition: 1,
        therapist_totexp: "10",
        therapist_status: 1,
        therapist_profaccredition: "student",
        therapist_poa_attachment: "071248382__patientProfilePic.png",
        therapist_no: null,
        therapist_name: "new",
        _id: "3e03a0c7-3ace-41ca-8f41-164076ba6e04",
        accredited_body: "test bosy deup",
        created_date: "2023-07-24T12:48:58.323Z",
        hos_id: null,
        hospital_admin_id: null,
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        poa_url: "https://myhelp-dev-webapp",
        therapist_add: "add",
        therapist_inscover: "071248444__rightmark.png",
        therapist_specialization: "cat",
        trial_period: "seven",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <ViewTherapistPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      id: "user_id",
    },
    push: pushMock,
  });
});

describe("Admin view therapist", () => {
  it("should render view form", async () => {
    await sut();
    expect(
      await screen.findByText(/071248444__rightmark.png/i)
    ).toBeInTheDocument();
  });
});
