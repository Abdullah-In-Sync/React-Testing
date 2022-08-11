import { render } from "@testing-library/react";
import CrudDialog from "../common/CrudDialog";

describe("when rendered with a sidebarmenu component", () => {
  it("should render", () => {
    render(<CrudDialog open={false} title={""} />);
    expect.anything();
  });
});
