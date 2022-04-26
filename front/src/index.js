import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import './srcAssets/style/Font.module.css'
import { GlobalStyles } from "./srcAssets/style/GlobalStyle"


import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeMui = createTheme({
  typography: {
    fontFamily: '"Elice Digital Baeum", sans-serif'
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <ThemeProvider theme={themeMui}>
        <App />
    </ThemeProvider>
  </React.StrictMode>
)

