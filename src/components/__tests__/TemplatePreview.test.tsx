import { render, screen } from "@testing-library/react";
import TemplatePreview from "../template/Preview";
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
  render(<TemplatePreview initialData={staticTemplate} />);
};

describe("When render a template table", () => {
  it("should render 2 rows", async () => {
    await sut();
    expect(screen.getAllByTestId("row-1").length).toEqual(1);
  });

  it("should render 4 cells", async () => {
    await sut();
    const secoundRow = screen.getAllByTestId("row-1");
    expect(
      secoundRow[0].querySelector("[data-testid='cell-1']")
    ).toBeInTheDocument();
  });
});
