import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import React, { useEffect, useState } from 'react'
import Layout from '../../../components/layout'
import Loader from '../../../components/common/Loader'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GET_PATIENTTHERAPY_DATA } from '../../../graphql/query/common'
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { GET_PATIENTSESSION_DATA } from '../../../graphql/query/patient'
import { GET_THERAPISTFEEDBACKLIST_DATA } from '../../../graphql/query'
import QuestionTypeRadiobox from './QuestionTypeRadiobox'
import QuestionTypeText from './QuestionTypeText'
import Cookies from 'js-cookie';


export function Feedback() {

    const [therapy, setTherapy] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);
    const [sessionPanelExpanded, setSessionPanelExpanded] = useState<string | false>(false);
    const [feedbackType, setFeedbackType] = useState<string>('');
    const [sessionNo, setSessionNo] = useState(0);
    const [patientData, setPatientData] = useState<{ patient_id: string; patient_name: string }>({ patient_id: '', patient_name: '' });

    useEffect(() => {
        setPatientData({
            patient_id: "4937a27dc00d48bf983fdcd4b0762ebd",
            patient_name: localStorage.getItem("patient_name")
        })
    }, [])

    const { loading: therapyLoading, error: therapyError, data: patientTherapryData } = useQuery(GET_PATIENTTHERAPY_DATA, {
        variables: { patientId: patientData.patient_id },
        onCompleted: (data) => {
            if (data!.getPatientTherapy) {
                const pttherapyId = data!.getPatientTherapy[0]._id;
                if (pttherapyId) {
                    setTherapy(pttherapyId);
                }
            }
            setLoader(false);
        }
    });
    const { loading: sessionLoading, error: sessionError, data: patientSessionData } = useQuery(GET_PATIENTSESSION_DATA, {
        variables: { pttherapyId: "f98a6095ca524338973da5f20f8d0ad3", patientId: patientData.patient_id  },
        onCompleted: (data) => {
            if (data!.getPatientSessionList) {
                setFeedbackType('session');
                setSessionNo(1);
            }
            setLoader(false);
        }

    });
    const { loading: feedbackLoading, error: feedbackError, data: therapistFeedbackData } = useQuery(GET_THERAPISTFEEDBACKLIST_DATA, {
        variables: { feedbackType: "session", sessionNo: 1, patientId: patientData.patient_id },
        onCompleted: (data) => {
            setLoader(false);
        }
    });

    /* istanbul ignore next */
    const onTherapyChange = (event: SelectChangeEvent) => {
        setLoader(true);
        setTherapy(event.target.value);
    };

    /* istanbul ignore next */
    const handleSessionPanelChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setSessionPanelExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Layout>
                <Loader visible={loader} />
                <Box sx={{ flexGrow: 1 }} p={5} borderRadius="7px" className='bg-themegreen' >
                    <Grid container spacing={2}>
                        <Grid item xs={2} sx={{ textAlign: 'center' }}>
                            <Image alt="Patient" src="/assets/images/user.png" width="100" height="100" style={{ borderRadius: "50%" }} />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='h4' className='text-white tit'>{patientData.patient_name}</Typography>
                            {/* <Box className='text-white'>Risk of Suicide</Box> */}
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl sx={{ mt: 3, minWidth: 120 }} size="small">
                                <InputLabel id="lblSelectTherapy" style={{ color: "#fff" }}>Select Therapy</InputLabel>
                                <Select
                                    labelId="lblSelectTherapy"
                                    id="selectTherapy"
                                    value={therapy}
                                    autoWidth
                                    label="Select Therapy"
                                    onChange={onTherapyChange}
                                    sx={{
                                        '.MuiSelect-icon': {
                                            color: 'white'
                                        },
                                        ".MuiSelect-outlined": {
                                            color: 'white'
                                        }
                                    }}
                                >
                                    {
                                        patientTherapryData?.getPatientTherapy != null && patientTherapryData?.getPatientTherapy.map((v, i) => {
                                            return (<MenuItem key={"therapy" + v._id} value={v._id}>{v.therapy_detail.therapy_name}/{v.disorder_detail.disorder_name}/{v.model_detail.model_name}</MenuItem>)
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Typography variant="h4" mt={4} mb={2} sx={{ fontWeight: 'bold' }} className='text-blue' >
                        Feedback
                    </Typography>
                    {
                        patientSessionData?.getPatientSessionList != null && patientSessionData?.getPatientSessionList.map((v, k) => {
                            let p = k + 1;
                            let panelName = 'panel' + p
                            return (<Accordion sx={{ marginTop: "4px", borderRadius: "4px" }}
                                expanded={sessionPanelExpanded === panelName}
                                onChange={handleSessionPanelChange(panelName)}
                                onClick={() => setSessionNo(p)}
                                key={v._id}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon className='text-white' />}
                                    aria-controls={panelName + "bh-content"}
                                    id={panelName + "bh-header"}
                                    sx={{ backgroundColor: '#6ba08e', border: 'none', marginTop: "10px" }}
                                >
                                    <Typography className='text-white' sx={{ width: '33%', flexShrink: 0 }}>
                                        Session {p}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography mt={3} mb={5}>
                                        <Stack spacing={2} direction="row">
                                            <Button className={`text-white ${feedbackType == 'session' ? "bg-themegreen" : ""}`} onClick={() => { setLoader(true); setFeedbackType('session'); setSessionNo(p); }} variant="contained" sx={{ textTransform: "none" }}>Session Feedback</Button>
                                            <Button className={`text-white ${feedbackType == 'quality' ? "bg-themegreen" : ""}`} onClick={() => { setLoader(true); setFeedbackType('quality'); setSessionNo(p); }} variant="contained" sx={{ textTransform: "none" }}>Quality Feedback</Button>
                                        </Stack>
                                    </Typography>
                                    {
                                        therapistFeedbackData?.getTherapistFeedbackList != null && therapistFeedbackData?.getTherapistFeedbackList.map((fv, fk) => {
                                            return <>
                                                {fv.answer_type == "list" && <QuestionTypeRadiobox disable={true} fv={fv} fk={fk} />}
                                                {fv.answer_type == "text" && <QuestionTypeText disable={true} fv={fv} fk={fk} />}
                                            </>
                                        })
                                    }
                                    {
                                        therapistFeedbackData?.getTherapistFeedbackList == null || therapistFeedbackData?.getTherapistFeedbackList.length == 0 && <Typography gutterBottom component="div">No Data Found</Typography>
                                    }
                                </AccordionDetails>
                            </Accordion>)
                        })
                    }
                </Box>
            </Layout>
        </>
    )
}
