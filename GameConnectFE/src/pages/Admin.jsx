import { useEffect, useState } from 'react'
import { usePageApi } from '../hooks/usePageApi.js'
import { usePostApi } from '../hooks/usePostApi.js'
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useNavigate } from 'react-router-dom'

export const Admin = () => {
  const [pages, setPages] = useState([])
  const [posts, setPosts] = useState([])
  const { getPages, deletePage } = usePageApi()
  const { getPosts, deletePost } = usePostApi()
  const navigate = useNavigate()

  useEffect(() => {
    getPages().then((pages) => setPages(pages || []))
    getPosts().then((posts) => setPosts(posts || []))
  }, [])
  return (
    <Box>
      <h1>Admin</h1>
      <h2>Pages</h2>
      <ul>
        {pages.map((page) => {
          const pagePosts = posts.filter((p) => p.pageId === page.id)
          const hasPagePosts = pagePosts.length > 0
          return (
            <li style={{ display: 'flex', alignItems: 'center' }} key={page.id}>
              <Button onClick={() => navigate(`/admin/page-edit/${page.id}`)}>
                {page.title}
              </Button>
              <Typography
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.protocol}//${window.location.host}/#${page.url}`
                  )
                }
              >
                {page.url}
              </Typography>
              <Tooltip
                title={
                  hasPagePosts ? (
                    <div>
                      You need to first delete all posts on this page:
                      <Divider style={{ margin: 10 }} />
                      {pagePosts.map((post) => (
                        <div>{post.title}</div>
                      ))}
                    </div>
                  ) : (
                    ''
                  )
                }
              >
                <div>
                  <IconButton
                    onClick={() => {
                      deletePage(page.id).then(() =>
                        getPages().then((pages) => setPages(pages || []))
                      )
                    }}
                    disabled={hasPagePosts}
                    color={'error'}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </div>
              </Tooltip>
            </li>
          )
        })}
      </ul>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Button onClick={() => navigate(`/admin/post-edit/${post.id}`)}>
              {post.title}
            </Button>
            <IconButton
              onClick={() =>
                deletePost(post.id).then(() =>
                  getPosts().then((posts) => setPosts(posts || []))
                )
              }
              color={'error'}
            >
              <DeleteForeverIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </Box>
  )
}
