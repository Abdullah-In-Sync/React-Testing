import { render, screen, fireEvent } from "@testing-library/react";
import { ConfirmationDialog } from "../common/ConfirmationDailog/index";

describe("when rendered with a `testid` prop", () => {
  it("should open dialog with testId", () => {
    render(
      <ConfirmationDialog
        open={true}
        closeConfirmationDialog={() => console.log("cancel button clicked")}
        onConfirmation={() => console.log("Confirm button clicked")}
        isConfirmButtonClicked={false}
        title={"You want to upload doc"}
      />
    );
    expect(screen.getByTestId("openConfirmationDialog")).toBeInTheDocument();
    expect(screen.getByTestId("confirmButton")).toBeInTheDocument();
    expect(screen.getByTestId("cancelButton")).toBeInTheDocument();
  });

  it("when click on cancel button it should cancel confirmation dialog", () => {
    const closeConfirmationDialog = jest.fn();
    const onConfirmation = jest.fn();

    render(
      <ConfirmationDialog
        open={true}
        closeConfirmationDialog={closeConfirmationDialog}
        onConfirmation={onConfirmation}
        isConfirmButtonClicked={false}
        title={"You want to upload doc"}
      />
    );

    fireEvent.click(screen.getByTestId("cancelButton"));
    expect(closeConfirmationDialog).toHaveBeenCalledTimes(1);
  });

  it("when click on confirm button it should start uploading the file", () => {
    const closeConfirmationDialog = jest.fn();
    const onConfirmation = jest.fn();

    render(
      <ConfirmationDialog
        open={true}
        closeConfirmationDialog={closeConfirmationDialog}
        onConfirmation={onConfirmation}
        isConfirmButtonClicked={false}
        title={"You want to upload doc"}
      />
    );

    fireEvent.click(screen.getByTestId("confirmButton"));
    expect(onConfirmation).toHaveBeenCalledTimes(1);
  });

  it("while uploading the file, the confirm button should be disabled", () => {
    const closeConfirmationDialog = jest.fn();
    const onConfirmation = jest.fn();

    render(
      <ConfirmationDialog
        open={true}
        closeConfirmationDialog={closeConfirmationDialog}
        onConfirmation={onConfirmation}
        isConfirmButtonClicked={true} // it will disable when user press confirm button
        title={"You want to upload doc"}
      />
    );

    fireEvent.click(screen.getByTestId("confirmButton"));
    expect(screen.getByTestId("confirmButton")).toBeDisabled();
  });
});
