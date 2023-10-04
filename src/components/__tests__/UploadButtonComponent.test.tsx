import { MockedProvider } from "@apollo/react-testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
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
});
