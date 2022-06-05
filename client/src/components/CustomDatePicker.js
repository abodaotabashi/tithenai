import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../assets/styles.css';

const CustomDatePicker = (props) => {
    const { label, value, onChange, max, min, isRequired, views, format, disable} = props;
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label}
                color="secondary"
                value={value}
                disabled={typeof(disable) !== "undefined" ? disable : false}
                onChange={onChange}
                views={(views !== null) ? views : ["year", "month", "day"]}
                disableFuture
                inputFormat={(format !== null) ? format : "dd/MM/yyyy"}
                minDate={typeof(min) !== "undefined" ? min : undefined}
                maxDate={typeof(max) !== "undefined" ? max : undefined}
                renderInput={(params) =>
                    <TextField
                        required={isRequired ? true : false}
                        color="secondary"
                        style={{width: "100%"}}
                        {...params} />
                }
            />
        </LocalizationProvider>
    )
}

export default CustomDatePicker;