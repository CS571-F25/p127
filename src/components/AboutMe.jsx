import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Button, Form, Alert } from 'react-bootstrap';
import { useUser } from '../contexts/UserContext';
import { Link } from 'react-router-dom';

export default function AboutMe(props) {
    const { user } = useUser();
    const [isEditing, setIsEditing] = useState(false);
    
    const [profileData, setProfileData] = useState({
        bio: "",
        favoriteSpot: "",
        bestSeason: "",
        profileImage: "https://placehold.co/300x300/e9ecef/495057?text=Traveler+Profile"
    });

    useEffect(() => {
        if (user) {
            const savedProfile = localStorage.getItem(`profile_${user.email}`);
            if (savedProfile) {
                setProfileData(JSON.parse(savedProfile));
            }
        }
    }, [user]);

    const handleSave = () => {
        if (user) {
            localStorage.setItem(`profile_${user.email}`, JSON.stringify(profileData));
        }
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData(prev => ({
                    ...prev,
                    profileImage: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (!user) {
        return (
            <Container className="py-5 text-center">
                <Card className="shadow-sm border-0 p-5 bg-light">
                    <Card.Body>
                        <h2 className="mb-3">Traveler Profile</h2>
                        <p className="lead text-muted">Please log in to view and edit your traveler profile.</p>
                        <Button as={Link} to="/login" variant="primary" size="lg">Log In</Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={4} className="text-center mb-4">
                    <Image 
                        src={profileData.profileImage} 
                        roundedCircle 
                        fluid 
                        className="shadow mb-3"
                        style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                        alt="Profile picture"
                    />
                    
                    {isEditing && (
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" size="sm" accept="image/*" onChange={handleImageChange} />
                        </Form.Group>
                    )}

                    <h2>{user.email.split('@')[0]}</h2>
                    <p className="text-muted">Explorer of Inje</p>
                    
                    {!isEditing ? (
                        <Button variant="outline-primary" size="sm" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="d-gap gap-2 d-flex justify-content-center">
                            <Button variant="success" size="sm" onClick={handleSave}>Save</Button>
                            <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>
                    )}
                </Col>
                
                <Col md={8}>
                    <Card className="shadow-sm border-0 mb-4">
                        <Card.Header as="h3" className="bg-white border-bottom-0 pt-4">My Connection to Inje</Card.Header>
                        <Card.Body>
                            
                            {isEditing ? (
                                <Form.Group>
                                    <Form.Label>My Story</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows={5} 
                                        name="bio"
                                        value={profileData.bio}
                                        onChange={handleChange}
                                        placeholder="Share your story..."
                                    />
                                </Form.Group>
                            ) : (
                                <Card.Text>{profileData.bio || "No bio yet."}</Card.Text>
                            )}
                        </Card.Body>
                    </Card>

                    <Row>
                        <Col sm={6} className="mb-3">
                            <Card className="h-100 border-0 shadow-sm bg-light">
                                <Card.Body>
                                    <h4>Favorite Spot</h4>
                                    {isEditing ? (
                                        <Form.Control 
                                            type="text" 
                                            name="favoriteSpot"
                                            value={profileData.favoriteSpot}
                                            onChange={handleChange}
                                            placeholder="e.g. Birch Forest"
                                        />
                                    ) : (
                                        <p>{profileData.favoriteSpot || "None selected"}</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={6} className="mb-3">
                            <Card className="h-100 border-0 shadow-sm bg-light">
                                <Card.Body>
                                    <h4>Best Season</h4>
                                    {isEditing ? (
                                        <Form.Control 
                                            type="text" 
                                            name="bestSeason"
                                            value={profileData.bestSeason}
                                            onChange={handleChange}
                                            placeholder="e.g. Autumn"
                                        />
                                    ) : (
                                        <p>{profileData.bestSeason || "None selected"}</p>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}