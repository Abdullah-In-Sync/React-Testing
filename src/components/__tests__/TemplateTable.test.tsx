import { render, screen } from "@testing-library/react";
import TemplateTable from "../templateTable";
import { TemplateFormData } from "../templateTable/table.model";

const staticTemplate: TemplateFormData = {
  rows: [
    {
      cells: [
        {
          type: "header",
          title: "Activities",
        },
        {
          type: "header",
          title: "Rating",
          description: "Add rating based on activities",
        },
      ],
    },
    {
      cells: [
        {
          type: "header",
          title: "Did you take break fast",
        },
        {
          type: "answer",
          answerType: "list",
          answerValues: ["banana", "mengo", "papita"],
        },
      ],
    },
  ],
};

const sut = async () => {
  render(<TemplateTable initialData={staticTemplate} mode="edit" />);
};

describe("When render a template table", () => {
  it("should render 2 rows", async () => {
    await sut();
    expect(screen.getAllByTestId("row").length).toEqual(2);
  });

  it("should render 4 cells", async () => {
    await sut();
    expect(screen.getAllByTestId("cell").length).toEqual(4);
  });
});
