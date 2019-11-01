import React, { Component } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { validateForm } from '../../lib/formValidator'
import { centsToDollar, dollarsToCents } from '../../lib/utils'
// Components
import Input from './Input'
import GroupedInputs from './GroupedInputs'
import InputNumber from './InputNumber'

class ClosingForm extends Component {
    state = {
        initialMessage: {
            type: '',
            duration: 0,
            text: ''
        },
        closingForm: {
            date_close: moment().format('YYYY/MM/DD'),
            hour_close: moment().format("hh:mm:ss"),
            value_close: null,
            value_card: null,
            value_sales: null, // close + card
            expenses: [],
            value_open: null, // res.value
            value_cash: null, // res.close + res.value
            totalClosing: null, // res.close + res.value - (todos los valores de los gastos)
        },
        openingForm: {

        },
        expensesForm: {
            name: '',
            value: null
        },
        errors: [],
        closingLoading: false
    }

    closingFormRules = {
        required: [
            'value_close',
            'value_card',
            'value_sales',
            'value_open',
            'value_cash'
        ]
    }

    componentDidMount() {
        const closingForm = this.state.closingForm

        this.props.fetchCashClosingInfo().then(res => {
            if (res.msg === 'Success') {
                closingForm['value_close'] = centsToDollar(res.close) + centsToDollar(res.value)
                closingForm['value_card'] = centsToDollar(res.card)
                closingForm['value_sales'] = centsToDollar(res.close) + centsToDollar(res.card)
                closingForm['value_open'] = centsToDollar(res.value)
                closingForm['value_cash'] = centsToDollar(res.close)
                this.setState({ closingForm })
            }
        })
    }


    validateClosingForm = () => {
        const errors = validateForm(this.state.closingForm, this.closingFormRules)
        this.setState({ errors })
        return !Object.keys(errors).length
    }

    handleClosingDate = date => {
        const closingForm = this.state.closingForm
        closingForm['date_close'] = date
        this.setState({ closingForm })
    }

    handleChangeInput = (input, event) => {
        const openingForm = this.state.openingForm
        openingForm[input] = input !== 'value_open' ? event.target.value : event
        this.setState({ openingForm })
    }


    handleClosingFormSubmit = () => {
        this.props.setMessage(this.state.initialMessage)
        const successMessage = {
            duration: 3,
            txt: "Caja cerrada!",
            type: 'success'
        }

        if (this.validateClosingForm()) {
            this.setState({ closingLoading: true })
            const form = this.state.closingForm
            form['value_close'] = dollarsToCents(form['value_close'])
            form['value_card'] = dollarsToCents(form['value_card'])
            form['value_sales'] = dollarsToCents(form['value_sales'])
            form['value_open'] = dollarsToCents(form['value_open'])
            form['value_cash'] = dollarsToCents(form['value_cash'])

            this.props.addCashClosing(form).then(res => {
                this.setState({ closingLoading: false })
                this.props.setMessage(successMessage)
                this.props.fetchCashOpeningInfo()
            })
        }
    }

    render() {
        const datePickerCloseProps = {
            onChange: this.handleClosingDate,
            label: "Fecha",
            placeholder: "yyyy/mm/dd",
            value: this.state.closingForm.date_close,
            defaultValue: this.state.closingForm.date_close,
            disabled: !!this.state.closingForm.date_close
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
            onChange: value => this.handleChangeInput('value_cash', value),
            value: this.state.closingForm.value_cash,
            error: this.state.errors.value_cash,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const valueCardInputProps = {
            label: "Ventas por tarjeta",
            onChange: value => this.handleChangeInput('value_card', value),
            value: this.state.closingForm.value_card,
            error: this.state.errors.value_card,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }
        const valueSalesInputProps = {
            label: "Total en ventas",
            onChange: value => this.handleChangeInput('value_sales', value),
            value: this.state.closingForm.value_sales,
            error: this.state.errors.value_sales,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const valueOpeningInputProps = {
            label: "Total apertura",
            onChange: value => this.handleChangeInput('value_open', value),
            value: this.state.closingForm.value_open,
            error: this.state.errors.value_open,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const valueCloseInputProps = {
            label: "Total de caja",
            onChange: value => this.handleChangeInput('value_close', value),
            value: this.state.closingForm.value_close,
            error: this.state.errors.value_close,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        return (
            <div>
                <GroupedInputs side="right">
                    <Input {...datePickerCloseProps} />
                    <Input {...currentHourInputProps} />
                </GroupedInputs>
                <GroupedInputs side="right">
                    <InputNumber {...valueCashInputProps} />
                    <InputNumber {...valueCardInputProps} />
                </GroupedInputs>
                <GroupedInputs side="right">
                    <InputNumber {...valueSalesInputProps} />
                    <InputNumber {...valueOpeningInputProps} />
                </GroupedInputs>
                <GroupedInputs qty={1} side="right">
                    <InputNumber {...valueCloseInputProps} />
                </GroupedInputs>
                <div className="action-container">
                    <Button className="action-container--btn" type="primary">Agregar gasto</Button>
                </div>
                <div className="action-container">
                    <Button
                        className="action-container--btn"
                        type="primary"
                        loading={this.state.closingLoading}
                        onClick={this.handleClosingFormSubmit}>Cerrar caja con $1.00</Button>
                </div>
            </div>
        )
    }

}

export default ClosingForm