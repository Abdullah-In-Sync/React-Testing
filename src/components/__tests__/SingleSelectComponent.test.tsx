import { render, screen } from "@testing-library/react";
import SingleSelectComponent from "../common/SelectBox/SingleSelect/SingleSelectComponent";

const resourceTypeOptions = [
  { id: "1", value: "Info Sheets" },
  { id: "2", value: "Work Sheets" },
  { id: "3", value: "Audio File" },
  { id: "4", value: "Video File" },
];

const disorderData: any = [
  {
    _id: "disorder_id_1",
    user_type: "admin",
    disorder_name: "disorder 1",
  },
  {
    _id: "disorder_id_2",
    user_type: "admin",
    disorder_name: "disorder 2",
  },
];

const sut = async () => {
  render(
    <SingleSelectComponent
      fullWidth={true}
      id="testSelect"
      labelId="labelId"
      name="Test Select box"
      value="3"
      label="Suggested Test Selectbox"
      // onChange={set2}
      inputProps={{ "data-testid": "selectBoxTest" }}
      options={resourceTypeOptions}
      mappingKeys={["id", "value"]}
      size={"small"}
    />
  );
};

const sutDisorder = async () => {
  render(
    <SingleSelectComponent
      fullWidth={true}
      required={true}
      id="resourceDisorderSelect"
      labelId="resourceDisorder"
      name="disorder_id"
      value="disorder_id_2"
      label="Select Disorder"
      // onChange={set2}
      inputProps={{ "data-testid": "disorder_id" }}
      options={disorderData || []}
      mappingKeys={["_id", "disorder_name"]}
      size="small"
      className="form-control-bg"
    />
  );
};

describe("test select dropdown", () => {
  it("should create select button in screen", async () => {
    await sut();
    expect(screen.getByTestId("selectBoxTest")).toBeInTheDocument();
  });
});

describe("test select API dropdown", () => {
  it("should create select dropdown button in screen", async () => {
    await sutDisorder();
    expect(screen.getByTestId("disorder_id")).toBeInTheDocument();
  });
});
