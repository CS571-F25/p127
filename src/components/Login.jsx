import React, { useState } from 'react';
import { Container, Form, Button, Alert, Tabs, Tab, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { auth } from '../firebaseConfig'; // Import Firebase auth
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "firebase/auth";

export default function Login() {
    // Firebase uses email, so let's update our state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [key, setKey] = useState('login'); // Controls which tab is active

    // We only need useUser to check if already logged in (optional)
    const { user } = useUser();
    const navigate = useNavigate();

    // REMOVED checkApiReady - no longer needed!

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
            // Use Firebase to create a new user
            await createUserWithEmailAndPassword(auth, email, password);
            
            setMessage("Registration successful! Please log in.");
            setKey('login'); // Switch to login tab
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        } catch (err) {
            // Handle Firebase errors
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
            // Use Firebase to sign in
            await signInWithEmailAndPassword(auth, email, password);
            
            // Success!
            // The onAuthStateChanged listener in UserContext will handle
            // setting the user state. We just need to redirect.
            navigate('/board'); // Redirect to board

        } catch (err) {
            // Handle Firebase errors
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError("Invalid email or password.");
            } else {
                setError("Login failed. Please try again.");
                console.error("Login Error:", err);
            }
        }
    };

    // If user is already logged in, redirect them
    if (user) {
        navigate('/board');
        return null;
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '400px' }} className="shadow-sm">
                <Card.Body>
                    <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3" fill>
                        <Tab eventKey="login" title="Login">
                            <h3 className="text-center">Login</h3>
                            <Form onSubmit={handleLogin}>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form.Group className="mb-3" controlId="loginEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="loginPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">
                                    Login
                                </Button>
                            </Form>
                        </Tab>
                        <Tab eventKey="register" title="Register">
                            <h3 className="text-center">Register</h3>
                            <Form onSubmit={handleRegister}>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <Form.Group className="mb-3" controlId="registerEmail">
                                    <Form.Label>Email</Form.Label>
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
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="success" type="submit" className="w-100">
                                    Register
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </Container>
    );
}