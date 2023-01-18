import React, { FormEvent, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import SureModal from "../../admin/resource/SureModal";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

/* istanbul ignore next */
type propTypes = {
  onSubmit?: any;
  setLoader: any;
  orgData?: any;
  orgConfigListData?: any;
  orgConfigListWithIdData?: any;
};

export default function OrgConfigSetting(props: propTypes) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmSubmission, setConfirmSubmission] = useState<boolean>(false);
  const [configurations, setConfigurations] = useState([]);

  const handleToggle = async (event, index) => {
    const clonedConfiguration = [...configurations];
    clonedConfiguration[index].status = event.target.checked;
    setConfigurations(clonedConfiguration);
  };

  useEffect(() => {
    const { orgConfigListData, orgConfigListWithIdData } = props;
    const configurationData = orgConfigListData?.listModules;
    const toggledData = orgConfigListWithIdData?.listModulesByOrganization;
    const configures = configurationData?.map((itemOne) => {
      const match = toggledData?.find(
        (itemTwo) => itemOne.name === itemTwo.name
      );
      return {
        ...itemOne,
        status: Boolean(match),
      };
    });
    setConfigurations(configures);
  }, [props]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    /* istanbul ignore next */
    e.preventDefault();
    setModalOpen(true);

    /* istanbul ignore next */
    if (!confirmSubmission) return;
  };

  return (
    <>
      <Box p={5} borderRadius="7px">
        <>
          <form onSubmit={handleSubmit} data-testid="config-setting-form">
            {configurations &&
              React.Children.toArray(
                configurations?.map((data, index) => (
                  <Box
                    sx={{
                      padding: "10px",
                      placeItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography
                      data-testid="modules-list-typo"
                      sx={{
                        color: "black",
                        fontWeight: "500",
                        display: "flex",
                        placeItems: "center",
                        paddingLeft: "15vw",
                      }}
                    >
                      {data.name}
                    </Typography>

                    <div></div>
                    <Box
                      style={{ paddingRight: "15vw" }}
                      data-testid="randomId"
                    >
                      <FormControlLabel
                        control={<IOSSwitch />}
                        checked={data.status}
                        onClick={(e) => handleToggle(e, index)}
                        label=""
                        data-testid={"modules-switch-button" + index}
                        aria-label="module-switch"
                      />
                    </Box>
                  </Box>
                ))
              )}

            <SureModal
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setConfirmSubmission={setConfirmSubmission}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "27px",
                }}
              >
                "Are you sure want to Update This Config Setting?"
              </Typography>
              <Box marginTop="20px" display="flex" justifyContent="end">
                <Button
                  variant="contained"
                  color="inherit"
                  size="small"
                  data-testid="addOrganizationCancleButton"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ marginLeft: "5px" }}
                  size="small"
                  data-testid="addOrganizationConfirmButton"
                  onClick={() => {
                    setModalOpen(false);
                    props.onSubmit(
                      configurations.filter((obj) => obj.status === true)
                    );
                  }}
                >
                  Confirm
                </Button>
              </Box>
            </SureModal>

            <Grid container spacing={5} marginBottom={0}>
              <Grid
                item
                xs={12}
                textAlign="center"
                style={{ paddingTop: "100px" }}
              >
                <Button
                  data-testid="addOrganizationSubmitButton"
                  variant="contained"
                  type="submit"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      </Box>
    </>
  );
}
