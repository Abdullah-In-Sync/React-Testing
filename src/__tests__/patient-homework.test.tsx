import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@mui/material";
import Homework from "../components/patient/therapyPages/homework";
import { UPDATE_PATIENT_HOMEWORK_BY_ID } from "../graphql/mutation/patient";
import { GET_PATIENTTHERAPY_DATA } from "../graphql/query/common";
import { GET_PATIENT_HOMEWORK_LIST } from "../graphql/query/patient";
import theme from "../styles/theme/theme";

import { useAppContext } from "../contexts/AuthContext";
jest.mock("../contexts/AuthContext");

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];

mocksData.push({
  request: {
    query: GET_PATIENTTHERAPY_DATA,
    variables: { patientId: "73ddc746-b473-428c-a719-9f6d39bdef81" },
  },
  result: {
    data: {
      getPatientTherapy: [
        {
          icd10: "",
          dcm5: "",
          risk_of_suicide: 0,
          pttherapy_session: "3",
          pttherapy_status: 1,
          created_date: "2022-11-25T07:41:09.000Z",
          therapist_id: "686802e5123a482681a680a673ef7f53",
          _id: "05be3e5df21a40a3b04bcbb5a22b219b",
          disorder_id: "4af58b3923074fd2bd111708e0145e2a",
          model_id: "bd0d22a6c2a44124a524699c74e5909c",
          patient_id: "6605f4c3992c4fa691a1317c69054ae8",
          therapy_id: "091886de6af2476daa50245033a4889a",
          therapy_detail: {
            _id: "091886de6af2476daa50245033a4889a",
            created_date: "2022-10-06T16:56:43.000Z",
            org_id: "517fa21a82c0464a92aaae90ae0d5c59",
            therapy_name: "amar therapy",
            therapy_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Therapy",
          },
          model_detail: {
            _id: "bd0d22a6c2a44124a524699c74e5909c",
            created_date: "2022-10-28T10:22:42.000Z",
            disorder_id: "4af58b3923074fd2bd111708e0145e2a",
            model_name: "28th amar model",
            model_status: 1,
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "DisorderModel",
          },
          disorder_detail: {
            _id: "4af58b3923074fd2bd111708e0145e2a",
            created_date: "2022-10-28T10:20:38.000Z",
            disorder_name: "28th amar disorder",
            disorder_status: 1,
            therapy_id: "37c3e0ac4f7443a2b2f12afd404936f8",
            user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
            user_type: "admin",
            __typename: "Disorder",
          },
          __typename: "PatientTherapy",
        },
      ],
    },
  },
});

