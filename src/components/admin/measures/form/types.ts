import {
  TemplateDataFormat1,
  TemplateDataFormat2,
} from "../../../common/TemplateFormat/types";

export interface InitialFormValues {
  title: string;
  description: string;
  orgId: string;
  templateId: string | number;
  templateData: TemplateDataFormat1 | TemplateDataFormat2;
}
