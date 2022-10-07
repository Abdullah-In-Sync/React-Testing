import { render, screen, fireEvent } from "@testing-library/react";
import { FileUploadDialog } from "../common/FileUploadDailog/index";

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
