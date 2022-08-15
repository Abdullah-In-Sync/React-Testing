import { fireEvent, render, screen } from "@testing-library/react";
import Text from "../common/CrudDialog/fields/Text";

describe("when rendered with a `testid` prop", () => {
  it("should create textbox with testId", () => {
    const field = {
        key:"name",
        label:"name"
    }
    const fieldValues = { 
        name : "MyHelp"
    };

    render(<Text field={field} fieldValues={[fieldValues]}/>);
    expect(screen.getByTestId("textBox")).toBeInTheDocument();
  });
  
});
