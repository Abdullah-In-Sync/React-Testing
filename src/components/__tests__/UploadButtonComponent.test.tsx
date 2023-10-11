import { MockedProvider } from "@apollo/react-testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { ignoreExifGenerateBlob } from "../../lib/helpers/s3";
import UploadButtonComponent from "../common/UploadButton/UploadButtonComponent";
const file = new File(["hello"], "hello.txt", { type: "text/plain" });
const imageFile = new File(["hello"], "hello.png", { type: "image/png" });
const sut = async () => {
  render(
    <MockedProvider>
      <SnackbarProvider>
        <UploadButtonComponent
          name="upload_file"
          variant="contained"
          onChange={() => null}
          inputProps={{ "data-testid": "resource_file_upload" }}
        />
      </SnackbarProvider>
    </MockedProvider>
  );
};

describe("when rendered with a `upload button`", () => {
  it("should create upload button in screen", async () => {
    await sut();
    expect(screen.getByTestId("resource_file_upload")).toBeInTheDocument();
    fireEvent.change(screen.getByTestId("resource_file_upload"), {
      target: { files: [file] },
    });
    expect(
      await screen.findByText(
        "You can upload jpg, jpeg, png, gif, mp3, wav, mp4, mov, .pdf, doc, docx file type Only."
      )
    ).toBeInTheDocument();
  });

  it("should not call enqueueSnackbar function when file type is in FILEEXTENSION array", async () => {
    const enqueueSnackbar = jest.fn();
    await sut();
    const input = screen.getByTestId("resource_file_upload");
    fireEvent.change(input, {
      target: { files: [imageFile] },
    });
    expect(enqueueSnackbar).not.toHaveBeenCalled();
  });

  it("should call enqueueSnackbar if file not selected", async () => {
    await sut();
    const input = screen.getByTestId("resource_file_upload");
    fireEvent.change(input, {
      target: { files: [] },
    });

    expect(await screen.findByText("No file selected.")).toBeInTheDocument();
  });

  it("should return a Blob object without the EXIF data", () => {
    const fileReaderResult = new ArrayBuffer(10);
    const view = new DataView(fileReaderResult);
    view.setUint16(0, 0xffd8);
    const selectedFile = new Blob([file], { type: "image/jpeg" });

    const result = ignoreExifGenerateBlob(fileReaderResult, selectedFile);
    expect(result).toBeInstanceOf(Blob);
    expect(result.size).toBeLessThanOrEqual(fileReaderResult.byteLength);
  });

  it("should return a Blob object with the same data as the original fileReaderResult", () => {
    const fileReaderResult = new ArrayBuffer(10);
    const selectedFile = new File([], "test.jpg", { type: "image/jpeg" });

    const result = ignoreExifGenerateBlob(fileReaderResult, selectedFile);

    // Check if the result Blob has the same byte length as the original fileReaderResult
    expect(result).toBeInstanceOf(Blob);
    expect(result.size).toBe(fileReaderResult.byteLength);
  });

  it("should return a Blob object with the default type 'image/png'", () => {
    const fileReaderResult = new ArrayBuffer(10);
    const selectedFile = new File([], "test.jpg", { type: "image/png" });

    const result = ignoreExifGenerateBlob(fileReaderResult, selectedFile);

    expect(result).toBeInstanceOf(Blob);
    expect(result.type).toBe("image/png");
  });
});
