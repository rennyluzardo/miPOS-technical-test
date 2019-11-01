export const SET_MESSAGE = 'SET_MESSAGE'

export const setMessage = message => dispatch => {
    dispatch({ type: SET_MESSAGE, message })
}