import { screen, render, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
import { GET_TOKEN_DATA } from "../graphql/query/common";
import { GET_PROFILE_DATA_FOR_THERAPIST } from "../graphql/query/patient";
import { UPDATE_PROFILE_DATA } from "../graphql/mutation/patient";
import { useAppContext } from "../contexts/AuthContext";
import TherapistProfileAgreement from "../pages/therapist/patient/view/[id]/personalInfo/profileAgreemet";
jest.mock("../contexts/AuthContext");
// mocks
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
    query: GET_PROFILE_DATA_FOR_THERAPIST,
    variables: { patient_id: null },
  },
  result: {
    data: {
      getPatientDetailById: {
        _id: "4937a27dc00d48bf983fdcd4b0762ebd",
        addressline1: "Bareilly Noida",
        addressline2: "Bareilly Noida",
        birthdate: "12-01-2005",
        city: "Bareilly",
        created_date: "2022-03-02T09:17:12.000Z",
        email: "grpse2013@gmail.com",
        family_name: "686802e5123a482681a680a673ef7f53",
        home_no: "7",
        hos_id: "611f662e3a6c1c3ffb3edc65",
        kin_addressline1: "Bareilly Noida 1",
        kin_addressline2: "Bareilly Noida",
        kin_city: "Bareilly Noida",
        kin_contact_no: "9718288422",
        kin_email_address: "kin1@gmail.com",
        kin_name: "GRP kin 1",
        kin_postal: "1234568",
        kin_relationship: "Sibling",
        nhsno: "686578",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        patient_availability:
          '[{"Day":1,"from":"09:00","to":"17:00","avail":"0"},{"Day":2,"from":"09:00","to":"17:00","avail":"0"},{"Day":3,"from":"09:00","to":"17:00","avail":"0"},{"Day":4,"from":"09:00","to":"17:00","avail":"0"},{"Day":5,"from":"09:00","to":"17:00","avail":"0"},{"Day":6,"from":"09:00","to":"17:00","avail":"0"},{"Day":7,"from":"09:00","to":"17:00","avail":"0"}]',
        patient_consent: 1,
        patient_contract: 1,
        patient_education: "no_equal_qualification",
        patient_employment: "self_employee",
        patient_ethnic_group: "black_british",
        patient_firstname: "GRP",
        patient_gender: "male",
        patient_gpaddress: "GP Address Line 1",
        patient_gpaddressline2: "Gp Address Line 2",
        patient_gpcity: "GP city",
        patient_gpcontactno: "9999999999",
        patient_gpemailaddress: "gp@gmail.com",
        patient_gpname: "GRP1",
        patient_gppostalcode: "988989",
        patient_gpsurgeryname: "Surgery Name1",
        patient_illness_ability: "1",
        patient_lang: "English",
        patient_lastname: "Tech",
        patient_marrital: "Single",
        patient_no: "PN00017",
        patient_physical_health: "1",
        patient_sexuality: "lesbian",
        patient_status: 1,
        phone_number: "+449718288411",
        postal_code: "2345678",
        religion: "no_religion",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        user_id: "5fec711d-e093-4c3e-b69f-336d3fa139bb",
        __typename: "Patient",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PROFILE_DATA,
    variables: {
      groupName: "patient",
      firstName: "",
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
      lastName: "",
      nhsNo: "",
      postalCode: "",
      religion: "",
      update: { patient_consent: 1, patient_contract: 1 },
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
// Copied below

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <TherapistProfileAgreement />
      </SnackbarProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Agreement Page", () => {
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
  it("Click on submit button without checkbox", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("patient_contract")).toBeChecked();
      expect(screen.getByTestId("patient_agree")).toBeChecked();
    });
  });
});
