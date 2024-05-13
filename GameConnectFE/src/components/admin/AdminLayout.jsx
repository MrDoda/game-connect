import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Avatar,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 240

export const AdminLayout = ({ children, userName = 'Test user' }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      {mobileOpen && <Box sx={{ height: 48 }}></Box>}
      <List>
        <ListItem
          button
          selected={location.pathname === '/admin/page'}
          component={Link}
          to="/admin/page"
        >
          <ListItemText primary="Create Page" />
        </ListItem>
        <ListItem
          button
          selected={location.pathname === '/admin/post'}
          component={Link}
          to="/admin/post"
        >
          <ListItemText primary="Create Post" />
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/admin')}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Admin Panel
          </Typography>
          <Avatar alt={userName} src="/static/images/avatar/1.jpg" />
          <Typography variant="h6" component="div" sx={{ paddingLeft: 2 }}>
            {userName}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
