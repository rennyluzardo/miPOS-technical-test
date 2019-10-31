import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider } from 'antd'
import moment from 'moment'
import { validateForm } from '../lib/formValidator'

// Actions
import { fetchCashOpeningInfo } from '../actions/cashOpening'
import { fetchCashClosingInfo } from '../actions/cashClosing'
// Components
import MainLayout from '../components/layouts/MainLayout'
import Datepicker from '../components/global/Datepicker'
import Input from '../components/global/Input'
import GroupedInputs from '../components/global/GroupedInputs'

class Index extends Component {

    state = {
        openingForm: {
            date_open: null,
            hour_open: null,
            value_previous_close: null,
            value_open: null,
            observation: null
        },
        closingForm: {
            date_close: moment(),
            hour_close: moment().format("hh:mm"),
            value_close: null,
            value_card: null,
            value_sales: null, // close + card
            expenses: [],
            value_open: null, // res.value
            value_cash: null, // res.close + res.value
            totalClosing: null, // res.close + res.value - (todos los valores de los gastos)

        },
        loading: false,
        closingLoading: false,
        errors: []
    }

    openingFormRules = {
        hour: [
            'hour_open'
        ],
        required: [
            'value_previous_close',
            'observation'
        ]
    }

    componentDidMount() {
        this.props.fetchCashOpeningInfo().then(res => {
            const openingForm = this.state.openingForm
            openingForm['date_open'] = moment(res.results.date_open, 'YYYY/MM/DD')
            openingForm['hour_open'] = moment(res.results.hour_open, 'HH:mm:ss').format("hh:mm");
            openingForm['value_previous_close'] = res.results.value_previous_close
            openingForm['value_open'] = res.results.value_open
            openingForm['observation'] = res.results.observation

            if (res.status === 'Success') {
                const closingForm = this.state.closingForm
                this.setState({ openingForm })

                this.props.fetchCashClosingInfo().then(res => {
                    if (res.msg === 'Success') {
                        closingForm['value_close'] = res.close + res.value
                        closingForm['value_card'] = res.card
                        closingForm['value_sales'] = res.close + res.card
                        closingForm['value_open'] = res.value
                        closingForm['value_cash'] = res.close
                        this.setState({ closingForm })
                    }
                })
            }
        })
    }

    validateOpeningForm = () => {
        const errors = validateForm(this.state.openingForm, this.openingFormRules)
        this.setState({ errors })
        return !Object.keys(errors).length
    }

    handleOpeningDate = date => {
        const openingForm = this.state.openingForm
        openingForm['date_open'] = date
        this.setState({ openingForm })
    }

    handleClosingDate = date => {
        const closingForm = this.state.closingForm
        closingForm['date_close'] = date
        this.setState({ closingForm })
    }

    handleChangeInput = (input, value) => {
        const openingForm = this.state.openingForm
        openingForm[input] = value.target.value
        this.setState({ openingForm })
    }

    handleOpeningFormSubmit = () => {
        if (this.validateOpeningForm()) {
            this.setState({ loading: true })

        }
    }