mocksData.push({
  request: {
    query: GET_PATIENT_HOMEWORK_LIST,
    variables: { therapyId: "05be3e5df21a40a3b04bcbb5a22b219b" },
  },
  result: {
    data: {
      getHomeworksByPatientId: {
        data: [
          {
            therapy_id: "05be3e5df21a40a3b04bcbb5a22b219b",
            ptsession_id: "9dc5b1c1a9b34c9fa54477e4331690b3",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            patient_id: "6605f4c3992c4fa691a1317c69054ae8",
            pthomewrk_task: "",
            pthomewrk_status: 1,
            pthomewrk_date: "2022-12-23T10:20:32.000Z",
            pthomewrk_resp: "jhhkhk",
            therapist_resp: null,
            resource_id: "48c8270d-e5cb-4c21-85b5-57b6fcd50018",
            ptshareres_id: null,
            complete_status: "0",
            created_date: "2022-12-23T10:20:32.000Z",
            resource_data: [
              {
                user_id: "9ea296b4-4a19-49b6-9699-c1e2bd6fc946",
                user_type: "admin",
                resource_name: "AD5567",
                resource_type: 2,
                resource_issmartdraw: "0",
                resource_isformualation: "0",
                disorder_id: "83b2cc7813764aa9a095e79386805467",
                model_id: "60d4284b33f24874a21f20144cd682fc",
                category_id: "add7bfe989374f5593ab2167aa4e0669",
                org_id: "517fa21a82c0464a92aaae90ae0d5c59",
                resource_desc: "AD5567",
                resource_instruction: "AD5567AD5567",
                resource_references: "AD5567",
                resource_session_no: "",
                agenda_id: "",
                resource_url: "http://test",
                resource_avail_therapist: "1",
                resource_avail_onlyme: "0",
                resource_filename:
                  "0120524566__20220505114858__resources_20220225173305__Behavioural_activation_activities.pdf",
                resource_status: 1,
                resource_returnurl: "",
                download_resource_url: "https://test",
                template_id: "",
                template_data: "",
                created_date: "2022-12-20T05:25:09.337Z",
                updated_date: "2022-12-20T05:25:09.337Z",
                _id: "48c8270d-e5cb-4c21-85b5-57b6fcd50018",
                __typename: "Resource",
              },
            ],
            _id: "526f2b09364641cb8a26694c728c38c6",
            __typename: "PatientHomework",
          },
          {
            therapy_id: "05be3e5df21a40a3b04bcbb5a22b219b",
            ptsession_id: "f3d1d64189a940ef927c2dfe87b61188",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            patient_id: "6605f4c3992c4fa691a1317c69054ae8",
            pthomewrk_task: "home work talk to parent",
            pthomewrk_status: 1,
            pthomewrk_date: "2022-11-29",
            pthomewrk_resp: "ojlsdlnfldslmf",
            therapist_resp: "",
            resource_id: "",
            ptshareres_id: "",
            complete_status: "0",
            created_date: "2022-12-14T08:34:45.000Z",
            resource_data: [],
            _id: "d8579de63e4d43c7b114456aa9ca4e4b",
            __typename: "PatientHomework",
          },
        ],
        status: true,
        message: "success",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_PATIENT_HOMEWORK_LIST,
    variables: { therapyId: "05be3e5df21a40a3b04bcbb5a22b219bempty" },
  },
  result: {
    data: {
      getHomeworksByPatientId: null,
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PATIENT_HOMEWORK_BY_ID,
    variables: {
      ptHomeworkId: "526f2b09364641cb8a26694c728c38c6",
      update: {
        pthomewrk_resp: "updated_text",
      },
    },
  },
  result: {
    data: {
      data: {
        updatePatientHomeworkById: {
          data: {
            therapy_id: "05be3e5df21a40a3b04bcbb5a22b219b",
            ptsession_id: "9dc5b1c1a9b34c9fa54477e4331690b3",
            therapist_id: "686802e5123a482681a680a673ef7f53",
            patient_id: "6605f4c3992c4fa691a1317c69054ae8",
            pthomewrk_task: "",
            pthomewrk_status: 1,
            pthomewrk_date: "2022-12-23T10:20:32.000Z",
            pthomewrk_resp: "jhhkhk",
            therapist_resp: null,
            resource_id: "48c8270d-e5cb-4c21-85b5-57b6fcd50018",
            ptshareres_id: null,
            complete_status: "0",
            created_date: "2022-12-23T10:20:32.000Z",
            __typename: "Homework",
          },
          result: true,
          message: "success",
        },
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <Homework />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

const therapySaveButtonPress = async ({ textAreaText }) => {
  await sut();
  const firstTherapyTextarea = await screen.findByTestId("therapy_response_1");
  expect(firstTherapyTextarea).toBeInTheDocument();
  fireEvent.change(firstTherapyTextarea, { target: { value: textAreaText } });

  const firstTherapyButton = await screen.findByTestId("therapy_save_button_1");
  fireEvent.click(firstTherapyButton);
  expect(await screen.findByTestId("emptyMessage")).toBeInTheDocument();
};

const confirmButton = async ({ textAreaText }) => {
  await therapySaveButtonPress({ textAreaText });
  const confirmBtn = await screen.findByRole("button", { name: "Confirm" });
  fireEvent.click(confirmBtn);
};

describe("Patient homwork page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockClear();
    (useAppContext as jest.Mock).mockReturnValue({
      user: {
        user_type: "patient",
        patient_data: { _id: "73ddc746-b473-428c-a719-9f6d39bdef81" },
      },
    });
  });

  it("should render patient homework screen and submit response success", async () => {
    await confirmButton({ textAreaText: "updated_text" });
  });

  it("should hide confirmation popup on press of cancel button", async () => {
    await therapySaveButtonPress({ textAreaText: "updated_text" });
    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
  });

  it("Should display the error if update api fail", async () => {
    await confirmButton({ textAreaText: "failApi" });
    expect(
      await screen.findByText(/Server error please try later./i)
    ).toBeInTheDocument();
  });

  it("Should display empty message if no homework assigned", async () => {
    (useRouter as jest.Mock).mockClear();
    (useRouter as jest.Mock).mockImplementation(() => ({
      query: {
        id: "05be3e5df21a40a3b04bcbb5a22b219bempty",
      },
    }));
    await sut();
    expect(
      await screen.findByText("There is no homework assigned to you yet.")
    ).toBeInTheDocument();
  });
});
