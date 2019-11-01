import React from 'react'

const GroupedInputs = props => {
    return (
        <div className={`top__container__content-${props.side}--${props.qty === 1 ? 'grouped-inputs-1' : 'grouped-inputs'}`}>
            {props.children}
        </div>
    )
}

export default GroupedInputs