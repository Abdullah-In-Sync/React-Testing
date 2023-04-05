import * as Yup from "yup";
import { TemplateFormat1Data } from "../../../common/TemplateFormat/templateFormatData";

export const measuresValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title name is required"),
  orgId: Yup.string().required("Organization is required"),
  templateId: Yup.string().required("Format is required"),
  templateData: Yup.object().when("templateId", {
    is: "format1",
    then: TemplateFormat1Data.validationSchema,
  }),
});
