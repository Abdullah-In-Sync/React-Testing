import { render, screen } from "@testing-library/react";
import CrudForm from "../common/CrudForm";

describe("when rendered with a crudDialogue component", () => {
  const filterList = [
    [
      {
        key: "mode",
        visible: true,
        freeSolo: false,
        defaultValue: { label: "All", value: "" },
        show: true,
        label: "Select Resources",
        type: "asynccomplete",
        options: [
          { value: "", label: "All" },
          { value: "resource", label: "My Resources" },
          { value: "favourite", label: "My Favourites" },
        ],
      },
      {
        key: "disorderId",
        label: "Select Disorder",
        visible: true,
        freeSolo: false,
        show: true,
        type: "asynccomplete",
        defaultValue: { label: "All", value: "" },
        options: [{ label: "All", value: "" }],
      },
      {
        key: "modelId",
        label: "Select Modalities",
        visible: true,
        freeSolo: false,
        show: true,
        type: "asynccomplete",
        defaultValue: { label: "All", value: "" },
        options: [{ label: "All", value: "" }],
      },
      {
        key: "resourceType",
        label: "Select Type",
        visible: true,
        freeSolo: false,
        defaultValue: { label: "All", value: "" },
        show: true,
        type: "asynccomplete",
        options: [
          { value: "", label: "All" },
          { value: 1, label: "Info Sheet" },
          { value: 2, label: "Work Sheet" },
          { value: 3, label: "Audio File" },
          { value: 4, label: "Video File" },
        ],
      },
      {
        key: "categoryId",
        label: "Select Category",
        visible: true,
        freeSolo: false,
        show: true,
        type: "asynccomplete",
        defaultValue: { label: "All", value: "" },
        options: [{ label: "All", value: "" }],
      },
    ],
  ];

  it("should render crud form", () => {
    render(<CrudForm />);
    expect(screen.getByTestId("crudForm")).toBeInTheDocument();
  });

  it("should render filter fields", () => {
    render(<CrudForm fields={filterList} />);
    expect(screen.getByTestId("crudForm")).toBeInTheDocument();
  });
});
