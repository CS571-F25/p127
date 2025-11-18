import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { UserProvider } from './contexts/UserContext' 

// Import Components
import Navigation from './components/Navigation'
import Home from './components/Home'
import Locations from './components/Locations'
import Board from './components/Board'
import Login from './components/Login'
import AboutMe from './components/AboutMe'

function App() {

  return (
    <UserProvider> 
      <HashRouter>
        <Navigation />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/board" element={<Board />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutMe />} />
          </Routes>
        </Container>
      </HashRouter>
    </UserProvider>
  )
}

export default App