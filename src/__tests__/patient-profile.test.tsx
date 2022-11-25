import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import PatientById from "../pages/patient/view/[id]";

import { GET_PROFILE_DATA } from "../graphql/query/patient";
import { GET_TOKEN_DATA } from "../graphql/query/common";
import { UPDATE_PROFILE_DATA } from "../graphql/mutation/patient";
import { useAppContext } from "../contexts/AuthContext";

jest.mock("../contexts/AuthContext");

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
        addressline2: "address line 2",
        birthdate: "1-2-03",
        email: "email@gmail.com",
        home_no: "C-151",
        kin_addressline1: "Kin Address 1",
        kin_addressline2: "Kin Address 2",
        kin_city: "Kin_city",
        kin_contact_no: "1234567891",
        kin_email_address: "kin@gmail.com",
        kin_postal: "111111",
        kin_name: "Kin Name",
        kin_relationship: "father",
        nhsno: "HNS no 1",
        patient_consent: "",
        patient_availability: "",
        org_id: "",
        city: "city",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PROFILE_DATA,
    variables: {
      groupName: "patient",
      firstName: "first_name",
      dob: "",
      city: "",
      addressLine2: "",
      addressLine1: "",
      homeNo: "",
      kinAddressLine1: "",
      kinAddressLine2: "",
      kinCity: "",
      kinContactNo: "",
      kinEmailAddress: "",
      kinName: "",
      kinPostal: "",
      kinRelationship: "",
      lastName: "Last Name",
      nhsNo: "",
      postalCode: "",
      religion: "",
      update: {
        patient_sexuality: "Asexual",
        patient_lastname: "Last Name",
        patient_marrital: "Married",
        patient_gender: "Male",
        patient_firstname: "first_name",
        patient_lang: "English",
        patient_employment: "PartTime",
        patient_gpemailaddress: "gp@gmail.com",
        patient_gppostalcode: "123456",
        patient_gpsurgeryname: "Surgery",
        patient_gpname: "Gp_Name",
        patient_gpcontactno: "9998887776",
        patient_gpcity: "Gp_City",
        patient_gpaddressline2: "GP patient address line 2",
        patient_gpaddress: "Gp_Address",
      },
    },
  },
  result: {
    data: {
      updateProfileById: {
        _id: "abe59fa2fafb4476b8799413354c30fb",
        user_id: "9729bf52-46bf-4989-beb3-46712ea0545a",
        patient_status: 1,
        patient_sexuality: "Asexual",
        patient_no: "PN00110",
        patient_marrital: "Single",
        patient_lastname: "Update12",
        patient_lang: "Update12",
        patient_gpsurgeryname: "Update12",
        patient_gppostalcode: "111113",
        patient_gpname: "Update12",
        patient_gpemailaddress: "update@gmail.conm12",
        patient_gpcontactno: "Update12",
        patient_gpcity: "update12",
        patient_gpaddressline2: "Update 212",
        patient_gpaddress: "Upadate 112",
        patient_gender: "Female",
        patient_firstname: "Update",
        patient_employment: "Student",
        patient_contract: 1,
        patient_consent: 1,
        patient_availability:
          '[{"Day":1,"from":"09:00","to":"17:00","avail":"0"},{"Day":2,"from":"09:00","to":"17:00","avail":"0"},{"Day":3,"from":"09:00","to":"17:00","avail":"0"},{"Day":4,"from":"09:00","to":"17:00","avail":"0"},{"Day":5,"from":"09:00","to":"17:00","avail":"0"},{"Day":6,"from":"09:00","to":"17:00","avail":"0"},{"Day":7,"from":"09:00","to":"17:00","avail":"0"}]',
        __typename: "Patient",
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

  it("update profile data", async () => {
    await sut();
    expect(screen.getByTestId("edit-icon-button")).toBeInTheDocument();
    fireEvent.click(screen.queryByTestId("edit-icon-button"));

    fireEvent.change(screen.queryByTestId("patient_firstname"), {
      target: { value: "first_name" },
    });

    fireEvent.change(screen.queryByTestId("patient_lastname"), {
      target: { value: "Last Name" },
    });

    fireEvent.change(screen.queryByTestId("patient_gender"), {
      target: { value: "Male" },
    });

    fireEvent.change(screen.queryByTestId("patient_sexuality"), {
      target: { value: "Asexual" },
    });

    fireEvent.change(screen.queryByTestId("patient_marrital"), {
      target: { value: "Married" },
    });
    fireEvent.change(screen.queryByTestId("patient_lang"), {
      target: { value: "English" },
    });
    fireEvent.change(screen.queryByTestId("patient_employment"), {
      target: { value: "PartTime" },
    });

    fireEvent.change(screen.queryByTestId("patient_gpname"), {
      target: { value: "Gp_Name" },
    });

    fireEvent.change(screen.queryByTestId("patient_gpsurgeryname"), {
      target: { value: "Surgery" },
    });

    fireEvent.change(screen.queryByTestId("patient_gpcontactno"), {
      target: { value: "9998887776" },
    });

    fireEvent.change(screen.queryByTestId("patient_gpemailaddress"), {
      target: { value: "gp@gmail.com" },
    });

    fireEvent.change(screen.queryByTestId("patient_gpaddress"), {
      target: { value: "Gp_Address" },
    });
    fireEvent.change(screen.queryByTestId("patient_gpaddressline2"), {
      target: { value: "GP patient address line 2" },
    });
    fireEvent.change(screen.queryByTestId("patient_gpcity"), {
      target: { value: "Gp_City" },
    });
    fireEvent.change(screen.queryByTestId("patient_gppostalcode"), {
      target: { value: "123456" },
    });
    await waitFor(async () => {
      fireEvent.submit(screen.queryByTestId("patient-profile-form"));
    });
    await waitFor(async () => {
      expect(screen.getByText("Profile edit successfully")).toBeInTheDocument();
    });
  });
  it("should render complete patient form", async () => {
    await sut();
    expect(screen.getByTestId("patient-profile-form")).toBeInTheDocument();

    expect(screen.getByTestId("patient_firstname")).toBeInTheDocument();
    expect(screen.getByTestId("patient_lastname")).toBeInTheDocument();

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

    expect(screen.getByTestId("kin_relationship")).toBeInTheDocument();

    expect(screen.getByTestId("next_contact_no")).toBeInTheDocument();

    expect(screen.getByTestId("next_email_address")).toBeInTheDocument();

    expect(screen.getByTestId("next_address_line_1")).toBeInTheDocument();

    expect(screen.getByTestId("next_address_line_2")).toBeInTheDocument();

    expect(screen.getByTestId("next_city")).toBeInTheDocument();

    expect(screen.getByTestId("next_postal_code")).toBeInTheDocument();

    expect(screen.getByTestId("patient_gpaddress")).toBeInTheDocument();
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
      await expect(screen.getByTestId("patient_marrital")).toHaveValue(
        "Single"
      );

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
      await expect(screen.getByTestId("address_line_2")).toHaveValue(
        "address line 2"
      );

      await expect(screen.getByTestId("email_address")).toHaveValue(
        "email@gmail.com"
      );
      await expect(screen.getByTestId("home_no")).toHaveValue("C-151");
      await expect(screen.getByTestId("next_address_line_1")).toHaveValue(
        "Kin Address 1"
      );
      await expect(screen.getByTestId("next_address_line_2")).toHaveValue(
        "Kin Address 2"
      );
      await expect(screen.getByTestId("next_city")).toHaveValue("Kin_city");
      await expect(screen.getByTestId("next_contact_no")).toHaveValue(
        "1234567891"
      );
      await expect(screen.getByTestId("next_email_address")).toHaveValue(
        "kin@gmail.com"
      );
      await expect(screen.getByTestId("next_postal_code")).toHaveValue(
        "111111"
      );
      await expect(screen.getByTestId("next_name")).toHaveValue("Kin Name");
      await expect(screen.getByTestId("kin_relationship")).toHaveValue(
        "father"
      );
      await expect(screen.getByTestId("nhs_no")).toHaveValue("HNS no 1");
      await expect(screen.getByTestId("city")).toHaveValue("city");
    });
  });
  it("Cancle edit button", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("edit-icon-button")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("edit-icon-button"));
      expect(screen.getByTestId("editCancleSubmitButton")).toBeInTheDocument();

      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("editCancleSubmitButton"));
      });
      expect(screen.getByTestId("edit-icon-button")).toBeInTheDocument();
    });
  });
});
