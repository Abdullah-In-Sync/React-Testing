import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/react-testing";
import theme from "../styles/theme/theme";
import { ThemeProvider } from "@mui/styles";
import TherapistFilesList from "../pages/therapist/patient/view/[id]/files";
import {
  ADD_PATIENT_FILE,
  DELETE_THERAPIST_FILE,
  GET_THERAPIST_FILE_LIST,
  UPDATE_PATIENT_FILE,
} from "../graphql/mutation/resource";
import { GET_UPLOAD_LOGO_URL } from "../graphql/query/resource";
import * as s3 from "../lib/helpers/s3";

jest.mock("../contexts/AuthContext");
const file = new File(["hello"], "hello.pdf", { type: "image/png" });
jest
  .spyOn(s3, "strippedBlob")
  .mockImplementation((_, callback) => callback(file));

const mocks = [];

mocks.push({
  request: {
    query: GET_UPLOAD_LOGO_URL,
    variables: {
      fileName: "invalid.pdf",
      imageFolder: "images",
    },
  },
  result: {
    data: {
      getFileUploadUrl: {
        upload_file_url:
          "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/images/invalid.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJAVM5ZG3HA%2F20230111%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230111T045239Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCWV1LXdlc3QtMSJHMEUCIE7dk8MXHXt0s1zS9mYyI5FcRfTXndZIQnhWiveBOj04AiEA2tuDh0m1WxJtgG1Lp%2BwEdWqv3DR9zH5FN%2BLcdIGiU4oq7QIInv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgw2NzM5MjgyNTgxMTMiDNFvVJ6v7acLMUp06CrBAqbjqQjc3Ti5Fd%2BkGz4wWVtyljkgqXnF1SdsDYT8AQ55P5kOJCjBmxzIYkliSUpwWJCQg37tS2YPyWHIlcTpApSzEdBTBHurASbVWItO3TvS7xWvc4Bvrz21Bte6TTHkHH3oJCmENxt%2B%2Fxa2NXstHRY74F32Rvm6H7nAViH7f9DpBSIuMzqQpAFeIMJKR2he%2BpFNmmYRV8ZUVHlrjo0Eq%2BymMRvlhC1PqZ358XiPKPGgkTokXRP%2Bnf%2B02niRNkKWhrSxth3oPlQ0TSEkPADJM3h7n80VeJ8O1wQInzwqwOI30H6Sv%2FjTmY2uEoCn9M4O51otmYsEiKrFGX9IlK4rmzuZgY%2FnqBAwCdAGfK8Ucml56W6vjZCrr%2FBeKdewATCyoyNrLLqkhOs0IHh%2BBWJEN2y%2FIGIsUOE2aO6FGGb6ql%2B7BjDsgPmdBjqeAQNgttAYGLvuTXfcginssgtpPrARYnBnNfLZzzBCIkjUdZGV9TqthZ8eEqz2krJvjcIe%2FVQLT26ICrfPtjJlQEmHA7Hj6bj4wDe9DgFf72aro8QRiATIn6LrCIDK8IIbluqiUiaAEE6r6wScMl1ibVtcAWt42FgA%2BgVtxzxZNN2IX4wKpgZBh3n8xx5zU%2Bi2BJdmBA9wGp3BQ3dCOkTG&X-Amz-Signature=d97a40cd5264c661ab74dd09b6f2f6f2c8c8f945fdd6a85f9035d9c869569d1a&X-Amz-SignedHeaders=host&x-id=PutObject",
        __typename: "uploadFileUrl",
      },
    },
  },
});

