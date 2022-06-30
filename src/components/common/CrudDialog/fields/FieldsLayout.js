import React from 'react';
import { Text, SelectField, Checkbox, ImageUp, RadioSelect, File, AutoCompleteBox, DatePicker, MultiAutoComplete } from '.';

const FIELD_COMPONENTS = {
    autocomplete: AutoCompleteBox,
    multiAutoComplete: MultiAutoComplete,
    text: Text,
    email: Text,
    password: Text,
    tel: Text,
    number: Text,
    date: DatePicker,
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
                    <div className="row" key={index}>
                        {
                            field.map((_field, _index) => {
                                if(_field.form === false) return null;
                                const FieldComponent = FIELD_COMPONENTS[_field.type] || Text;
                                if(_field.type === 'checkbox'){
                                    return <div className="col-sm">
                                        <FieldComponent
                                            field={{..._field, value: fieldValues.is_open}}
                                            fieldValues={fieldValues}
                                            fieldErrors={fieldErrors}
                                            validate={validate}
                                            onChange={onChange}
                                        />
                                    </div>
                                }
                                return <div className="col-sm">
                                    <FieldComponent
                                        field={_field}
                                        values={values}
                                        fieldValues={fieldValues}
                                        fieldErrors={fieldErrors}
                                        validate={validate}
                                        onChange={onChange}
                                       mode={mode}
                                    />
                                </div>
                            })
                        }
                    </div>
                )
            } else {
                if(field.form === false) return null;
                const FieldComponent = FIELD_COMPONENTS[field.type] || Text;
                return (
                    <div className="row" key={index}>
                        <div className="col-sm">
                            <FieldComponent
                                field={field}
                                values={values}
                                fieldValues={fieldValues}
                                fieldErrors={fieldErrors}
                                validate={validate}
                                onChange={onChange}
                                mode={mode}
                            />
                        </div>
                    </div>
                )
            }
        })
    )
};

export default FieldsLayout;