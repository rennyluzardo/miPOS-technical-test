import React from 'react'
import '../../scss/styles.scss'

const MainLayout = props => {
    return (
        <div className="top__container">
            <div className="top__container__titles-box">
                <div className="top__container__titles-box--left">{props.leftTitle}</div>
                <div className="top__container__titles-box--right">{props.rightTitle}</div>
            </div>
            <div className="top__container__content-box">{props.children}</div>
        </div>
    )
}

export default MainLayout