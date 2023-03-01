import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import * as React from "react";

import { useAppContext } from "../../../contexts/AuthContext";
import { useStyles } from "./courseStyles";

interface ViewProps {
  handleUseFulInfo?: () => void;
  handleContinueButtonClick?: () => void;
}

const CcbtCourse: React.FC<ViewProps> = ({
  handleUseFulInfo,
  handleContinueButtonClick,
}) => {
  const styles = useStyles();
  const { user } = useAppContext();

  /* istanbul ignore next */
  const isUsefulButton = (days = 1) => {
    const {
      userToken: { auth_time },
      created_date,
    } = user;
    const patientCreateDate = new Date(created_date);
    return (
      auth_time >
      (patientCreateDate.getTime() + 24 * days * 60 * 60 * 1000) / 1000
    );
  };

  const logoImage = (imageUrl) => {
    return (
      <ImageListItem>
        <Image
          alt="My Help"
          src={imageUrl}
          loading="lazy"
          height="80"
          width="300"
        />
      </ImageListItem>
    );
  };

  return (
    <Stack className={styles.container}>
      <Stack className="headerWrapper">
        <Typography variant="h4">Welcome!</Typography>
      </Stack>
      <Stack className="boxWrapper">
        <Box className="box">
          <Box className="firstRow">
            <Image
              alt="My Help"
              src="/images/actions.png"
              loading="lazy"
              height="83"
              width="229"
            />
          </Box>
          <Box className="secondRow">
            <Typography>
              ACTIONS combines Beating the Blues with support from a health
              coach who will help guide you through the programme. Beating the
              Blues is a computerised Cognitive Behavioural Therapy (cCBT)
              programme that teaches you techniques to help you manage symptoms
              such as stress, anxiety and depression. The programme is
              interactive and uses multimedia including videos, case studies and
              immersive projects to lead you through 8 sessions of therapy.
            </Typography>
          </Box>
          <Box className="thirdRow">
            <ImageList cols={4}>
              {logoImage("/images/beatingthebyteslogo.png")}
              {logoImage("/images/maximus_logo.png")}
              {logoImage("/images/heath_solution.png")}
              {logoImage("/images/logo.png")}
            </ImageList>
          </Box>
        </Box>
      </Stack>
      <Stack className="secondSection">
        <Box className="secondSectionTextWrapper">
          <Typography>Access Beating the Blues cCBT</Typography>
        </Box>
        <Box className="secondSectionButtonWrapper">
          <Box>
            <Button
              data-testid="continue-button"
              variant="contained"
              onClick={handleContinueButtonClick}
            >
              Continue
            </Button>
          </Box>
          {isUsefulButton() && (
            <Box>
              <Button
                data-testid="useful-information-button"
                variant="contained"
                onClick={handleUseFulInfo}
              >
                Useful information
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default CcbtCourse;
