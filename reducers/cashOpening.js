import {
    FETCH_CASH_OPENING_INFO,
    ADD_CASH_OPENING_INFO
} from '../actions/cashOpening'

const initialState = {}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CASH_OPENING_INFO:
            return { ...state, cashOpeningData: action.payload }
        case ADD_CASH_OPENING_INFO:
            return { ...state, addcashClosingPayload: action.payload }
        default:
            return state
    }
}