import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/client/testing";
import {
  GET_PROFILE_DATA_FOR_THERAPIST,
  GET_PROFILE_DROPDOWN_DATA_BY_MASTER_DATA_API,
} from "../graphql/query/patient";
import { UPDATE_PROFILE_DATA_FROM_THERAPIST } from "../graphql/mutation/patient";
import { useAppContext } from "../contexts/AuthContext";
import TherapistProfileDetails from "../pages/therapist/patient/view/[id]/personalInfo/profileDetails";

jest.mock("../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PROFILE_DROPDOWN_DATA_BY_MASTER_DATA_API,
    variables: {
      name: "gender",
    },
  },
  result: {
    data: {
      getMasterData: [
        {
          _id: "63ee494c21d01c7b3e23fa2b",
          display_name: "Male",
          name: "male",
          __typename: "masterData",
        },
        {
          _id: "63ee49a321d01c7b3e23fa2d",
          display_name: "Female",
          name: "female",
          __typename: "masterData",
        },
        {
          _id: "63ee49bc21d01c7b3e23fa2e",
          display_name: "Transgender",
          name: "transgender",
          __typename: "masterData",
        },
        {
          _id: "63ee4a0621d01c7b3e23fa2f",
          display_name: "Non-Binary",
          name: "non_binary",
          __typename: "masterData",
        },
        {
          _id: "63ee4a2e21d01c7b3e23fa30",
          display_name: "Prefer not to say",
          name: "prefer_not_say",
          __typename: "masterData",
        },
        {
          _id: "63ee4a7f21d01c7b3e23fa31",
          display_name: "Other",
          name: "other",
          __typename: "masterData",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_PROFILE_DATA_FOR_THERAPIST,
    variables: { patient_id: undefined },
  },
  result: {
    data: {
      getPatientDetailById: {
        data: {
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
  },
});

mocksData.push({
  request: {
    query: UPDATE_PROFILE_DATA_FROM_THERAPIST,
    variables: {
      patient_id: undefined,
      first_name: "first_name",
      birthdate: "",
      address_line1: "",
      address_line2: "",
      home_no: "",
      kin_addressline1: "",
      kin_addressline2: "",
      kin_city: "",
      kin_contact: "",
      kin_email_address: "",
      kin_name: "",
      kin_postal: "",
      kin_relationship: "",
      last_name: "",
      nhs_no: "",
      patient_city: "",
      postal_code: "",
      religon: "",
      updateData: {
        patient_firstname: "first_name",
        patient_sexuality: "",
        patient_lastname: "",
        patient_marrital: "",
        patient_gender: "",
        patient_lang: "",
        patient_employment: "",
        patient_gpemailaddress: "",
        patient_gppostalcode: "",
        patient_gpsurgeryname: "",
        patient_gpname: "",
        patient_gpcontactno: "",
        patient_gpcity: "",
        patient_gpaddressline2: "",
        patient_gpaddress: "",
        patient_education: "",
        patient_ethnic_group: "",
        patient_physical_health: "",
        patient_illness_ability: "",
      },
    },
  },
  result: {
    data: {
      updatePatientProfileById: {
        _id: "9620ebf9279946678d4c5d64bdb973ed",
        addressline1: "Siddharth Nagar Uttar Pradesh",
        addressline2: null,
        birthdate: "05-06-2015",
        city: "Siddharth Nagar",
        created_date: "2022-01-26 09:12:05",
        email: "mongo@gmail.com",
        family_name: "686802e5123a482681a680a673ef7f53",
        home_no: "12",
        hos_id: "611f662e3a6c1c3ffb3edc65",
        kin_addressline1: "Siddharth Nagar Uttar Pradesh",
        kin_addressline2: "csaaa",
        kin_city: "Siddharth Nagar",
        kin_contact_no: "8989898989",
        kin_email_address: "srivastav.golu.ss@gmail.com",
        kin_postal: "272193",
        kin_relationship: "Sibling",
        nhsno: "NHS NO 1",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        patient_availability:
          '[{"Day":1,"from":"09:00","to":"17:00","avail":"0"},{"Day":2,"from":"09:00","to":"17:00","avail":"0"},{"Day":3,"from":"09:00","to":"17:00","avail":"0"},{"Day":4,"from":"09:00","to":"17:00","avail":"1"},{"Day":5,"from":"09:00","to":"17:00","avail":"0"},{"Day":6,"from":"09:00","to":"17:00","avail":"0"},{"Day":7,"from":"09:00","to":"17:00","avail":"0"}]',
        patient_consent: 1,
        patient_contract: 1,
        patient_education: "post_graduate",
        user_id: "61afe9bc-ccae-41de-9dd8-cef84de4370d",
        therapist_id: "686802e5123a482681a680a673ef7f53",
        postal_code: "272193",
        religion: "muslim",
        phone_number: "+4443434343444",
        patient_status: 1,
        patient_sexuality: "bisexual",
        patient_physical_health: "1",
        patient_no: "PN00009",
        patient_marrital: "Married",
        patient_lastname: "Srivastav",
        patient_lang: "English",
        patient_illness_ability: "1",
        patient_gpsurgeryname: "Surgery Name",
        patient_gppostalcode: "272193",
        patient_gpname: "GP Name",
        patient_gpemailaddress: "srivastav.golu.ss@gmail.com",
        patient_gpcontactno: "08299090930",
        patient_gpcity: "Siddharth Nagar",
        patient_gpaddressline2: "aadsad",
        patient_gpaddress: "Siddharth Nagar Uttar Pradesh",
        patient_gender: "prefer_not_say",
        patient_firstname: "Shubham123",
        patient_ethnic_group: "white",
        patient_employment: "employee",
        __typename: "Patient",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <SnackbarProvider>
        <TherapistProfileDetails />
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
        user_type: "therapist",
        parent_id: "73ddc746-b473-428c-a719-9f6d39bdef81",
        perm_ids: "9,10,14,21,191,65,66",
        user_status: "1",
        created_date: "2021-12-20 16:20:55",
        updated_date: "2021-12-20 16:20:55",
        therapist_data: {
          _id: "therapist_id",
          org_id: "myhelp",
        },
      },
    });
  });

  it("update profile data", async () => {
    await sut();
    await waitFor(async () => {
      expect(screen.getByTestId("edit-icon-button")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("edit-icon-button"));

      fireEvent.change(screen.queryByTestId("patient_firstname"), {
        target: { value: "first_name" },
      });

      fireEvent.change(screen.queryByTestId("patient_gender"), {
        target: { value: "Male" },
      });

      await waitFor(async () => {
        fireEvent.submit(screen.queryByTestId("patient-profile-form"));
      });
      await waitFor(async () => {
        expect(
          screen.getByText("Patient details saved successfully")
        ).toBeInTheDocument();
      });
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
      await expect(screen.getByTestId("patient_firstname")).toHaveValue("GRP");
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

  it("should click gender dropdown", async () => {
    await sut();
    expect(screen.getByTestId("patient_gender")).toBeInTheDocument();

    fireEvent.change(screen.queryByTestId("patient_gender"), {
      target: { name: "male" },
    });
    expect(screen.queryByTestId("patient_gender").getAttribute("name")).toBe(
      "male"
    );
  });

  it("should click radio button for patient illness", async () => {
    await sut();
    expect(screen.getByText("Not at all")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Not at all"));

    const checkboxTherapist = screen.getByLabelText(
      "Not at all"
    ) as HTMLInputElement;
    expect(checkboxTherapist).toBeChecked();
  });
});
