import React, { useState, useEffect } from 'react';
import _ from "lodash";

// GRAPHQL 
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GET_PATIENTTHERAPY_DATA, GET_PATIENTFEEDBACKLIST_DATA } from "../../../graphql/query/common"
import { GET_PATIENTSESSION_DATA } from "../../../graphql/query/patient"
import { ADD_FEEDBACK } from "../../../graphql/mutation";

// MUI COMPONENTS
import Box from '@mui/material/Box';
import Layout from '../../../components/layout';

import ContentHeader from "../../../components/common/ContentHeader";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RadioGroup from '@mui/material/RadioGroup';
import Text from '@mui/material/Text';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Divider from '@mui/material/Divider';
const Feedback: React.FunctionComponent<any> = (props) => {

    // COMPONENT STATE
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [therapy, setTherapy] = React.useState('');
    const [sessionNo, setsessionNo] = React.useState('');
    const [feedbackType, setfeedbackType] = React.useState('session');
    const [sessionQuestion, setSessionQuestion] = React.useState([]);
    //const [patientSessionData, setpatientSessionData] = React.useState([]);
    const { loading: orgLoading, error: orgError, data: patientTherapryData } = useQuery(GET_PATIENTTHERAPY_DATA, {
        variables: { patientId:"" },
        onCompleted: (data) => {
            console.log(data);
            const pttherapyId = data?.getPatientTherapy[0]['_id'];
            
            console.log(pttherapyId);
            if(pttherapyId){
                // const { loading: sessionLoading, error: sessionError, data: patientSessionData } = useLazyQuery(GET_PATIENTSESSION_DATA, {
                //         variables: { pttherapyId:pttherapyId },
                        
                // });
                setTherapy(pttherapyId);
                //getPatientSessionData(pttherapyId);
                //console.log(patientSessionData);
            }
            
        }
    });
    const { loading: sessionLoading, error: sessionError, data: patientSessionData } = useQuery(GET_PATIENTSESSION_DATA, {
            variables: { pttherapyId:therapy },
            
    });
    console.log(therapy);
    console.log(patientSessionData);
    
    
    

    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const onhandleChange = (event: SelectChangeEvent) => {
        setTherapy(event.target.value);
    };

    // useEffect(() => {

    // }, [feedbackType]);
    async function getPatientSessionData(pttherapyId) {
        
        
    }
    async function postPatientFeedback() {
        console.log("d");
        
    }
    var callvalue = true;
    async function getQuestionByType(feedbackType,seesionNo) {        
        
        if(callvalue==true){
            callvalue = false;
            console.log(feedbackType);
            setfeedbackType(feedbackType);
            setsessionNo(seesionNo);             
        }
    }

    const { loading: feedbackLoading, error: feedbackError, data: patientFeedbackData } = useQuery(GET_PATIENTFEEDBACKLIST_DATA, {
        variables: { feedbackType:feedbackType,sessionNo:sessionNo },
    });
    console.log(patientFeedbackData?.getPatientFeedbackList);

    return (
        <>
        <Layout>
                <ContentHeader title="Feedback" />
                <Box style={{textAlign: 'right'}}> 
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">    
                <InputLabel id="demo-select-small">Select Therapy</InputLabel>               
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={therapy}
                    label="Select Therapy"
                    onChange={onhandleChange}
                >
                    {
                        patientTherapryData?.getPatientTherapy.map((v, i) => {                          
                            return <MenuItem key={i+""} value={v._id}>{v.therapy_detail.therapy_name}/{v.disorder_detail.disorder_name}/{v.model_detail.model_name}</MenuItem>
                        })
                    }                   
                </Select>
                </FormControl>    
                </Box>
                <Box>
                
                { 
                   
                   patientSessionData?.getPatientSessionList != null && patientSessionData?.getPatientSessionList.map((v, k) => {  
                       let p = k+1;
                       let panelName = 'panel'+p
                       return <Accordion sx={{ marginTop:"4px",borderRadius: "12px",border: 'none' }} onClick={()=>getQuestionByType('session',p)} expanded={expanded === panelName} onChange={handleChange(panelName)}>
                               <AccordionSummary
                               expandIcon={<ExpandMoreIcon />}
                               aria-controls={panelName+"bh-content"}
                               id={panelName+"bh-header"}
                               sx={{backgroundColor:'#6ba08e',borderRadius: "12px",border:'none' }}
                               >
                               <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                   Session {p}
                               </Typography>


                               
                               </AccordionSummary>
                               <AccordionDetails>
                                <Typography sx={{ marginBottom:"40px" }}>
                                <Stack spacing={2} direction="row">
                                    <Button variant="contained" onClick={()=>getQuestionByType('session',p)}>Session Feedback</Button>
                                    <Button variant="contained" onClick={()=>getQuestionByType('quality',p)}>Quality Feedback</Button>

                                </Stack> 
                                </Typography>
                              
                                {
                                    patientFeedbackData?.getPatientFeedbackList != null && patientFeedbackData?.getPatientFeedbackList.map((fv, fk) => {
                                        return <Typography  gutterBottom component="div">
                                            { fv.answer_type == "list" && <Typography sx={{ backgroundColor: "#dadada52 !important",border: "1px solid #dadada52 !important",
                                        color: "#3f4040b0 !important",fontSize: "15px", paddingLeft: "5px", fontWeight: "1px !important" }}>
                                                                        {fk+1}. {fv.question} 
                                                                        </Typography>}
                                            { fv.answer_type == "text" && <Typography sx={{ color: "#6EC9DB !important",fontSize: "15px", paddingLeft: "5px", fontWeight: "700 !important" }}>
                                                                         {fv.question} 
                                                                        </Typography>}                                                                            

                                                                        <Typography>
                                                                        <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group">                          
                                        {
                                            fv.answer_type == "list" && fv.answer_options  && fv.answer_options.map((av, ak) => {
                                                return <FormControlLabel sx={{fontSize:"15px", color: "#3f4040b0 !important"}} value={av} control={<Radio size="small" />} label={av} />
                                            })
                                        }

                                       {
                                            fv.answer_type == "text" && <TextareaAutosize
                                            aria-label="empty textarea"                                            
                                            style={{ width: 855.5, height: 216, left: 454.32, top: 1044,backgroundColor: "#C4C4C4",borderRadius: "12px",border: 'none' }}
                                          />
                                            
                                        }
                                    
                                    </RadioGroup>                                   
                                    </Typography>
                                    
                                        </Typography>                            
                                    })
                                }
                                {patientSessionData?.getPatientSessionList != null && <Typography sx={{textAlign:'center'}}><Button variant="contained" onClick={()=>postPatientFeedback()}>Submit</Button></Typography>}
                                {
                                    patientFeedbackData?.getPatientFeedbackList ==null || patientFeedbackData?.getPatientFeedbackList.length == 0 && <Typography  gutterBottom component="div">No Data Found</Typography>
                                }
                                                  
                                
                               </AccordionDetails>
                       </Accordion>
                   })
                   }



                    
                </Box>
            </Layout >
        </>
    );
};

export default Feedback;




