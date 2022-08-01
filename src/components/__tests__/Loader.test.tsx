import { render } from "@testing-library/react";
import Loader from "../common/Loader";

describe("when rendered with a `visible` prop", () => {
    it("should visible or hide", () => {
      render(<Loader visible={true} />); 
      expect(
        <Loader visible={true} />);
      });
    });
      

