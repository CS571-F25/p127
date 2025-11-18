import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Import Firestore db
import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot,
    serverTimestamp
} from "firebase/firestore";

const MESSAGES_COLLECTION = "inje_messages"; // Name of our collection in Firestore

export default function Board(props) {
    const { user } = useUser(); // Get logged-in Firebase user
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        const messagesQuery = query(
            collection(db, MESSAGES_COLLECTION), 
            orderBy("posted", "desc")
        );
        const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
            const msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push({ id: doc.id, ...doc.data() });
            });
            setMessages(msgs);
            setIsLoading(false);
        }, (err) => {
            console.error("Error fetching messages:", err);
            setError("Could not fetch messages from Firestore.");
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handlePost = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            return setError("Title and content are required.");
        }
        setPosting(true);
        setError(null);

        try {
            const newMessage = {
                author: user.email, 
                title: title,
                content: content,
                posted: serverTimestamp() 
            };

            await addDoc(collection(db, MESSAGES_COLLECTION), newMessage);

            setTitle("");
            setContent("");

        } catch (err) {
            console.error("Post Message Error:", err);
            setError(err.message || "A network error occurred while posting.");
        }
        setPosting(false);
    };

    return (
        <Container>
            <h1 className="mb-4">Community Board</h1>
            {error && <Alert variant="danger">{error}</Alert>}

            {user ? (
                <Card className="mb-4 shadow-sm">
                    <Card.Header>Post a Review or Question</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handlePost}>
                            <Form.Group className="mb-3" controlId="postTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g., 'Great rafting spot!'"
                                    disabled={posting}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="postContent">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Share your experience..."
                                    disabled={posting}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={posting || !title || !content}>
                                {posting ? <Spinner as="span" animation="border" size="sm" /> : "Submit Post"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            ) : (
                <Alert variant="info">
                    Please <Alert.Link as={Link} to="/login">log in</Alert.Link> to post a message.
                </Alert>
            )}

            <h2 className="h4">Recent Posts</h2>
            {isLoading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                    <p>Loading messages...</p>
                </div>
            ) : (
                messages.length === 0 ? (
                    <p>No messages yet. Be the first to post!</p>
                ) : (
                    messages.map(msg => (
                        <Card key={msg.id} className="mb-3 shadow-sm">
                            <Card.Body>
                                <Card.Title>{msg.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    By: {msg.author} | On: {msg.posted ? msg.posted.toDate().toLocaleString() : 'Just now...'}
                                </Card.Subtitle>
                                <Card.Text>{msg.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                )
            )}
        </Container>
    );
}