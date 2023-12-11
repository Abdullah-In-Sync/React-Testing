import { render, screen } from "@testing-library/react";
import Sidebar from "../sidebar";
import { useAppContext } from "../../contexts/AuthContext";
import { MockedProvider } from "@apollo/react-testing";
import { SnackbarProvider } from "notistack";
import { GET_PROFILE_DATA } from "../../graphql/query/patient";
import { filterBasedOnPrivilages } from "../../utility/helper";
import { idCustomJwtToken } from "../login/__tests__/login.test";
import * as store from "../../utility/storage";
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

describe("when rendered with a sidebarmenu component", () => {
  beforeEach(() => {
    jest.spyOn(store, "getSessionToken").mockReturnValue({
      userToken: "testToken",
      userType: "patient",
      userTokenId: idCustomJwtToken,
    });
    (useAppContext as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      user: {
        _id: "userid1",
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        user_type: "patient",
        patient_data: {
          therapist_id: "therapistid1",
          org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        },
      },
    });
  });

  const sut = async () => {
    render(
      <MockedProvider mocks={mocksData} addTypename={false}>
        <SnackbarProvider>
          <Sidebar />
        </SnackbarProvider>
      </MockedProvider>
    );

    screen.queryByTestId("activity-indicator");
  };
  it("should render", async () => {
    await sut();
    expect(screen.getByTestId("sideBar")).toBeInTheDocument();
  });

  it("should return true when label is Home", () => {
    const routeObj = {
      moduleName: "default",
    };
    const result = filterBasedOnPrivilages(routeObj);
    expect(result).toBe(true);
  });

  it("should return false when label is invalid", () => {
    const routeObj = {
      moduleName: "InvalidLabel",
    };
    const result = filterBasedOnPrivilages(routeObj);
    expect(result).toBe(false);
  });
});
