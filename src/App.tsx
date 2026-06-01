import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage       from './pages/HomePage'
import BlogPage       from './pages/BlogPage'
import BlogPostPage   from './pages/BlogPostPage'
import LoginPage      from './pages/admin/LoginPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import PostEditor     from './pages/admin/PostEditor'

import { AuthProvider }  from './context/AuthContext'
import ProtectedRoute    from './components/admin/ProtectedRoute'

/*
  ─── Rotas da aplicação ────────────────────────────────────────
  /                    → HomePage  (landing page)
  /blog                → BlogPage  (listagem de artigos)
  /blog/:slug          → BlogPostPage (artigo individual)
  /admin/login         → LoginPage (acesso ao painel)
  /admin               → AdminDashboard (lista de posts, protegido)
  /admin/posts/new     → PostEditor (criar, protegido)
  /admin/posts/:id     → PostEditor (editar, protegido)
*/

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* ── Público ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* ── Administração ── */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/new"
          element={
            <ProtectedRoute>
              <PostEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/posts/:id"
          element={
            <ProtectedRoute>
              <PostEditor />
            </ProtectedRoute>
          }
        />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
