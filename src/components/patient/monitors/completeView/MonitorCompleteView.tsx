import {
  Box,
  Button,
  FormControl,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as React from "react";
import { useState } from "react";
import { csvDecode, csvEncode } from "../../../../utility/helper";
import EmojiListBox from "../../../admin/monitor/form/EmojiListBox";
import CardWithHeader from "../../../common/Cards/CardWithHeader";
import { MesageTextDisplay } from "../../../common/MessageTextDisplay/MessageTextDisplay";
import RadioButton from "../../../common/radioButton/RadioButton";
import { useStyles } from "../monitorsStyles";
import { monitorCompleteViewValidationSchema } from "./validationSchemaCompleteMonitor";

const MonitorCompleteView: React.FC<any> = ({
  monitorData,
  onSubmit,
  backPress,
  nextPress,
  loading,
}) => {
  const { name = "", questions: questionsData = [] } = monitorData || {};
  const [selectedListTypeArray, setSelectedListTypeArray] = useState([]);
  const styles = useStyles();

  React.useEffect(() => {
    if (selectedListTypeArray.length > 0) {
      setSelectedListTypeArray([]);
    }
  }, [questionsData]);

  const actionButtons = (isSubmitting) => {
    return (
      <Stack className="bottomButtonsWrapper">
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={backPress}
            data-testid="backMonitorBtn"
          >
            Back
          </Button>
        </Box>
        <Box>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            type="submit"
            data-testid="saveMonitorBtn"
          >
            Save Monitor
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={nextPress}
            data-testid="nextMonitorBtn"
          >
            Next
          </Button>
        </Box>
      </Stack>
    );
  };

  const listType = (formProps) => {
    const { item, i, setFieldValue } = formProps;
    const { questionOption } = item;
    const listTypeArray = csvDecode(questionOption);
    return (
      <Stack className="listAnswerBoxWrapper">
        {listTypeArray.map((listTypeValue, listIndex) => (
          <Box
            key={`csvElement_${i}_${listIndex}`}
            data-testid={`csvElement_${i}_${listIndex}`}
            className={
              selectedListTypeArray &&
              selectedListTypeArray.some((item) => item[i] === listIndex)
                ? "active"
                : ""
            }
            onClick={() =>
              handleCsvItemClick({ i, setFieldValue, listIndex, listTypeArray })
            }
          >
            <Typography>{listTypeValue}</Typography>
          </Box>
        ))}
      </Stack>
    );
  };

  const handleCsvItemClick = ({
    i,
    setFieldValue,
    listIndex,
    listTypeArray,
  }) => {
    let arrt = selectedListTypeArray;
    const arrtIndex = arrt.findIndex((item) => item[i] === listIndex);

    if (arrtIndex > -1) arrt = arrt.filter((vi) => vi[i] !== listIndex);
    else arrt = [...arrt, ...[{ [i]: listIndex }]];

    const ecodedCsvValue = csvEncode(
      arrt.sort().map((vi) => listTypeArray[vi[i]])
    );
    setFieldValue(`questions.${i}.answer`, ecodedCsvValue);
    setSelectedListTypeArray(arrt);
  };

  const hourInputBox = ({ i }) => (
    <Stack className="hoursInputBoxWrapper">
      <Box>
        <Field
          type="number"
          data-testid="hoursInput"
          name={`questions.${i}.answer`}
          placeholder="Enter Number of Hours"
        />
      </Box>
    </Stack>
  );

  const yesNoInputBox = (formProps) => {
    const { i } = formProps;
    const answerValues = [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ];
    return (
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          className="radio-buttons"
          name="radio-buttons-group"
        >
          {(answerValues as Array<any>).map((option: any, index: number) => (
            <RadioButton
              key={`mradio_${index}`}
              name={`questions.${i}.answer`}
              value={option.value}
              label={option.label}
              data-testid={`radio_${option.value}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  const emojiBox = (formProps) => {
    const { item, i, setFieldValue } = formProps;
    return (
      <>
        <EmojiListBox
          question={item}
          onClickEmoji={(v) => {
            setFieldValue(`questions.${i}.answer`, v.text);
          }}
        />
        <ErrorMessage
          name={`questions.${i}.answer`}
          component="div"
          className="invalid-input-message"
        />
      </>
    );
  };

  const answerType = (formProps) => {
    const { item } = formProps;
    const { questionType } = item;
    switch (questionType) {
      case "emoji":
        return emojiBox(formProps);
      case "yes_or_no":
        return yesNoInputBox(formProps);
      case "hours":
        return hourInputBox(formProps);
      case "list":
        return listType(formProps);
      default:
        return null;
    }
  };

  const questionAndAnswerBox = (formProps) => {
    const { item, i } = formProps;
    return (
      <Stack key={`questionAndAnswerBox_${i}`} className="questionBoxWrapper">
        <Box className="questionBox">
          <Typography>{item.question}</Typography>
        </Box>
        <Stack className="answerBoxWrapper">
          <Box className="answerBox">{answerType(formProps)}</Box>
        </Stack>
      </Stack>
    );
  };

  const fromBox = ({ values, isSubmitting, setFieldValue }) => {
    const { questions } = values;
    return (
      <Stack>
        <Form>
          <FieldArray name="questions">
            {() =>
              questions.map((item, i) => {
                return questionAndAnswerBox({ item, i, setFieldValue, values });
              })
            }
          </FieldArray>
          {actionButtons(isSubmitting)}
        </Form>
      </Stack>
    );
  };

  const commonform = () => {
    const modifyQuestions = questionsData.map((item) => ({
      questionId: item._id,
      question: item.question,
      questionType: item.question_type,
      questionOption:
        item.question_type == "emoji"
          ? JSON.parse(item.question_option)
          : item.question_option,
      answer: "",
    }));
    const initialValues = {
      questions: modifyQuestions,
    };
    return (
      initialValues.questions && (
        <Formik
          enableReinitialize
          validationSchema={monitorCompleteViewValidationSchema}
          initialValues={initialValues}
          key={`monitoring_complete_form`}
          onSubmit={onSubmit}
          children={(props: any) => fromBox(props)}
        />
      )
    );
  };

  return (
    <Stack className={`${styles.completeWrapper}`}>
      <CardWithHeader label={name}>
        <Stack className={styles.completeListWrapper}>
          {questionsData.length > 0
            ? commonform()
            : !loading && <MesageTextDisplay message="No data Found." />}
        </Stack>
      </CardWithHeader>
    </Stack>
  );
};

export default MonitorCompleteView;
