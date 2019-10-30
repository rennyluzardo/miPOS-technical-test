import { combineReducers } from 'redux'
import cashOpening from './cashOpening'
import cashClosing from './cashClosing'

const appReducer = combineReducers({
    cashOpening,
    cashClosing
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer