
import React from 'react';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const DatePicker = ({fieldValues = {}, field = {}, onChange = () => {}}) => {

    const isValidDate = (d) => {
        return d instanceof Date && !isNaN(d);
    }

    const handleDateChange = date => {
        if(isValidDate(date)){
            onChange(field, moment(date).format('YYYY-MM-DD'));
        }
    };

    return (
        <>
            <div className="inputDatePicker">
                <ReactDatePicker
                    selected={isValidDate(new Date(fieldValues[field.key]))? new Date(fieldValues[field.key]) : ""}
                    onChange={handleDateChange}
                    className="mb-3"
                    dateFormat={"dd-MM-yyyy"}
                    popperModifiers={{
                        offset: {
                            enabled: true,
                            offset: '5px, 10px'
                        },
                    }}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText={field.label? field.label : "DD-MM-YYYY"}
                />
            </div>
        </>
    )
}

export default DatePicker;