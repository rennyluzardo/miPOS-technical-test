import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

export const initStore = initialState => {
    const middlewares = [thunk]

    if (process.env.NODE_ENV === 'development') {
        const { logger } = require('redux-logger')
        middlewares.push(logger)
    }

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middlewares)
    )
    
}