import React from "react";
import { render, screen } from "@testing-library/react";
import TabsGenerator from "../common/TabsGenerator";
// import WorkSheet from "../../components/patient/workSheet";

const Tab1 = () => {
  return (
    <>
      <h1>Test Tab</h1>
    </>
  );
};
const tabs = [
  {
    label: "Work Sheet",
    value: "work-sheet",
    component: <Tab1 />,
  },
];

describe("when rendered with a tab with data", () => {
  test("should render", () => {
    render(<TabsGenerator tabsList={tabs} activeTabs="work-sheet" />);
    expect(screen.getByTestId("tabId")).toBeInTheDocument();
  });
});