mocks.push({
  request: {
    query: ADD_PATIENT_FILE,
    variables: {
      description: "Description",
      file_name: "hello.pdf",
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      title: "Title",
    },
  },
  result: {
    data: {
      getPatientFileListByTherapist: {
        data: [
          {
            _id: "e49dd699-68fe-4d02-8db3-4e4b5c115796",
            added_by: "therapist",
            created_date: "2023-09-16T09:34:50.752Z",
            description: "csd",
            download_file_url:
              "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/patientfiles/090926419__071329388__IMG_6994.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA5N4L2VFU%2F20230916%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230916T093451Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJGMEQCIA0jVd4U0wTRUEVMoxTBgsQTKnqcIQ%2B53Gfrd9mmwgyWAiAWV0%2BmFt6U4IEqHXootN8X%2BejGYMaUQs4e5AFDLZ%2FjyCr8AghzEAEaDDY3MzkyODI1ODExMyIMuvRGE27XlR75Lb%2BqKtkCLzxBm%2BPg4xnGaSrGmW3E9m4%2FxLMUoxRDa%2BZQo0HNqxBpaQs%2FqvB9BoTc3ZR1ZS1IRufy0ds1kVID3GSLRMUr0VIc6EnUMe%2FLJIz5npbQORyn5%2B4KNBRcrP6kD%2FGZB6IQuADf8Yd58q7r4fOAfrXrdbiKRyq%2F3ZJbM%2BeXjIk97gHGOgd2aHwVCsbZm9qcyge9dMwTniHKj0yDU6JOQDQKfUnnYepyEA6R1yrZDUKeInSVL9OJ6PW7bCN03UYLCthkrvso23nXLe2Nnehdr6ValYEifTyyI8WWDxo6pGurKNtOXyP9ce%2Fhl%2Fj%2Fz41QUfH%2B6SBYHsUskO83AMZJmHv%2FZVR3cfzqsTOT6r9xS1SGQgWTeJrpan%2FWsLC9G7LWVAu%2BQQf8s%2BbCUnIJRQyRmbFKgEIIznpdT%2FOUSxQnYFU%2BR4wX6GVm%2BsaiBmMJpU9Zyt5BIVbxYUx2l5IeMLntlagGOp8BtxzwYzj0ERwuvrLwREsC7GZADmUo%2FVL6nWinDF8Vf8EypzGujNAS296wFO5n2I%2ByiwQcCOpbJj%2BnsxRt24SeyT8EcXj48WpVfxO9N8hoehmj9F%2BXU8KyyBvwNgLaUaP73Uliw3B4YEuVIasdqCMWFt4m1Dmm3gwrX5mZwwgByFR5ezP5fzOUoDgjPmLS4BFyhsTxso8zfxVpLWOJmnr8&X-Amz-Signature=a0a7f1974aeb421f748ba0bbc0ff5ffa7231627b50dde5a800911dd456087fc2&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D090926419__071329388__IMG_6994.jpeg&x-id=GetObject",
            file_name: "090926419__071329388__IMG_6994.jpeg",
            file_url:
              "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/patientfiles/090926419__071329388__IMG_6994.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJA5N4L2VFU%2F20230916%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230916T093451Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJGMEQCIA0jVd4U0wTRUEVMoxTBgsQTKnqcIQ%2B53Gfrd9mmwgyWAiAWV0%2BmFt6U4IEqHXootN8X%2BejGYMaUQs4e5AFDLZ%2FjyCr8AghzEAEaDDY3MzkyODI1ODExMyIMuvRGE27XlR75Lb%2BqKtkCLzxBm%2BPg4xnGaSrGmW3E9m4%2FxLMUoxRDa%2BZQo0HNqxBpaQs%2FqvB9BoTc3ZR1ZS1IRufy0ds1kVID3GSLRMUr0VIc6EnUMe%2FLJIz5npbQORyn5%2B4KNBRcrP6kD%2FGZB6IQuADf8Yd58q7r4fOAfrXrdbiKRyq%2F3ZJbM%2BeXjIk97gHGOgd2aHwVCsbZm9qcyge9dMwTniHKj0yDU6JOQDQKfUnnYepyEA6R1yrZDUKeInSVL9OJ6PW7bCN03UYLCthkrvso23nXLe2Nnehdr6ValYEifTyyI8WWDxo6pGurKNtOXyP9ce%2Fhl%2Fj%2Fz41QUfH%2B6SBYHsUskO83AMZJmHv%2FZVR3cfzqsTOT6r9xS1SGQgWTeJrpan%2FWsLC9G7LWVAu%2BQQf8s%2BbCUnIJRQyRmbFKgEIIznpdT%2FOUSxQnYFU%2BR4wX6GVm%2BsaiBmMJpU9Zyt5BIVbxYUx2l5IeMLntlagGOp8BtxzwYzj0ERwuvrLwREsC7GZADmUo%2FVL6nWinDF8Vf8EypzGujNAS296wFO5n2I%2ByiwQcCOpbJj%2BnsxRt24SeyT8EcXj48WpVfxO9N8hoehmj9F%2BXU8KyyBvwNgLaUaP73Uliw3B4YEuVIasdqCMWFt4m1Dmm3gwrX5mZwwgByFR5ezP5fzOUoDgjPmLS4BFyhsTxso8zfxVpLWOJmnr8&X-Amz-Signature=b09e12b7d6312d07a50ae7a219b13d00c3babd38434a8f6f14e6bdd9aac300cd&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D090926419__071329388__IMG_6994.jpeg&x-id=GetObject",
            patient_id: "1b0d3af5-0e2d-497c-a26c-f07f114cd5f6",
            share_status: 0,
            status: 1,
            title: "csdc",
            updated_date: "2023-09-16T09:34:50.752Z",
            __typename: "patientFile",
          },
        ],
      },
    },
  },
});

