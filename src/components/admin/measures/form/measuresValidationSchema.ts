import * as Yup from "yup";
import {
  format1,
  format2,
} from "../../../common/TemplateFormat/templateFormatData";

export const measuresValidationSchema = Yup.object().shape({
  title: Yup.string().required("Title name is required"),
  orgId: Yup.string().required("Organization is required"),
  templateId: Yup.string().required("Format is required"),
  templateData: Yup.object().when("templateId", {
    is: "format1",
    then: format1.validationSchema,
    otherwise: Yup.object().when("templateId", {
      is: "format2",
      then: format2.validationSchema,
    }),
  }),
});
