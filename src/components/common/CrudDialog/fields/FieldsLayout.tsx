import Grid from "@mui/material/Grid";
import { Text, AutoCompleteBox } from "./index";

const FIELD_COMPONENTS = {
  autocomplete: AutoCompleteBox,
  // multiAutoComplete: MultiAutoComplete,
  text: Text,
  email: Text,
  password: Text,
  tel: Text,
  number: Text,
  // multiSelect:FilterSelect,
  // date: DatePicker,
  // select: SelectField,
  // checkbox: CheckboxField,
  // radio: RadioSelect,
  // file: File,
};
// '{ fields: any[]; values: {}; fieldValues: any; onChange: (field: any, value: any) => void; mode: string; }
const FieldsLayout = ({
  fields,
  fieldValues,
  onChange,
  values,
  mode,
}: {
  fields?: any[];
  fieldValues: any;
  values: any;
  mode: any;
  onChange: (field: any, value: any) => void;
}) => {
  return (
    <>
      {fields.map((field, index) => {
        if (Array.isArray(field)) {
          return (
            <Grid container spacing={2} pt={0.5} key={index}>
              {field.map((_field, _index) => {
                if (_field.form === false) return null;
                const FieldComponent = FIELD_COMPONENTS[_field.type] || Text;

                if (_field.type === "checkbox") {
                  return (
                    <Grid item xs p={1}>
                      <FieldComponent
                        key={_index}
                        field={{ ..._field, value: fieldValues.is_open }}
                        fieldValues={fieldValues}
                        // fieldErrors={fieldErrors}
                        // validate={validate}
                        onChange={onChange}
                      />
                    </Grid>
                  );
                }
                return (
                  <Grid key={_index} item xs p={1}>
                    <FieldComponent
                      key={_index}
                      field={_field}
                      values={values}
                      fieldValues={fieldValues}
                      // fieldErrors={fieldErrors}
                      // validate={validate}
                      onChange={onChange}
                      mode={mode}
                    />
                  </Grid>
                );
              })}
            </Grid>
          );
        } else {
          if (field.form === false) return null;
          const FieldComponent = FIELD_COMPONENTS[field.type] || Text;
          return (
            <Grid container key={index} pt={2}>
              <Grid item xs={12} md={12}>
                <FieldComponent
                  key={index}
                  field={field}
                  values={values}
                  fieldValues={fieldValues}
                  // fieldErrors={fieldErrors}
                  // validate={validate}
                  onChange={onChange}
                  mode={mode}
                />
              </Grid>
            </Grid>
          );
        }
      })}
    </>
  );
};

export default FieldsLayout;
