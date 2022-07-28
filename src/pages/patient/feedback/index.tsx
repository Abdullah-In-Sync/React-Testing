/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import _ from "lodash";

// GRAPHQL 
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { GET_PATIENTTHERAPY_DATA, GET_PATIENTFEEDBACKLIST_DATA,GET_TOKEN_DATA } from "../../../graphql/query/common"
import { GET_PATIENTSESSION_DATA } from "../../../graphql/query/patient"
import { POST_PATIENT_FEEDBACK } from "../../../graphql/mutation";

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

import TextareaAutosize from '@mui/material/TextareaAutosize';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';


export default function Feedback() {

    // COMPONENT STATE
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [therapy, setTherapy] = React.useState('');    
    const [feedbackType, setfeedbackType] = React.useState('session');    
    const [formValues, setFormValues] = useState([]);
    const [sessionNo, setsessionNo] = useState(1);    
    const [loader, setLoader] = useState(true);
    const [feedbackLoader, setFeedbackLoader] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [erroropen, setErrorOpen] = React.useState(false);
    const [btndiabled, setBtndiabled] = React.useState(false);
    const [therapistId, settherapistId] = React.useState('686802e5123a482681a680a673ef7f53');
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
      });
    const { loading: tokenLoading, error: tokenError, data: tokenData } = useQuery(GET_TOKEN_DATA);  
    //return tokenData; return false;
    if(tokenData && tokenData?.getTokenData.user_type){
        //console.log(tokenData?.getTokenData.patient_data.therapist_id);
        
        var user_type = tokenData?.getTokenData.user_type;
        user_type = user_type.replace('[',"");
        user_type = user_type.replace(']',"");        
        if(user_type!='patient'){
            window.location.href="https://"+window.location.hostname+"/account";
            return false;
        } else {
            if(tokenData?.getTokenData.patient_data){
                //settherapistId(tokenData?.getTokenData.patient_data.therapist_id);
            }
        }
    }
    
    
    const { loading: orgLoading, error: orgError, data: patientTherapryData } = useQuery(GET_PATIENTTHERAPY_DATA, {
        variables: { patientId:"" },
        onCompleted: (data) => {            
            const pttherapyId = data?.getPatientTherapy[0]['_id'];
            if(pttherapyId){
                setTherapy(pttherapyId);                
            }
            
        }
    });
    
    const { loading: sessionLoading, error: sessionError, data: patientSessionData } = useQuery(GET_PATIENTSESSION_DATA, {
            variables: { pttherapyId:therapy },
            onCompleted: (data) => {  
                
                setTimeout(() => {
                    setLoader(false);
                }, 500);
            }
            
    });
    
    const handleChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
        //setFeedbackLoader(true);
    };

    const onhandleChange = (event: SelectChangeEvent) => {
        setLoader(true);
        setTherapy(event.target.value);
    };

    
    async function getPatientSessionData(pttherapyId) {
        
        
    }
    
    var callvalue = true;
    async function getQuestionByType(feedbackType,seesionNo) {        
        
        if(callvalue==true){
            callvalue = false;            
            setfeedbackType(feedbackType);
            setsessionNo(seesionNo);             
        }
    }

    
    
    let handleInputChange = (i, e) => {
        let newFormValues = [...formValues];
        var val = e.target.name;
        //console.log(val); return false;
        if(e.target.id && e.target.id!='undefined'){
            val = e.target.id;    
        }
        
        var p =val.split('_');
        //console.log(p); return false;
        // if(p[0]=='text'){
        //    p[0] =  e.target.value;
        // }
        //console.log(p);
        if(p[0]){
            setFormValues([...formValues, { therapist_id: therapistId, session_no: sessionNo, question_id: p[1],answer:e.target.value }])
        }
    };
    const [postPatientFeedback, { data, loading, error }] = useMutation(POST_PATIENT_FEEDBACK);
    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
    const handleAdd = (event) => { 
        event.preventDefault(); 
        console.log(formValues.length);
        if(formValues.length==0){            
            setErrorOpen(true);
        }else{
                   
            console.log(JSON.stringify(formValues));
            setBtndiabled(true);
            postPatientFeedback({ variables: { feedQuesAnsData: JSON.stringify(formValues),sessionNo:sessionNo,feedbackType:feedbackType} });         
            console.log(data);
            setOpen(true);    
        }
    }
    

    const { loading: feedbackLoading, error: feedbackError, data: patientFeedbackData } = useQuery(GET_PATIENTFEEDBACKLIST_DATA, {
        variables: { feedbackType:feedbackType,sessionNo:sessionNo },
        onCompleted: (data) => {  
            setTimeout(() => {
                setFeedbackLoader(false);
            }, 500);
        }
    });

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        window.location.reload();
        setOpen(false);
    };
    const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }        
        setErrorOpen(false);
    };
    console.log(patientFeedbackData?.getPatientFeedbackList.length);

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
                {loader ==true && <Box style={{ display: 'flex',marginLeft: '450px' }}><CircularProgress /></Box>}
                <Box>   
                <Snackbar key="1" open={open} anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Feedback submitted successfully
                </Alert>
                </Snackbar>                
                <Snackbar key="2" open={erroropen} anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                Field can not be left blank
                </Alert>
                </Snackbar>                
                { 
                   
                   patientSessionData?.getPatientSessionList != null && patientSessionData?.getPatientSessionList.map((v, k) => {  
                       let p = k+1;
                       let panelName = 'panel'+p
                       return <form key={p}  onSubmit={(values) => {handleAdd(values);}}><Accordion sx={{ marginTop:"4px",borderRadius: "12px",border: 'none' }} onClick={()=>getQuestionByType('session',p)} expanded={expanded === panelName} onChange={handleChange(panelName)}>
                               <AccordionSummary
                               expandIcon={<ExpandMoreIcon />}
                               aria-controls={panelName+"bh-content"}
                               id={panelName+"bh-header"}
                               sx={{backgroundColor:'#6ba08e',borderRadius: "12px",border:'none',marginTop:"10px" }}
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
                                {feedbackLoader==true && <Box style={{ display: 'flex',marginLeft: '450px' }}><CircularProgress /></Box>}
                                {
                                    patientFeedbackData?.getPatientFeedbackList != null && patientFeedbackData?.getPatientFeedbackList.map((fv, fk) => {
                                        return <Typography key={fk+""}  gutterBottom component="div">
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
                                        name="row-radio-buttons-group" defaultValue={fv.feedback_ans && fv.feedback_ans.answer?fv.feedback_ans.answer:''}>                          
                                        {
                                            fv.answer_type == "list" && fv.answer_options  && fv.answer_options.map((av, ak) => {
                                                let j = ak+1;
                                                return <FormControlLabel key={j}  disabled={fv.feedback_ans && fv.feedback_ans.answer?true:false} sx={{fontSize:"15px", color: "#3f4040b0 !important"}}  name={"question_"+fv._id} onChange={e => handleInputChange(fk, e)}  value={av} control={<Radio size="small" />} label={av} />
                                            })
                                        }

                                       {
                                            fv.answer_type == "text" && <TextareaAutosize
                                            aria-label="empty textarea"
                                            id={fv.answer_type+"_"+fv._id}                                            
                                            onBlur={e => handleInputChange(fk, e)} 
                                            value={fv.feedback_ans && fv.feedback_ans.answer?fv.feedback_ans.answer:''}                                           
                                            style={{ width: 855.5, height: 216, left: 454.32, top: 1044,backgroundColor: "#C4C4C4",borderRadius: "12px",border: 'none' }}
                                          />
                                            
                                        }
                                    
                                    </RadioGroup>                                   
                                    </Typography>
                                    
                                        </Typography>                            
                                    })
                                }
                                {(patientFeedbackData?.getPatientFeedbackList != null && patientFeedbackData?.getPatientFeedbackList.length != 0) && <Typography sx={{textAlign:'center'}}><Button type="submit" disabled={btndiabled==true?true:false} variant="contained">Submit</Button></Typography>}
                                {
                                    patientFeedbackData?.getPatientFeedbackList ==null || patientFeedbackData?.getPatientFeedbackList.length == 0 && <Typography  gutterBottom component="div">No Data Found</Typography>
                                }
                                                  
                                
                               </AccordionDetails>
                       </Accordion></form>
                   })
                   }



                    
                </Box>
            </Layout >
        </>
    );
};





