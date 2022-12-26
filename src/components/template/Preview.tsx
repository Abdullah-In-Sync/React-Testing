import TemplateTable from "../templateTable";
import { TemplateFormData } from "../templateTable/table.model";

interface TemplatePreviewProps {
  initialData: TemplateFormData;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ initialData }) => {
  return (
    <TemplateTable
      initialData={initialData}
      mode={"view"}
      userType="patient"
      showActionsBottom={false}
    />
  );
};

export default TemplatePreview;
