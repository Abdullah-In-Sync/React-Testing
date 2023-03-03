import { render, screen } from "@testing-library/react";
import BasicModal from "../components/common/Modal";

describe("basicModal test", () => {
  it("should render", () => {
    render(
      <BasicModal modalOpen={true} setModalOpen={() => true}>
        {" "}
        Test{" "}
      </BasicModal>
    );

    expect(screen.getByText("Test"));
  });
});
