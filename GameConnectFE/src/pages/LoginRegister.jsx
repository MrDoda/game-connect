import React, { useState } from 'react'
import { Paper, Tab, Tabs, Box, TextField, Button } from '@mui/material'
import { useAuthentication } from '../hooks/useAuthentication'
import { appStore } from '../store/appStore.js'
import { useNavigate } from 'react-router-dom'

export const LoginRegister = () => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [error, setError] = useState({})
  const { login, register } = useAuthentication()

  const navigate = useNavigate()

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const credentials = {
      email: formData.get('email'),
      password: formData.get('password'),
    }
    const result = await login(credentials)
    if (!result) {
      setError({ login: 'Invalid credentials' })
      return
    }
    appStore.setState({ token: result.token })
    navigate('/admin')
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userDetails = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    }
    const result = await register(userDetails)
    if (!result) {
      setError({ register: 'Error registering' })
      return
    }
    const credentials = {
      email: userDetails.email,
      password: userDetails.password,
    }
    const loginResult = await login(credentials)
    if (!loginResult) {
      setError({ login: 'Invalid credentials' })
      return
    }
    appStore.setState({ token: result.token })
    navigate('/admin')
  }

  const LoginForm = () => (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      noValidate
      autoComplete="off"
    >
      <TextField name="email" label="Email" variant="outlined" fullWidth />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </Box>
  )

  const RegisterForm = () => (
    <Box
      component="form"
      onSubmit={handleRegister}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      noValidate
      autoComplete="off"
    >
      <TextField name="name" label="Name" variant="outlined" fullWidth />
      <TextField name="email" label="Email" variant="outlined" fullWidth />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
    </Box>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper sx={{ width: '400px', p: 3 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        {selectedTab === 0 ? <LoginForm /> : <RegisterForm />}
      </Paper>
    </Box>
  )
}
