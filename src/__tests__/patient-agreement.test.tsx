import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
import Agreement from "../pages/patient/agreement";
import { GET_TOKEN_DATA } from "../graphql/query/common";
import { GET_PROFILE_DATA } from "../graphql/query/patient";
import { UPDATE_PROFILE_DATA } from "../graphql/mutation/patient";
import { useAppContext } from "../contexts/AuthContext";
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
        patient_contract: 1,
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
        patient_consent: 1,
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
        <Agreement />
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
    expect(screen.getByTestId("agreement-form")).toBeInTheDocument();

    await waitFor(async () => {
      fireEvent.submit(screen.queryByTestId("agreementSubmitButton"));
    });

    await waitFor(async () => {
      expect(
        screen.getByText("Please select the checkbox.")
      ).toBeInTheDocument();
    });
  });

  it("Click and submit agreement page", async () => {
    await sut();
    expect(screen.getByTestId("agreement-form")).toBeInTheDocument();

    fireEvent.click(screen.queryByTestId("patient_consent"));
    expect(screen.getByTestId("editCancleAgreementButton")).toBeInTheDocument();

    await waitFor(async () => {
      fireEvent.submit(screen.queryByTestId("agreementSubmitButton"));
    });

    await waitFor(async () => {
      expect(screen.getByText("Agreement successfull")).toBeInTheDocument();
    });
  });
});
