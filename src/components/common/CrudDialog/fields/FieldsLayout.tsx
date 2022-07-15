import React from 'react';
import Grid from '@mui/material/Grid';
import { Text, SelectField, Checkbox, ImageUp, RadioSelect, File, AutoCompleteBox, MultiAutoComplete,FilterSelect } from './index';

const FIELD_COMPONENTS = {
    autocomplete: AutoCompleteBox,
    multiAutoComplete: MultiAutoComplete,
    text: Text,
    email: Text,
    password: Text,
    tel: Text,
    number: Text,
    multiSelect:FilterSelect,
    // date: DatePicker,
    select: SelectField,
    checkbox: Checkbox,
    image: ImageUp,
    radio: RadioSelect,
    file: File,
};

const FieldsLayout = ({
    fields = [],
    fieldValues,
    fieldErrors,
    validate,
    onChange,
    values,
    mode
}) => {
    return (
        fields.map((field, index) => {
            if (Array.isArray(field)) {

                return (
                    //
                    //     <Grid container pt={0.5} key={index}>
                    //     <Grid item xs={12} md={9} >
                    //         1
                    //     </Grid>
                    //     <Grid item xs={12} md={3} style={{ textAlign: 'right', paddingRight: '40px' }}>
                    //         © {new Date().getFullYear()} MyHelp
                    //     </Grid>
                    // </Grid>
                    //
                    <Grid container spacing={2} pt={0.5} key={index}>
                        {
                            field.map((_field, _index) => {
                                if (_field.form === false) return null;
                                const FieldComponent = FIELD_COMPONENTS[_field.type] || Text;
                                
                                if (_field.type === 'checkbox') {
                                    return <Grid item xs p={1}>
                                        <FieldComponent
                                            field={{ ..._field, value: fieldValues.is_open }}
                                            fieldValues={fieldValues}
                                            fieldErrors={fieldErrors}
                                            validate={validate}
                                            onChange={onChange}
                                           

                                        />
                                    </Grid>
                                }
                                return <Grid item xs p={1}>
                                    <FieldComponent
                                        field={_field}
                                        values={values}
                                        fieldValues={fieldValues}
                                        fieldErrors={fieldErrors}
                                        validate={validate}
                                        onChange={onChange}
                                        mode={mode}
                                    />
                                </Grid>
                            })
                        }
                    </Grid>
                )
            } else {
                if (field.form === false) return null;
                const FieldComponent = FIELD_COMPONENTS[field.type] || Text;
                return (
                    <Grid container key={index} pt={2}>
                        <Grid item xs={12} md={12}>
                            <FieldComponent
                                field={field}
                                values={values}
                                fieldValues={fieldValues}
                                fieldErrors={fieldErrors}
                                validate={validate}
                                onChange={onChange}
                                mode={mode}
                            />
                        </Grid>
                    </Grid>
                )
            }
        })
    )
};

export default FieldsLayout;