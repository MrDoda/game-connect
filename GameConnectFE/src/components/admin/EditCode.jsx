import React from 'react'
import { Box, Dialog, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Editor from '@monaco-editor/react'

export function FullScreenEdit({ open, setOpen, code, setCode }) {
  const handleClose = () => setOpen(false)
  const handleChange = (newValue) => setCode(newValue)

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="full-screen-dialog-title"
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ p: 3 }}></Box>
        <Editor
          height="100%"
          defaultLanguage="html"
          defaultValue={code}
          onChange={handleChange}
          theme="vs-dark"
        />
      </Dialog>
    </>
  )
}
