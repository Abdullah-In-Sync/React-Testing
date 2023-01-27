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
import { useRouter } from "next/router";
import theme from "../styles/theme/theme";
import { GET_SAFETY_PLAN_LIST_FOR_THERAPIST } from "../graphql/SafetyPlan/graphql";
import TherapistSafetyPlanIndex from "../pages/therapist/patient/view/[id]/safetyPlan";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

// First vanilla api
mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "7a27dc00d48bf983fdcd4b0762ebd",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
          created_date: "2023-01-23T05:24:08.166Z",
          description: "Test New Data Text",
          plan_owner: "admin",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "4f5bc4ca-5daf-422a-819f-04ea7580d628",
          created_date: "2023-01-23T05:26:20.179Z",
          description: "plans safety",
          plan_owner: "admin",
          name: "safety_plans",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

// plantype fixes
mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
      planType: "fixed",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
          created_date: "2023-01-23T05:24:08.166Z",
          description: "Test New Data Text",
          plan_owner: "admin",
          name: "Test Plan Data",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
        {
          _id: "4f5bc4ca-5daf-422a-819f-04ea7580d628",
          created_date: "2023-01-23T05:26:20.179Z",
          description: "plans safety",
          plan_owner: "admin",
          name: "safety_plans",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

// while searching sa
mocksData.push({
  request: {
    query: GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
    variables: {
      patientId: "4937a27dc00d483fdcd4b0762ebd",
      searchText: "sa",
    },
  },
  result: {
    data: {
      getSafetyPlanListByPatientId: [
        {
          _id: "4f5bc4ca-5daf-422a-819f-04ea7580d628",
          created_date: "2023-01-23T05:26:20.179Z",
          description: "plans safety",
          plan_owner: "admin",
          name: "safety_plans",
          patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
          plan_type: "fixed",
          __typename: "patientSafetyPlans",
        },
      ],
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <TherapistSafetyPlanIndex />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

it("should render safety plan data", async () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: {
      id: "7a27dc00d48bf983fdcd4b0762ebd",
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
      target: { value: "sa" },
    });

    expect(screen.getByText("safety_plans")).toBeInTheDocument();
  });
});

it("should change the plane type", async () => {
  (useRouter as jest.Mock).mockImplementation(() => ({
    query: {
      id: "4937a27dc00d48bf983fdcd4b0762ebd",
    },
  }));

  await sut();
  await waitFor(async () => {
    const planTypeSelect = screen.getByTestId("planTypeSelect");

    const buttonPlanTypeSelect = within(planTypeSelect).getByRole("button");
    console.log("Koca: buttonPlanTypeSelect ", buttonPlanTypeSelect);
    fireEvent.mouseDown(buttonPlanTypeSelect);

    const listboxPlanTypeSelect = within(
      screen.getByRole("presentation")
    ).getByRole("listbox");

    const optionsPlanTypeSelect = within(listboxPlanTypeSelect).getAllByRole(
      "option"
    );

    fireEvent.click(optionsPlanTypeSelect[1]);
    console.log("Koca: optionsPlanTypeSelect[1] ", optionsPlanTypeSelect[1]);

    expect(screen.getByText("Test Plan Data")).toBeInTheDocument();
  });
});
