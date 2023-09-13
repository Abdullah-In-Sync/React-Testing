import { Box } from "@material-ui/core";
import { Card } from "@mui/material";
import Image from "next/image";
import React from "react";
import {
  GetMasterDataEntity,
  GetTherapistById,
} from "../../../../graphql/Therapist/types";
import CommonButton from "../../../common/Buttons/CommonButton";
import ViewForm from "./form/ViewForm";
import { useStyles } from "./therapistProfileStyles";

interface ViewProps {
  masterData?: {
    specialization: GetMasterDataEntity[];
    professional: GetMasterDataEntity[];
  };
  therapistData?: GetTherapistById;
}

const TherapistProfileView: React.FC<ViewProps> = ({
  masterData,
  therapistData,
}) => {
  const styles = useStyles();

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
              fullWidth
            >
              Edit Profile
            </CommonButton>
          </Box>
          <Box>
            <CommonButton
              data-testid="changePasswordBtn"
              variant="outlined"
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
      <Card variant="outlined" className="formCard">
        <ViewForm masterData={masterData} therapistData={therapistData} />
      </Card>
    );
  };

  return (
    <>
      <Box className={styles.profileContent}>
        {firstCol()}
        {secondCol()}
      </Box>
    </>
  );
};

export default TherapistProfileView;
