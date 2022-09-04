import { Checkbox, FormControlLabel } from '@mui/material'
import React from 'react'

type propTypes = {
    required?: boolean;
    className?: string
    id?: string;
    label: string;
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputProps?: any;
    extraProps?: any;
    placement?: "start" | "end" | "top" | "bottom";
}

export default function CheckBoxLabelComponent(props: propTypes) {
    return (
        <FormControlLabel
            value={props.value}
            className={props.className}
            name={props.name}
            control={<Checkbox onChange={props.onChange} inputProps={props.inputProps} required={props.required} {...props.extraProps} />}
            label={props.label}
            labelPlacement={props.placement}
        />
    )
}
