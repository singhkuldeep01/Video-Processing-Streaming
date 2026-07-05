
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UploadVideoPage } from './pages/UploadVideoPage'
import HomePage from './pages/Home'
import AuthPage from './pages/AuthPage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PublicRoute } from './components/PublicRoute'
import { AuthProvider } from './providers/AuthProvider'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/auth" element={<AuthPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadVideoPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
