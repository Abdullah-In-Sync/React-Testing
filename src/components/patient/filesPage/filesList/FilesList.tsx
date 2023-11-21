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
  isTrue?: boolean;
}

const FilesListComponent: React.FC<ViewProps> = ({
  listData,
  pageActionButtonClick,
  confirmRef,
  infoModalRef,
  loadingPatientFileData,
  isTrue,
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
              (isTrue === true || isTrue === undefined) && {
                id: "download",
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
