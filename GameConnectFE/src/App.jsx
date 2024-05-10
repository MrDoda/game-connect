import React from 'react'
import './App.css'
import { Router } from './Router.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

export const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#48c1ad',
      light: '#365e57',
    },
    secondary: {
      main: '#ff6d1b',
    },
  },
}

const theme = createTheme(themeOptions)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App
