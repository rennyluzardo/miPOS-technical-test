import React from 'react'
import { DatePicker } from 'antd'

const Datepicker = props => {
    return (
        <div className="datepicker">
            <h5>{props.label}</h5>
            <DatePicker
                onChange={props.onChange}
                placeholder={props.placeholder}
                value={props.value}
                defaultValue={props.defaultValue}
                disabled={props.disabled}/>
        </div>
    )
}

export default Datepicker