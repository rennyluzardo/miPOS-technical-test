import { SET_MESSAGE } from '../actions/global'

const initialState = {
    message: {
        type: '',
        duration: 0,
        text: ''
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return { ...state, message: action.message }
        default:
            return state
    }
}