import React, {useEffect} from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function MultiAutoComplete({ field = {}, values = {}, onChange = () => { }, ...props }) {
  let _value = props.fieldValues[field.key] || values[field.key];

  let defaultValue = field.options.filter(x => (field.value || _value || []).includes(x.value));

  useEffect(() => {
    if(!field.show) {
      onChange(field, null);
    }
  }, [field.show]);

  return (
    <Autocomplete
      multiple
      id="checkboxes-autocomplete"
      disableCloseOnSelect
      options={field.options}
      onChange={(e, val = []) => {
          onChange(field, val.map(x => x.value));
      }}
      defaultValue={defaultValue}
      limitTags={2}
      getOptionLabel={option => option.label}
      disabled={field.disabled}
      style={{display: field.show? 'block': 'none'}}
      renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              variant="outlined"
              label={option.label}
              size="small"
              {...getTagProps({ index })}
            />
          ))
      }
      renderInput={params => (
        <TextField {...params} style={{fontSize: '0.5rem'}} variant="outlined" label={field.label} placeholder={field.label} />
      )}
    />
  );
}