mocks.push({
  request: {
    query: GET_THERAPIST_FILE_LIST,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      search_text: "",
    },
  },
  result: {
    data: {
      getPatientFileListByTherapist: {
        data: [
          {
            _id: "49ee7ee8-e92f-4aee-90ef-392a154d640c",
            added_by: "therapist",
            created_date: "2023-09-18T11:38:02.613Z",
            description: "adcn",
            download_file_url:
              "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/patientfiles/091137573__070858348__Screenshot%202023-03-16%20at%205.21.17%20PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJARR23LRXA%2F20230918%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230918T114141Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQCBtocOThwlwCnnFjPZHpv%2FkDbUVCyX%2F5UlYmTuG8oJYwIhAITex%2Bp09CYZY%2FYvHPZKRj%2F1mjuKqSuUHUwFdmS89eK7KoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNjczOTI4MjU4MTEzIgxo1KSEpxPqKjcQvn4q2QIVCH69s1opHMLQZMUAoCeh0RuMfAD%2F81Mho78eSSxiqVh637G0g3VFieRGnNNzcRvVo0J1pxWU4akZ87%2Fvac9W8Sn4PPGirb9YTJgTO11f5MRl48YcHY6NJk5WIQk%2F4PQowlmNgfDS9KpQLbo7yGDH6z6OPT%2Fg9DkJXQB5IKoFFBWXt4HpcPUDwlyzkX%2BgbRkgQjrTFn9cXkHT30boJSOrig2yQOyPmqdw51S%2F1jEkSjnTf6oCJEt3UM8S842z71VGMRJj7TW3mkfMsPHJGPbZknOtNZ5HOZAB3Mddx2ErbzyxiWRpPlR04cZ3bwmfI8BLNPd9yrSe%2BBOsnlDnqdhe1nkdFiieYqeUU7aMfqGY7WHMjbjKmaP1KC5tRRA345hLgfjrF7ql1U%2FKnOh4W8leLqDp15kSwpJtAyQ%2FCmQ5GMp9tVj512U2JIoGT8jKH7u%2B3ecR3tJDqdAw%2B%2BygqAY6nQFLcdta1uX2eZKRvXfccdm3K1wm9Nc0T0steH6D9e9FL7K2mJEPea%2Bgmh0tFd1xbYZXFgXSitekkQz77s%2B4Xv1b0BUDWaiouKQx6W1UHfevTqkUrCtysAvF1C4TIjT2%2BPsh6rPaFMb16%2FpsgBDwCjUH915V%2F4AoWqpS4yMg%2BNTmqIk%2B4O%2FZWyCV5mVMEQzJhtCQQdpAXIGvYp8X1coD&X-Amz-Signature=e7bd0e2cdcc993ede0af5174c14e1e70f0f9069471b0ad51a4e3b3b2db53b107&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D091137573__070858348__Screenshot%202023-03-16%20at%205.21.17%20PM.png&x-id=GetObject",
            file_name:
              "091137573__070858348__Screenshot 2023-03-16 at 5.21.17 PM.png",
            file_url:
              "https://myhelp-dev-webapp-s3-eu-west-1-673928258113.s3.eu-west-1.amazonaws.com/patientfiles/091137573__070858348__Screenshot%202023-03-16%20at%205.21.17%20PM.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZZ2KBEJARR23LRXA%2F20230918%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20230918T114141Z&X-Amz-Expires=1800&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMSJIMEYCIQCBtocOThwlwCnnFjPZHpv%2FkDbUVCyX%2F5UlYmTuG8oJYwIhAITex%2Bp09CYZY%2FYvHPZKRj%2F1mjuKqSuUHUwFdmS89eK7KoUDCKX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNjczOTI4MjU4MTEzIgxo1KSEpxPqKjcQvn4q2QIVCH69s1opHMLQZMUAoCeh0RuMfAD%2F81Mho78eSSxiqVh637G0g3VFieRGnNNzcRvVo0J1pxWU4akZ87%2Fvac9W8Sn4PPGirb9YTJgTO11f5MRl48YcHY6NJk5WIQk%2F4PQowlmNgfDS9KpQLbo7yGDH6z6OPT%2Fg9DkJXQB5IKoFFBWXt4HpcPUDwlyzkX%2BgbRkgQjrTFn9cXkHT30boJSOrig2yQOyPmqdw51S%2F1jEkSjnTf6oCJEt3UM8S842z71VGMRJj7TW3mkfMsPHJGPbZknOtNZ5HOZAB3Mddx2ErbzyxiWRpPlR04cZ3bwmfI8BLNPd9yrSe%2BBOsnlDnqdhe1nkdFiieYqeUU7aMfqGY7WHMjbjKmaP1KC5tRRA345hLgfjrF7ql1U%2FKnOh4W8leLqDp15kSwpJtAyQ%2FCmQ5GMp9tVj512U2JIoGT8jKH7u%2B3ecR3tJDqdAw%2B%2BygqAY6nQFLcdta1uX2eZKRvXfccdm3K1wm9Nc0T0steH6D9e9FL7K2mJEPea%2Bgmh0tFd1xbYZXFgXSitekkQz77s%2B4Xv1b0BUDWaiouKQx6W1UHfevTqkUrCtysAvF1C4TIjT2%2BPsh6rPaFMb16%2FpsgBDwCjUH915V%2F4AoWqpS4yMg%2BNTmqIk%2B4O%2FZWyCV5mVMEQzJhtCQQdpAXIGvYp8X1coD&X-Amz-Signature=de52cbc85100e72889a5f48e34529a819066db29be280a7c1cc3c24f619503fe&X-Amz-SignedHeaders=host&response-content-disposition=inline%3B%20filename%3D091137573__070858348__Screenshot%202023-03-16%20at%205.21.17%20PM.png&x-id=GetObject",
            patient_id: "37ee9ea7-8477-4954-8190-bde7414046c5",
            share_status: 0,
            status: 1,
            title: "kasn",
            updated_date: "2023-09-18T11:38:02.613Z",
            __typename: "patientFile",
          },
        ],
      },
    },
  },
});

