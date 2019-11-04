import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import moment from 'moment'
import { validateForm } from '../../lib/formValidator'
import { dollarsToCents } from '../../lib/utils'
import _ from 'lodash'
// Components
import Input from './Input'
import GroupedInputs from './GroupedInputs'
import InputNumber from './InputNumber'
import DynamicInputText from './DynamicInputText'
import DynamicInputNumber from './DynamicInputNumber'

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
        },
        openingForm: {

        },
        expensesForm: [{
            name: '',
            value: '0'
        }],
        expensesDynamicForm: [],
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

    dynamicExpensesRules = {
        required: [
            'name',
            'value'
        ]
    }

    componentDidMount() {
        const closingForm = this.state.closingForm

        this.props.fetchCashClosingInfo().then(res => {
            if (res.msg === 'Success') {
                closingForm['value_close'] = parseInt(res.close) + parseInt(res.value)
                closingForm['value_card'] = parseInt(res.card)
                closingForm['value_sales'] = parseInt(res.close) + parseInt(res.card)
                closingForm['value_open'] = parseInt(res.value)
                closingForm['value_cash'] = parseInt(res.close)

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

    handleOnChangeInput = (input, event) => {
        const closingForm = this.state.closingForm
        closingForm[input] = input !== 'value_open' ? event.target.value : event
        this.setState({ closingForm })
    }


    handleClosingFormSubmit = () => {
        this.props.setMessage(this.state.initialMessage)
        const message = {
            duration: 3,
            txt: "",
            type: "success"
        }

        if (this.validateClosingForm()) {
            this.setState({ closingLoading: true })

            const form = Object.assign({}, this.state.closingForm)
            form.value_close = dollarsToCents(form.value_close)
            form.value_open = dollarsToCents(form.value_open)
            form.value_card = dollarsToCents(form.value_card)
            form.value_cash = dollarsToCents(form.value_cash)
            form.value_sales = dollarsToCents(form.value_sales)
            form.expenses = this._expensesTransform()

            this.props.addCashClosing(form).then(res => {
                this.setState({ closingLoading: false })

                if (res.code === 200) {
                    this.props.fetchCashOpeningInfo()
                } else {
                    message.type = 'warning'
                }

                message.txt = res.msg
                this.props.setMessage(message)
            })
        }
    }

    addExpense = () => {
        this.setState({
            expensesDynamicForm: this.state.expensesDynamicForm.concat(this.state.expensesForm)
        })
    }

    handleOnRemoveExpense = i => {
        const expensesDynamicForm = this.state.expensesDynamicForm.filter((e, eidx) => i !== eidx)
        this.setState({ expensesDynamicForm })
    }

    handleOnChangeInputExpense = (i, key) => event => {
        const newExpense = this.state.expensesDynamicForm.map((expense, eidx) => {
            if (i !== eidx) {
                return expense
            }
            return { ...expense, [key]: event.target.value }
        })

        this.setState({
            expensesDynamicForm: newExpense
        })
    }

    _handleOnChangeDynamicNumber = (value, i, key) => {
        const newExpense = this.state.expensesDynamicForm.map((expense, eidx) => {
            if (i !== eidx) {
                return expense
            }
            return { ...expense, [key]: value === null ? 0 : value }
        })

        this.setState({
            expensesDynamicForm: newExpense
        })
    }

    _totalSumExpenses = () => {
        let sum = 0

        return this.state.expensesDynamicForm.map(expense => {
            if (expense.value === null) {
                return 0
            } else {
                return sum += (expense.value.length === 0 ? 0 : parseInt(expense.value))
            }
        })
    }

    _expensesTransform = () => {
        const expensesDynamicForm = _.cloneDeep(this.state.expensesDynamicForm)

        return expensesDynamicForm.map((expense, i) => {
            if (expense.value !== null) {
                expense.value = dollarsToCents(expense.value)
            }
            return expense
        })
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
            onChangeInput: value => this.handleOnChangeInput('hour_close', value),
            value: this.state.closingForm.hour_close,
            error: this.state.errors.hour_close,
            disabled: !!this.state.closingForm.hour_close
        }

        const valueCashInputProps = {
            label: "Ventas en efectivo",
            onChange: value => this.handleOnChangeInput('value_cash', value),
            value: this.state.closingForm.value_cash,
            error: this.state.errors.value_cash,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const valueCardInputProps = {
            label: "Ventas por tarjeta",
            onChange: value => this.handleOnChangeInput('value_card', value),
            value: this.state.closingForm.value_card,
            error: this.state.errors.value_card,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }
        const valueSalesInputProps = {
            label: "Total en ventas",
            onChange: value => this.handleOnChangeInput('value_sales', value),
            value: this.state.closingForm.value_sales,
            error: this.state.errors.value_sales,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const valueOpeningInputProps = {
            label: "Total apertura",
            onChange: value => this.handleOnChangeInput('value_open', value),
            value: this.state.closingForm.value_open,
            error: this.state.errors.value_open,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const valueCloseInputProps = {
            label: "Total de caja",
            onChange: value => this.handleOnChangeInput('value_close', value),
            value: this.state.closingForm.value_close,
            error: this.state.errors.value_close,
            disabled: true,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const removeExpenseBtnProps = {
            type: "danger",
            shape: "circle"
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
                    <Button
                        className="action-container--btn-expense"
                        type="primary"
                        onClick={this.addExpense}>Agregar gasto</Button>
                </div>
                <div className="expenses-container">
                    {
                        this.state.expensesDynamicForm.map((expense, i) => {
                            return (
                                <div key={i} className="expenses-container__row">
                                    <div>
                                        <DynamicInputText
                                            placeholder="Motivo"
                                            value={expense.name}
                                            onChange={this.handleOnChangeInputExpense(i, 'name')} />
                                    </div>
                                    <div>
                                        <DynamicInputNumber
                                            placeholder="Valor"
                                            value={expense.value}
                                            onChange={event => this._handleOnChangeDynamicNumber(event, i, 'value')}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')} />
                                    </div>
                                    <div className="expenses-container__row--btn-close">
                                        <Button {...removeExpenseBtnProps} onClick={() => this.handleOnRemoveExpense(i)}>
                                            <Icon type="minus" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="action-container">
                    <Button
                        className="action-container--btn"
                        type="primary"
                        loading={this.state.closingLoading}
                        onClick={this.handleClosingFormSubmit}
                        disabled={(this.state.closingForm.value_close - this._totalSumExpenses()) < 0}>
                        Cerrar caja con $ {this.state.closingForm.value_close - this._totalSumExpenses()}
                    </Button>
                </div>
            </div>
        )
    }

}

export default ClosingForm