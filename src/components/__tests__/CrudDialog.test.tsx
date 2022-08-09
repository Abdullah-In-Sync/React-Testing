import { render } from "@testing-library/react";
import CrudDialog from "../common/CrudDialog";
import { Drawer } from "@mui/material";

describe("when rendered with a sidebarmenu component", () => {
  it("should render", () => {
    render(<CrudDialog open={false} title={""} />);
    expect.anything();
  });
});
