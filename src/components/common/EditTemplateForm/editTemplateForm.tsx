import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_TEMPLATE_DETAIL } from "../../../graphql/query/resource";
import { editTemplatesFormField } from "../../../utility/types/resource_types";
import TextFieldComponent from "../TextField/TextFieldComponent";

const defaultFormValue = {
  _id: "",
  category: "",
  name: "",
};

type propTypes = {
  onSubmit?: any;
  setLoader: any;
};

const EditTemplate = (props: propTypes) => {
  const router = useRouter();
  const id = router?.query.id as string;
  const [formFields, setFormFields] =
    useState<editTemplatesFormField>(defaultFormValue);

  //GraphQL Queries
  const [getResourceData, { loading: templateLoading, data: templateData }] =
    useLazyQuery(GET_TEMPLATE_DETAIL, {
      onCompleted: (data) => {
        /* istanbul ignore next */
        if (data!.getResourceById) {
          setFormFields(data!.getTemplateById?._id);
        } else if (data!.getTemplateById == null) {
          props.setLoader(false);
        }
      },
    });

  const set2 = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormFields((oldValues) => ({ ...oldValues, [fieldName]: value }));
  };

  useEffect(() => {
    /* istanbul ignore next */
    if (!templateLoading && templateData) {
      props.setLoader(false);
    }
  }, [templateData]);

  useEffect(() => {
    const data = templateData?.getTemplateById;
    /* istanbul ignore next */
    if (data) {
      setFormFields(data);
    }
  }, [templateData]);

  useEffect(() => {
    /* istanbul ignore next */
    props.setLoader(true);
    getResourceData({
      variables: { templateId: id },
    });
    props.setLoader(false);
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => props.onSubmit(e, formFields)}
        data-testid="edit-tamplate-form"
      >
        <Box
          sx={{ flexGrow: 1, border: "1px solid #cecece" }}
          p={5}
          borderRadius="7px"
        >
          <Grid container spacing={2} marginBottom={5}>
            <Grid style={{ alignSelf: "stretch" }} item xs={6}>
              <TextFieldComponent
                required={true}
                name="name"
                id="name"
                label="Template Name"
                value={formFields?.name}
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "name" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextFieldComponent
                required={true}
                name="category"
                id="category"
                label="Template Category"
                value={formFields?.category}
                onChange={set2}
                fullWidth={true}
                inputProps={{ "data-testid": "category" }}
                variant="outlined"
                className="form-control-bg"
                size="small"
              />
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            paddingTop: "50px",
          }}
        >
          <Grid item xs={6} style={{ paddingRight: "50px" }}>
            <Button
              data-testid="editTemplateSubmitButton"
              variant="contained"
              type="submit"
              style={{ paddingLeft: "50px", paddingRight: "50px" }}
            >
              Save
            </Button>
          </Grid>
          <Grid item xs={6} textAlign="center">
            <Button
              data-testid="editTemplateCancelButton"
              variant="contained"
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                backgroundColor: "#6BA08E",
              }}
              onClick={() => router.push("/admin/resource/templateList")}
            >
              Cancel
            </Button>
          </Grid>
        </Box>
      </form>
    </>
  );
};
export default EditTemplate;
