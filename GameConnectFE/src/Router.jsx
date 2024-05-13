import { Routes, Route, Navigate, HashRouter } from 'react-router-dom'
import { LoginRegister } from './pages/LoginRegister.jsx'
import { AdminLayout } from './components/admin/AdminLayout.jsx'
import { AdminPage } from './pages/AdminPage.jsx'
import { Page } from './pages/Page.jsx'
import { Post } from './pages/Post.jsx'
import { AdminPost } from './pages/AdminPost.jsx'
import { Admin } from './pages/Admin.jsx'
import { useStore } from './store/useStore.js'
import { appStore } from './store/appStore.js'
import { Home } from './pages/Home.jsx'
import { AdminPageEdit } from './pages/AdminPageEdit.jsx'
import { AdminPostEdit } from './pages/AdminPostEdit.jsx'

const AdminRoute = ({ children }) => {
  const token = useStore(appStore, 'token')

  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <AdminLayout>{children}</AdminLayout>
}

export const Router = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/post"
          element={
            <AdminRoute>
              <AdminPost />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/page"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/post-edit/:id"
          element={
            <AdminRoute>
              <AdminPostEdit />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/page-edit/:id"
          element={
            <AdminRoute>
              <AdminPageEdit />
            </AdminRoute>
          }
        />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/:pageUrl" element={<Page />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}
