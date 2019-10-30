import CONSTANTS from '../config/constants'

export const FETCH_CASH_OPENING_INFO = 'GET_CASH_OPENING_INFO'
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
        const mockRes = {
            'status': 'Success',
            'results': {
                'date_open': '2019/06/11',
                'hour_open': '12:45',
                'value_previous_close': 6280,
                'value_open': null,
                'observation': ''
            }
        }
        dispatch({ type: FETCH_CASH_OPENING_INFO, payload: mockRes })
    })
}