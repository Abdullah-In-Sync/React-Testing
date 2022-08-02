import { render } from "@testing-library/react";
import Layout from "../layout";
import Box from "@mui/material/Box";

const footerStyle = {
  paddin: 2,
  fontSize: "0.6em",
  justifyContent: "flex-end",
  zIndex: 1,
  background: "rgb(58, 58, 60)",
  color: "custom.light",
  width: "100%",
  right: 0,
  bottom: 0,
  position: "fixed",
};

describe("when rendered with a `layout` with style", () => {
  it("should render", () => {
    render(<Layout />);
    expect(<Box sx={{ display: "flex", backgroundColor: "#F5F5F5" }} />);
  });
});
