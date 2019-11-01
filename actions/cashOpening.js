import CONSTANTS from '../config/constants'

export const FETCH_CASH_OPENING_INFO = 'FETCH_CASH_OPENING_INFO'
export const ADD_CASH_OPENING_INFO = 'ADD_CASH_OPENING_INFO'

export const fetchCashOpeningInfo = () => dispatch => {
    return fetch(`${CONSTANTS.API}cashier/balance`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${CONSTANTS.ACCESS_TOKEN}`
        }
    })
        .then(res => res.json())
        .then(res => {
            dispatch({ type: FETCH_CASH_OPENING_INFO, payload: res })
            return res
        })
        .catch(err => console.log(err))
}

export const addCashOpening = data => dispatch => {
    return fetch(`${CONSTANTS.API}cashier/balance/open/day`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${CONSTANTS.ACCESS_TOKEN}`,
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => {
            dispatch({ type: FETCH_CASH_OPENING_INFO, payload: res })
            return res
        })
        .catch(err => console.log(err))
}