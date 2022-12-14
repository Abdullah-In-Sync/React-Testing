export interface ResourceDataInterface {
    resource_issmartdraw: string;
    resource_name: string;
    resource_type: Number;
    template_data: string;
    template_id: string;
    __typename: string;
}
  
export interface TemplateDetailInterface{
    category: string;
    component_name: string;
    name: string;
    _id: string;
    __typename: string;
}
  
  export interface TemplateComponentsData {
    [key: string]: any;
  }
  