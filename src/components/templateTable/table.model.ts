import { createContext } from "react";
import { ViewModel } from "../../hoc/withModal";
import * as Yup from "yup";
import { useAppContext } from "../../contexts/AuthContext";

type TableCellType = "header" | "answer" | "";
type TableCellAnswerType = "list" | "boolean" | "text";

export interface TableCell {
  type: TableCellType;
  question?: string;
  description?: string;
  answerType?: TableCellAnswerType;
  answerValues?: string | Array<any>;
  patientAns?: string | Array<any>;
  title?: string;
  width: string;
}

export interface TableRow {
  cells: Array<TableCell>;
  height: string;
}

export interface TemplateFormData {
  rows: Array<TableRow>;
}

const staticTemplate: TemplateFormData = {
  rows: [
    {
      cells: [
        {
          type: "header",
          title: "Activities",
          width: "1",
        },
        {
          type: "header",
          title: "Rating",
          description: "Add rating based on activities",
          width: "1",
        },
      ],
      height: "0 200px",
    },
    {
      cells: [
        {
          type: "header",
          title: "Did you take break fast",
          width: "1",
        },
        {
          type: "answer",
          answerType: "list",
          answerValues: ["banana", "mengo", "papita"],
          width: "1",
        },
      ],
      height: "0 100px",
    },
    {
      cells: [
        {
          type: "",
          width: "1",
        },
        {
          type: "",
          width: "1",
        },
      ],
      height: "0 300px",
    },
  ],
};
class TemplateTableViewModel implements ViewModel<TemplateTableViewModelState> {
  Hook = useTemplateTable;
  CtxProvider = TemplateTableContext.Provider;
}
/**
 * Business logic of the screen: EventsScreen
 */
function useTemplateTable(): TemplateTableViewModelState {
  const { user: { user_type: userType = "admin" } = {} } = useAppContext();
  const paitentAns =
    userType === "patient"
      ? {
          patientAns: Yup.string().when("type", {
            is: "answer",
            then: Yup.string().required("Title is required"),
          }),
        }
      : {};
  const validationSchema = Yup.object().shape({
    rows: Yup.array().of(
      Yup.object().shape({
        cells: Yup.array().of(
          Yup.object().shape({
            ...{
              type: Yup.string().optional(),
              question: Yup.string().optional(),
              description: Yup.string().optional(),
              answerType: Yup.string().when("type", {
                is: "answer",
                then: Yup.string().required("Please select the answer type"),
              }),
              answerValues: Yup.array().when("answerType", {
                is: "list",
                then: Yup.array().required("Answer Values is required"),
              }),
              title: Yup.string().when("type", {
                is: "header",
                then: Yup.string().required("Title is required"),
              }),
              // patientAns: Yup.string().required("Response is required")
            },
            ...paitentAns,
          })
        ),
      })
    ),
  });

  const state: TemplateTableViewModelState = {
    validationSchema,
    template: staticTemplate,
  };

  return state;
}

export const TemplateTableContext = createContext<TemplateTableViewModelState>({
  // Provide Default values
  template: {
    rows: [],
  },
  validationSchema: null,
});
/**
 * These state will be available to the subtree via context api
 */
export interface TemplateTableViewModelState {
  template: TemplateFormData;
  validationSchema: any;
}

export default TemplateTableViewModel;
