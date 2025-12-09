import React, { useState } from 'react';
import { Container, Form, Button, Alert, Tabs, Tab, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { auth } from '../firebaseConfig';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [key, setKey] = useState('login');

    const { user } = useUser();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (password !== confirmPassword) {
            return setError("Passwords do not match!");
        }
        if (!email || !password) {
            return setError("Email and password are required.");
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage("Registration successful! Please log in.");
            setKey('login'); 
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError("This email is already taken.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password must be at least 6 characters long.");
            } else {
                setError("Registration failed. Please try again.");
                console.error("Registration Error:", err);
            }
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/board');
        } catch (err) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.");
            } else {
                setError("Login failed. Please try again.");
                console.error("Login Error:", err);
            }
        }
    };

    if (user) {
        navigate('/board');
        return null;
    }

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 56px)' }}>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <div className="text-center mb-4">
                            <h1 className="fw-bold">Welcome Traveler</h1>
                            <p className="text-muted">Sign in to join the Inje community</p>
                        </div>
                        <Card className="shadow border-0">
                            <Card.Body className="p-4">
                                <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-4 nav-justified" variant="pills">
                                    <Tab eventKey="login" title="Login">
                                        <Form onSubmit={handleLogin}>
                                            {error && <Alert variant="danger" className="small">{error}</Alert>}
                                            <Form.Group className="mb-3" controlId="loginEmail">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    placeholder="name@example.com"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-4" controlId="loginPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Button variant="primary" type="submit" className="w-100 py-2">
                                                Sign In
                                            </Button>
                                        </Form>
                                    </Tab>
                                    <Tab eventKey="register" title="Sign Up">
                                        <Form onSubmit={handleRegister}>
                                            {error && <Alert variant="danger" className="small">{error}</Alert>}
                                            {message && <Alert variant="success" className="small">{message}</Alert>}
                                            <Form.Group className="mb-3" controlId="registerEmail">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="registerPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <Form.Text className="text-muted">Must be at least 6 characters.</Form.Text>
                                            </Form.Group>
                                            <Form.Group className="mb-4" controlId="confirmPassword">
                                                <Form.Label>Confirm Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                />
                                            </Form.Group>
                                            <Button variant="success" type="submit" className="w-100 py-2">
                                                Create Account
                                            </Button>
                                        </Form>
                                    </Tab>
                                </Tabs>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}