    render() {
        const mainLayoutProps = {
            leftTitle: 'Apertura de caja',
            rightTitle: 'Cierre de caja'
        }

        const datePickerOpenProps = {
            onChange: this.handleOpeningDate,
            label: "Fecha",
            placeholder: "yyyy/mm/dd",
            value: this.state.openingForm.date_open,
            defaultValue: this.state.openingForm.date_open,
            disabled: !!this.state.openingForm.date_open
        }

        const datePickerCloseProps = {
            onChange: this.handleClosingDate,
            label: "Fecha",
            placeholder: "yyyy/mm/dd",
            value: this.state.closingForm.date_close,
            defaultValue: this.state.closingForm.date_close,
            disabled: !!this.state.closingForm.date_close
        }

        const hourInputProps = {
            label: "Hora",
            placeholder: "hh:mm",
            onChangeInput: value => this.handleChangeInput('hour_open', value),
            value: this.state.openingForm.hour_open,
            error: this.state.errors.hour_open,
            disabled: !!this.state.openingForm.hour_open
        }

        const previousCloseInputProps = {
            label: "Total anterior",
            onChangeInput: value => this.handleChangeInput('value_previous_close', value),
            value: this.state.openingForm.value_previous_close,
            error: this.state.errors.value_previous_close,
            disabled: !!this.state.openingForm.value_previous_close || typeof this.state.openingForm.value_previous_close === 'number'
        }

        const valueOpenInputProps = {
            label: "Total inicial",
            onChangeInput: value => this.handleChangeInput('value_open', value),
            value: this.state.openingForm.value_open,
            error: this.state.errors.value_open,
            disabled: !!this.state.openingForm.value_open || typeof this.state.openingForm.value_open === 'number'
        }

        const openingSendBtnProps = {
            className: "action-container--btn",
            type: "primary",
            loading: this.state.loading,
            onClick: this.handleOpeningFormSubmit
        }

        const currentHourInputProps = {
            label: "Hora",
            placeholder: "hh:mm",
            onChangeInput: value => this.handleChangeInput('hour_close', value),
            value: this.state.closingForm.hour_close,
            error: this.state.errors.hour_close,
            disabled: !!this.state.closingForm.hour_close
        }

        const valueCashInputProps = {
            label: "Ventas en efectivo",
            onChangeInput: value => this.handleChangeInput('value_cash', value),
            value: this.state.closingForm.value_cash,
            error: this.state.errors.value_cash,
            disabled: !!this.state.closingForm.value_cash
        }

        const valueCardInputProps = {
            label: "Ventas por tarjeta",
            onChangeInput: value => this.handleChangeInput('value_card', value),
            value: this.state.closingForm.value_card,
            error: this.state.errors.value_card,
            disabled: !!this.state.closingForm.value_card
        }

        const valueSalesInputProps = {
            label: "Total en ventas",
            onChangeInput: value => this.handleChangeInput('value_sales', value),
            value: this.state.closingForm.value_sales,
            error: this.state.errors.value_sales,
            disabled: !!this.state.closingForm.value_sales
        }

        const valueOpeningInputProps = {
            label: "Total apertura",
            onChangeInput: value => this.handleChangeInput('value_open', value),
            value: this.state.closingForm.value_open,
            error: this.state.errors.value_open,
            disabled: !!this.state.closingForm.value_open
        }

        const valueCloseInputProps = {
            label: "Total de caja",
            onChangeInput: value => this.handleChangeInput('value_close', value),
            value: this.state.closingForm.value_close,
            error: this.state.errors.value_close,
            disabled: !!this.state.closingForm.value_close
        }

        return (
            <MainLayout {...mainLayoutProps} >
                <div className="top__container__content-left">
                    <GroupedInputs side="left">
                        <Datepicker {...datePickerOpenProps} />
                        <Input {...hourInputProps} />
                    </GroupedInputs>
                    <GroupedInputs side="left">
                        <Input {...previousCloseInputProps} />
                        <Input {...valueOpenInputProps} />
                    </GroupedInputs>
                    <GroupedInputs qty={1} side="left">
                        <Input label="Observaciones" type="textarea" />
                    </GroupedInputs>
                    {
                        this.state.openingForm.value_open === null &&
                        <div className="action-container">
                            <Button {...openingSendBtnProps}>Enviar</Button>
                        </div>
                    }
                </div>
                <Divider type="vertical" className="separator" />
                <div className="top__container__content-right">
                    {
                        !!this.props.cashOpeningInfo && !!this.props.cashOpeningInfo.results && typeof this.props.cashOpeningInfo.results.value_open === 'number'
                            ? <div>
                                <GroupedInputs side="right">
                                    <Datepicker {...datePickerCloseProps} />
                                    <Input {...currentHourInputProps}label="Hora" placeholder="hh:mm" />
                                </GroupedInputs>
                                <GroupedInputs side="right">
                                    <Input {...valueCashInputProps}/>
                                    <Input {...valueCardInputProps}/>
                                </GroupedInputs>
                                <GroupedInputs side="right">
                                    <Input {...valueSalesInputProps}/>
                                    <Input {...valueOpeningInputProps}/>
                                </GroupedInputs>
                                <GroupedInputs qty={1} side="right">
                                    <Input {...valueCloseInputProps}/>
                                </GroupedInputs>
                                <div className="action-container">
                                    <Button className="action-container--btn" type="primary">Agregar gasto</Button>
                                </div>
                                <div className="action-container">
                                    <Button className="action-container--btn" type="primary" loading={this.state.closingLoading}>Cerrar caja con $1.00</Button>
                                </div>
                            </div>
                            : 'No se puede mostrar esta informacion.'
                    }
                </div>
            </MainLayout>
        )
    }
}

export default connect(
    state => ({
        cashOpeningInfo: state.cashOpening.cashOpeningData
    }),
    {
        fetchCashOpeningInfo,
        fetchCashClosingInfo
    }
)(Index)
