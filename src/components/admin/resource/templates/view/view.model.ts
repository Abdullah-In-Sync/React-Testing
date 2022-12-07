export interface ViewTemplateData {
  _id: string;
  category: string;
  name: string;
  component_name: string;
}

interface TemplatesComponentsData {
    [key: string]: Object[]
}

export const COMPONENTS = {
    TemplateTable: require("../../../../../components/templateTable").default
}
