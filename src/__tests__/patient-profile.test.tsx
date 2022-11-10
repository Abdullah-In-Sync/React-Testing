import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import PatientById from "../pages/patient/view/[id]";

import { GET_PROFILE_DATA } from "../graphql/query/patient";
import { GET_TOKEN_DATA } from "../graphql/query/common";

const mocksData = [];

mocksData.push({
  request: {
    query: GET_TOKEN_DATA,
    variables: {},
  },
  result: {
    data: {
      getTokenData: {
        _id: "patient_id",
        user_type: "patient",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        patient_data: {
          therapist_id: "therapist_id",
          _id: "patient_id",
        },
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_PROFILE_DATA,
    variables: { groupName: "patient" },
  },
  result: {
    data: {
      getProfileById: {
        _id: "750a6993f61d4e58917e31e1244711f5",
        patient_firstname: "test name",
        patient_sexuality: "Asexual",
        patient_lastname: "test name last",
        patient_marrital: "Single",
        patient_gender: "Male",

        patient_lang: "English",
        patient_employment: "Self",
        patient_contract: "8989898989",
        patient_gpemailaddress: "test@gmail.com",
        patient_no: "1",
        patient_gppostalcode: "123123",
        patient_gpsurgeryname: "Surgery",
        patient_gpname: "gp test name",
        patient_gpcontactno: "7878787878",
        patient_gpcity: "City",
        patient_gpaddressline2: "Address line 2",
        patient_gpaddress: "gp address",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <PatientById />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Patient profile page", () => {
  it("should render complete patient form", async () => {
    await sut();
    expect(screen.getByTestId("patient-profile-form")).toBeInTheDocument();

    expect(screen.getByTestId("patient_firstname")).toBeInTheDocument();
    expect(screen.getByTestId("patient_lastname")).toBeInTheDocument();

    expect(screen.getByTestId("date_of_birth")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gender")).toBeInTheDocument();

    expect(screen.getByTestId("patient_sexuality")).toBeInTheDocument();

    expect(screen.getByTestId("patient_marrital")).toBeInTheDocument();

    expect(screen.getByTestId("nhs_no")).toBeInTheDocument();

    expect(screen.getByTestId("patient_lang")).toBeInTheDocument();

    expect(screen.getByTestId("region")).toBeInTheDocument();

    expect(screen.getByTestId("patient_employment")).toBeInTheDocument();

    expect(screen.getByTestId("contact_number")).toBeInTheDocument();

    expect(screen.getByTestId("email_address")).toBeInTheDocument();

    expect(screen.getByTestId("home_no")).toBeInTheDocument();

    expect(screen.getByTestId("address_line_1")).toBeInTheDocument();

    expect(screen.getByTestId("address_line_2")).toBeInTheDocument();

    expect(screen.getByTestId("city")).toBeInTheDocument();

    expect(screen.getByTestId("postal_code")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpname")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpsurgeryname")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpcontactno")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpemailaddress")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpaddress")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpaddressline2")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpcity")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gppostalcode")).toBeInTheDocument();

    expect(screen.getByTestId("next_name")).toBeInTheDocument();

    expect(screen.getByTestId("relationship")).toBeInTheDocument();

    expect(screen.getByTestId("next_contact_no")).toBeInTheDocument();

    expect(screen.getByTestId("next_email_address")).toBeInTheDocument();

    expect(screen.getByTestId("next_address_line_1")).toBeInTheDocument();

    expect(screen.getByTestId("next_address_line_2")).toBeInTheDocument();

    expect(screen.getByTestId("next_city")).toBeInTheDocument();

    expect(screen.getByTestId("next_postal_code")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpaddress")).toBeInTheDocument();
  });
});
it("should all prefilled value", async () => {
  await sut();

  await waitFor(async () => {
    await expect(screen.getByTestId("patient_firstname")).toHaveValue(
      "test name"
    );
    await expect(screen.getByTestId("patient_lastname")).toHaveValue(
      "test name last"
    );

    await expect(screen.getByTestId("patient_gender")).toHaveValue("Male");
    await expect(screen.getByTestId("patient_sexuality")).toHaveValue(
      "Asexual"
    );
    await expect(screen.getByTestId("patient_marrital")).toHaveValue("Single");

    await expect(screen.getByTestId("patient_lang")).toHaveValue("English");

    await expect(screen.getByTestId("patient_gpname")).toHaveValue(
      "gp test name"
    );
    await expect(screen.getByTestId("patient_gpsurgeryname")).toHaveValue(
      "Surgery"
    );

    await expect(screen.getByTestId("patient_gpcontactno")).toHaveValue(
      "7878787878"
    );

    await expect(screen.getByTestId("patient_gpemailaddress")).toHaveValue(
      "test@gmail.com"
    );
    await expect(screen.getByTestId("patient_gpaddress")).toHaveValue(
      "gp address"
    );
    await expect(screen.getByTestId("patient_gpaddressline2")).toHaveValue(
      "Address line 2"
    );
    await expect(screen.getByTestId("patient_gpcity")).toHaveValue("City");
    await expect(screen.getByTestId("patient_gppostalcode")).toHaveValue(
      "123123"
    );
  });
});
