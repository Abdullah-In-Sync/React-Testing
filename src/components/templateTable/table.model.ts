import { createContext } from "react";
import { ViewModel } from "../../hoc/withModal";
import * as Yup from "yup";

type TableCellType = "header" | "answer";

export interface TableCell {
  type: TableCellType;
  question?: string;
  description?: string;
  answerType?: string;
  answerValues?: string | Array<any>;
  patientAns?: string | Array<any>;
  title?: string;
}

export interface TableRow {
  cells: Array<TableCell>;
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
          answerType: "boolean",
        },
      ],
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
  const validationSchema = Yup.array(
    Yup.array(
      Yup.object().shape({
        type: Yup.string().required(),
        question: Yup.string().optional(),
        description: Yup.string().optional(),
        answerType: Yup.string().when("type", {
          is: "answer",
          then: Yup.string().required(),
        }),
        answerValues: Yup.array().optional(),
        title: Yup.string().optional(),
      })
    )
  );

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
