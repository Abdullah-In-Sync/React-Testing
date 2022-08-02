import { render } from "@testing-library/react";
import Layout from "../layout";
import Box from "@mui/material/Box";

describe("when rendered with a `layout` with style", () => {
  it("should render", () => {
    render(<Layout />);
    expect(<Box sx={{ display: "flex", backgroundColor: "#F5F5F5" }} />);
  });
});
