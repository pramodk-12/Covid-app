import React, { useContext } from "react"
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import "./Date.css"
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import { StateContext } from "../Context/Contextprovider";

function DateComponent() {
    const context = useContext(StateContext)
    const [selectedDate, setSelectedDate] = React.useState(context.date);
    const maxDate = moment().subtract(2, 'days').format('YYYY-MM-DD')

    const handleDateChange = (date) => {
      setSelectedDate(date);
      context.setDate(moment(date).format('YYYY-MM-DD'))
    };

    return (
        <div className="datediv" >
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    className= "custom-date"
                    disableToolbar
                    variant="inline"
                    format="MMM Do YY"
                    margin="normal"
                    maxDate={maxDate}
                    id="date-picker-inline"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>    
        </div>
    )
}

export default DateComponent