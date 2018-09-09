import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { LocaleProvider } from 'antd'
import enGB from 'antd/lib/locale-provider/en_GB'
import { ThemeProvider, injectGlobal } from 'styled-components'

import { App } from './components'
import configureStore from './redux/configureStore'
import theme from './theme'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore()

injectGlobal`
  body {
    font-family: ${theme.fonts.default} !important;
    font-size: ${theme.fontSize.base};
    color: ${theme.colors.text};
    background-color: white;
    margin: 0px;
  }

  h1 {
    font-size: ${theme.fontSize.xxl}
  }

  h2 {
    font-size: ${theme.fontSize.xl}
  }

  h3 {
    font-size: ${theme.fontSize.l}
  }

  h4 {
    font-size: ${theme.fontSize.m}
  }

  h5 {
    font-size: ${theme.fontSize.s}
  }
`

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <LocaleProvider locale={enGB}>
        <Router>
          <Route component={App} />
        </Router>
      </LocaleProvider>
    </ThemeProvider>
  </Provider>
  , document.getElementById('root')
)
registerServiceWorker();