mocks.push({
  request: {
    query: DELETE_THERAPIST_FILE,
    variables: {
      file_id: "49ee7ee8-e92f-4aee-90ef-392a154d640c",
      update: { status: 0, share_status: 0 },
    },
  },
  result: {
    data: {
      bulkUpdatePatientFile: {
        message: null,
        result: true,
        __typename: "result",
      },
    },
  },
});
mocks.push({
  request: {
    query: DELETE_THERAPIST_FILE,
    variables: {
      file_id: "49ee7ee8-e92f-4aee-90ef-392a154d640c",
      update: { share_status: 1 },
    },
  },
  result: {
    data: {
      bulkUpdatePatientFile: {
        message: null,
        result: true,
        __typename: "result",
      },
    },
  },
});

// update file
mocks.push({
  request: {
    query: UPDATE_PATIENT_FILE,
    variables: {
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      file_id: "49ee7ee8-e92f-4aee-90ef-392a154d640c",
      update: {
        description: "update-description",
        file_name:
          "091137573__070858348__Screenshot 2023-03-16 at 5.21.17 PM.png",
        title: "update-title",
      },
    },
  },
  result: {
    data: {
      updatePatientFile: {
        message: "File updated successfully!",
        result: true,
        __typename: "result",
      },
    },
  },
});

const sut = async () => {
  sessionStorage.setItem("patient_id", "4937a27dc00d48bf983fdcd4b0762ebd");
  sessionStorage.setItem("patient_name", "test");
  render(
    <MockedProvider mocks={mocks}>
      <ThemeProvider theme={theme()}>
        <SnackbarProvider>
          <TherapistFilesList />
        </SnackbarProvider>
      </ThemeProvider>
    </MockedProvider>
  );

  screen.queryByTestId("activity-indicator");
};

