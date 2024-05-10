import React from 'react'
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import RobotIcon from '@mui/icons-material/SmartToy'
import SaveIcon from '@mui/icons-material/Save'

export function AdminPage() {
  const [mode, setMode] = React.useState('html')

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode)
    }
  }

  return (
    <Paper
      style={{
        height: '100vh',
        width: '100%',
        padding: '20px',
        position: 'relative',
      }}
      elevation={3}
    >
      <Button
        variant="contained"
        color={'primary'}
        startIcon={<SaveIcon />}
        style={{ position: 'absolute', top: '46px', right: '20px' }}
      >
        Publish
      </Button>
      <h1>Create new Page</h1>
      <TextField
        fullWidth
        label="Post Title"
        variant="outlined"
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Page URL"
        variant="outlined"
        placeholder="example: /about-my-beautiful-page"
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="menu-label">Menu</InputLabel>
            <Select
              disabled={true}
              labelId="menu-label"
              label="Menu"
              defaultValue="main"
            >
              <MenuItem value="main">Main Menu</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="position-label">Position within menu</InputLabel>
            <Select
              labelId="position-label"
              label="Position within menu"
              defaultValue=""
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Paper style={{ marginTop: '20px', padding: '20px' }} elevation={3}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Generate Content with Help of AI"
          placeholder="Your prompt. Describe what your content should be about."
          variant="outlined"
          color={'secondary'}
        />

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<RobotIcon />}
          style={{ marginTop: '20px' }}
        >
          Generate Content
        </Button>
      </Paper>

      <ToggleButtonGroup
        value={mode}
        exclusive
        color="primary"
        onChange={handleModeChange}
        style={{ marginTop: '20px' }}
      >
        <ToggleButton value="html" aria-label="HTML Mode">
          HTML Mode
        </ToggleButton>
        <ToggleButton value="preview" aria-label="Preview Mode">
          Preview Mode
        </ToggleButton>
      </ToggleButtonGroup>

      {mode === 'html' ? (
        <TextareaAutosize
          style={{ width: '100%', height: '200px', marginTop: '20px' }}
          aria-label="empty textarea"
          placeholder="HTML content"
        />
      ) : (
        <Paper
          style={{ height: '200px', marginTop: '20px', padding: '10px' }}
          elevation={3}
        >
          Preview content
        </Paper>
      )}
    </Paper>
  )
}
