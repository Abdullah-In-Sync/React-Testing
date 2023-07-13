import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton, Stack } from "@mui/material";
import { GetFormulationById } from "../../../../graphql/formulation/types";
import BreadCrumbsWithBackButton from "../../../common/BreadCrumbsWithBackButton";
import InfoModal from "../../../common/CustomModal/InfoModal";
import CustomImage from "../../../common/Image/Image";
import NodeDetail from "./NodeDetail";
import ViewTemplateFormulation from "./ViewTemplate";
import { useStyles } from "./viewFormulationStyles";

interface ViewProps {
  data?: GetFormulationById;
  infoModalRef?: any;
  backButtonClick?: () => void;
}

const ViewFormulation: React.FC<ViewProps> = ({
  data,
  infoModalRef,
  backButtonClick,
}) => {
  const styles = useStyles();
  const {
    template_data,
    formulation_name,
    formulation_desc: description,
    formulation_instruction: instruction,
    formulation_url,
  } = data || {};
  const templateDataJson = template_data && JSON.parse(template_data);

  const infoIcon = () => {
    return (
      description &&
      instruction && (
        <Box className="infoIconWrapper">
          <IconButton
            size="small"
            data-testid={`infoIconButton`}
            onClick={() =>
              infoModalRef.current?.openConfirm({
                data: { description, instruction },
                modalRef: infoModalRef,
              })
            }
          >
            <InfoIcon className="infoIcon" />
          </IconButton>
        </Box>
      )
    );
  };

  return (
    <>
      <Stack className={styles.viewFormulationWrapper} mb={5}>
        <BreadCrumbsWithBackButton
          heading={formulation_name}
          headerRightComponent={infoIcon}
          backButtonClick={backButtonClick}
        >
          {templateDataJson && (
            <ViewTemplateFormulation templateData={templateDataJson} />
          )}
          {formulation_url && (
            <Box p={3}>
              <CustomImage url={formulation_url} />
            </Box>
          )}
        </BreadCrumbsWithBackButton>
      </Stack>
      <InfoModal
        ref={infoModalRef}
        maxWidth="sm"
        className={styles.nodeCardDetailModalWrapper}
      >
        <NodeDetail />
      </InfoModal>
    </>
  );
};

export default ViewFormulation;