describe("Therapist client feedback list", () => {
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

  it("Upload files", async () => {
    await sut();

    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "invalid.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));

    await waitFor(async () => {
      expect(screen.getByTestId("upload_file_button")).toBeInTheDocument();
      expect(screen.getByTestId("delete-file-button")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("upload_file_button"));

      await waitFor(async () => {
        expect(screen.getByTestId("title")).toBeInTheDocument();
        fireEvent.change(screen.queryByTestId("title"), {
          target: { value: "Title" },
        });

        fireEvent.change(screen.queryByTestId("description"), {
          target: { value: "Description" },
        });

        fireEvent.change(screen.getByTestId("resource_file_upload"), {
          target: { files: [file] },
        });

        fireEvent.click(screen.queryByTestId("addSubmitForm"));
      });
      expect(screen.getByTestId("confirmButton")).toBeInTheDocument();
      await waitFor(async () => {
        fireEvent.click(screen.queryByTestId("confirmButton"));
      });

      await waitFor(async () => {
        expect(
          screen.getByText("File added successfully!")
        ).toBeInTheDocument();
      });
    });
  });

  it("Render list", async () => {
    await sut();

    await waitFor(async () => {
      await waitFor(async () => {
        expect(screen.getByText("adcn")).toBeInTheDocument();
      });
    });
  });

  it("Share file", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("share-file-button")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("share-file-button"));

      await waitFor(async () => {
        expect(
          screen.getByText(
            "Please select at least one file to perform the action."
          )
        ).toBeInTheDocument();
      });
      await waitFor(async () => {
        expect(screen.getByTestId("resource_checkbox0")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("resource_checkbox0"));

        expect(screen.getByTestId("share-file-button")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("share-file-button"));
      });

      await expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));

      await waitFor(async () => {
        expect(
          screen.getByText("File shared successfully!")
        ).toBeInTheDocument();
      });
    });
  });

  it("Delete file", async () => {
    await sut();

    await waitFor(async () => {
      expect(screen.getByTestId("delete-file-button")).toBeInTheDocument();
      fireEvent.click(screen.queryByTestId("delete-file-button"));

      await waitFor(async () => {
        expect(
          screen.getByText(
            "Please select at least one file to perform the action."
          )
        ).toBeInTheDocument();
      });
      await waitFor(async () => {
        expect(screen.getByText("adcn")).toBeInTheDocument();
        expect(screen.getByTestId("resource_checkbox0")).toBeInTheDocument();

        fireEvent.click(screen.queryByTestId("resource_checkbox0"));

        fireEvent.click(screen.queryByTestId("delete-file-button"));
      });

      await expect(screen.getByTestId("confirmButton")).toBeInTheDocument();

      fireEvent.click(screen.queryByTestId("confirmButton"));

      await waitFor(async () => {
        expect(
          screen.getByText("File deleted successfully!")
        ).toBeInTheDocument();
      });
    });
  });

  it("update file", async () => {
    await sut();
    await waitFor(async () => {
      const editBtn = await screen.findByTestId(
        "file_edit_btn_49ee7ee8-e92f-4aee-90ef-392a154d640c"
      );
      expect(editBtn).toBeInTheDocument();
      fireEvent.click(editBtn);
      const title = await screen.findByTestId("title");
      expect(title).toBeInTheDocument();
      fireEvent.change(title, {
        target: { value: "update-title" },
      });
      fireEvent.change(screen.queryByTestId("description"), {
        target: { value: "update-description" },
      });
      fireEvent.click(await screen.findByTestId("addSubmitForm"));
    });
    expect(screen.getByTestId("confirmButton")).toBeInTheDocument();
    await waitFor(async () => {
      fireEvent.click(screen.queryByTestId("confirmButton"));
    });
    await waitFor(async () => {
      expect(
        screen.getByText("File updated successfully!")
      ).toBeInTheDocument();
    });
  });

  it("should download file", async () => {
    const expectedUrl = "http://localhost/";
    await sut();
    fireEvent.click(await screen.findByTestId("download-file-button"));
    window.location.href = expectedUrl;
    expect(window.location.href).toBe(expectedUrl);
  });
});
