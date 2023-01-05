import {
  Box,
  Button,
  Divider,
  FormControl,
  ImageList,
  ImageListItem,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import * as React from "react";
import RadioButton from "./RadioButton";
import * as monitoringTypes from "./types";

import { Field, FieldArray, Form, Formik } from "formik";
import { useState } from "react";
import CardWithHeader from "../../common/Cards/CardWithHeader";
import { useStyles } from "./monitoringStyles";

const MonitoringComplete: React.FC<monitoringTypes.MonitoringProps> = ({
  completeData,
  onSubmit,
  backPress,
  nextPress,
}) => {
  const [selectedListTypeArray, setSelectedListTypeArray] = useState([]);
  const styles = useStyles();

  const csvDecode = (csvString) => {
    return csvString.split(",");
  };

  const csvEncode = (csvStringArray) => {
    return csvStringArray.join(", ");
  };

  const actionButtons = (isSubmitting) => {
    return (
      <Stack className="bottomButtonsWrapper">
        <Box>
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="secondary"
            type="submit"
          >
            Save
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="secondary" onClick={backPress}>
            Back
          </Button>
        </Box>
        <Box>
          <Button variant="contained" color="secondary" onClick={nextPress}>
            Next
          </Button>
        </Box>
      </Stack>
    );
  };

  const listType = (formProps) => {
    const { item, i, setFieldValue } = formProps;
    const { ptmonques_listtype } = item;
    const listTypeArray = csvDecode(ptmonques_listtype);
    return (
      <Stack className="listAnswerBoxWrapper">
        {listTypeArray.map((listTypeValue, listIndex) => (
          <Box
            key={`csvElement_${listIndex}`}
            data-testid={`csvElement_${listIndex}`}
            className={
              selectedListTypeArray.includes(listIndex) ? "active" : ""
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
    const arrtIndex = arrt.indexOf(listIndex);

    if (arrtIndex > -1) arrt = arrt.filter((vi) => vi !== listIndex);
    else arrt = [...arrt, ...[listIndex]];

    const ecodedCsvValue = csvEncode(
      arrt.sort().map((vi) => listTypeArray[vi])
    );
    setFieldValue(`data.${i}.ptmon_ans`, ecodedCsvValue);
    setSelectedListTypeArray(arrt);
  };

  const hourInputBox = ({ i }) => (
    <Stack className="hoursInputBoxWrapper">
      <Box>
        <Field
          type="number"
          data-testid="hoursInput"
          name={`data.${i}.ptmon_ans`}
          placeholder="Enter Number of Hours"
        />
      </Box>
    </Stack>
  );

  const yesNoInputBox = (formProps) => {
    const { i } = formProps;
    const answerValues = [
      { label: "Yes", value: "1" },
      { label: "No", value: "0" },
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
              name={`data.${i}.ptmon_ans`}
              value={option.value}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  };

  const emojiBox = (formProps) => {
    const { item, i, setFieldValue, values } = formProps;
    const emojisData = JSON.parse(item["emoji_ids"]);
    return (
      <>
        <ImageList cols={5} className="emojListWrapper">
          {emojisData.map((item) => {
            const { _id, emoji_caption, emoji_url } = item;
            return (
              <ImageListItem
                key={_id}
                data-testid={`${_id}`}
                className={_id == values.data[i]?.ptmon_ans ? "active" : ""}
                onClick={() => setFieldValue(`data.${i}.ptmon_ans`, _id)}
              >
                <Image
                  src={`/images/emoji/${emoji_url}`}
                  alt={emoji_caption}
                  loading="lazy"
                  width="153"
                  height="152"
                />
                <Typography>{emoji_caption}</Typography>
              </ImageListItem>
            );
          })}
        </ImageList>
        <Stack pt={2} pb={2}>
          <Divider />
        </Stack>
      </>
    );
  };

  const answerType = (formProps) => {
    const { item } = formProps;
    const { ptmonques_type } = item;
    switch (ptmonques_type) {
      case 1:
        return emojiBox(formProps);
      case 3:
        return yesNoInputBox(formProps);
      case 4:
        return hourInputBox(formProps);
      case 6:
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
          <Typography>{item.ptmonques_question}</Typography>
        </Box>
        <Stack className="answerBoxWrapper">
          <Box className="answerBox">{answerType(formProps)}</Box>
        </Stack>
      </Stack>
    );
  };

  const fromBox = ({ values, isSubmitting, setFieldValue }) => {
    return (
      <Stack>
        <Form>
          <FieldArray name="data">
            {() =>
              completeData.map((item, i) => {
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
    const initialValues = {
      data: completeData.map((item) => ({
        ptmonques_id: item._id,
        ptmon_ans: "",
      })),
    };
    return (
      initialValues.data && (
        <Formik
          enableReinitialize
          initialValues={initialValues}
          key={`monitoring_complete_form`}
          onSubmit={onSubmit}
          children={(props: any) => fromBox(props)}
        />
      )
    );
  };

  return (
    <Stack className={`${styles.completeWrapper} disable-text-selection`}>
      <CardWithHeader
        label={"Complete Monitoring Module (therapist mon)"}
        simpleHeader
      >
        <Stack className={styles.completeListWrapper}>{commonform()}</Stack>
      </CardWithHeader>
    </Stack>
  );
};

export default MonitoringComplete;
