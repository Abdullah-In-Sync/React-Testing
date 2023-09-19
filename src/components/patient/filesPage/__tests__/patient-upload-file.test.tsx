import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { useAppContext } from "../../../../contexts/AuthContext";
import * as s3 from "../../../../lib/helpers/s3";

import theme from "../../../../styles/theme/theme";

import { ADD_PATIENT_FILE } from "../../../../graphql/patientFile/graphql";
import { GET_FILE_UPLOAD_URl } from "../../../../graphql/query/common";
import FilesPatientComponent from "../../files";

jest.mock("../../../../contexts/AuthContext");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mocksData = [];
const file = new File(["hello"], "hello.png", { type: "image/png" });

mocksData.push({
  request: {
    query: ADD_PATIENT_FILE,
    variables: {
      file_name: "dummy.pdf",
      title: "texttitle",
      is_private: 0,
      description: "textdes",
      patient_id: "user_id",
    },
  },
  result: {
    data: {
      addPatientFile: {
        result: true,
      },
    },
  },
});

mocksData.push({
  request: {
    query: ADD_PATIENT_FILE,
    variables: {
      file_name: "dummy.pdf",
      title: "textsecondtitle",
      is_private: 0,
      description: "textseconddes",
      patient_id: "user_id",
    },
  },
  result: {
    data: {
      addPatientFile: {
        result: false,
        message: "This file name already exists",
      },
    },
  },
});

mocksData.push({
  request: {
    query: GET_FILE_UPLOAD_URl,
    variables: {
      fileName: "dummy.pdf",
      imageFolder: "imageFolder",
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
          <FilesPatientComponent />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );
};

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: {
      mainTab: "files",
    },
  });
  (useAppContext as jest.Mock).mockReturnValue({
    isAuthenticated: true,
    user: {
      _id: "user_id",
      user_type: "paitent",
    },
  });
});

describe("Patient files", () => {
  it("should render upload form modal", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "dummy.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));
    await sut();
    fireEvent.click(await screen.findByTestId("uploadIconButton"));
    expect(await screen.findByText(/Set as Private:/i)).toBeInTheDocument();
    fireEvent.change(await screen.findByTestId("title"), {
      target: { value: "texttitle" },
    });

    fireEvent.change(await screen.findByTestId("description"), {
      target: { value: "textdes" },
    });

    fireEvent.change(await screen.getByTestId("file_name"), {
      target: { files: [file] },
    });

    fireEvent.click(await screen.findByTestId("formSubmit"));

    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/File uploaded successfully!/i)
    ).toBeInTheDocument();
  });

  it("should render message file name already exists", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "dummy.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));
    await sut();
    fireEvent.click(await screen.findByTestId("uploadIconButton"));
    expect(await screen.findByText(/Set as Private:/i)).toBeInTheDocument();
    fireEvent.change(await screen.findByTestId("title"), {
      target: { value: "textsecondtitle" },
    });

    fireEvent.change(await screen.findByTestId("description"), {
      target: { value: "textseconddes" },
    });

    fireEvent.change(await screen.getByTestId("file_name"), {
      target: { files: [file] },
    });

    fireEvent.click(await screen.findByTestId("formSubmit"));

    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/This file name already exists/i)
    ).toBeInTheDocument();
  });
});
