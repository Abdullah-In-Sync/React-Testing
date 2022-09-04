import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

type propTypes = {
    required?: boolean;
    fullWidth?: boolean;
    className?: string
    id: string;
    labelId: string;
    label: string;
    name: string;
    value: string;
    onChange?: (event: React.ChangeEvent<HTMLElement>) => void;
    inputProps?: any;
    extraProps?: any;
    options: Option[];
    mappingKeys: [string, string];
}

type Option = {
    id: string;
    value: string;
}

const mapping = (options: Option[], keys = []) => {
    
    return options.reduce((mappingOptions: Option[], option) => {
        mappingOptions.push({ id: option[keys[0]], value: option[keys[1]] })
        return mappingOptions;
    }, [])
}

export default function SingleSelectComponent(props: propTypes) {
    return (
        <FormControl fullWidth={props.fullWidth} required={props.required}>
            <InputLabel id={props.labelId}>{props.label}</InputLabel>
            <Select
                labelId={props.labelId}
                id={props.id}
                name={props.name}
                value={props.value}
                label={props.label}
                onChange={props.onChange}
                inputProps={props.inputProps}
                { ...props.extraProps }
            >
                <MenuItem value="">Select</MenuItem>
                {
                    mapping(props.options, props.mappingKeys).map(({id, value}) => {
                        return (<MenuItem key={`${id}-${value}`} value={id}>{value}</MenuItem>)
                   })
                }
            </Select>
        </FormControl>
    )
}
