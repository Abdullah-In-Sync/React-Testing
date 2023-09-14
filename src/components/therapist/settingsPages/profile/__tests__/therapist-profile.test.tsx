import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { useAppContext } from "../../../../../contexts/AuthContext";
import * as s3 from "../../../../../lib/helpers/s3";
import { useRouter } from "next/router";

import theme from "../../../../../styles/theme/theme";

import {
  GET_MASTER_DATA,
  GET_THERAPIST_BY_ID,
  UPDATE_THERAPIST_BY_ID,
} from "../../../../../graphql/Therapist/graphql";
import SettingsTherapistComponent from "../../../settings";
import { GET_FILE_UPLOAD_URl } from "../../../../../graphql/query/common";
jest.mock("../../../../../contexts/AuthContext");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];
const file = new File(["hello"], "hello.png", { type: "image/png" });
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

mocksData.push({
  request: {
    query: GET_THERAPIST_BY_ID,
    variables: {
      user_id: "user_id",
    },
  },
  result: {
    data: {
      getTherapistById: {
        user_id: "user_id",
        email: "test8@test.com",
        phone_number: "+46514",
        plan: "free",
        therapist_proofaccredition: 0,
        therapist_totexp: "10",
        therapist_status: 1,
        therapist_profaccredition: "student",
        therapist_poa_attachment: "071248382__patientProfilePic.png",
        therapist_no: null,
        therapist_name: "therapistname",
        _id: "3e03a0c7-3ace-41ca-8f41-164076ba6e04",
        accredited_body: "test bosy deup",
        created_date: "2023-07-24T12:48:58.323Z",
        hos_id: null,
        hospital_admin_id: null,
        org_id: "517fa21a82c0464a92aaae90ae0d5c59",
        poa_url: "https://myhelp-dev-webapp",
        therapist_add: "add",
        therapist_inscover: "071248444__rightmark.png",
        therapist_specialization: "cat",
        trial_period: "seven",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_THERAPIST_BY_ID,
    variables: {
      user_id: "user_id",
      update: {
        email: "test8@test.com",
        therapist_name: "therapistname",
        therapist_specialization: "cat",
        therapist_profaccredition: "student",
        therapist_proofaccredition: 1,
        therapist_totexp: "10",
        phone_number: "+46514",
        therapist_poa_attachment: "dummy.pdf",
      },
    },
  },
  result: {
    data: {
      updateTherapistById: {
        _id: "therapist_id",
        user_id: "user_id",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_FILE_UPLOAD_URl,
    variables: {
      fileName: "dummy.pdf",
      imageFolder: "resource",
    },
  },
  result: {
    data: {
      getFileUploadUrl: {
        upload_file_url: "https://myhelp-",
      },
    },
  },
});

const sut = async () => {
  render(
    <MockedProvider mocks={mocksData} addTypename={false}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <SettingsTherapistComponent />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      mainTab: "profile",
    },
  });
  (useAppContext as jest.Mock).mockReturnValue({
    isAuthenticated: true,
    user: {
      _id: "user_id",
      user_type: "therapist",
    },
  });
});

describe("Admin view therapist", () => {
  it("should render view form", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "dummy.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));
    await sut();
    expect(
      await screen.findByText(/Proof of Accreditation:/i)
    ).toBeInTheDocument();

    const editProfileBtn = await screen.findByTestId("editProfileBtn");
    fireEvent.click(editProfileBtn);

    fireEvent.click(await screen.findByTestId("profileSubmit"));
    const cancelButton = await screen.findByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(cancelButton).not.toBeInTheDocument();
    fireEvent.click(editProfileBtn);
    fireEvent.click(await screen.findByTestId("toggleAcc-Update"));
    fireEvent.change(await screen.getByTestId("therapist_poa_attachment"), {
      target: { files: [file] },
    });
    fireEvent.click(await screen.findByTestId("profileSubmit"));
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Profile updated successfully!/i)
    ).toBeInTheDocument();
    const changePasswordBtn = await screen.findByTestId("changePasswordBtn");
    fireEvent.click(changePasswordBtn);
    const oldPasswordInput = await screen.findByTestId("oldPasswordInput");
    expect(oldPasswordInput).toBeInTheDocument();
  });
});
