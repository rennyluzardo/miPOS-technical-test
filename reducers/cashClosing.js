import {
    FETCH_CASH_CLOSING_INFO,
    ADD_CASH_CLOSING_INFO
} from '../actions/cashClosing'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CASH_CLOSING_INFO:
            return { ...state, cashClosingData: action.payload }
        case ADD_CASH_CLOSING_INFO:
            return { ...state, addCashClosingPayload: action.payload }
        default:
            return state
    }
}