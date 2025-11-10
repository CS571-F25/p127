import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'

// Import Components
import Navigation from './components/Navigation'
import Home from './components/Home'
import Locations from './components/Locations'
import Board from './components/Board'

function App() {
  // Use HashRouter for GitHub Pages
  return (
    <HashRouter>
      {/* Navigation bar is outside of Routes, so it stays on every page */}
      <Navigation />

      {/* Add a Bootstrap container to pad the content on all pages */}
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App