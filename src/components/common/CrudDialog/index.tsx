// 👇️ ts-nocheck ignores all ts errors in the file
// @ts-nocheck
import React, { useEffect, useState } from 'react';
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
import _flatten from 'lodash/flatten';


// import { FieldsLayout } from './fields';
// import FieldsLayout from './fields/FieldsLayout'
const FieldsLayout = dynamic(import('./fields/FieldsLayout'), { ssr: false })


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
    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: "primary.main", color: "custom.light" }}   {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "custom.light",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const CrudDialog = ({
  onRef = () => { },
  open = false,
  fields = [],
  onClose = () => { },
  submitButtonDisabled = false,
  onFieldChange = () => { },
  title = "Dialog Title",
  onsubmit = () => { },
  values = {},
  okText = 'Create',
  cancelText = 'Cancel',
  info = false,
  mode = "Add",
  closable = true,
  extraButtonLoading = false,
  hide = false,
  description,
  extraButtonText = false,
  onExtraButton = () => { },
  dynamicForm,
  viewData = false
}) => {
  const [fieldValues, setFieldValues] = useState<any>({});
//   const parseValues=(props)=> {
//     const values = {};
//     _flatten(fields).forEach((field) => {
//         if (field.form === false) { return }
//         let _value = values[field.key];
//         if (field.type === 'select') {
//             if (!field.multiple) {
//                 _value = (typeof _value === 'object' && _value !== null) ? _value.id : _value;
//             }
//         }
//         values[field.key] = _value || field.value;
//     });
//     // return values;
//     setFieldValues(values)
// }
// useEffect(()=>{
//   parseValues();
  
// },[])
  const handleFieldChange=(field, value) =>{
    
    if (field.type === 'select') {
        if (field.multiple) {
            value = (value || []).includes('selectall') ? (field.options || []).map(x => x.value) : value
        }
    }
    // const fieldErrors = fieldErrors;
    const _fieldValues = {...fieldValues};
    // fieldErrors[field.key] = undefined;
    _fieldValues[field.key] = field.key === 'is_open' ? !!value : value;
    setFieldValues( _fieldValues );

    onFieldChange(field, value);
}

  const onSubmit=(e)=> {
    // debugger
    e.preventDefault()
    // this.props.fields.forEach((field) => { this.validate(field); });
    // const hasError = (Object.keys(this.state.fieldErrors).filter(x => this.state.fieldErrors[x])).length;
    // if (hasError === 0) {
    //     onSubmit({ ...this.state.fieldValues }, hasError ? { ...this.state.fieldErrors } : null);
    // // }
    onsubmit(fieldValues);
}
  return (
    <div>
      <BootstrapDialog
        onClose={()=>{onClose();setFieldValues( {});}}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        style={{ display: hide ? 'none' : 'block' }}
      >
        <BootstrapDialogTitle id="customized-dialog-title" >
          {title}
        </BootstrapDialogTitle>
        <Typography variant="h5" sx={{margin: '45px',textAlign: 'center', fontWeight: 200}} >
          {description}
        </Typography>
        <form onSubmit={onSubmit}>
          <DialogContent style={{ overflowX: 'hidden' }}>
            <Box sx={{ width: 800 }}>
              <FieldsLayout
                fields={fields}
                values={values}
                fieldValues={fieldValues}
                // fieldErrors={this.state.fieldErrors}
                // validate={this.validate.bind(this)}
                onChange={handleFieldChange}
                mode={mode}
              />
            </Box>

            {
              extraButtonText && (
                <Button onClick={onExtraButton} variant="outlined"  >
                  {extraButtonText}
                </Button>
              ) 


            }
            <Box sx={{ marginTop: 1 }}>
              {dynamicForm}
            </Box>


          </DialogContent>
          <DialogActions>
            {viewData ? " ": 
            <Button variant="contained" sx={{ color: 'custom.light' }} type="submit">
            {okText}
          </Button>
            }
            
            <Button variant="contained" sx={{ backgroundColor: 'secondary.main', color: 'custom.light' }} onClick={()=>{onClose();setFieldValues( {});}}>
              {cancelText}
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </div>
  );
}
export default CrudDialog;