import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'

const DynamicInputText = props => (
    <div className="input-container">
        <h5>{props.label}</h5>
        <Input
            placeholder={props.placeholder}
            value={props.value}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            disabled={props.disabled}
            formatter={props.formatter}
            parser={props.parser} />
        {!!props.error && <p className="error-text">{props.error}</p>}
    </div>
)

DynamicInputText.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
}

export default DynamicInputText