import { createContext } from "react";
import { ViewModel } from "../../hoc/withModal";

class TableViewModel implements ViewModel<TableViewModelState> {
  Hook = useEventsScreen;
  CtxProvider = EventsScreenContext.Provider;
}
/**
 * Business logic of the screen: EventsScreen
 */
function useEventsScreen(): TableViewModelState {
  const state: TableViewModelState = {
    template: [],
  };
  return state;
}
export const EventsScreenContext = createContext<TableViewModelState>({
  // Provide Default values
  template: [],
});
/**
 * These state will be availabe to the subtree via context api
 */
export interface TableViewModelState {
    template: [];
}

export default TableViewModel;
