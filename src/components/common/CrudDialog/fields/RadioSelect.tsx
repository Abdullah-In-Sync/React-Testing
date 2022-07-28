import React, { useState } from 'react';
import {FormControlLabel, Radio, RadioGroup} from "@mui/material/index";

const RadioSelect = ({field , onChange }) => {
    const [type, setType] = useState((field.options[0] || {}).value);

    const handleTypeChange = ({target}) => {
        setType(target.value);
        onChange(field, target.value);
    };

    return (
        <RadioGroup row aria-label="sensor" name="sensor" value={type} onChange={handleTypeChange}>
            {
                (field.options || []).map((val,index) => {
                    return (
                        <FormControlLabel key={index} style={{height: 30, flex: 1}} value={val.value} control={<Radio color="primary" />} label={val.label} />
                    )
                })
            }
        </RadioGroup>
    )
};



export default RadioSelect;