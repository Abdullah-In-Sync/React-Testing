import { Stack } from "@mui/material";
import { FormikProps } from "formik";
import { useState } from "react";
import ConfirmationModal from "../../ConfirmationModal";
import { useStyles } from "../templateFormatStyles";
import * as templateTypes from "../types";
import ChooseScoreSection from "./ChooseScoreSection";
import DescriptionSection from "./DescriptionSection";
import IntroSection from "./IntroSection";
import QuestionsSection from "./QuestionsSection";
import WsasSection from "./WsasSection";

type propTypes = {
    formikProps: FormikProps<templateTypes.TemplateData>;
};

export default function Format1({ formikProps }: propTypes) {
    const styles = useStyles();
    const { values, setFieldValue } = formikProps;

    const { templateData } = values;
    const [isConfirm, setIsConfirm] = useState<any>({
        status: false,
        storedFunction: null,
        setSubmitting: null,
        cancelStatus: false,
        confirmObject: {
            description: "",
        },
    });

    const removeQuestion = (i,) => {
        const questions = [...templateData.questions];
        questions.splice(i, 1);
        setFieldValue("templateData.questions", questions);
    };

    const handleDeleteQuestion = (i) => {
        setIsConfirm({
            ...isConfirm,
            ...{
                status: true,
                confirmObject: {
                    description: "Are you sure you want to delete the question?",
                },
                storedFunction: (callback) => {
                    removeQuestion(i)
                    callback();
                },
            },
        });
    };

    const onConfirmSubmit = () => {
        isConfirm.storedFunction(() => {
            setIsConfirm({
                status: false,
                storedFunction: null,
                setSubmitting: null,
            });
        });
    };
    const clearIsConfirm = () => {
        if (isConfirm.setSubmitting instanceof Function)
            isConfirm.setSubmitting(false);

        setIsConfirm({
            status: false,
            storedFunction: null,
            setSubmitting: null,
            cancelStatus: false,
        });
    };

    return (
        <Stack className={styles.templateFromat1Wrapper}>
            <IntroSection formikProps={formikProps} />
            <ChooseScoreSection formikProps={formikProps} />
            <QuestionsSection formikProps={formikProps} handleDeleteQuestion={handleDeleteQuestion} />
            <WsasSection />
            <DescriptionSection formikProps={formikProps} />
            {isConfirm.status && (
                <ConfirmationModal
                    label={isConfirm.confirmObject.description}
                    onCancel={clearIsConfirm}
                    onConfirm={onConfirmSubmit}
                />
            )}
        </Stack>
    );
}
