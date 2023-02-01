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
  CREATE_THERAPIST_SAFETY_PLAN,
  GET_SAFETY_PLAN_LIST_FOR_THERAPIST,
  UPDATE_THERAPIST_SAFETY_PLAN,
} from "../graphql/SafetyPlan/graphql";
import TherapistSafetyPlanIndex from "../pages/therapist/patient/view/[id]/safetyPlan";
import theme from "../styles/theme/theme";

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
          plan_type: "custom",
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

mocksData.push({
  request: {
    query: CREATE_THERAPIST_SAFETY_PLAN,
    variables: {
      patientId: "4937a27dc00d48bf983fdcd4b0762ebd",
      planDesc: "test des",
      planName: "test",
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
    query: UPDATE_THERAPIST_SAFETY_PLAN,
    variables: {
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
      updatePlan: {
        description: "Test New Data Text",
        name: "Test Plan Data",
      },
    },
  },
  result: {
    data: {
      updateTherapistSafetyPlanById: {
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_SAFETY_PLAN,
    variables: {
      planId: "b605e3f4-9f2a-48fe-9a76-9c7cebed6027",
      updatePlan: {
        share_status: 1,
      },
    },
  },
  result: {
    data: {
      updateTherapistSafetyPlanById: {
        result: true,
      },
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

const fillCreateSafeyPlanModalForm = async () => {
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
  await fillCreateSafeyPlanModalForm();
  const submitFormButton = await screen.findByTestId("submitForm");
  fireEvent.click(submitFormButton);
};

describe("Therapist patient safety plan", () => {
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
      fireEvent.mouseDown(buttonPlanTypeSelect);

      const listboxPlanTypeSelect = within(
        screen.getByRole("presentation")
      ).getByRole("listbox");

      const optionsPlanTypeSelect = within(listboxPlanTypeSelect).getAllByRole(
        "option"
      );

      fireEvent.click(optionsPlanTypeSelect[1]);

      expect(screen.getByText("Test Plan Data")).toBeInTheDocument();
    });
  });

  it("should render admin create safety plan page and submit the form", async () => {
    await submitForm();

    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should render admin cancel the submition", async () => {
    await submitForm();
    const cancelButton = await screen.findByTestId("cancelForm");
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeInTheDocument();
  });

  it("should close modal when cross icon press", async () => {
    await sut();
    const createPlanButton = await screen.findByTestId("createPlanButton");
    fireEvent.click(createPlanButton);
    // fireEvent.click(cancelButton);
    const crossButton = await screen.findByTestId("modalCrossIcon");
    expect(crossButton).toBeInTheDocument();

    fireEvent.click(crossButton);
    expect(crossButton).toBeInTheDocument();
  });

  it("should submit edit safety form", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const updatePlanButton = await screen.findByTestId("button-edit-icon_0");
    expect(updatePlanButton).toBeInTheDocument();
    fireEvent.click(updatePlanButton);
    const submitFormButton = await screen.findByTestId("submitForm");
    fireEvent.click(submitFormButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });

  it("should share safety plan", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "7a27dc00d48bf983fdcd4b0762ebd",
      },
    }));
    await sut();
    const sharePlanButton = await screen.findByTestId("button-share-icon_0");
    expect(sharePlanButton).toBeInTheDocument();
    fireEvent.click(sharePlanButton);
    const confirmButton = await screen.findByRole("button", {
      name: "Confirm",
    });
    fireEvent.click(confirmButton);
    const okButton = await screen.findByTestId("SuccessOkBtn");
    expect(okButton).toBeInTheDocument();
  });
});

//button-edit-icon_0
