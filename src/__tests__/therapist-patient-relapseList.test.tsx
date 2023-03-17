import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import {
  CREATE_THERAPIST_RELAPSE_PLAN,
  GET_RELAPSE_LIST_FOR_THERAPIST,
} from "../graphql/SafetyPlan/graphql";
import theme from "../styles/theme/theme";
import { useAppContext } from "../contexts/AuthContext";
import TherapistRelapsePlanIndex from "../pages/therapist/patient/view/[id]/relapse";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

jest.mock("../contexts/AuthContext");

const mocksData = [];

// First vanilla api
mocksData.push({
  request: {
    query: GET_RELAPSE_LIST_FOR_THERAPIST,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getRelapsePlanListByPatientId: [
        {
          _id: "1beebad4-4e88-404a-ac8b-8797a300d250",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updated plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "admin",
          plan_type: "fixed",
          questions: null,
          share_status: 0,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-13T14:57:35.491Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104026ceba90e4e27eea01",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updated",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "admin",
          plan_type: "custom",
          questions: null,
          share_status: 0,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-13T14:57:35.491Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104042ceba90e4e27eea02",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updated",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: null,
          share_status: 0,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-13T14:57:35.491Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104becceba90e4e27eea03",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "My Plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: null,
          share_status: 0,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-13T14:57:35.491Z",
          __typename: "patientRelapsePlans",
        },
      ],
    },
  },
});

// plantype fixes
mocksData.push({
  request: {
    query: GET_RELAPSE_LIST_FOR_THERAPIST,
    variables: {
      patientId: "4937a27dc00d48bf98b0762ebd",
      planType: "fixed",
    },
  },
  result: {
    data: {
      getRelapsePlanListByPatientId: [
        {
          _id: "1beebad4-4e88-404a-ac8b-8797a300d250",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updated plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "admin",
          plan_type: "fixed",
          questions: null,
          share_status: 0,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-13T14:57:35.491Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104042ceba90e4e27eea02",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "updated",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: null,
          share_status: 0,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-13T14:57:35.491Z",
          __typename: "patientRelapsePlans",
        },
        {
          _id: "64104becceba90e4e27eea03",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "My Plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: null,
          share_status: 0,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-13T14:57:35.491Z",
          __typename: "patientRelapsePlans",
        },
      ],
    },
  },
});

// while searching My
mocksData.push({
  request: {
    query: GET_RELAPSE_LIST_FOR_THERAPIST,
    variables: { patientId: "4937a27dc00d483fdcd4b0762ebd", searchText: "My" },
  },
  result: {
    data: {
      getRelapsePlanListByPatientId: [
        {
          _id: "64104becceba90e4e27eea03",
          created_date: "2023-03-13T14:57:35.491Z",
          description: "updated desc",
          name: "My Plan",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_owner: "abcd admin",
          plan_type: "fixed",
          questions: null,
          share_status: 0,
          therapist_id: "dbdd2446-093c-4ec4-abc9-df275634a817",
          updated_date: "2023-03-13T14:57:35.491Z",
          __typename: "patientRelapsePlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: CREATE_THERAPIST_RELAPSE_PLAN,
    variables: {
      planName: "test",
      planDesc: "test des",
      patientId: "4937a27dc00d48bf98b0762ebd",
    },
  },
  result: {
    data: {
      therapistCreateRelapsePlan: {
        result: true,
        __typename: "result",
      },
    },
  },
});
const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistRelapsePlanIndex />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const fillCreateRelapsePlanModalForm = async () => {
  const createPlanButton = await screen.findByTestId("createPlanButton");
  fireEvent.click(createPlanButton);
  //createPlanButton
  const planNameInput = await screen.findByTestId("planName");
  fireEvent.change(planNameInput, {
    target: { value: "test" },
  });

  const planDescriptionInput = await screen.findByTestId("planDescription");

  fireEvent.change(planDescriptionInput, {
    target: { value: "test des" },
  });

  expect(planDescriptionInput).toBeInTheDocument();
};

const submitForm = async () => {
  await sut();
  await fillCreateRelapsePlanModalForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

describe("Therapist patient safety plan", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        therapist_data: {
          _id: "therapist_id",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        },
      },
    });
  });

  it("should render safety plan data", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("panel1bh-header")).toBeInTheDocument();
      // expect(screen.getByTestId("planTypeSelect")).toBeInTheDocument();
    });
  });

  it("should search base on the search", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d483fdcd4b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      const searchInput = screen.getByTestId("searchInput");
      expect(searchInput).toBeInTheDocument();

      fireEvent.change(searchInput, {
        target: { value: "My" },
      });

      expect(screen.getByText("Relapse")).toBeInTheDocument();
    });
  });

  it("should change the plane type", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf98b0762ebd",
      },
    }));

    await sut();
    await waitFor(async () => {
      const planTypeSelect = screen.getByTestId("planTypeSelect");

      const buttonPlanTypeSelect = within(planTypeSelect).getByRole("button");
      fireEvent.mouseDown(buttonPlanTypeSelect);

      const listboxPlanTypeSelect = within(
        screen.getByRole("presentation")
      ).getByRole("listbox");

      const optionsPlanTypeSelect = within(listboxPlanTypeSelect).getAllByRole(
        "option"
      );

      fireEvent.click(optionsPlanTypeSelect[1]);

      expect(screen.getByText("Relapse")).toBeInTheDocument();
    });
  });

  it("should render therapsit create relapse plan page and submit the form", async () => {
    await submitForm();

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should render therapist cancel the submition", async () => {
    await submitForm();
    const cancelButton = await screen.findByTestId("cancelForm");
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeInTheDocument();
  });
});
