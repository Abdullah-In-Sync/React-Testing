import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography, withStyles, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import _flatten from 'lodash/flatten';
import HelpIcon from '@material-ui/icons/Help';
import styles from './styles';
import { FieldsLayout } from './fields';

class CrudDialog extends Component {
    state = {
        fieldValues: {},
        fieldErrors: {}
    }

    componentDidMount() {
        this.setState({ fieldValues: this.parseValues(this.props) });
        this.props.onRef(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.open == false && nextProps.open) {
            this.setState({ fieldValues: this.parseValues(nextProps)});
        }
    }

    parseValues(props) {
        const values = {};
        _flatten(props.fields).forEach((field) => {
            if (field.form === false) { return }
            let _value = props.values[field.key];
            if (field.type === 'select') {
                if (!field.multiple) {
                    _value = (typeof _value === 'object' && _value !== null) ? _value.id : _value;
                }
            }
            values[field.key] = _value || field.value;
        });
        return values;
    }

    handleFieldChange(field, value) {
        if (field.type === 'select') {
            if (field.multiple) {
                value = (value || []).includes('selectall') ? (field.options || []).map(x => x.value) : value
            }
        }
        const fieldErrors = this.state.fieldErrors;
        const fieldValues = this.state.fieldValues;
        fieldErrors[field.key] = undefined;
        fieldValues[field.key] = field.key === 'is_open' ? !!value : value;
        this.setState({ fieldErrors, fieldValues });
        this.props.onFieldChange(field, value);
    }

    validate(field) {
        const validations = field.validations;
        const fieldValue = this.state.fieldValues[field.key] && this.state.fieldValues[field.key].toString();
        const fieldErrors = this.state.fieldErrors;
        if (validations && Array.isArray(validations) && validations.length) {
            validations.forEach((rule) => {
                if (rule.type === 'required' && rule.value === true && (!fieldValue || !fieldValue.trim())) {
                    fieldErrors[field.key] = rule.message || 'Required'
                } else if (rule.type === 'maxLength' && rule.value && ((fieldValue || '').toString().length > rule.value)) {
                    fieldErrors[field.key] = rule.message || `Max length ${rule.value}`;
                } else if (rule.type === 'minLength' && rule.value && ((fieldValue || '').toString().length < rule.value)) {
                    fieldErrors[field.key] = rule.message || `Min length ${rule.value}`;
                } else if (rule.type === 'pattern' && rule.value && !(fieldValue || '').toString().match(new RegExp(`\\b${rule.value}\\b`, 'g'))) {
                    fieldErrors[field.key] = rule.message || `Invalid value`;
                } else if (rule.type === 'length' && rule.value && ((fieldValue || '').toString().length !== rule.value)) {
                    fieldErrors[field.key] = rule.message || `Length must be ${rule.value}`;
                } else if (rule.type === 'custom' && rule.value && typeof rule.value === 'function' && !rule.value(fieldValue, this.state.fieldValues)) {
                    fieldErrors[field.key] = rule.message || `Invalid value`;
                }
            });
            this.setState({ fieldErrors });
        }
    }

    onSubmit(e) {
        e.preventDefault()
        this.props.fields.forEach((field) => { this.validate(field); });
        const hasError = (Object.keys(this.state.fieldErrors).filter(x => this.state.fieldErrors[x])).length;
        this.props.onSubmit({ ...this.state.fieldValues }, hasError ? { ...this.state.fieldErrors } : null);
    }

    render() {
        const { props } = this;
        const classes = props.classes;
        return (
            <Dialog
                open={props.open}
                onClose={props.onClose}
                maxWidth="md"
                style={{display: props.hide? 'none': 'block'}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                    {console.log("Field Values",this.state.fieldValues)}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <DialogContent style={{ overflowX: 'hidden' }}>
                        <div style={{ width: 500 }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }} className="mb-4">
                                <Typography variant="h6" className={classes.modalTitle}>{props.title}{props.info && <Link to={props.info}><HelpIcon color="primary" style={{ width: 18, height: 18, marginLeft: 5 }} /></Link>}</Typography>
                                <Typography variant="body2" className={classes.modalDesc}>{props.description}</Typography>
                                {props.notes ? <span dangerouslySetInnerHTML={{ __html: props.notes }} style={{ marginTop: 12, fontSize: 13, color: "#645f5f" }} /> : null}
                            </div>
                            <FieldsLayout
                                fields={props.fields}
                                values={props.values}
                                fieldValues={this.state.fieldValues}
                                fieldErrors={this.state.fieldErrors}
                                validate={this.validate.bind(this)}
                                onChange={this.handleFieldChange.bind(this)}
                                mode={props.mode}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions className={classes.modalActions}>
                        <div>
                            {
                                props.extraButtonText ? (
                                    <Button onClick={() => {
                                        props.onExtraButton();
                                    }} variant="outlined" color="primary1" >
                                        {props.extraButtonLoading ? <CircularProgress size={16} style={{ marginLeft: 0 }} className="mr-2" /> : null} {props.extraButtonText}
                                    </Button>
                                ) : props.extraComponent ? props.extraComponent : null
                            }
                        </div>
                        <div>
                            {
                                props.closable ? (
                                    <Button onClick={() => {
                                        props.onClose();
                                        this.setState({ fieldValues: {} })
                                    }} variant="outlined" color="primary" className="mr-2">
                                        {props.cancelText}
                                    </Button>
                                ) : null
                            }
                            
                            <Button type="submit" disabled={props.submitButtonDisabled} variant="contained" color="primary" autoFocus>
                                {props.okText}
                            </Button>
                        </div>
                    </DialogActions>
                </form>
            </Dialog>
        )
    }
};

CrudDialog.defaultProps = {
    onRef: () => { },
    open: false,
    fields: [],
    onClose: () => { },
    submitButtonDisabled:false,
    onFieldChange: () => { },
    title: "Dialog Title",
    onSubmit: () => { },
    values: {},
    okText: 'Create',
    cancelText: 'Cancel',
    info: false,
    mode: "Add",
    closable: true,
    extraButtonLoading: false,
    hide: false
};
export default withStyles(styles)(CrudDialog);