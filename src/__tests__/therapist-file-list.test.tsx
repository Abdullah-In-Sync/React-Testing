import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import { useAppContext } from "../contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { MockedProvider } from "@apollo/react-testing";
import theme from "../styles/theme/theme";
import { ThemeProvider } from "@mui/styles";
import TherapistFilesList from "../pages/therapist/patient/view/[id]/files";
import { ADD_PATIENT_FILE } from "../graphql/mutation/resource";
import { GET_UPLOAD_LOGO_URL } from "../graphql/query/resource";
import * as s3 from "../lib/helpers/s3";

jest.mock("../contexts/AuthContext");
const file = new File(["hello"], "hello.png", { type: "image/png" });

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
      file_name: "invalid.pdf",
      patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
      title: "Title",
    },
  },
  result: {
    data: {
      getPatientFileListByTherapist: [
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
});
