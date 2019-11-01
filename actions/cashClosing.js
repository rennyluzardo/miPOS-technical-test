import CONSTANTS from '../config/constants'

export const FETCH_CASH_CLOSING_INFO = 'FETCH_CASH_CLOSING_INFO'
export const ADD_CASH_CLOSING_INFO = 'ADD_CASH_CLOSING_INFO'

export const fetchCashClosingInfo = () => dispatch => {
    return fetch(`${CONSTANTS.API}has/open/cashier/balance/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${CONSTANTS.ACCESS_TOKEN}`
        }
    })
        .then(res => res.json())
        .then(res => {
            dispatch({ type: FETCH_CASH_CLOSING_INFO, payload: res })
            return res
        })
        .catch(err => console.log(err))
}

export const addCashClosing = form => dispatch => {
    return fetch(`${CONSTANTS.API}cashier/balance/close/day`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CONSTANTS.ACCESS_TOKEN}`
        },
        body: JSON.stringify(form)
    })
        .then(res => res.json())
        .then(res => {
            dispatch({ type: ADD_CASH_CLOSING_INFO, payload: res })
            return res
        })
        .catch(err => console.log(err))
}