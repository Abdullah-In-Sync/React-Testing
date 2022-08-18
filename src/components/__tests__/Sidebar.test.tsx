import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "../sidebar";

describe("when rendered with a sidebarmenu component", () => {
  it("should render", () => {
    render(<Sidebar />);
    expect(screen.getByTestId("sideBar")).toBeInTheDocument();
  });

  it("should render", () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByTestId("menu_2"));
    expect(screen.getByTestId("sideBar")).toBeInTheDocument();
  });
});
