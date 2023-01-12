import { useMutation } from "@apollo/client";
import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  MeasureDetail,
  UpdateMeasureScoreByPatientRes,
  UpdateMeasureScoreByPatientVars,
} from "../../../graphql/Measure/types";
import { SuccessModal } from "../../common/SuccessModal";
import TableGenerator from "../../common/TableGenerator";
import { useStyles } from "./measureStyle";
import SureModal from "../../admin/resource/SureModal";
import { UPDATE_MEASURE_SCORE_BY_PATIENT } from "../../../graphql/Measure/graphql";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MeasureTestProps {
  measureDetail: MeasureDetail[];
  setLoader: Dispatch<SetStateAction<boolean>>;
  patmScoreDifficultInit?: number;
  disabled?: boolean;
}

const MeasureTest: FC<MeasureTestProps> = ({
  measureDetail,
  setLoader,
  patmScoreDifficultInit = 0,
  disabled = false,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [tableQuestion, setTableQuestion] = useState([]);
  const [errorModal, setErrorModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [sureModal, setSureModal] = useState(false);
  const [patmScoreDifficult, setPatmScoreDifficult] = useState<number>(
    patmScoreDifficultInit
  );

  console.log(patmScoreDifficultInit, patmScoreDifficult);
  const [updateMeasureScore, { data }] = useMutation<
    UpdateMeasureScoreByPatientRes,
    UpdateMeasureScoreByPatientVars
  >(UPDATE_MEASURE_SCORE_BY_PATIENT);

  //**  TABLE DATA COLUMNS **//
  const fields = [
    {
      columnName: "",
      visible: true,
      render: (val, record, index) => (index == 0 ? "" : index),
    },
    {
      key: "measure_cat_ques",
      columnName:
        "Over the last 2 weeks how often have you been bothered by the following problems?",
      visible: true,
      render: (val) => val,
    },
    {
      key: "notatall",
      columnName: "Not at all",
      visible: true,
      render: (val, record, index) =>
        renderScoreField("notatall", index != 0 ? 0 : "", index, val == 1),
    },
    {
      key: "severaldays",
      columnName: "Several days",
      visible: true,
      render: (val, record, index) =>
        renderScoreField("severaldays", index != 0 ? 1 : "", index, val == 1),
    },
    {
      key: "halfthedays",
      columnName: "More than half days",
      visible: true,
      render: (val, record, index) =>
        renderScoreField("halfthedays", index != 0 ? 2 : "", index, val == 1),
    },
    {
      key: "everyday",
      columnName: "Nearly every day",
      visible: true,
      render: (val, record, index) =>
        renderScoreField("everyday", index != 0 ? 3 : "", index, val == 1),
    },
  ];

  useEffect(() => {
    const questions = measureDetail?.map((value, index) => ({
      index: index + 1,
      measure_cat_ques: <span>{value?.measure_cat_ques}</span>,
      measure_cat_ques_id: value?._id,
      notatall: 0,
      severaldays: 0,
      halfthedays: 0,
      everyday: 0,
      ...value,
    }));
    console.log(questions, "questions");
    setTableQuestion([
      {
        index: 0,
        measure_cat_ques: (
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            (Select most suitable)
          </div>
        ),
      },
      ...questions,
    ]);
  }, []);

  useEffect(() => {
    if (data?.updateMeasureScoreByPatient) {
      setLoader?.(false);

      if (data?.updateMeasureScoreByPatient?.length > 0) {
        setSuccessModal(true);
      }
    }
  }, [data]);

  const renderScoreField = (field, val, index, isSelected) => (
    <span
      style={{
        border: isSelected && "1px solid #6ba08e",
      }}
      className={classes.showSelected}
      data-testid={`${field}-${index}`}
      onClick={() => !disabled && onSelectScore(field, index)}
    >
      {val}
    </span>
  );

  const onSelectScore = (field, index) => {
    tableQuestion[index] = {
      ...tableQuestion[index],
      notatall: 0,
      severaldays: 0,
      halfthedays: 0,
      everyday: 0,
      [field]: tableQuestion[index][field] == 0 ? 1 : 0,
    };
    setTableQuestion([...tableQuestion]);
  };

  const totalScore = useMemo(() => {
    const fieldSum = tableQuestion?.reduce(
      (value, element) => {
        console.log(value, element);
        value.patmscore_notatall_value += 0;
        value.patmscore_severaldays_value += element?.severaldays == 1 ? 1 : 0;
        value.patmscore_halfthedays_value += element?.halfthedays == 1 ? 2 : 0;
        value.patmscore_everyday_value += element?.everyday == 1 ? 3 : 0;
        return value;
      },
      {
        patmscore_notatall_value: 0,
        patmscore_severaldays_value: 0,
        patmscore_halfthedays_value: 0,
        patmscore_everyday_value: 0,
      }
    );

    const totalSum = Object.values(fieldSum).reduce(
      (value: number, ele: number) => value + ele,
      0
    );
    return [
      {
        title: "Column Total",
        ...fieldSum,
      },
      {
        title: "Total Score",
        totalScore: totalSum,
      },
    ];
  }, [tableQuestion]);

  const onSave = () => {
    const fieldSum = tableQuestion?.reduce(
      (value, element) => {
        console.log(value, element);
        value.notatall += element?.notatall || 0;
        value.severaldays += element?.severaldays || 0;
        value.halfthedays += element?.halfthedays || 0;
        value.everyday += element?.everyday || 0;
        return value;
      },
      {
        notatall: 0,
        severaldays: 0,
        halfthedays: 0,
        everyday: 0,
      }
    );

    const totalAnswer = Object.values(fieldSum).reduce(
      (value: number, ele: number) => value + ele,
      0
    );

    if (totalAnswer != tableQuestion.length - 1) {
      setErrorModal(true);
    } else {
      setSureModal(true);
    }
  };

  const onCancel = () => {
    router.back();
  };

  const saveResponse = () => {
    setSureModal(false);
    const testResponse = {
      measureCatId: router.query.id,
      patmscore_difficult: patmScoreDifficult,
      patmscore_value: totalScore[1].totalScore,
      ...totalScore[0],
    };

    const qdata = tableQuestion?.slice(1)?.map((q) => ({
      measure_cat_ques_id: q.measure_cat_ques_id,
      notatall: q.notatall,
      severaldays: q.severaldays,
      halfthedays: q.halfthedays,
      everyday: q.everyday,
    }));

    delete testResponse?.title;

    const variables = {
      ...testResponse,
      qdata: JSON.stringify(qdata),
    };
    setLoader(true);
    updateMeasureScore({
      variables: variables,
    });
  };

  return (
    <>
      <Box className={classes.wrapper}>
        <Grid
          className={classes.tileHeader}
          display="flex"
          justifyContent={"space-between"}
          style={{ fontWeight: 500, fontSize: "14px" }}
        >
          <span>Test</span>
          <span>Completed : 30-12-2022</span>
        </Grid>
        <Grid className={classes.questionTable}>
          <TableGenerator
            fields={fields}
            data={tableQuestion}
            loader={false}
            dataCount={10}
            selectedRecords={[]}
            rowOnePage={10}
            showPagination={false}
          />
          <Box marginTop={"16px"} />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  key={totalScore[0].title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">
                    <span className={classes.scoreTableTitle}>
                      {totalScore[0].title}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    {totalScore[0].patmscore_notatall_value}
                  </TableCell>
                  <TableCell align="center">
                    {totalScore[0].patmscore_severaldays_value}
                  </TableCell>
                  <TableCell align="center">
                    {totalScore[0].patmscore_halfthedays_value}
                  </TableCell>
                  <TableCell align="center">
                    {totalScore[0].patmscore_everyday_value}
                  </TableCell>
                </TableRow>
                <TableRow
                  key={totalScore[1].title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell scope="row">
                    <span className={classes.scoreTableTitle}>
                      {totalScore[1].title}
                    </span>
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={"total-score"}
                    colSpan={4}
                  >
                    {totalScore[1].totalScore}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box marginTop={"16px"}>
            <Box>
              <Typography component={"p"} className={classes?.infoText}>
                If you checked of any problems, how difficult have these
                problems made it for you to do your work, take care of things at
                home, or get along with other people?
              </Typography>
            </Box>
            <RadioGroup
              value={patmScoreDifficult}
              onChange={(val) =>
                !disabled && setPatmScoreDifficult(parseInt(val?.target?.value))
              }
            >
              <Box display={"flex"} justifyContent="space-around">
                <Box
                  display={"flex"}
                  margin={"16px 0px"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography className={classes.radioHeading}>
                    Not difficult at all
                  </Typography>
                  <FormControlLabel
                    className={classes.smallRadioButton}
                    value="1"
                    control={<Radio />}
                    label
                  />
                </Box>
                <Box
                  display={"flex"}
                  margin={"16px 0px"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography className={classes.radioHeading}>
                    Somewhat difficult
                  </Typography>
                  <FormControlLabel
                    className={classes.smallRadioButton}
                    value="2"
                    control={<Radio />}
                    label
                  />
                </Box>
                <Box
                  display={"flex"}
                  margin={"16px 0px"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography className={classes.radioHeading}>
                    Very difficult
                  </Typography>
                  <FormControlLabel
                    className={classes.smallRadioButton}
                    value="3"
                    control={<Radio />}
                    label
                  />
                </Box>
                <Box
                  display={"flex"}
                  margin={"16px 0px"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography className={classes.radioHeading}>
                    Extremely difficult
                  </Typography>
                  <FormControlLabel
                    className={classes.smallRadioButton}
                    value="4"
                    control={<Radio />}
                    label
                  />
                </Box>
              </Box>
            </RadioGroup>
            <Box>
              <Typography component={"p"} className={classes?.infoText}>
                This is calculated by assigning scores of 0, 1, 2, and 3, to the
                response categories of "not at all", "several days", "more than
                half the days", and "nearly every day" respectively. GAD-7 total
                score for the seven items ranges from 0 to 21.
              </Typography>
              <Box display={"flex"} justifyContent="space-around">
                <Box
                  display={"flex"}
                  margin={"16px 0px"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography className={classes.radioHeading}>
                    Scores represent: 0-5 mild
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  margin={"16px 0px"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography className={classes.radioHeading}>
                    6-10 moderate
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  margin={"16px 0px"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography className={classes.radioHeading}>
                    11-15 moderately severe anxiety
                  </Typography>
                </Box>
                <Box
                  display={"flex"}
                  margin={"16px 0px"}
                  flexDirection="column"
                  alignItems={"center"}
                >
                  <Typography className={classes.radioHeading}>
                    15-21 severe anxiety.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent="center" padding="20px">
            {!disabled && (
              <Button
                data-testid="save-test-btn"
                className={classes.actionButton}
                onClick={onSave}
              >
                Save
              </Button>
            )}
            <Button
              data-testid="cancel-test-btn"
              style={{ marginLeft: "60px" }}
              className={classes.actionButton}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Box>
      {errorModal && (
        <SuccessModal
          isOpen={errorModal}
          icon={
            <Image
              alt="My Help"
              src="/images/error.png"
              height="67"
              width="67"
            />
          }
          title="Error"
          description="Please choose score"
          onOk={() => {
            setErrorModal(false);
          }}
        />
      )}
      {successModal && (
        <SuccessModal
          isOpen={successModal}
          title="TEST SCORE"
          description="Test score saved successfully"
          onOk={() => {
            router.push("/patient/measure");
          }}
        />
      )}
      <SureModal
        modalOpen={sureModal}
        setModalOpen={setSureModal}
        setConfirmSubmission={setSureModal}
      >
        <Typography
          sx={{
            fontWeight: "600",
            textAlign: "center",
            fontSize: "27px",
          }}
        >
          Are you sure you want to save this test score?
        </Typography>
        <Box marginTop="20px" display="flex" justifyContent="end">
          <Button
            variant="contained"
            color="inherit"
            size="small"
            data-testid="submitCancel"
            onClick={() => {
              setSureModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ marginLeft: "5px" }}
            size="small"
            data-testid="submitTest"
            onClick={saveResponse}
          >
            Confirm
          </Button>
        </Box>
      </SureModal>
    </>
  );
};

export default MeasureTest;
