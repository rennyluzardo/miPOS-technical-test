import { combineReducers } from 'redux'
import cashOpening from './cashOpening'
import cashClosing from './cashClosing'
import global from './global'

const appReducer = combineReducers({
    cashOpening,
    cashClosing,
    global
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer