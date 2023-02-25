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

const b2b_redirect_url =
  process.env.NEXT_PUBLIC_ENVIRONMENT == "dev"
    ? null
    : "https://actions.learning.dev/learner/browse/56b3982f-49e1-362f-b02c-9aec72e33d4c";

const CcbtCourse: React.FC = () => {
  const styles = useStyles();
  const { user } = useAppContext();

  const isUsefulButton = (days = 1) => {
    const {
      userToken: { auth_time },
    } = user;
    return auth_time > (Date.now() + 24 * days * 60 * 60 * 1000) / 1000;
  };

  const handleContinueButtonClick = () => {
    if (b2b_redirect_url) window.open(b2b_redirect_url, "_blank");
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
              <ImageListItem>
                <Image
                  alt="My Help"
                  src="/images/beatingthebyteslogo.png"
                  loading="lazy"
                  height="113"
                  width="329"
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  alt="My Help"
                  src="/images/maximus_logo.png"
                  loading="lazy"
                  height="113"
                  width="329"
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  alt="My Help"
                  src="/images/heath_solution.png"
                  loading="lazy"
                  height="113"
                  width="329"
                />
              </ImageListItem>
              <ImageListItem>
                <Image
                  alt="My Help"
                  src="/images/logo.png"
                  loading="lazy"
                  height="113"
                  width="329"
                />
              </ImageListItem>
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
