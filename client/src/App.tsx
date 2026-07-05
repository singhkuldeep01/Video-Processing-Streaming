
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UploadVideoPage } from './pages/UploadVideoPage'
import HomePage from './pages/Home'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
      </Routes>
    </Router>
  )
}

export default App
