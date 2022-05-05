import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import '../assets/styles.css';

const DatePicker = (props) => {
    const { label, value, onChange, max, min, isRequired, views, format, disable} = props;
    return(
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="normal"
                views={(views !== null) ? views : ["year", "month", "date"]}
                label={label}
                required={isRequired ? true : false}
                inputVariant="outlined"
                format={(format !== null) ? format : "dd/MM/yyyy"}
                value={value}
                onChange={onChange}
                disabled={typeof(disable) !== "undefined" ? disable : false}
                style={{width: "100%"}}
                minDate={typeof(min) !== "undefined" ? min : undefined}
                maxDate={typeof(max) !== "undefined" ? max : undefined}
                />
        </MuiPickersUtilsProvider>
    );
}

export default DatePicker;