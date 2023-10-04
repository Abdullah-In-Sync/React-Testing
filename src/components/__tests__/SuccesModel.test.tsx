import { render, screen, waitFor } from "@testing-library/react";
import { SuccessModal } from "../common/SuccessModal";
import { SnackbarProvider } from "notistack";

describe("when rendered with a `testid` prop", () => {
  it("should display modal", async () => {
    render(
      <SnackbarProvider>
        <SuccessModal
          isOpen={true}
          title="Success"
          description="test description"
          onOk={() => null}
        />
      </SnackbarProvider>
    );

    await waitFor(async () => {
      expect(screen.queryByText("test description")).toBeInTheDocument();
    });

    // expect(screen.queryByTestId("description").textContent).toEqual(
    //   "test description"
    // );
    // expect(screen.queryByTestId("title").textContent).toEqual("Success");
  });
});
