import { render, screen } from "@testing-library/react";
import { SuccessModal } from "../common/SuccessModal";

describe("when rendered with a `testid` prop", () => {
  it("should display modal", () => {
    render(
      <SuccessModal
        isOpen={true}
        title="Success"
        description="test description"
        onOk={() => null}
      />
    );

    expect(screen.queryByTestId("description").textContent).toEqual(
      "test description"
    );
    expect(screen.queryByTestId("title").textContent).toEqual("Success");
  });
});
