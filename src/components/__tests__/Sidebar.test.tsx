import { render } from "@testing-library/react";
import Sidebar from "../sidebar";
import { Drawer } from "@mui/material";

describe("when rendered with a sidebarmenu component", () => {
  it("should render", () => {
    render(<Sidebar />);
    expect.anything();
  });
});
