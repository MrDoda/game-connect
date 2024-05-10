import React, { useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { usePostApi } from '../hooks/usePostApi.js'

export function PostList({ page, navigate }) {
  const [posts, setPosts] = React.useState([])
  const { getPostsByPageId } = usePostApi()

  useEffect(() => {
    getPostsByPageId(page.id).then((posts) => setPosts(posts || []))
  }, [])

  console.log('posts', posts)

  return (
    <div style={{ display: 'flex' }}>
      {posts.map((post, index) => (
        <Card key={index} sx={{ margin: '20px', maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate(`/post/${post.id}`)}>
              Show More
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
