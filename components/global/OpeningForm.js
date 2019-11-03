import React, { Component } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import { validateForm } from '../../lib/formValidator'
import { centsToDollar } from '../../lib/utils'
// Components
import Input from './Input'
import GroupedInputs from './GroupedInputs'
import InputNumber from './InputNumber'

class OpeningForm extends Component {
    state = {
        initialMessage: {
            type: '',
            duration: 0,
            text: ''
        },
        openingForm: {
            date_open: null,
            hour_open: null,
            value_previous_close: null,
            value_open: null,
            observation: null
        },
        loading: false,
        errors: []
    }

    openingFormRules = {
        hour: [
            'hour_open'
        ],
        required: [
            'value_previous_close',
            'observation',
            'value_open'
        ]
    }

    componentDidMount() {
        this.props.fetchCashOpeningInfo().then(res => {
            const openingForm = this.state.openingForm
            openingForm['date_open'] = res.results.date_open
            openingForm['hour_open'] = moment(res.results.hour_open, 'HH:mm:ss').format("hh:mm")
            /** 
             * Si es que hay un cierre de caja activo la propiedad value_previous_close llega en dolares,
             * caso contrario con centavos. Consultar esto ya que no esta especificado en el test.
            **/
            openingForm['value_previous_close'] = this._checkCashClosing(res.results)
            openingForm['value_open'] = res.results.value_open
            openingForm['observation'] = res.results.observation

            this.setState({ openingForm })
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.cashOpeningInfo !== nextProps.cashOpeningInfo) {
            const openingForm = this.state.openingForm
            openingForm['date_open'] = nextProps.cashOpeningInfo.results.date_open
            openingForm['hour_open'] = moment(nextProps.cashOpeningInfo.results.hour_open, 'HH:mm:ss').format("hh:mm")
            openingForm['value_previous_close'] = this._checkCashClosing(nextProps.cashOpeningInfo.results)
            openingForm['value_open'] = nextProps.cashOpeningInfo.results.value_open
            openingForm['observation'] = nextProps.cashOpeningInfo.results.observation
            this.setState({ openingForm })
        }
    }

    _checkCashClosing = cash => {
        if (cash.value_open !== null) {
            return cash.value_previous_close
        }
        return centsToDollar(cash.value_previous_close)
    }

    validateOpeningForm = () => {
        const form = Object.assign({}, this.state.openingForm)

        if (form.value_open === null) {
            form.value_open = ''
        }

        const errors = validateForm(form, this.openingFormRules)
        this.setState({ errors })
        return !Object.keys(errors).length
    }


    handleChangeInput = (input, event) => {
        const openingForm = this.state.openingForm
        openingForm[input] = input !== 'value_open' ? event.target.value : event
        this.setState({ openingForm })
    }

    handleOpeningFormSubmit = () => {
        this.props.setMessage(this.state.initialMessage)
        const message = {
            duration: 3,
            txt: "",
            type: 'success'
        }

        if (this.validateOpeningForm()) {
            const openingForm = this.state.openingForm

            this.setState({ loading: true })

            this.props.addCashOpening(openingForm).then(res => {
                this.setState({ loading: false })

                if (res.results.value_open !== null) {
                    message.txt = res.msg
                    this.props.setMessage(message)

                    openingForm['date_open'] = res.results.date_open
                    openingForm['hour_open'] = moment(res.results.hour_open, 'HH:mm:ss').format("hh:mm")
                    openingForm['value_previous_close'] = res.results.value_previous_close
                    openingForm['value_open'] = res.results.value_open
                    openingForm['observation'] = res.results.observation

                    this.setState({ openingForm })
                }
            })
        }
    }

    render() {
        const datePickerOpenProps = {
            onChangeInput: value => this.handleChangeInput('date_open', value),
            label: "Fecha",
            placeholder: "yyyy/mm/dd",
            value: this.state.openingForm.date_open,
            error: this.state.errors.date_open,
            defaultValue: this.state.openingForm.date_open,
            disabled: !!this.state.openingForm.date_open
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
            disabled: !!this.state.openingForm.value_previous_close || typeof this.state.openingForm.value_previous_close === 'number',
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const valueOpenInputProps = {
            label: "Total inicial",
            onChangeInput: value => this.handleChangeInput('value_open', value),
            value: this.state.openingForm.value_open,
            error: this.state.errors.value_open,
            disabled: !!this.props.cashOpeningInfo &&
                this.props.cashOpeningInfo.results &&
                this.props.cashOpeningInfo.results.value_open &&
                this.props.cashOpeningInfo.results.value_open !== null,
            formatter: value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: value => value.replace(/\$\s?|(,*)/g, '')
        }

        const openingSendBtnProps = {
            className: "action-container--btn",
            type: "primary",
            loading: this.state.loading,
            onClick: this.handleOpeningFormSubmit
        }

        const observationProps = {
            label: "Observaciones",
            onChangeInput: value => this.handleChangeInput('observation', value),
            value: this.state.openingForm.observation,
            type: "textarea",
            error: this.state.errors.observation,
            disabled: !!this.props.cashOpeningInfo &&
                !!this.props.cashOpeningInfo.results &&
                !!this.props.cashOpeningInfo.results.observation
        }

        return (
            <div>
                <GroupedInputs side="left">
                    <Input {...datePickerOpenProps} />
                    <Input {...hourInputProps} />
                </GroupedInputs>
                <GroupedInputs side="left">
                    <InputNumber {...previousCloseInputProps} />
                    <InputNumber {...valueOpenInputProps} />
                </GroupedInputs>
                <GroupedInputs qty={1} side="left">
                    <Input {...observationProps} />
                </GroupedInputs>
                {
                    !!this.props.cashOpeningInfo &&
                    !!this.props.cashOpeningInfo.results &&
                    this.props.cashOpeningInfo.results.value_open === null &&
                    <div className="action-container">
                        <Button {...openingSendBtnProps}>Enviar</Button>
                    </div>
                }
            </div>
        )
    }
}

export default OpeningForm