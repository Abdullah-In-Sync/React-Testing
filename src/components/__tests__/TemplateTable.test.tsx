import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
    expect(screen.getAllByTestId("row-1").length).toEqual(1);
  });

  it("should render 4 cells", async () => {
    await sut();
    const secoundRow = screen.getAllByTestId("row-1");
    expect(secoundRow[0].querySelector("[data-testid='cell-1']")).toContainHTML(
      "<span>Add Options</span>"
    );
  });

  it("should add Column", async () => {
    await sut();
    expect(screen.getAllByTestId("action-menu-column-1").length).toEqual(1);
    const actionMenu = screen
      .getByTestId("action-menu-column-1")
      .querySelector("[data-testid='action-menu-icon']");
    fireEvent.click(actionMenu);
    const findOption = screen.getByTestId("ICL");

    await waitFor(async () => {
      findOption.click();
    });

    expect(screen.getAllByTestId("action-menu-column-2").length).toEqual(1);
  });

  it("should add row", async () => {
    await sut();
    expect(screen.getAllByTestId("row-1").length).toEqual(1);
    const actionMenu = screen
      .getByTestId("action-menu-row-1")
      .querySelector("[data-testid='action-menu-icon']");
    fireEvent.click(actionMenu);
    const findOption = screen.getByTestId("IRL");

    await waitFor(async () => {
      findOption.click();
    });

    expect(screen.getAllByTestId("row-2").length).toEqual(1);
  });
  // const secoundRow = screen.getAllByTestId("action-menu-row-1");
  // expect(secoundRow[0].querySelector("[data-testid='cell-1']")).toContainHTML(
  //   "<span>Add Options</span>"
  // );
  // });
});
