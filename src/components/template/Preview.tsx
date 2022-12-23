import TemplateTable from "../templateTable";
import { TemplateFormData } from "../templateTable/table.model";

interface TemplatePreviewProps {
  initialData: TemplateFormData;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ initialData }) => {
  return (
    <TemplateTable
      initialData={initialData}
      mode={"patientView"}
      userType="patient"
    />
  );
};

export default TemplatePreview;
