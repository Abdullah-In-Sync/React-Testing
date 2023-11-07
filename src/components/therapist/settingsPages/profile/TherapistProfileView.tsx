import { Box } from "@material-ui/core";
import { Card } from "@mui/material";
import Image from "next/image";
import React, { ForwardedRef, useRef } from "react";
import {
  GetMasterDataEntity,
  GetTherapistById,
} from "../../../../graphql/Therapist/types";
import CommonButton from "../../../common/Buttons/CommonButton";
import ViewForm from "./form/ViewForm";
import { useStyles } from "./therapistProfileStyles";
import ConfirmWrapper, { ConfirmElement } from "../../../common/ConfirmWrapper";
import InfoModal, {
  ConfirmInfoElement,
} from "../../../common/CustomModal/InfoModal";
import ProfileEditForm from "./form/EditForm";
import ChangePassword from "../../../changePassword/ChangePassword";

interface ViewProps {
  masterData?: {
    specialization: GetMasterDataEntity[];
    professional: GetMasterDataEntity[];
  };
  therapistData?: GetTherapistById;
  infoModalRef?: ForwardedRef<ConfirmInfoElement>;
  confirmRef?: ForwardedRef<ConfirmElement>;
  onPressEditProfileButton?: () => void;
  therapistDataLoading?: boolean;
}

const TherapistProfileView: React.FC<ViewProps> = ({
  masterData,
  therapistData,
  infoModalRef,
  confirmRef,
  onPressEditProfileButton,
  therapistDataLoading,
}) => {
  const styles = useStyles();
  const formModalRef = useRef<ConfirmInfoElement>(null);
  const onPressChangePassword = () => {
    formModalRef.current.openConfirm({});
  };

  const firstCol = () => {
    return (
      <Box className="firstCol">
        <Box>
          <Image
            alt="Therapist"
            src="/images/user.png"
            width="100"
            height="100"
            style={{ borderRadius: "50%" }}
          />
        </Box>
        <Box>
          <Box mb={1}>
            <CommonButton
              data-testid="editProfileBtn"
              variant="contained"
              onClick={onPressEditProfileButton}
              fullWidth
            >
              Edit Profile
            </CommonButton>
          </Box>
          <Box>
            <CommonButton
              data-testid="changePasswordBtn"
              variant="outlined"
              onClick={onPressChangePassword}
              fullWidth
            >
              Change Password
            </CommonButton>
          </Box>
        </Box>
      </Box>
    );
  };
  const secondCol = () => {
    return (
      <Card variant="outlined" className="secondCol">
        <ViewForm
          masterData={masterData}
          therapistData={therapistData}
          therapistDataLoading={therapistDataLoading}
        />
      </Card>
    );
  };

  return (
    <>
      <ConfirmWrapper ref={confirmRef}>
        <Box className={styles.profileContent}>
          {firstCol()}
          {secondCol()}
        </Box>
        <InfoModal
          ref={infoModalRef}
          maxWidth="md"
          className={styles.editFormWrapper}
        >
          <ProfileEditForm />
        </InfoModal>
      </ConfirmWrapper>
      <ChangePassword infoModalRef={formModalRef} />
    </>
  );
};

export default TherapistProfileView;
