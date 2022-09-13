import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress } from '@mui/material';

export default function AsyncAutoComplete({
    onChange,
    value,
    options,
    required,
    label,
    loading,
}) {
    return (
        <Autocomplete
            id="filter-issue"
            getOptionLabel={(option) => option.label}
            size="small"
            options={options}
            onChange={(__, val) => onChange(val)}
            value={value}
            disableClearable={true}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    fullWidth
                    required={required}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}
