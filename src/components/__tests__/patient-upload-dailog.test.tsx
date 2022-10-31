import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FileUploadDialog } from "../common/FileUploadDailog/index";
import * as s3 from "../../lib/helpers/s3";

const file = new File(["hello"], "hello.png", { type: "image/png" });

describe("when rendered with a `testid` prop", () => {
  it("should open file upload dialog with testId", () => {
    const openConfirmationDialog = jest.fn();
    const onChange = jest.fn();
    const onClose = jest.fn();

    render(
      <FileUploadDialog
        open={true}
        openConfirmationDialog={openConfirmationDialog}
        onChange={onChange}
        onClose={onClose}
        isSubmit={false}
        heading="Upload Doc File"
      />
    );
    expect(screen.getByTestId("openFileUploadDialog")).toBeInTheDocument();
    expect(screen.getByTestId("closeIcon")).toBeInTheDocument();
    expect(screen.getByTestId("fileInputForm")).toBeInTheDocument();
    expect(screen.getByTestId("fileInput")).toBeInTheDocument();
    expect(screen.getByTestId("saveButton")).toBeInTheDocument();
  });
  it("upload file ", async () => {
    jest.spyOn(s3, "getUpdatedFileName").mockReturnValue({
      fileName: "test.pdf",
    });
    jest.spyOn(s3, "uploadToS3").mockReturnValue(Promise.resolve(true));

    const openConfirmationDialog = jest.fn();
    const onChange = jest.fn();
    const onClose = jest.fn();

    render(
      <FileUploadDialog
        open={true}
        openConfirmationDialog={openConfirmationDialog}
        onChange={onChange}
        onClose={onClose}
        isSubmit={false}
        heading="Upload Doc File"
      />
    );
    expect(screen.getByTestId("openFileUploadDialog")).toBeInTheDocument();

    await waitFor(async () => {
      fireEvent.change(screen.getByTestId("fileInput"), {
        target: { files: [file] },
      });
    });

    fireEvent.submit(screen.getByTestId("fileInputForm"));
    expect(openConfirmationDialog).toHaveBeenCalledTimes(1);
  });

  it("When click on save without selecting the file ", async () => {
    const openConfirmationDialog = jest.fn();
    const onChange = jest.fn();
    const onClose = jest.fn();

    render(
      <FileUploadDialog
        open={true}
        openConfirmationDialog={openConfirmationDialog}
        onChange={onChange}
        onClose={onClose}
        isSubmit={false}
        heading="Upload Doc File"
      />
    );
    expect(screen.getByTestId("openFileUploadDialog")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("saveButton"));
    await expect(window.alert("Please select a file."));
  });

  it("when click on close icon it should close the dialog", () => {
    const openConfirmationDialog = jest.fn();
    const onChange = jest.fn();
    const onClose = jest.fn();

    render(
      <FileUploadDialog
        open={true}
        openConfirmationDialog={openConfirmationDialog}
        onChange={onChange}
        onClose={onClose}
        isSubmit={false}
        heading="Upload Doc File"
      />
    );
    expect(screen.getByTestId("closeIcon")).toBeInTheDocument();

    // it should check close icon event
    fireEvent.click(screen.getByTestId("closeIcon"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("when click on select file it should allow to select file", () => {
    const openConfirmationDialog = jest.fn();
    const onChange = jest.fn();
    const onClose = jest.fn();

    render(
      <FileUploadDialog
        open={true}
        openConfirmationDialog={openConfirmationDialog}
        onChange={onChange}
        onClose={onClose}
        isSubmit={false}
        heading="Upload Doc File"
      />
    );
    expect(screen.getByTestId("fileInput")).toBeInTheDocument();

    // it should check fileInput
    fireEvent.change(screen.getByTestId("fileInput"));
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("when click on save button it should open confirmation dialog", () => {
    const openConfirmationDialog = jest.fn();
    const onChange = jest.fn();
    const onClose = jest.fn();

    render(
      <FileUploadDialog
        open={true}
        openConfirmationDialog={openConfirmationDialog}
        onChange={onChange}
        onClose={onClose}
        isSubmit={false}
        heading="Upload Doc File"
      />
    );
    // on submit
    fireEvent.submit(screen.getByTestId("fileInputForm"));
    expect(openConfirmationDialog).toHaveBeenCalledTimes(1);
  });
});
