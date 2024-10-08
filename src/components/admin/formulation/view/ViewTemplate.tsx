import { Box, Stack } from "@mui/material";

import TemplateArrow from "../../../templateArrow";
import TemplateTable from "../../../templateTable";

interface ViewProps {
  templateData?: any;
}

const ViewTemplateFormulation: React.FC<ViewProps> = ({
  templateData: { rows, nodes, edges },
}) => {
  const componentName = rows ? "TemplateTable" : "ArrowTemplate";

  /* istanbul ignore next */
  const handleViewBoxClick = () => null;
  /* istanbul ignore next */
  const template = () => {
    if (componentName === "TemplateTable") {
      return (
        <Box p={2} className="disabledElement">
          <TemplateTable
            initialData={{ rows }}
            mode="view"
            userType="patient"
            showActionsBottom={false}
          />
        </Box>
      );
    } else if (componentName === "ArrowTemplate") {
      return (
        <TemplateArrow
          nodesData={nodes}
          edgesData={edges}
          mode="mobile"
          userType="patient"
          handleViewBoxClick={handleViewBoxClick}
        />
      );
    }
  };

  return <Stack>{template()}</Stack>;
};

export default ViewTemplateFormulation;
