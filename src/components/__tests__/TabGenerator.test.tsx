import { render, screen } from "@testing-library/react";
import TabsGenerator from "../common/TabsGenerator";
import WorkSheet from "../../components/patient/workSheet";

const tabs = [
  
  {
    label: "Work Sheet",
    value: "work-sheet",
    component: <WorkSheet />,
  },
];

describe("when rendered with a tab with data", () => {
  test("should render", () => {
    render(
      <TabsGenerator tabsList={tabs} activeTabs="work-sheet" />
    );
    expect(screen.getByTestId("tabId")).toBeInTheDocument();
  });
});
