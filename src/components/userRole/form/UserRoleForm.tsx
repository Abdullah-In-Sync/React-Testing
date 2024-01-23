import { Box } from "@mui/material";
import { Form } from "formik";
import React from "react";
import { GetAllModuleList } from "../../../graphql/userRole/types";
import {
  accessibility,
  defaultModuleCheck,
  navPosition,
} from "../../../lib/constants";
import { csvDecode } from "../../../utility/helper";
import CommonButton from "../../common/Buttons/CommonButton";
import FormikSelectDropdown from "../../common/FormikFields/FormikSelectDropdown";
import FormikTextField from "../../common/FormikFields/FormikTextField";
import TableAddUserRole from "../TableAddUserRole";
import { useStyles } from "../tableAddUserRoleStyles";
import { useSnackbar } from "notistack";
interface ViewProps {
  modulesData: GetAllModuleList;
  formikProps?: any;
  onPressCancel?: () => void;
  organizationList?: any;
  view?: boolean;
  isEdit?: boolean;
  defaultPrivileges?: any;
}

export const generatedPrivileges = (modulesData, value) => {
  let privilegesTemp = {};
  modulesData[`${value}_modulelist`].forEach((item) => {
    privilegesTemp = { ...privilegesTemp, ...{ [item._id]: [] } };
  });
  return privilegesTemp;
};

const AddUserRoleForm: React.FC<ViewProps> = ({
  onPressCancel,
  formikProps,
  modulesData,
  organizationList,
  view,
  isEdit,
  defaultPrivileges,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const styles = useStyles();
  const {
    isSubmitting,
    values: { org_id, privileges, accessibility: accessibilityValue },
    setFieldValue,
  } = formikProps;

  const onChangePrivilege = async (row, item) => {
    const module = privileges[row._id] || [];
    const moduleKey = `privileges.${[row._id]}`;
    const index = module.indexOf(item._id);
    const viewId = modulesData[`${accessibilityValue}_privileges`].filter(
      (item) => item.name === "View"
    )[0]["_id"];
    const editId = modulesData[`${accessibilityValue}_privileges`].filter(
      (item) => item.name === "Edit"
    )[0]["_id"];
    if (index <= -1) {
      if (viewId !== item._id && viewId && !module.includes(viewId))
        setFieldValue(moduleKey, [...module, ...[item._id, viewId]]);
      else setFieldValue(moduleKey, [...module, ...[item._id]]);

      defaultModuleChecked({ viewId, editId, item, row, module });
    } else if (
      /* istanbul ignore next */
      (viewId === item._id && module.length === 1) ||
      viewId !== item._id
    ) {
      /* istanbul ignore next */
      if (!validationCheck({ viewId, editId, item, row })) return;

      module.splice(index, 1);
      setFieldValue(moduleKey, module);
    }
  };

  const defaultModuleChecked = (obj) => {
    const { viewId, editId, item, row, module } = obj;
    const defaultModuleObjByModuleId = defaultModuleCheck[row._id];
    if (defaultModuleObjByModuleId)
      defaultModuleObjByModuleId.data.forEach((v) => {
        /* istanbul ignore next */
        if (
          /* istanbul ignore next */
          viewId === item._id &&
          privileges[v] &&
          !privileges[v].includes(viewId)
        ) {
          setFieldValue(`privileges.${[v]}`, [...module, ...[viewId]]);
        } else if (
          /* istanbul ignore next */
          editId === item._id &&
          privileges[v] &&
          !privileges[v].includes(editId)
        ) {
          /* istanbul ignore next */
          if (!privileges[v].includes(viewId))
            setFieldValue(`privileges.${[v]}`, [
              ...module,
              ...[editId, viewId],
            ]);
          /* istanbul ignore next */ else if (privileges[v].includes(viewId))
            setFieldValue(`privileges.${[v]}`, [...module, ...[editId]]);
        }
      });
  };

  const validationCheck = (obj) => {
    /* istanbul ignore next */
    const { viewId, editId, item, row } = obj;
    const tempDefaultModuleKeys = Object.keys(defaultModuleCheck);
    /* istanbul ignore next */
    const indexMainCheckBox = tempDefaultModuleKeys.findIndex(
      (v /* istanbul ignore next */) =>
        (editId === item._id || viewId === item._id) &&
        privileges[v] &&
        privileges[v].includes(item._id) &&
        defaultModuleCheck[v]["data"].includes(row._id)
    );

    /* istanbul ignore next */
    if (indexMainCheckBox > -1) {
      const moduleName =
        defaultModuleCheck[tempDefaultModuleKeys[indexMainCheckBox]]["name"];
      enqueueSnackbar(`Please uncheck ${moduleName}`, {
        variant: "error",
      });
      return false;
    }
    return true;
  };

  const handleOrgChange = (event) => {
    /* istanbul ignore next */
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
    if (defaultPrivileges) {
      let privilegesTemp = {};
      modulesData[`${value}_modulelist`].forEach((item) => {
        /* istanbul ignore next */
        privilegesTemp = { ...privilegesTemp, ...{ [item._id]: [] } };
      });
      setFieldValue("privileges", generatedPrivileges(modulesData, value));
    }
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
            modulelist: /* istanbul ignore next */ accessibilityValue
              ? modulesData[`${accessibilityValue}_modulelist`]
              : [],
            privileges: /* istanbul ignore next */ accessibilityValue
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
