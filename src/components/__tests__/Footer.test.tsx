import { render, screen } from "@testing-library/react";
import Footer from "../footer";

describe("when rendered with a `footer` with style", () => {
  it("should render", () => {
    render(<Footer />);
    expect(screen.getByTestId("footerLinks")).toBeInTheDocument();
  });
});
