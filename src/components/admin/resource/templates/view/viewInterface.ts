export interface ViewTemplateData {
  _id: string;
  category: string;
  name: string;
  component_name: string;
}

interface TemplatesComponentsData {
  [key: string]: any;
}

export const components: TemplatesComponentsData = {
  TemplateTable: require("../../../../../components/templateTable").default,
};
