import { render } from "@testing-library/react";
import File from "../pages/file";

describe("Checks the Dashboard page", () => {
  it("should render", () => {
    render(<File />);
  });
});
