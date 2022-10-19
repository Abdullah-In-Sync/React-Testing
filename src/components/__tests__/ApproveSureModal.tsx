import { render, screen, waitFor } from "@testing-library/react";
import ApproveSureModal from "../admin/resource/ApproveSureModal";

describe("when rendered with a `testid` prop", () => {
  it("should display modal", async () => {
    render(<ApproveSureModal modalOpen={true} />);
    await waitFor(() =>
      expect(screen.getByTestId("ApproveSureModal")).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText("Are you sure want to approve this resource?")
      ).toBeInTheDocument()
    );
  });
});
