import { render, screen } from "@testing-library/react";
import ErrorModel from "../common/ErrorModal";

describe("when rendered with a `testid` prop", () => {
  it("should display modal", () => {
    render(<ErrorModel isOpen={true} title={"Error model test"} />);
    expect(screen.getByText("Error model test")).toBeInTheDocument();
  });
});
