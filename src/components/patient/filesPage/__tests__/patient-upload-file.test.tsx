import { MockedProvider } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import { useAppContext } from "../../../../contexts/AuthContext";
import * as s3 from "../../../../lib/helpers/s3";
import * as store from "../../../../utility/storage";

import theme from "../../../../styles/theme/theme";

import {
  ADD_PATIENT_FILE,
  GET_PATIENT_FILE_LIST,
  UPDATE_PATIENT_FILE,
} from "../../../../graphql/patientFile/graphql";
import { GET_FILE_UPLOAD_URl } from "../../../../graphql/query/common";
import FilesPatientComponent from "../../files";

jest.mock("../../../../contexts/AuthContext");
jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));
const windowOpenSpy = jest.spyOn(window, "open");

const mocksData = [];
const file = new File(["hello"], "hello.png", { type: "image/png" });
jest
  .spyOn(s3, "strippedBlob")
  .mockImplementation((_, callback) => callback(file));
const originalWindowLocation = window.location;
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
      imageFolder: "patientfiles",
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

mocksData.push({
  request: {
    query: GET_PATIENT_FILE_LIST,
    variables: {
      patient_id: "user_id",
    },
  },
  result: {
    data: {
      getPatientFileList: {
        message: "success",
        result: true,
        data: [
          {
            _id: "pu1",
            added_by: "patient",
            created_date: "2023-09-20T10:29:49.922Z",
            download_file_url: "https://imagefile",
            file_name: "091029428__format_1.png",
            file_url: "https://imagefileUrl.com",
            share_status: 0,
            status: 1,
            title: "some",
          },
          {
            _id: "pu2",
            added_by: "patient",
            created_date: "2023-09-20T10:28:30.286Z",
            description: "",
            download_file_url: "https://imagefile2",
            file_name: "091028216__format_2.png",
            file_url: "https://imagefieleurl2",
            share_status: 0,
            status: 1,
            title: "test",
          },
          {
            _id: "pu3",
            added_by: "patient",
            created_date: "2023-09-20T10:28:30.286Z",
            description: "",
            download_file_url: "https://imagefile2",
            file_name: "091028216__format_3.png",
            file_url: "https://imagefieleurl2",
            share_status: 0,
            status: 1,
            title: "test",
          },
          {
            _id: "pu4",
            added_by: "therapist",
            created_date: "2023-09-20T10:28:30.286Z",
            description: "",
            download_file_url: "https://imagefile4",
            file_name: "091028216__format_4.png",
            file_url: "https://imagefieleurl4",
            share_status: 1,
            status: 1,
            title: "test",
          },
        ],
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PATIENT_FILE,
    variables: {
      file_id: "pu1",
      patient_id: "user_id",
      update: {
        file_name: "091029428__format_1.png",
        title: "some",
        description: "",
      },
    },
  },
  result: {
    data: {
      updatePatientFile: {
        result: true,
        message: "file update successfully",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PATIENT_FILE,
    variables: {
      file_id: "pu1",
      patient_id: "user_id",
      update: { file_name: "dummy.pdf", title: "some", description: "" },
    },
  },
  result: {
    data: {
      updatePatientFile: {
        result: true,
        message: "file update successfully",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PATIENT_FILE,
    variables: {
      file_id: "pu1",
      patient_id: "user_id",
      update: {
        file_name: "091029428__format_1.png",
        title: "some",
        description: "",
      },
    },
  },
  result: {
    data: {
      updatePatientFile: {
        result: true,
        message: "file update successfully",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PATIENT_FILE,
    variables: { file_id: "pu1", patient_id: "user_id", update: { status: 0 } },
  },
  result: {
    data: {
      updatePatientFile: {
        result: true,
        message: "file update successfully",
      },
    },
  },
});

mocksData.push({
  request: {
    query: UPDATE_PATIENT_FILE,
    variables: { file_id: "pu2", patient_id: "user_id", update: { status: 0 } },
  },
  result: {
    data: {
      updatePatientFile: {
        result: false,
        message: "You are not authorized for this action",
      },
    },
  },
});
const idCustomJwtToken =
  "eyJraWQiOiJsXC9BY3BKVlJ6VGFmM1U0akhlUm8rUWZVZmlLbE9hSUphT3hjS0htNk9Rbz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiY2FlNGQxOC03ZGFiLTQ3YzUtOTUzNi0yMzU2YzFhNTFiYWEiLCJjb2duaXRvOmdyb3VwcyI6WyJjdXN0b20iXSwicm9sZV9kZXRhaWwiOiJ7XCJfaWRcIjpcImYyOGYyMjNjLWRmNDgtNDQyOS04YzUyLWE4YjU0YjgzOTY1YlwiLFwibmFtZVwiOlwiZmllbC1yb2xlXCIsXCJvcmdfaWRcIjpcIjUxN2ZhMjFhODJjMDQ2NGE5MmFhYWU5MGFlMGQ1YzU5XCIsXCJhY2Nlc3NpYmlsaXR5XCI6XCJwYXRpZW50XCIsXCJwb3NpdGlvblwiOlwic2lkZWJhclwiLFwic3RhdHVzXCI6MSxcImNyZWF0ZWRfZGF0ZVwiOlwiMjAyMy0xMS0xN1QwNjoyMzoyMC40NjdaXCIsXCJ1cGRhdGVkX2RhdGVcIjpcIjIwMjMtMTEtMjRUMTA6Mjk6MDcuMjI0WlwifSIsImN1c3RvbTpmaXJzdG5hbWUiOiJmaWxlcyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTEuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0xX3lkRkZXRkR3RyIsImF1dGhfdGltZSI6MTcwMDgyMTc2MywiY3VzdG9tOmxhc3RuYW1lIjoidXNlcjkwIiwiZXhwIjoxNzAwODI1MzYyLCJpYXQiOjE3MDA4MjE3NjMsImp0aSI6ImEzNzQ5NTExLWFkZmMtNGVlNC1iNDJkLTUzOWY3NGRkZmMyMiIsImVtYWlsIjoiZmlsZXN1c2VyOTBAbWFpbGluYXRvci5jb20iLCJ0aGVyYXBpc3RfZGF0YSI6IiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOnRydWUsImNvZ25pdG86dXNlcm5hbWUiOiJiY2FlNGQxOC03ZGFiLTQ3YzUtOTUzNi0yMzU2YzFhNTFiYWEiLCJvcmlnaW5fanRpIjoiYTA4NjdkZTEtYTJhMS00ZTdjLWFlOGYtNDU5NWZhZmY0NDA0Iiwicm9sZV9hY2Nlc3MiOiJbe1wiX2lkXCI6XCIwNmQzNjUxMS0zNGY0LTRlZDgtYjFlOC00NzVlMjc4YzM0OTNcIixcIm5hbWVcIjpcIkFncmVlbWVudFwiLFwicHJpdmlsZWdlc1wiOltdfSx7XCJfaWRcIjpcImY4ZTE5ZmM2LWViM2EtNGIzMC04NjcyLTZhZGEzNmIxY2NkNFwiLFwibmFtZVwiOlwiRmlsZXNcIixcInByaXZpbGVnZXNcIjpbe1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn0se1wiX2lkXCI6XCJiYjQzZTBmZC0wZGFhLTQ2ODktODIwMC1hZDY3MDc5N2MyNjlcIixcIm5hbWVcIjpcIlVwZGF0ZSByZXNwb25zZVwifSx7XCJfaWRcIjpcImY3NzY2Y2ZiLWVhMzgtNGM5MS1iOTNhLWFhZDU4OTU2Njg2OVwiLFwibmFtZVwiOlwiRG93bmxvYWRcIn0se1wiX2lkXCI6XCI3NmI5YzQ1NC0zZDYwLTRhOWYtYjliYy1lNTc4ODE5NjVmOTRcIixcIm5hbWVcIjpcIkFkZFwifSx7XCJfaWRcIjpcIjdkNTA5M2I5LTM1OWYtNDU0Mi04YTFmLWY4MDQwMjI4Mzc3MFwiLFwibmFtZVwiOlwiU2hhcmVcIn1dfSx7XCJfaWRcIjpcIjBjNWY0Zjc3LThhODItNDkyZi1hN2UyLWE1NzhmZDliMWIzNFwiLFwibmFtZVwiOlwiUmVsYXBzZVwiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjc2YjljNDU0LTNkNjAtNGE5Zi1iOWJjLWU1Nzg4MTk2NWY5NFwiLFwibmFtZVwiOlwiQWRkXCJ9LHtcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9XX0se1wiX2lkXCI6XCIxZjQ4NThlZC1kMmFhLTRmZDktODFlYi1lMGY3NjE5MThiZDRcIixcIm5hbWVcIjpcIlNhZmV0eSBQbGFuXCIsXCJwcml2aWxlZ2VzXCI6W3tcIl9pZFwiOlwiNzZiOWM0NTQtM2Q2MC00YTlmLWI5YmMtZTU3ODgxOTY1Zjk0XCIsXCJuYW1lXCI6XCJBZGRcIn0se1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn1dfSx7XCJfaWRcIjpcImU3YjZkY2Y0LTNlMmYtNDE3Zi04ZTllLTk5YjY0NGIzOGY1MFwiLFwibmFtZVwiOlwiTWVhc3VyZXNcIixcInByaXZpbGVnZXNcIjpbXX0se1wiX2lkXCI6XCI5ZDkwMTExNi0zYjAwLTQ2ZmEtOTg1MS03YWRhOTNlZDA2MGNcIixcIm5hbWVcIjpcIk1vbml0b3JzXCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiNDFhYzM0NzMtMzg1Ny00MzYxLWJkOTktMGZjMWUzMGQ5MzU2XCIsXCJuYW1lXCI6XCJBc3Nlc3NtZW50XCIsXCJwcml2aWxlZ2VzXCI6W3tcIl9pZFwiOlwiNWI5YzU0NWItYWMwYS00OWE0LThlOTQtMWQzOGI4NzU3ZDk1XCIsXCJuYW1lXCI6XCJWaWV3XCJ9XX0se1wiX2lkXCI6XCJkYmY2ZThjMC0yM2RiLTQ0YTctYTBlYS00ZWU2MTQ0YzkzMGNcIixcIm5hbWVcIjpcIkdvYWxzXCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiYzcxYzhiNDMtNjkzZi00MjAxLTgxZDEtMmNmNzZkZTA1ZDljXCIsXCJuYW1lXCI6XCJGb3JtdWxhdGlvblwiLFwicHJpdmlsZWdlc1wiOltdfSx7XCJfaWRcIjpcIjFhNjY2OGE3LWVjMDQtNDkwNC05NzMwLWExNGFlNGFjMTU0MVwiLFwibmFtZVwiOlwiSG9tZXdvcmtcIixcInByaXZpbGVnZXNcIjpbXX0se1wiX2lkXCI6XCJhNzUyNTRjYS1lM2YzLTQwMWEtOGUyMC1iYmI1MGIzZDM5ZTNcIixcIm5hbWVcIjpcIkZlZWRiYWNrXCIsXCJwcml2aWxlZ2VzXCI6W119LHtcIl9pZFwiOlwiM2E5YTA1YjItMzBjMy00ZjNhLWJhZWMtMWJlNzk2MDg1NTQ0XCIsXCJuYW1lXCI6XCJSZXNvdXJjZVwiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcImY3NzY2Y2ZiLWVhMzgtNGM5MS1iOTNhLWFhZDU4OTU2Njg2OVwiLFwibmFtZVwiOlwiRG93bmxvYWRcIn0se1wiX2lkXCI6XCI1YjljNTQ1Yi1hYzBhLTQ5YTQtOGU5NC0xZDM4Yjg3NTdkOTVcIixcIm5hbWVcIjpcIlZpZXdcIn1dfSx7XCJfaWRcIjpcIjMzOWEzNDNmLTYzYzYtNDI2Zi04MzU3LWYyZmM1YTI1YWEyMFwiLFwibmFtZVwiOlwiUHJvZmlsZVwiLFwicHJpdmlsZWdlc1wiOlt7XCJfaWRcIjpcIjViOWM1NDViLWFjMGEtNDlhNC04ZTk0LTFkMzhiODc1N2Q5NVwiLFwibmFtZVwiOlwiVmlld1wifV19XSIsImF1ZCI6InFwbmwzbmE1NGdzZWZkdmRvdW0xczUxdGoiLCJldmVudF9pZCI6IjI1OTIwMzgwLTg5YjctNDVlNi1hY2M0LWQ0MTY1MThmNTAyMiIsInRva2VuX3VzZSI6ImlkIiwibmFtZSI6ImZpbGVzIHVzZXI5MCIsInBob25lX251bWJlciI6IisxMjEyMTIxMjEyIiwicGF0aWVudF9kYXRhIjoie1wiX2lkXCI6XCI1NzJiNGJjZS00YTI1LTRjMjMtOTBkNS1kODVkNmJjN2ZkZGZcIixcIm5hbWVcIjpcInJhdmluZHJhIHBhdGllbnRcIixcImZpcnN0X25hbWVcIjpcInJhdmluZHJhXCIsXCJsYXN0X25hbWVcIjpcInBhdGllbnRcIixcIm9yZ19pZFwiOlwiNTE3ZmEyMWE4MmMwNDY0YTkyYWFhZTkwYWUwZDVjNTlcIixcInRoZXJhcGlzdF9pZFwiOlwiYWNiNTQyMWEtOTIzYi00NWM2LWI2NmYtNzliOTQyZDVhZjQzXCJ9IiwiZmFtaWx5X25hbWUiOiI4MjIyN2U5MC0wZWMyLTRkMDAtYmExOC04NWRjMGJhZGI3ZjQifQ.cgaZIn-eCuUk0oA8uhherhKcUvXGNQc-O8Kivub6sA3BmDCxEe1CJf0JuLsFozo0hhdFsQ5uRkP5_t2Q0CkWYkfD11qT3KPpb-R7uctyLWAQEn1J-aZHxOrUC5jr3RrjEpiWRxvZlL0nWc2Tk8a8rA2KLZWYOtDE5rA7XJJh-P3JBzE0GBVHsXgvhI2qKK064st9oVMkgjpoB4UZC1fmaXidcN-Txztfziv9JBaHqH4e7Vyb8xgRImSvPVolZCY4Gcj74f7kbaC5Ttx-uLEppeAo9fMuhAFrAon4ccqfzuVvzJ1LwkvfO2aAOWFISEF2QuWTfB5IRQ2r3rHwuoR4EQ";

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
  jest.spyOn(store, "getSessionToken").mockReturnValue({
    userToken: "testToken",
    userType: "patient",
    userTokenId: idCustomJwtToken,
  });

  (useRouter as jest.Mock).mockReturnValue({
    query: {
      mainTab: "files",
    },
  });
  (useAppContext as jest.Mock).mockReturnValue({
    isAuthenticated: true,
    user: {
      _id: "user_id",
      user_type: "patient",
      patient_data: {
        _id: "user_id",
      },
    },
  });
  Object.defineProperty(window, "location", {
    configurable: true,
    enumerable: true,
    value: new URL(window.location.href),
  });
});

afterEach(() => {
  Object.defineProperty(window, "location", {
    configurable: true,
    enumerable: true,
    value: originalWindowLocation,
  });
});

describe("Patient files", () => {
  it("should render patient upload list", async () => {
    await sut();
    expect(
      await screen.findByText(/091028216__format_2.png/i)
    ).toBeInTheDocument();
  });

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

  it("should render upload form modal", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "dummy.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));
    await sut();
    fireEvent.click(await screen.findByTestId("uploadIconButton"));
    fireEvent.change(await screen.findByTestId("title"), {
      target: { value: "texttitle" },
    });

    fireEvent.change(await screen.findByTestId("description"), {
      target: { value: "textdesfail" },
    });

    fireEvent.change(await screen.getByTestId("file_name"), {
      target: { files: [file] },
    });

    fireEvent.click(await screen.findByTestId("formSubmit"));

    fireEvent.click(await screen.findByTestId("confirmButton"));

    expect(
      await screen.findByText(/Server error please try later./i)
    ).toBeInTheDocument();
  });

  it("should render message file name already exists", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "dummy.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));
    await sut();
    fireEvent.click(await screen.findByTestId("uploadIconButton"));
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

  it("should update upload file", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "dummy.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));
    await sut();
    fireEvent.click(await screen.findByTestId("iconButton_edit_pu1"));

    fireEvent.click(await screen.findByTestId("formSubmit"));

    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/File updated successfully!/i)
    ).toBeInTheDocument();
  });

  it("should delete upload file", async () => {
    await sut();
    fireEvent.click(await screen.findByTestId("iconButton_delete_pu1"));
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/File deleted successfully!/i)
    ).toBeInTheDocument();
  });

  it("should not delete upload file due to result false", async () => {
    await sut();
    fireEvent.click(await screen.findByTestId("iconButton_delete_pu2"));
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/You are not authorized for this action/i)
    ).toBeInTheDocument();
  });

  it("should not delete and show server error", async () => {
    await sut();
    fireEvent.click(await screen.findByTestId("iconButton_delete_pu3"));
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(
      await screen.findByText(/Server error please try later./i)
    ).toBeInTheDocument();
  });

  it("should open file to new tab", async () => {
    await sut();
    expect(await screen.findByTestId("openLink_pu1")).toHaveAttribute(
      "href",
      "https://imagefileUrl.com"
    );
    fireEvent.click(await screen.findByTestId("openLink_pu1"));
    fireEvent.click(await screen.findByTestId("iconButton_view_pu1"));
    expect(windowOpenSpy).toHaveBeenCalledTimes(1);
    expect(windowOpenSpy).toBeCalledWith("https://imagefileUrl.com", "_blank");
  });

  it("should download file", async () => {
    const expectedUrl = "https://imagefile/";
    await sut();
    fireEvent.click(await screen.findByTestId("iconButton_download_pu1"));
    window.location.href = expectedUrl;
    expect(window.location.href).toBe(expectedUrl);
  });

  it("should update upload with file", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "dummy.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));
    await sut();
    fireEvent.click(await screen.findByTestId("iconButton_edit_pu1"));

    fireEvent.click(await screen.findByTestId("formSubmit"));
    fireEvent.change(await screen.getByTestId("file_name"), {
      target: { files: [file] },
    });
    const confirmButton = await screen.findByTestId("confirmButton");
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);

    expect(
      await screen.findByText(/File updated successfully!/i)
    ).toBeInTheDocument();
  });
});
