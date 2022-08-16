import { render, screen } from "@testing-library/react";
import Layout from "../layout";

describe("when rendered with a `layout` with style", () => {
  it("should render", () => {
    render(<Layout />);
    expect(screen.getByTestId("layoutUi")).toBeInTheDocument();
    expect(screen.getByTestId("navBar")).toBeInTheDocument();
  });
});
