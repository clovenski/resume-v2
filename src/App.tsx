import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Hobbies from './pages/Hobbies'
import Projects from './pages/Projects'

function App() {
  return (
    <BrowserRouter basename="/resume-v2">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="hobbies" element={<Hobbies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
