import React, { Component } from 'react'
import { connect } from 'react-redux'

// Actions
import { fetchCashOpeningInfo } from '../actions/cashOpening'
// Components
import MainLayout from '../components/layouts/MainLayout'

class Index extends Component {

    componentDidMount() {
        this.props.fetchCashOpeningInfo()
    }

    render() {
        const mainLayoutProps = {
            leftTitle: 'Apertura',
            rightTitle: 'Cierre'
        }

        return (
            <MainLayout { ...mainLayoutProps }>
                <div className="content-left">Left Form</div>
                <div className="content-right">Cierre de Caja</div>
            </MainLayout>
        )
    }
}

export default connect(
    state => ({

    }),
    {
        fetchCashOpeningInfo
    }
)(Index)