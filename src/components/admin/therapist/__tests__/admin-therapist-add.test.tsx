import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { GET_ORGANIZATION_LIST } from "../../../../graphql/query/organization";

import theme from "../../../../styles/theme/theme";

import {
  ADD_ADMIN_THERAPIST,
  GET_MASTER_DATA,
} from "../../../../graphql/Therapist/graphql";
import AddTherapistPage from "../../../../pages/admin/therapist/add";

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

// GET_MASTER_DATA

mocksData.push({
  request: {
    query: ADD_ADMIN_THERAPIST,
    variables: {
      email: "test@test.com",
      therapist_name: "therapist test",
      password: "Myhelp@123",
      org_id: "org1",
      plan: "free",
      trial_period: "seven",
      therapist_specialization: "psychodynamic",
      therapist_proofaccredition: 1,
      accredited_body: "acc body text",
      therapist_totexp: "5",
      therapist_add: "addr text",
      phone_number: "+911234567890",
      professionalAccreditation: "student",
    },
  },
  result: {
    data: {
      addTherapist: {
        message: null,
        result: "482f3b30-bb3a-41a5-85ba-5ee501d4257f",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <AddTherapistPage />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const fillForm = async () => {
  // const dropdownSelect = await screen.findByTestId(/actions.dev-myhelp/i);
  // expect(dropdownSelect).toBeInTheDocument();

  const nameInput = await screen.findByTestId("therapist_name");
  fireEvent.change(nameInput, {
    target: { value: "therapist test" },
  });

  // emailInput

  fireEvent.change(await screen.findByTestId("emailInput"), {
    target: { value: "test@test.com" },
  });

  fireEvent.change(await screen.findByTestId("phone_number"), {
    target: { value: "+911234567890" },
  });
  //   passwordInput

  fireEvent.change(await screen.findByTestId("passwordInput"), {
    target: { value: "Myhelp@123" },
  });

  fireEvent.change(await screen.findByTestId("confirmPasswordInput"), {
    target: { value: "Myhelp@123" },
  });

  fireEvent.change(await screen.findByTestId("address_input"), {
    target: { value: "addr text" },
  });
  fireEvent.change(await screen.findByTestId("therapist_totexp"), {
    target: { value: "5" },
  });
  fireEvent.change(await screen.findByTestId("accredited_body"), {
    target: { value: "acc body text" },
  });

  await selectDropDown("organization");
  await selectDropDown("therapist_specialization");
  await selectDropDown("trial_period");
  await selectDropDown("professionalAccreditation");
};

const selectDropDown = async (dropdownTestId) => {
  const selectDropdown = await screen.findByTestId(dropdownTestId);
  expect(selectDropdown).toBeInTheDocument();

  const button = within(selectDropdown).getByRole("button");
  fireEvent.mouseDown(button);

  const listbox = within(screen.getByRole("presentation")).getByRole("listbox");
  const options = within(listbox).getAllByRole("option");

  fireEvent.click(options[0]);
};

describe("Admin create monitor", () => {
  it("should render duplicate modal", async () => {
    await sut();
    await fillForm();
    fireEvent.click(await screen.findByTestId("submitForm"));
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Therapist added successfully!/i)
    ).toBeInTheDocument();
    // const okButton = await screen.findByTestId("OkButton");
    // expect(okButton).toBeInTheDocument();
    // fireEvent.click(okButton);
  });
});
