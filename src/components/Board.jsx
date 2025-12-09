import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner, Row, Col, ListGroup } from 'react-bootstrap';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { 
    collection, 
    addDoc, 
    query, 
    orderBy, 
    onSnapshot,
    serverTimestamp
} from "firebase/firestore";

const MESSAGES_COLLECTION = "inje_messages";

export default function Board(props) {
    const { user } = useUser();
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
        <Container className="py-4">
            <Row>
                <Col lg={8}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="mb-0">Community Board</h1>
                        <span className="text-muted">{messages.length} Posts</span>
                    </div>
                    
                    {error && <Alert variant="danger">{error}</Alert>}

                    {user ? (
                        <Card className="mb-5 shadow-sm border-primary">
                            <Card.Header className="bg-primary text-white">Create New Post</Card.Header>
                            <Card.Body>
                                <Form onSubmit={handlePost}>
                                    <Form.Group className="mb-3" controlId="postTitle">
                                        <Form.Label className="visually-hidden">Post Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Give your post a title..."
                                            disabled={posting}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="postContent">
                                        <Form.Label className="visually-hidden">Post Content</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Share your experience or ask a question..."
                                            disabled={posting}
                                        />
                                    </Form.Group>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="primary" type="submit" disabled={posting || !title || !content}>
                                            {posting ? <Spinner as="span" animation="border" size="sm" /> : "Post Message"}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    ) : (
                        <Alert variant="secondary" className="mb-5">
                            <h4 className="alert-heading">Join the conversation!</h4>
                            <p className="mb-0">
                                Please <Alert.Link as={Link} to="/login">log in</Alert.Link> to share your own stories or ask questions.
                            </p>
                        </Alert>
                    )}

                    <h2 className="h4 mb-3 text-muted">Recent Discussions</h2>
                    {isLoading ? (
                        <div className="text-center py-5">
                            <Spinner animation="border" variant="primary" />
                            <p className="mt-2 text-muted">Loading messages...</p>
                        </div>
                    ) : (
                        messages.length === 0 ? (
                            <div className="text-center py-5 bg-light rounded">
                                <p className="mb-0">No messages yet. Be the first to post!</p>
                            </div>
                        ) : (
                            messages.map(msg => (
                                <Card key={msg.id} className="mb-3 shadow-sm border-0">
                                    <Card.Body>
                                        <div className="d-flex justify-content-between mb-2">
                                            <Card.Title className="h5 text-primary">{msg.title}</Card.Title>
                                            <small className="text-muted">
                                                {msg.posted ? msg.posted.toDate().toLocaleDateString() : 'Just now'}
                                            </small>
                                        </div>
                                        <Card.Text>{msg.content}</Card.Text>
                                        <Card.Footer className="bg-white border-0 p-0 pt-2 text-muted small">
                                            Posted by: {msg.author}
                                        </Card.Footer>
                                    </Card.Body>
                                </Card>
                            ))
                        )
                    )}
                </Col>

                <Col lg={4}>
                    <Card className="mb-4 shadow-sm">
                        <Card.Header as="h3" className="h5 mb-0">Board Guidelines</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Be respectful to other travelers.</ListGroup.Item>
                            <ListGroup.Item>Keep topics related to Inje.</ListGroup.Item>
                            <ListGroup.Item>No spam or advertisements.</ListGroup.Item>
                        </ListGroup>
                    </Card>

                    <Card className="shadow-sm bg-light">
                        <Card.Body>
                            <Card.Title as="h3" className="h5">Need Help?</Card.Title>
                            <Card.Text>
                                Not sure where to go? Check out the <Link to="/locations">Locations</Link> page for inspiration before asking!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}