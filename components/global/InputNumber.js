import React from 'react'
import { InputNumber as Input } from 'antd'
import PropTypes from 'prop-types'

const InputNumber = props => (
    <div className="input-container">
        <h5>{props.label}</h5>
        <Input
            className="input-number"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChangeInput}
            disabled={props.disabled}
            formatter={props.formatter}
            parser={props.parser} />
        {!!props.error && <p className="error-text">{props.error}</p>}
    </div>
)

InputNumber.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string
}

export default InputNumber