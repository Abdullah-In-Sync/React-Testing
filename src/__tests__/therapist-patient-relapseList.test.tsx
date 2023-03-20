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
import {
  THERAPIST_GET_ADMIN_RELAPSE_LIST,
  ADD_THERAPIST_RELAPSE_PLAN,
  UPDATE_THERAPIST_RELAPSE_PLAN,
} from "../graphql/Relapse/graphql";

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

mocksData.push({
  request: {
    query: THERAPIST_GET_ADMIN_RELAPSE_LIST,
    variables: {
      orgId: "517fa21a82c0464a92aaae90ae0d5c59",
    },
  },
  result: {
    data: {
      therapistGetAdminRelapseList: [
        {
          _id: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
          created_date: "2023-03-01T11:48:30.945Z",
          description: "updated desc",
          name: "updated plan",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-03-10T11:42:53.377Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "MasterRelapsePlans",
        },
        {
          _id: "42680543-ee76-41d2-9b50-0042bdf4da56",
          created_date: "2023-03-15T15:32:45.898Z",
          description: "This is our plan",
          name: "15th March Amar Relapse",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-03-15T15:32:45.898Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "MasterRelapsePlans",
        },
        {
          _id: "3c2a4a65-521c-4429-bf53-cdcc1e26da8b",
          created_date: "2023-03-15T15:34:44.095Z",
          description: "descioprtionton again",
          name: "15thMarch Amar2",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "custom",
          status: 1,
          updated_date: "2023-03-15T15:34:44.095Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "MasterRelapsePlans",
        },
        {
          _id: "75cabb0d-3cf8-4270-bbac-64c894439965",
          created_date: "2023-03-16T04:34:54.066Z",
          description: "test",
          name: "Test relapse first",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "fixed",
          status: 1,
          updated_date: "2023-03-16T04:34:54.066Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "MasterRelapsePlans",
        },
        {
          _id: "576c2628-131a-4e29-a43f-98b6ff6959c8",
          created_date: "2023-03-17T06:02:53.255Z",
          description: "",
          name: "Withou quest des",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
          organization_name: null,
          plan_type: "custom",
          status: 1,
          updated_date: "2023-03-17T06:02:53.255Z",
          user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
          user_type: "admin",
          __typename: "MasterRelapsePlans",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: ADD_THERAPIST_RELAPSE_PLAN,
    variables: {
      patientId: "4937a27dc00d48bf98b0762ebd",
      planId: "a91adf1f-2bdc-4725-857b-3e690a3b6333",
    },
  },
  result: {
    data: {
      data: {
        therapistAddRelapsePlan: {
          result: true,
          __typename: "result",
        },
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_RELAPSE_PLAN,
    variables: {
      planId: "1beebad4-4e88-404a-ac8b-8797a300d250",
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

  it("should add new relapse plan", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf98b0762ebd",
      },
    }));
    await sut();

    const addPlanButton = screen.getByTestId("addPlanButton");
    fireEvent.click(addPlanButton);

    const planTypeSelect = await screen.findByTestId("relapsePlanDropdown");
    fireEvent.click(planTypeSelect);
    expect(planTypeSelect).toBeInTheDocument();

    const buttonPlanTypeSelect = within(planTypeSelect).getByRole("button");
    fireEvent.mouseDown(buttonPlanTypeSelect);

    const listboxPlanTypeSelect = within(
      screen.getByRole("presentation")
    ).getByRole("listbox");
    const optionsPlanTypeSelect = await within(
      listboxPlanTypeSelect
    ).findAllByRole("option");

    fireEvent.click(optionsPlanTypeSelect[0]);

    const addRelapsePlanSubmit = screen.getByTestId("addRelapsePlanSubmit");
    fireEvent.click(addRelapsePlanSubmit);

    expect(
      await screen.findByText(/Plan added Successfully/i)
    ).toBeInTheDocument();
  });

  it("should share safety plan", async () => {
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "4937a27dc00d48bf983fdcd4b0762ebd",
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
