import { render, screen } from "@testing-library/react";
import Sidebar from "../sidebar";

describe("when rendered with a sidebarmenu component", () => {
  it("should render", () => {
    render(<Sidebar />);
    expect(screen.getByTestId("sideBar")).toBeInTheDocument();
  });
});
