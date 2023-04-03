import { TemplateData } from "../../../common/TemplateFormat/types";

export interface InitialFormValues {
  title: string;
  description: string;
  orgId: string;
  templateId: string | number;
  templateData: TemplateData | any;
}
