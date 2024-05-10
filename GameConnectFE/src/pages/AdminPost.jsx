import React, { useEffect, useState } from 'react'
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
  CircularProgress,
} from '@mui/material'
import RobotIcon from '@mui/icons-material/SmartToy'
import SaveIcon from '@mui/icons-material/Save'
import { useOpenAiApi } from '../hooks/useOpenAiApi.js'
import { useNavigate } from 'react-router-dom'
import { usePostApi } from '../hooks/usePostApi.js'
import { FullScreenEdit } from '../components/admin/EditCode.jsx'
import { usePageApi } from '../hooks/usePageApi.js'

export function AdminPost({ editedPost = {}, postId = null }) {
  const [isLoading, setIsLoading] = useState(false)
  const [fullScreenOpen, setFullScreenOpen] = useState(false)
  const [mode, setMode] = useState('html')
  const [prompt, setPrompt] = useState('')
  const [pages, setPages] = useState([])
  const [post, setPost] = useState({
    title: '',
    pageId: undefined,
    position: '1',
    content: '',
    ...editedPost,
  })

  const { generatePostContent } = useOpenAiApi()
  const { createPost } = usePostApi()
  const { getPages } = usePageApi()
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
      title: post.title,
      content: post.content,
    }
    const response = await generatePostContent(generationContext)
    response && setPost({ ...post, content: response.content })
    setIsLoading(false)
  }

  const handleFullscreenEditClose = () => {
    setFullScreenOpen(false)
    setMode('html')
  }

  const handlePublish = async () => {
    const createdPost = await createPost(post)
    createdPost && navigate(`/post/${createdPost.id}`)
  }

  const isPublishDisabled =
    post.title && post.content && post.pageId && !isLoading

  useEffect(() => {
    getPages().then((result) => setPages(result || []))
  }, [])

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
        onClick={handlePublish}
        disabled={!isPublishDisabled}
        style={{ position: 'absolute', top: '46px', right: '20px' }}
      >
        Publish
      </Button>
      <h1>Create new Post</h1>
      <TextField
        fullWidth
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        label="Post Title"
        variant="outlined"
      />

      <FormControl fullWidth style={{ marginTop: '20px' }}>
        <InputLabel id="select-page-label">Select Page</InputLabel>
        <Select
          labelId="select-page-label"
          onChange={(e) => setPost({ ...post, pageId: e.target.value })}
          label="Select Page"
          value={post.pageId}
        >
          {pages.map((page) => (
            <MenuItem key={page.id} value={page.id}>
              {page.title}
            </MenuItem>
          ))}
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
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          disabled={isLoading}
        />

        <Button
          variant="outlined"
          color={'secondary'}
          startIcon={<RobotIcon />}
          style={{ marginTop: '20px' }}
          onClick={generateContent}
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
        color={'primary'}
        disabled={isLoading}
        exclusive
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
        code={post.content}
        setCode={() => setPost({ ...post, content: e.target.value })}
      />
      {mode === 'html' ? (
        <TextareaAutosize
          style={{ width: '100%', height: 'auto', marginTop: '20px' }}
          aria-label="empty textarea"
          value={post.content}
          placeholder="HTML content"
        />
      ) : (
        <>
          <Paper
            style={{ height: '100%', marginTop: '20px', padding: '10px' }}
            elevation={3}
          >
            <iframe
              style={{ width: '100%', height: '100%' }}
              srcDoc={post.content}
              frameBorder="0"
            />
          </Paper>
          <div style={{ clear: 'both' }} />
        </>
      )}
    </Paper>
  )
}
