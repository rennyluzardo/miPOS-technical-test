import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../config/store'

class MyApp extends App {
    render() {
        const { Component, store } = this.props

        return (
            <Container>
                <Provider store={store}>
                    <Component/>
                </Provider>
            </Container>
        )
    }
}

export default withRedux(initStore)(MyApp)