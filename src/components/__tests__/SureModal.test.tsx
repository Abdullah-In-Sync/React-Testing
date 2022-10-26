import { render, screen } from "@testing-library/react";
import SureModal from "../admin/resource/SureModal";

describe("when rendered with a `testid` prop", () => {
  it("should display modal", () => {
    render(<SureModal modalOpen={true} />);
    expect(screen.getByTestId("sureModal")).toBeInTheDocument();
  });
});
