import { Box } from "@mui/material";
import { Form } from "formik";
import React from "react";
import { GetAllModuleList } from "../../../graphql/userRole/types";
import { accessibility, navPosition } from "../../../lib/constants";
import { csvDecode } from "../../../utility/helper";
import CommonButton from "../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../common/FormikFields/FormikTextField";
import TableAddUserRole from "../TableAddUserRole";
import { useStyles } from "../tableAddUserRoleStyles";
interface ViewProps {
  modulesData: GetAllModuleList;
  formikProps?: any;
  onPressCancel?: () => void;
  organizationList?: any;
  view?: boolean;
  isEdit?: boolean;
  defaultPrivileges?: any;
}
const AddUserRoleForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  modulesData,
  organizationList,
  view,
  isEdit,
  defaultPrivileges,
}) => {
  const styles = useStyles();
  const {
    isSubmitting,
    values: { org_id, privileges, accessibility: accessibilityValue },
    setFieldValue,
  } = formikProps;

  const onChangePrivilege = async (row, item) => {
    const module = privileges[row.name] || [];
    const moduleKey = `privileges.${[row.name]}`;
    const index = module.indexOf(item._id);
    const viewText = "View";
    const viewId = modulesData[`${accessibilityValue}_privileges`].filter(
      (item) => item.name === viewText
    )[0]["_id"];
    if (index <= -1) {
      if (item.name !== viewText && viewId && !module.includes(viewId))
        setFieldValue(moduleKey, [...module, ...[item._id, viewId]]);
      else setFieldValue(moduleKey, [...module, ...[item._id]]);
    } else if (
      /* istanbul ignore next */
      (item.name === viewText && module.length === 1) ||
      item.name !== viewText
    ) {
      module.splice(index, 1);
      setFieldValue(moduleKey, module);
    }
  };

  const handleOrgChange = (event) => {
    const {
      target: { value },
    } = event;

    if (value.indexOf("all") > -1) setFieldValue("org_id", "all");
    else setFieldValue("org_id", value.join(","));
  };

  const handleDropdown = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (defaultPrivileges)
      setFieldValue(
        "privileges",
        modulesData[`${accessibilityValue}_privileges`]
      );

    setFieldValue(name, value);
  };

  return (
    <Form className={styles.addUserForm}>
      <Box className={`row1 ${view && "disabledElement"}`}>
        <FormikTextField
          name="name"
          id="name"
          fullWidth={true}
          inputProps={{ "data-testid": "userRoleName" }}
          variant="outlined"
          className="form-control-bg"
          size="small"
          placeholder="Enter User Role*"
        />

        <FormikSelectDropdown
          name="accessibility"
          label="Select Accessibility*"
          options={accessibility}
          mappingKeys={["id", "label"]}
          size="small"
          className="form-control-bg"
          showDefaultSelectOption={false}
          extraProps={{ "data-testid": "accessibilitySelect" }}
          disabled={isEdit}
          onChange={handleDropdown}
        />

        <FormikSelectDropdown
          fullWidth
          inputProps={{
            "data-testid": organizationList[0]?.name,
          }}
          onChange={handleOrgChange}
          id="organizationSelect"
          labelId="organizationSelect"
          name="org_id"
          label="Select Organization*"
          options={[
            ...[{ _id: "all", name: "Select All" }],
            ...organizationList,
          ]}
          mappingKeys={["_id", "name"]}
          size="small"
          className="form-control-bg multiSelect"
          extraProps={{ "data-testid": "organizationSelect" }}
          multiSelect={csvDecode(org_id)}
          disabled={isEdit}
        />

        <FormikSelectDropdown
          name="position"
          label="Select Position*"
          options={navPosition}
          mappingKeys={["id", "label"]}
          size="small"
          className="form-control-bg"
          showDefaultSelectOption={false}
          extraProps={{ "data-testid": "navPositionSelect" }}
        />
      </Box>
      <Box>
        <TableAddUserRole
          modulesData={{
            modulelist: accessibilityValue
              ? modulesData[`${accessibilityValue}_modulelist`]
              : [],
            privileges: accessibilityValue
              ? modulesData[`${accessibilityValue}_privileges`]
              : [],
          }}
          onChangePrivilege={onChangePrivilege}
          formikProps={formikProps}
          view={view}
        />
      </Box>
      {view && <Box mb={2} />}
      {!view && (
        <Box className="bottomActionButtonsWrapper">
          <Box>
            <CommonButton
              type="submit"
              data-testid="submitForm"
              variant="contained"
              disabled={isSubmitting}
            >
              Save
            </CommonButton>
          </Box>
          <Box>
            <CommonButton
              variant="contained"
              className="cancelButton"
              data-testid="cancelForm"
              onClick={onPressCancel}
            >
              Cancel
            </CommonButton>
          </Box>
        </Box>
      )}
    </Form>
  );
};

export default AddUserRoleForm;
