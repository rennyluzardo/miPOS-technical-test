import { Provider } from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../config/store'

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
        return {
            pageProps
        }
    }

    render() {
        const { Component, store, router, pageProps } = this.props

        return (
            <Provider {...pageProps} store={store} router={router}>
                <Component />
            </Provider>
        )
    }
}

export default withRedux(initStore)(MyApp)
