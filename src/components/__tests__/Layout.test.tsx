import Layout from "../layout";
import { render, screen } from "@testing-library/react";

import { useAppContext } from "../../contexts/AuthContext";
import { MockedProvider } from "@apollo/react-testing";
import { SnackbarProvider } from "notistack";
import { GET_PROFILE_DATA } from "../../graphql/query/patient";
jest.mock("../../contexts/AuthContext");

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PROFILE_DATA,
    variables: { groupName: "patient" },
  },
  result: {
    data: {
      getProfileById: {
        data: {
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
  },
});

describe("when rendered with a sidebarmenu component", () => {
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

  const sut = async () => {
    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <SnackbarProvider>
          <Layout />
        </SnackbarProvider>
      </MockedProvider>
    );

    screen.queryByTestId("activity-indicator");
  };
  it("should render", async () => {
    await sut();
    expect(screen.getByTestId("layoutUi")).toBeInTheDocument();
    expect(screen.getByTestId("navBar")).toBeInTheDocument();
  });
});
