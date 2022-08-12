import { render, screen } from "@testing-library/react";
import CrudDialog from "../common/CrudDialog";

describe("when rendered with a sidebarmenu component", () => {
  it("should render", () => {
    render(<CrudDialog open={true} title={"Create Question"} />);
    expect(screen.getByText("Create Question")).toBeInTheDocument();
  });
});
