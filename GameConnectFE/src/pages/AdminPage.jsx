import React, { useEffect, useState } from 'react'
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
  CircularProgress,
} from '@mui/material'
import RobotIcon from '@mui/icons-material/SmartToy'
import SaveIcon from '@mui/icons-material/Save'
import { useOpenAiApi } from '../hooks/useOpenAiApi.js'
import { FullScreenEdit } from '../components/admin/EditCode.jsx'
import { usePageApi } from '../hooks/usePageApi.js'
import { useNavigate } from 'react-router-dom'
import { updateNavigation } from '../utils/updateNavigation.js'

export function AdminPage({ editedPage = {}, pageId = null }) {
  const [pages, setPages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [fullScreenOpen, setFullScreenOpen] = useState(false)
  const [mode, setMode] = useState('html')
  const [prompt, setPrompt] = useState('')
  const [page, setPage] = useState({
    title: '',
    url: '',
    menu: 'main',
    position: '1',
    content: '',
    ...editedPage,
  })

  const { generatePageContent } = useOpenAiApi()
  const { createPage, getPages } = usePageApi()
  const navigate = useNavigate()

  const handleModeChange = (event, newMode) => {
    if (newMode !== null) {
      setMode(newMode)
    }
    if (newMode === 'fullScreen') {
      setFullScreenOpen(true)
    }
  }

  const generateContent = async () => {
    setIsLoading(true)
    const generationContext = {
      prompt,
      title: page.title,
      content: page.content,
    }
    const response = await generatePageContent(generationContext)
    response &&
      setPage({ ...page, content: updateNavigation(response.content, pages) })
    setIsLoading(false)
  }

  const handleFullscreenEditClose = () => {
    setFullScreenOpen(false)
    setMode('html')
  }

  const handlePublish = async () => {
    const createdPage = await createPage(page)
    createdPage && navigate(page.url)
  }

  useEffect(() => {
    getPages().then((result) => setPages(result || []))
  }, [])

  const isPublishDisabled = page.title && page.content && page.url && !isLoading

  return (
    <Paper
      style={{
        width: '100%',
        padding: '20px',
        position: 'relative',
        overflow: 'auto',
      }}
      elevation={3}
    >
      <Button
        variant="contained"
        color={'primary'}
        startIcon={<SaveIcon />}
        onClick={handlePublish}
        disabled={!isPublishDisabled}
        style={{ position: 'absolute', top: '46px', right: '20px' }}
      >
        Publish
      </Button>
      <h1>Create new Page</h1>
      <TextField
        fullWidth
        label="Page Title"
        variant="outlined"
        value={page.title}
        onChange={(e) => setPage({ ...page, title: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullWidth
        label="Page URL"
        variant="outlined"
        placeholder="example: /about-my-beautiful-page"
        value={page.url}
        onChange={(e) => setPage({ ...page, url: e.target.value })}
        style={{ marginBottom: '20px' }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="label-menu">Menu</InputLabel>
            <Select
              labelId="label-menu"
              disabled={true}
              label="Menu"
              value="main"
            >
              <MenuItem value="main">Main Menu</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              label="Position within menu"
              value={page.position}
              onChange={(e) => setPage({ ...page, position: e.target.value })}
            />
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
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          disabled={isLoading}
        />

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<RobotIcon />}
          onClick={generateContent}
          style={{ marginTop: '20px' }}
          disabled={isLoading}
        >
          Generate Content
          {isLoading && (
            <CircularProgress
              style={{ width: 20, height: 20, marginLeft: 20 }}
              color="secondary"
            />
          )}
        </Button>
      </Paper>

      <ToggleButtonGroup
        value={mode}
        disabled={isLoading}
        exclusive
        color="primary"
        onChange={handleModeChange}
        style={{ marginTop: '20px' }}
      >
        <ToggleButton value="html" aria-label="HTML Mode">
          HTML Mode
        </ToggleButton>
        <ToggleButton value="fullScreen" aria-label="FullScreen Edit">
          EDIT Mode
        </ToggleButton>
        <ToggleButton value="preview" aria-label="Preview Mode">
          Preview Mode
        </ToggleButton>
      </ToggleButtonGroup>
      <FullScreenEdit
        open={fullScreenOpen}
        setOpen={handleFullscreenEditClose}
        code={page.content}
        setCode={() => setPage({ ...page, content: e.target.value })}
      />
      {mode === 'html' ? (
        <TextareaAutosize
          style={{ width: '100%', height: 'auto', marginTop: '20px' }}
          aria-label="empty textarea"
          placeholder="HTML content"
          value={page.content}
          onChange={(e) => setPage({ ...page, content: e.target.value })}
        />
      ) : (
        <>
          <Paper
            style={{ height: '100%', marginTop: '20px', padding: '10px' }}
            elevation={3}
          >
            <iframe
              style={{ width: '100%', height: '100%' }}
              srcDoc={page.content}
              frameBorder="0"
            />
          </Paper>
          <div style={{ clear: 'both' }} />
        </>
      )}
    </Paper>
  )
}
