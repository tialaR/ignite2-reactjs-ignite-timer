import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { CyclesContextProvider } from './context/CyclesContext'
import { Router } from './Routes'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
