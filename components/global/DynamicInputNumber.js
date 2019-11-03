import React from 'react'
import { InputNumber as Input } from 'antd'
import PropTypes from 'prop-types'

const DynamicInputNumber = props => (
    <div className="input-container">
        <h5>{props.label}</h5>
        <Input
            className="input-number"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled}
            formatter={props.formatter}
            parser={props.parser}
            defaultValue={0} />
        {!!props.error && <p className="error-text">{props.error}</p>}
    </div>
)

DynamicInputNumber.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string
}

export default DynamicInputNumber