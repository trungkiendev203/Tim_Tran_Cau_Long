
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth/Auth'
import Feed from './pages/Feed/Feed'
import HomePage from './pages/HomePage/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
