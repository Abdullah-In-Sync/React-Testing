import React, { useEffect, useState } from "react";
import {
  Button,
  Stack,
  Checkbox,
  FormHelperText,
  Tooltip,
} from "@mui/material";
import { Form } from "formik";
import { Box, Typography, makeStyles } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useLazyQuery } from "@apollo/client";
import { GET_ORGANISATION_SHARED_LIST } from "../../../../graphql/assessment/graphql";
import { GET_PATIENT_SHARED_LIST } from "../../../../graphql/formulation/graphql";

interface ViewProps {
  buttonClick?: (value: any) => void;
  onPressSubmit?: () => void;
  selectAssessmentName: string;
  setPlanId?: any;
  onChangePlanId?: any;
  shareType: string;
  listType?: string;
}

const useStyles = makeStyles(() => ({
  customTooltip: {
    height: "48px",
    maxWidth: "353px",
    padding: "14px 14px 19px 16px",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontWeight: 600,
    lineHeight: "15px",
    letterSpacing: "0em",
    textAlign: "left",
    borderRadius: "4px",
  },
  textSize: {
    fontSize: "12px",
  },
}));

const ShareAssessmentModel: React.FC<ViewProps> = ({
  onPressSubmit,
  selectAssessmentName,
  onChangePlanId,
  shareType,
  listType,
}) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string | string[]>([]);
  const [hasError, setHasError] = useState(false);
  const [selectableOrg, setSelectableOrg] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);

  const [getOrgSharedList] = useLazyQuery(GET_ORGANISATION_SHARED_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setOrganizationList(data.getOrganisationSharedList);
      const selectable = data.getOrganisationSharedList.filter(
        (org) => !org.is_shared
      );
      setSelectableOrg(selectable);
      /* istanbul ignore next */
    },
  });

  const [getPatientSharedList] = useLazyQuery(GET_PATIENT_SHARED_LIST, {
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setOrganizationList(data.getPatientSharedList);
      const selectable = data.getPatientSharedList.filter((p) => !p.is_shared);
      setSelectableOrg(selectable);
      /* istanbul ignore next */
    },
  });
  useEffect(() => {
    if (listType == "patient") {
      getPatientSharedList({
        variables: {
          name: selectAssessmentName,
          share_type: shareType.toLowerCase(),
        },
      });
    } else {
      getOrgSharedList({
        variables: {
          name: selectAssessmentName,
          share_type: shareType.toLowerCase(),
        },
      });
    }
  }, []);

  const isAllSelected =
    selectableOrg.length > 0 && selected.length === selectableOrg.length;

  const handleChange = (event: SelectChangeEvent<string | string[]>) => {
    setHasError(false);
    const value = event.target.value as string[];

    if (value[value.length - 1] === "all") {
      const updatedSelected =
        selected.length === selectableOrg.length
          ? []
          : selectableOrg.map((org) => org._id);

      setSelected(updatedSelected);
      onChangePlanId(updatedSelected);
      return;
    }
    setSelected(value);
    onChangePlanId(value);
  };

  const handleSubmit = () => {
    if (selected.length <= 0) {
      setHasError(true);
    }
    if (selected.length > 0) {
      onPressSubmit();
    }
  };
  const handleInputLabelClick = () => {
    console.log("disable error");
    setHasError(false);
  };
  const handleBlur = () => {
    if (selected.length <= 0) {
      setHasError(false);
    }
  };

  return (
    <Stack>
      <Form>
        <Box
          data-testid="share_select_popup"
          style={{ margin: "43px 37px 0px 36px" }}
        >
          <FormControl
            style={{
              width: "100%",
              backgroundColor: "",
            }}
            error={hasError}
          >
            <InputLabel
              onClick={handleInputLabelClick}
              id="mutiple-select-label"
            >
              {listType == "patient" ? "Select patient" : "Select organisation"}
            </InputLabel>
            <Select
              data-testid="share_organisation_select_list"
              name="select_organisation"
              label="Select_Organisation"
              multiple
              value={selected}
              onChange={handleChange}
              onOpen={handleBlur}
              inputProps={{ "data-testid": "select_share_input" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    top: "529px",
                    maxHeight: "33%",
                    marginTop: "9px",
                  },
                },
              }}
              renderValue={(selected) => {
                const selectedOptions = organizationList.filter((option) =>
                  selected.includes(option._id)
                );
                const selectedNames = selectedOptions.map((option) =>
                  listType == "patient"
                    ? option.patient_firstname + " " + option.patient_lastname
                    : option.name
                );
                return selectedNames.join(", ");
              }}
              style={{
                flex: "none",
                order: "1",
                flexGrow: "0",
                borderRadius: "4px",
                paddingBottom: "8px",
              }}
            >
              <MenuItem value="all">
                <ListItemIcon>
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < organizationList.length
                    }
                  />
                </ListItemIcon>
                <Typography
                  data-testid={`checkbox123`}
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "24px",
                    letterSpacing: "0px",
                    textAlign: "left",
                  }}
                >
                  Select All
                </Typography>
              </MenuItem>
              {organizationList.map((option, i) =>
                option.is_shared ? (
                  <Tooltip
                    key={i}
                    title={
                      listType == "patient"
                        ? `${shareType} is already shared with this patient`
                        : `${shareType} is already shared with this organisation`
                    }
                    disableHoverListener={!option.is_shared}
                    classes={{ tooltip: classes.customTooltip }}
                  >
                    <MenuItem
                      data-testid={`shareOrg_${option._id}`}
                      key={option._id}
                      value={option._id}
                      disabled={option.is_shared}
                      aria-label={
                        listType == "patient"
                          ? option.patient_firstname
                          : option.name
                      }
                      sx={{
                        "&.Mui-disabled": {
                          pointerEvents: "all",
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Checkbox
                          data-testid={`checkbox12345${option._id}`}
                          checked={selected.indexOf(option._id) > -1}
                        />
                      </ListItemIcon>
                      <ListItemText
                        secondary={
                          listType == "patient"
                            ? option.patient_firstname +
                              " " +
                              option.patient_lastname
                            : option.name
                        }
                      />
                    </MenuItem>
                  </Tooltip>
                ) : (
                  <MenuItem
                    data-testid={`shareOrg_${option._id}`}
                    key={option._id}
                    value={option._id}
                    disabled={option.is_shared}
                    sx={{
                      "&.Mui-disabled": {
                        pointerEvents: "all",
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        data-testid={`checkbox12345${option._id}`}
                        checked={selected.indexOf(option._id) > -1}
                      />
                    </ListItemIcon>
                    <ListItemText
                      secondary={
                        listType == "patient"
                          ? option.patient_firstname +
                            " " +
                            option.patient_lastname
                          : option.name
                      }
                    />
                  </MenuItem>
                )
              )}
            </Select>
            {hasError && (
              <FormHelperText
                style={{
                  position: "absolute",
                  bottom: "52px",
                  left: "-2px",
                  font: "Montserrat",
                }}
              >
                {listType == "patient"
                  ? "Patient cannot be empty"
                  : "Organisation cannot be empty"}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "27px",
            marginBottom: "15px",
          }}
        >
          <Button
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
            data-testid="addSubmitForm"
            variant="contained"
            onClick={() => {
              handleSubmit();
            }}
          >
            Share
          </Button>
        </div>
      </Form>
    </Stack>
  );
};

export default ShareAssessmentModel;
