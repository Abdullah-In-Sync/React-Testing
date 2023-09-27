import { Stack } from "@mui/material";
import React from "react";
import { GetPatientFileListByTherapistEntity } from "../../../../graphql/patientFile/type";
import CommonTable from "../../../common/CommonTable";
import ConfirmWrapper from "../../../common/ConfirmWrapper";
import InfoModal from "../../../common/CustomModal/InfoModal";
import { useStyles } from "../filesStyles";
import AddUploadFileForm from "../uploadFile/AddUploadFileForm";
import therapistData from "./data";

interface ViewProps {
  listData?: GetPatientFileListByTherapistEntity[];
  pageActionButtonClick?: (value) => void;
  confirmRef?: any;
  infoModalRef?: any;
  loadingPatientFileData?: boolean;
}

const FilesListComponent: React.FC<ViewProps> = ({
  listData,
  pageActionButtonClick,
  confirmRef,
  infoModalRef,
  loadingPatientFileData,
}) => {
  const styles = useStyles();
  return (
    <ConfirmWrapper ref={confirmRef}>
      {!loadingPatientFileData && (
        <Stack className={styles.tableWrapper}>
          <CommonTable
            hidePagination
            data={{ list: listData }}
            pageActionButtonClick={pageActionButtonClick}
            actionButton={[
              {
                id: "upload",
                icon: require("@mui/icons-material/FileDownloadOutlined")
                  .default,
              },
              {
                id: "view",
                icon: require("@mui/icons-material/Visibility").default,
              },
              {
                id: "edit",
                icon: require("@mui/icons-material/Edit").default,
              },
              {
                id: "delete",
                icon: require("@mui/icons-material/DeleteSharp").default,
              },
            ]}
            headerData={therapistData}
          />
        </Stack>
      )}
      <InfoModal
        ref={infoModalRef}
        maxWidth="sm"
        className={styles.addUploadModalWrapper}
      >
        <AddUploadFileForm />
      </InfoModal>
    </ConfirmWrapper>
  );
};

export default FilesListComponent;
