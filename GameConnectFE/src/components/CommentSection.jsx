import React, { useEffect, useState } from 'react'
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material'
import { useCommentApi } from '../hooks/useCommentApi.js'
import SendIcon from '@mui/icons-material/Send'

export function CommentSection({ postId, token }) {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const { getCommentsByPostId, createComment } = useCommentApi(token)

  const handleSubmit = async () => {
    await createComment({
      content: comment,
      postId,
    })
    getCommentsByPostId(postId).then((comments) => setComments(comments || []))
    setComment('')
  }

  useEffect(() => {
    console.log('hey it is loading again')
    getCommentsByPostId(postId).then((comments) => setComments(comments || []))
  }, [postId])

  return (
    <div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {comments.map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={comment.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.content}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < comments.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
      <TextField
        label="Write a comment"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        onClick={handleSubmit}
        endIcon={<SendIcon />}
        variant="outlined"
        sx={{ mt: 1 }}
      >
        Post Comment
      </Button>
    </div>
  )
}
