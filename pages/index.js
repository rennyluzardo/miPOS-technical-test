import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, message } from 'antd'
// Actions
import { fetchCashOpeningInfo, addCashOpening } from '../actions/cashOpening'
import { fetchCashClosingInfo, addCashClosing } from '../actions/cashClosing'
import { setMessage } from '../actions/global'
// Components
import MainLayout from '../components/layouts/MainLayout'
import ClosingForm from '../components/global/ClosingForm'
import OpeningForm from '../components/global/OpeningForm'

class Index extends Component {

    state = {
        loading: false
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.message !== nextProps.message) {
            if (nextProps.message.type === 'success') {
                message.success(nextProps.message.txt, nextProps.message.duration)
            }
            if (nextProps.message.type === 'error') {
                message.error(nextProps.message.txt, nextProps.message.duration)
            }
            if (nextProps.message.type === 'warning') {
                message.warning(nextProps.message.txt, nextProps.message.duration)
            }
        }
    }

    render() {
        const mainLayoutProps = {
            leftTitle: 'Apertura de caja',
            rightTitle: 'Cierre de caja'
        }

        return (
            <MainLayout {...mainLayoutProps} >
                <div className="top__container__content-left">
                    <OpeningForm
                        fetchCashOpeningInfo={() => this.props.fetchCashOpeningInfo()}
                        cashOpeningInfo={this.props.cashOpeningInfo}
                        addCashOpening={form => this.props.addCashOpening(form)}
                        setMessage={this.props.setMessage} />
                </div>
                <Divider type="vertical" className="separator" />
                <div className="top__container__content-right">
                    {
                        !!this.props.cashOpeningInfo &&
                            !!this.props.cashOpeningInfo.results &&
                            typeof this.props.cashOpeningInfo.results.value_open === 'number' &&
                            this.props.cashOpeningInfo.results.value_open !== null
                            ? <ClosingForm
                                cashOpeningInfo={this.props.cashOpeningInfo}
                                fetchCashClosingInfo={() => this.props.fetchCashClosingInfo()}
                                addCashClosing={this.props.addCashClosing}
                                fetchCashOpeningInfo={() => this.props.fetchCashOpeningInfo()}
                                setMessage={this.props.setMessage} />
                            : 'No se puede mostrar esta informacion.'
                    }
                </div>
            </MainLayout>
        )
    }
}

export default connect(
    state => ({
        cashOpeningInfo: state.cashOpening.cashOpeningData,
        message: state.global.message
    }),
    {
        fetchCashOpeningInfo,
        fetchCashClosingInfo,
        addCashOpening,
        addCashClosing,
        setMessage
    }
)(Index)
