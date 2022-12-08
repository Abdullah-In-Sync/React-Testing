import { useLazyQuery } from "@apollo/client";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { FC, useEffect } from "react";
import { GET_TEMPLATE_LIST } from "../../../graphql/query/resource";
import CustomModal from "../CustomModal/customModel";
import Loader from "../Loader";
import * as Yup from "yup";

export interface SelectTemplateModalProps {
  isOpen: boolean;
  onSubmit: (template: any) => void;
  onModalClose: any;
  setConfirmSubmission: any;
}

export interface TemplateListFormData {
  templateType: string;
}

export const SelectTemplateModal: FC<SelectTemplateModalProps> = ({
  isOpen,
  onSubmit,
  onModalClose,
  setConfirmSubmission,
}) => {
  const [getTemplateData, { data: resData, loading }] =
    useLazyQuery(GET_TEMPLATE_LIST);

  useEffect(() => {
    getTemplateData();
  }, []);

  const onFormSubmit = (values: TemplateListFormData) => {
    const templateDetail = resData?.listTemplates?.find(
      (t) => t.component_name == values.templateType
    );
    onSubmit(templateDetail);
  };

  return (
    isOpen && (
      <CustomModal
        modalOpen={true}
        setModalOpen={onModalClose}
        setConfirmSubmission={setConfirmSubmission}
      >
        <Grid item xs={12}>
          <div>
            <Typography
              sx={{
                color: "#6EC9DB",
                fontWeight: "600",
                textAlign: "center",
                paddingBottom: "20px",
                fontFamily: "Montserrat",
                font: "500",
                fontSize: "16px",
              }}
            >
              Select Template
            </Typography>
          </div>

          <Formik<TemplateListFormData>
            initialValues={{
              templateType: "",
            }}
            validationSchema={Yup.object().shape({
              templateType: Yup.string().required("Template Type is required"),
            })}
            onSubmit={onFormSubmit}
          >
            {({ values, setFieldValue, isValid }) => (
              <Form>
                <Box
                  sx={{
                    flexGrow: 1,
                    border: "1px solid #cecece",
                    padding: "30px 19px",
                  }}
                  borderRadius="7px"
                >
                  {loading ? (
                    <Grid item position={"relative"} minHeight={90}>
                      <Loader visible={loading} />
                    </Grid>
                  ) : (
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="templateType"
                        data-testid="componentsRadio"
                        value={values.templateType.toString()}
                        onChange={(event) => {
                          setFieldValue(
                            "templateType",
                            event.currentTarget.value
                          );
                        }}
                      >
                        {resData?.listTemplates?.map((temp) => (
                          <FormControlLabel
                            data-testid={temp?.component_name}
                            value={temp?.component_name}
                            control={<Radio />}
                            label={temp?.name}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>
                  )}
                </Box>
                <div style={{ paddingTop: "20px", textAlign: "center" }}>
                  <Button
                    data-testid="TemplateProceed"
                    variant="contained"
                    type="submit"
                    style={{ paddingLeft: "50px", paddingRight: "50px" }}
                    disabled={loading || !isValid}
                  >
                    Proceed
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Grid>
      </CustomModal>
    )
  );
};
