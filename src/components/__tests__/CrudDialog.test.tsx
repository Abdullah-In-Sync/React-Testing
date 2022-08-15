import { render, screen } from "@testing-library/react";
import CrudDialog from "../common/CrudDialog";
import DynamicForm from "../../components/admin/feedback/DynamicForm";

describe("when rendered with a crudDialogue component", () => {
  const dialogFields = [
    [
      {
        key: "org_id",
        label: "Organization Name",
        visible: true,
        freeSolo: false,
        show: true,
        required: true,
        disabled: false,
        type: "autocomplete",
        options: [
          {
            label: "name",
            value: "test",
          },
        ],
      },
      {
        key: "session_no",
        label: "Session Name",
        visible: true,
        show: true,
        required: true,
        disabled: false,
        type: "autocomplete",
        multiple: true,
        options: [
          { label: "Session 1", value: 1 },
          { label: "Session 2", value: 2 },
        ],
      },
      {
        key: "feedback_type",
        label: "Feedback Type",
        visible: true,
        freeSolo: false,
        show: true,
        disabled: false,
        required: true,
        type: "autocomplete",
        options: [
          { label: "Quality", value: "quality" },
          { label: "Session", value: "session" },
        ],
      },
    ],
  ];

  it("should render create pop up", () => {
    render(<CrudDialog open={true} title={"Create Question"} />);
    expect(screen.getByText("Create Question")).toBeInTheDocument();
    expect(screen.getByTestId("saveButton")).toBeInTheDocument();
    expect(screen.getByTestId("cancelButton")).toBeInTheDocument();
    expect(screen.getByTestId("feedForm")).toBeInTheDocument();
  });

  it("should render view popup ", () => {
    render(<CrudDialog open={true} title={"View Question"} />);
    expect(screen.getByTestId("bootstrapModal")).toBeInTheDocument();
    expect(screen.getByText("View Question")).toBeInTheDocument();
    expect(screen.getByTestId("cancelButton")).toBeInTheDocument();
  });

  it("should render delete popup", () => {
    render(<CrudDialog open={true} title={"Delete Question"} />);
    expect(screen.getByText("Delete Question")).toBeInTheDocument();
  });

  it("should render", () => {
    const values = [
      {
        __typename: "FeedbackQuestion",
        _id: "testt",
        created_date: "test",
        org_id: "testt",
        feedback_type: "session",
        answer_options: ["a", "b"],
        organization_name: "test",
        session_no: 2,
        question: "who are you?",
        answer_type: "list",
        status: "active",
      },
      {
        __typename: "FeedbackQuestion",
        _id: "testt",
        created_date: "test",
        org_id: "testt",
        feedback_type: "session",
        answer_options: [],
        organization_name: "test",
        session_no: 2,
        question: "who are you?",
        answer_type: "text",
        status: "active",
      },
    ];
    render(
      <CrudDialog
        title="View Question"
        viewData={true}
        fields={dialogFields}
        values={values}
        dynamicForm={<DynamicForm type="view" values={values} />}
        open={true}
      />
    );
    expect(screen.getByText("View Question")).toBeInTheDocument();
    expect(screen.getByText("Feedback Type")).toBeInTheDocument();
  });
});
