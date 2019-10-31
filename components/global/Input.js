import React from 'react'
import { Input } from 'antd'
import PropTypes from 'prop-types'
const { TextArea } = Input

const InputText = props => (
    <div className="input-container">
        <h5>{props.label}</h5>
        {
            props.type !== 'textarea'
                ? <Input
                    placeholder={props.placeholder}
                    value={props.value}
                    onChange={props.onChangeInput}
                    disabled={props.disabled} />
                : <TextArea rows={4} onChange={props.onChangeInput} />
        }

        {!!props.error && <p className="error-text">{props.error}</p>}
    </div>
)

InputText.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string
}

export default InputText