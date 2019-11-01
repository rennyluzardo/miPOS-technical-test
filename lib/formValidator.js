import validator from 'validator'
import _isEmpty from 'lodash/isEmpty'

export const validateForm = (form, validationRules) => {
    const errors = {}
    errors['arrayStructure'] = []

    for (const rule in validationRules) {
        if (validationRules.hasOwnProperty(rule)) {
            switch (rule) {
                case 'required':
                    validationRules[rule].forEach(item => {
                        if (form.length) {
                            form.forEach((object, index) => {
                                if (validator.isEmpty(object[item].toString())) {
                                    errors['arrayStructure'].push({})
                                    errors['arrayStructure'][index][item] = 'Este campo es requerido'
                                }
                            })
                            errors['arrayStructure'] = errors['arrayStructure'].filter(value => !_isEmpty(value))
                        } else {
                            if (validator.isEmpty(form[item].toString())) {
                                errors[item] = 'Este campo es requerido'
                            }
                        }
                    })
                    break

                case 'length':
                    validationRules[rule].forEach(item => {
                        if (typeof item === 'object') {
                            if (form.length) {
                                form.forEach((object, index) => {
                                    if (!validator.isLength(object[item.field], { min: item.min })) {
                                        errors['arrayStructure'].push({})
                                        errors['arrayStructure'][index][item.field] = `El tamaño de este campo debe ser mínimo ${item.min}`
                                    }
                                    if (!validator.isLength(object[item.field], { max: item.max })) {
                                        errors['arrayStructure'].push({})
                                        errors['arrayStructure'][index][item.field] = `El tamaño de este campo debe ser máximo ${item.max}`
                                    }
                                })
                                errors['arrayStructure'] = errors['arrayStructure'].filter(value => !_isEmpty(value))
                            } else {
                                if (!validator.isLength(form[item.field], { min: item.min })) {
                                    errors[item.field] = `El tamaño de este campo debe ser mínimo ${item.min}`
                                }
                                if (!validator.isLength(form[item.field], { max: item.max })) {
                                    errors[item.field] = `El tamaño de este campo debe ser máximo ${item.max}`
                                }
                            }
                        }
                    })
                    break

                case 'number':
                    const numberRegex = /[^0-9]+/
                    validationRules[rule].forEach(item => {
                        if (form.length) {
                            form.forEach((object, index) => {
                                if (numberRegex.exec(object[item]) !== null) {
                                    errors['arrayStructure'].push({})
                                    errors['arrayStructure'][index][item] = 'Este campo debe ser numérico'
                                }
                            })
                            errors['arrayStructure'] = errors['arrayStructure'].filter(value => !_isEmpty(value))
                        } else {
                            if (numberRegex.exec(form[item]) !== null) {
                                errors[item] = 'Este campo debe ser numérico'
                            }
                        }
                    })
                    break

                case 'noNumber':
                    const noNumberRegex = /[0-9]+/
                    validationRules[rule].forEach(item => {
                        if (noNumberRegex.exec(form[item]) !== null) {
                            errors[item] = 'Este campo no puede contener números'
                        }
                    })
                    break

                case 'noSpecialCharacters':
                    const noSpecialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
                    validationRules[rule].forEach(item => {
                        if (noSpecialCharactersRegex.exec(form[item]) !== null) {
                            errors[item] = 'Este campo no puede contener caracteres especiales'
                        }
                    })
                    break
                case 'hour':
                    validationRules[rule].forEach(item => {
                        const hourFormat = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(form[item])

                        if (!hourFormat) {
                            errors[item] = 'Este campo debe estar con el formato hh:mm'
                        }
                    })
                    break
                default:
                    break
            }
        }
    }
    if (errors.arrayStructure.length === 0) {
        delete errors.arrayStructure;
    }
    return errors
}
