import React, { FormEvent, useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import { Box } from "@material-ui/core";
import TextFieldComponent from "../../../common/TextField/TextFieldComponent";
import MultiSelectComponent from "../../../common/SelectBox/MultiSelect/MutiSelectComponent";
import { addAdminAssessment } from "../../../../utility/types/resource_types";

const defaultFormValue = {
  name: "",
  org_id: "",
};

interface ViewProps {
  buttonClick?: (value: any) => void;
  organizationList?: any;
  setSendFormData?: any;
}

const FormAssessmentBox: React.FC<ViewProps> = ({
  organizationList,
  setSendFormData,
}) => {
  const csvDecode = (csvString) => (csvString ? csvString.split(",") : []);

  const [formFields, setFormFields] = useState<addAdminAssessment>({
    ...defaultFormValue,
  });

  const handleChange = (event) => {
    const value = event.target.value as string[];
    /* istanbul ignore next */
    if (value[value.length - 1] === "all") {
      const updatedSelected = [
        "all",
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...organizationList?.map((org) => org._id),
      ];

      setFormFields((oldValues) => ({
        ...oldValues,
        org_id: updatedSelected.join(","),
      }));
      return;
    } else if (
      value.length === organizationList?.length &&
      value?.indexOf("all") === -1
    ) {
      setFormFields((oldValues) => ({
        ...oldValues,
        org_id: "",
      }));
    } else {
      setFormFields({
        ...formFields,
        org_id: [...value].filter((v) => v != "all").join(","),
      });
    }
  };

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* istanbul ignore next */
    setSendFormData(formFields);
  };
  return (
    <Stack>
      <form onSubmit={handleSubmit} data-testid="resource-add-form">
        <Box style={{ paddingTop: "15px" }}>
          <Grid
            style={{ alignSelf: "stretch", paddingBottom: "10px" }}
            item
            xs={4}
          >
            <TextFieldComponent
              required={true}
              name="name"
              id="name"
              label="Enter assessment name"
              value={formFields?.name}
              onChange={set2}
              fullWidth={true}
              inputProps={{ "data-testid": "assessment_name" }}
              variant="outlined"
              className="form-control-bg"
              size="small"
            />
          </Grid>
        </Box>

        <Box>
          <MultiSelectComponent
            fullWidth
            required={true}
            onChange={handleChange}
            id="resourceOrgSelect"
            labelId="resourceOrg"
            name="org_id"
            label="Select Organization"
            options={[
              ...[{ _id: "all", name: "Select All" }],
              ...(organizationList || []),
            ]}
            mappingKeys={["_id", "name"]}
            size="small"
            className="form-control-bg multiSelect"
            extraProps={{ "data-testid": "mainOrganizationSelect" }}
            multiSelect={
              /* istanbul ignore next */
              csvDecode(formFields?.org_id)
            }
            value={
              /* istanbul ignore next */
              csvDecode(formFields?.org_id)
            }
          />
        </Box>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "10px",
          }}
        >
          <Button
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
            data-testid="addSubmitForm"
            variant="contained"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Stack>
  );
};

export default FormAssessmentBox;
