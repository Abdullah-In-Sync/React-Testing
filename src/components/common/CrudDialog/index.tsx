import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


// import { FieldsLayout } from './fields';
// import FieldsLayout from './fields/FieldsLayout'
const FieldsLayout =  dynamic(import('./fields/FieldsLayout'), { ssr: false })


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2,backgroundColor:"primary.main", color:"custom.light"}}   {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color:"custom.light",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const CrudDialog = ({
  onRef= () => { },
  open=false,
  fields= [],
  onClose= () => { },
  submitButtonDisabled=false,
  onFieldChange= () => { },
  title= "Dialog Title",
  onSubmit= () => { },
  values= {},
  okText= 'Create',
  cancelText= 'Cancel',
  info= false,
  mode= "Add",
  closable= true,
  extraButtonLoading= false,
  hide= false
}) =>{

  const [fieldValues, setFieldValues] = useState<any>({});
debugger
  return (
    <div>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        style={{display: hide? 'none': 'block'}}
      >
        <BootstrapDialogTitle id="customized-dialog-title" >
         {title}
        </BootstrapDialogTitle>
           <form onSubmit={()=>{}}>
                    <DialogContent style={{ overflowX: 'hidden' }}>
                        {/* <div style={{ width: 500 }}> */}
                            {/* <div style={{ display: 'flex', flexDirection: 'column' }} className="mb-4">
                                <Typography variant="h6" className={classes.modalTitle}>{props.title}{props.info && <Link to={props.info}><HelpIcon color="primary" style={{ width: 18, height: 18, marginLeft: 5 }} /></Link>}</Typography>
                                <Typography variant="body2" className={classes.modalDesc}>{props.description}</Typography>
                                {props.notes ? <span dangerouslySetInnerHTML={{ __html: props.notes }} style={{ marginTop: 12, fontSize: 13, color: "#645f5f" }} /> : null}
                            </div> */}
                            <Box sx={{ width: 800 }}>
                            <FieldsLayout
                                fields={fields}
                                values={values}
                                fieldValues={fieldValues}
                                // fieldErrors={this.state.fieldErrors}
                                // validate={this.validate.bind(this)}
                                // onChange={this.handleFieldChange.bind(this)}
                                mode={mode}
                            />
                            </Box>
                        {/* </div> */}
                    </DialogContent>
                    <DialogActions>
                    <Button variant="contained" sx={{color:'custom.light'}} onClick={onClose}>
            {okText}
          </Button>
          <Button variant="contained" sx={{backgroundColor:'secondary.main',color:'custom.light'}} onClick={onClose}>
            {cancelText}
          </Button>
                    </DialogActions>
                </form>
      </BootstrapDialog>
    </div>
  );
}
export default  CrudDialog;