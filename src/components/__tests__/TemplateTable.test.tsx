import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import TemplateTable from "../templateTable";
import { TemplateFormData } from "../templateTable/table.model";

const staticTemplate: TemplateFormData = {
  rows: [
    {
      cells: [
        {
          type: "header",
          title: "Activities",
          width: "250Px",
        },
        {
          type: "header",
          title: "Rating",
          description: "Add rating based on activities",
          width: "250Px",
        },
      ],
      height: "200px",
    },
    {
      cells: [
        {
          type: "header",
          title: "Did you take break fast",
          width: "250Px",
        },
        {
          type: "answer",
          answerType: "list",
          answerValues: ["banana", "mengo", "papita"],
          width: "250Px",
        },
      ],
      height: "200px",
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

  it.only("should resize the column", async () => {
    await sut();

    expect(screen.queryByTestId("action-menu-column-1")).toBeInTheDocument();
    const resizerCol = within(
      screen.queryByTestId("action-menu-column-1")
    ).queryByTestId("resizer-col");
    expect(resizerCol).toBeInTheDocument();
    // fireEvent.click(resizerCol);
    // const findOption = screen.getByTestId("IRL");
    // await waitFor(async () => {
    //   findOption.click();
    // });

    // expect(screen.getAllByTestId("row-2").length).toEqual(1);
  });
});
