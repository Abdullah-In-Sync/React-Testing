import { Stack } from "@mui/material";
import React from "react";
import { GetPatientFileListEntity } from "../../../../graphql/patientFile/type";
import CommonTable from "../../../common/CommonTable";
import ConfirmWrapper from "../../../common/ConfirmWrapper";
import InfoModal from "../../../common/CustomModal/InfoModal";
import { useStyles } from "../filesStyles";
import AddUploadFileForm from "../uploadFile/AddUploadFileForm";
import therapistData from "./data";

interface ViewProps {
  listData?: GetPatientFileListEntity[];
  pageActionButtonClick?: (value) => void;
  confirmRef?: any;
  infoModalRef?: any;
  loadingPatientFileData?: boolean;
  checkAccess?: any;
}

const FilesListComponent: React.FC<ViewProps> = ({
  listData,
  pageActionButtonClick,
  confirmRef,
  infoModalRef,
  loadingPatientFileData,
  checkAccess,
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
              /* istanbul ignore next */
              (checkAccess.download || checkAccess.download === undefined) && {
                id: "download",
                icon: require("@mui/icons-material/FileDownloadOutlined")
                  .default,
              },
              /* istanbul ignore next */
              (checkAccess.view || checkAccess.view === undefined) && {
                id: "view",
                icon: require("@mui/icons-material/Visibility").default,
              },
              /* istanbul ignore next */
              (checkAccess.edit || checkAccess.edit === undefined) && {
                id: "edit",
                icon: require("@mui/icons-material/Edit").default,
              },
              /* istanbul ignore next */
              (checkAccess.edit || checkAccess.edit === undefined) && {
                id: "delete",
                icon: require("@mui/icons-material/DeleteSharp").default,
                checkIsParam: "added_by",
                checkIsDisabledFor: "therapist",
                disableIdCheck: "delete",
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
