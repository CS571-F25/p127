import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; 

export default function Navigation() {
    
    const { user, logout } = useUser(); 
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/'); 
    }

    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/">Visit Inje</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/locations">Locations</Nav.Link>
                        <Nav.Link as={Link} to="/board">Board</Nav.Link>
                        <Nav.Link as={Link} to="/about">AboutMe</Nav.Link>
                        
                        {user ? (
                            <Nav.Link onClick={handleLogout}>Logout ({user.email})</Nav.Link>
                        ) : (
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}