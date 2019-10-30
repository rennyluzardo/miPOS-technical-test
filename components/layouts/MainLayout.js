import React, { Component } from 'react'
import '../../scss/styles.scss'

export default class MainLayout extends Component {
    render() {
        return (
            <div className="top__container">
                <div className="top__container__titles-box">
                    <div className="top__container__titles-box--left">Apertura</div>
                    <div className="top__container__titles-box--right">Cierre</div>
                </div>
                <div className="top__container__content-box">{ this.props.children }</div>
            </div>
        )
    }
}
