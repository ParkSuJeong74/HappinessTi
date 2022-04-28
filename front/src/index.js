import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import './srcAssets/style/Font.module.css'
import { GlobalStyles } from "./srcAssets/style/GlobalStyle"
import { RecoilRoot } from 'recoil';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MuiThemeProvider} from '@material-ui/core/styles';
import { createTheme2 } from './define.js'

const themeMui = createTheme({
  typography: {
    fontFamily: '"Elice Digital Baeum", sans-serif'
  },
});

const themeMuiCore = createTheme2({
  typography: {
    fontFamily: '"Elice Digital Baeum", sans-serif'
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={themeMui}>
      <MuiThemeProvider theme={themeMuiCore}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </MuiThemeProvider>
    </ThemeProvider>
  </React.StrictMode>
)

