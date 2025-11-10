import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                {/* Updated the brand to "Visit Inje" */}
                <Navbar.Brand as={Link} to="/">Visit Inje</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Use 'as={Link}' to connect Bootstrap links to React Router */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/locations">Locations</Nav.Link>
                        <Nav.Link as={Link} to="/board">Board</Nav.Link>
                        <Nav.Link as={Link} to="/about">AboutMe</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}