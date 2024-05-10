import React from 'react'
import {
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import RobotIcon from '@mui/icons-material/SmartToy'
import SaveIcon from '@mui/icons-material/Save'

export function AdminPost() {
  const [mode, setMode] = React.useState('html')

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode)
    }
  }

  return (
    <Paper
      style={{
        height: '100%',
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
      <h1>Create new Post</h1>
      <TextField fullWidth label="Post Title" variant="outlined" />

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel id="select-page-label">Select Page</InputLabel>
        <Select labelId="select-page-label" label="Select Page" defaultValue="">
          <MenuItem value="Page1">Page 1</MenuItem>
          <MenuItem value="Page2">Page 2</MenuItem>
        </Select>
      </FormControl>

      <Paper style={{ marginTop: '20px', padding: '20px' }} elevation={3}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Generate Content with Help of AI"
          placeholder="Your prompt. Describe what your content should be about."
          variant="outlined"
        />

        <Button
          variant="outlined"
          color={'secondary'}
          startIcon={<RobotIcon />}
          style={{ marginTop: '20px' }}
        >
          Generate Content
        </Button>
      </Paper>

      <ToggleButtonGroup
        value={mode}
        color={'primary'}
        exclusive
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
