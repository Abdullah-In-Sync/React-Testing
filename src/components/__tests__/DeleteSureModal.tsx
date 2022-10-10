import { render, screen } from "@testing-library/react";
import DeleteSureModal from "../admin/resource/DeleteSureModal";

describe("when rendered with a `testid` prop", () => {
  it("should display modal", () => {
    render(<DeleteSureModal modalOpen={true} />);
    expect(screen.getByTestId("DeletesureModal")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure want to delete this resource?")
    ).toBeInTheDocument();
  });
});
