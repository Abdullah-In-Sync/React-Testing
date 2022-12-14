import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Box } from "@mui/material";
import { FormikProps } from "formik";
import { FC } from "react";
import TextFieldComponent from "../common/TextField/TextFieldComponent";
import { TableCell, TemplateFormData } from "./table.model";
import { useStyles } from "./tableTemplateStyles"

interface AnswerTypeProps {
    formCellKey: string;
    cellData: TableCell;
    formikHelper?: FormikProps<TemplateFormData>;
}

const AnswerType: FC<AnswerTypeProps> = ({
    formCellKey,
    cellData,
    formikHelper,
}) => {
    const styles = useStyles(); 

    cellData.answerValues = cellData?.answerValues || []


    const onChangeRadioAnswerType = (value: String) => {
        formikHelper.setFieldValue(formCellKey, {
            ...cellData,
            patientAns: value,
        });
    };

    const textInputAnswerType = () => {
        return (
            <div className={styles.answerInputWrapper}>
                <TextFieldComponent
                    key={`${formCellKey}.patientAns`}
                    id={`${formCellKey}.patientAns`}
                    label="Paitent to write answer here..."
                    value={ (cellData?.patientAns as string) || ''}
                    name={`${formCellKey}.patientAns`}
                    onChange={formikHelper?.handleChange}
                    inputProps={`${formCellKey}.patientAns`}
                    variant="outlined"
                    className="form-control-bg"
                    fullWidth
                    autoComplete='off'
                    extraProps={{
                        error:
                            formikHelper.getFieldMeta(`${formCellKey}.patientAns`).touched &&
                            Boolean(
                                formikHelper.getFieldMeta(`${formCellKey}.patientAns`).error
                            ),
                        helperText:
                            formikHelper.getFieldMeta(`${formCellKey}.patientAns`).touched &&
                            formikHelper.getFieldMeta(`${formCellKey}.patientAns`).error,
                    }}
                    
                />
            </div>
        )
    }

    const ListAnswerType = (props?: any) => {
        const answerValues = props?.booleantype ? ["Yes", "No"] : cellData?.answerValues
        return (
            <FormControl>
                <RadioGroup
                    {...props?.row}
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={cellData?.patientAns}
                >
                    {(answerValues as Array<any>).map((option: string, index: number) => <FormControlLabel key={`answerType_${index}`} value={option} control={<Radio />} label={option} onClick={() => props?.onClickRadio(option)} />)}
                </RadioGroup>
            </FormControl>
        )
    }

    const booleanAnswerType = () => {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ flex: 1}}>
                <ListAnswerType row onClickRadio={(option) => onChangeRadioAnswerType(option)} booleantype="true"/>
            </Box>
        )
    }

    const answerTypeComponent = () => {
        const { answerType } = cellData;
        switch (answerType) {
            case "boolean":
                return booleanAnswerType();
            case "list":
                return <ListAnswerType onClickRadio={(option) => onChangeRadioAnswerType(option)} />
            case "text":
                return textInputAnswerType()
            default:
                return null
        }
    }

    return (
        <Grid container direction={"column"} className={styles.answerTypeWrapper} padding={"13px 29px 13px 20px"}>
            {answerTypeComponent()}
        </Grid>
    );
};

export default AnswerType
