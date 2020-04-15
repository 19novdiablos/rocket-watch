import App from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'

class _app extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <Component {...pageProps} />
    )
  }
}

export default _app