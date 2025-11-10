import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

// --- Mock Data for Recommendations ---
// We'll organize recommendations by season, then by day type.
const recommendations = {
    Winter: {
        weekday: {
            title: "Peaceful Temple Stay",
            description: "Experience tranquility with a weekday temple stay. Participate in a tea ceremony and meditation.",
            img: "https://placehold.co/600x400/a2c4c9/white?text=Temple+Stay"
        },
        weekend: {
            title: "Winter Ice Fishing Festival",
            description: "Join the locals at the annual ice fishing festival! Try to catch your own fish and eat it fresh.",
            img: "https://placehold.co/600x400/d1e3e6/black?text=Ice+Fishing"
        }
    },
    Spring: {
        weekday: {
            title: "Quiet Cherry Blossom Walk",
            description: "Enjoy the cherry blossoms without the crowds on a peaceful weekday stroll through the main park.",
            img: "https://placehold.co/600x400/f5c6d0/black?text=Cherry+Blossoms"
        },
        weekend: {
            title: "Strawberry Picking Festival",
            description: "A fun weekend activity for everyone! Pick fresh strawberries at a local farm.",
            img: "https://placehold.co/600x400/e07a8b/white?text=Strawberries"
        }
    },
    Summer: {
        weekday: {
            title: "Local Market & Cooking Class",
            description: "Visit the bustling morning market and then learn to cook traditional Korean dishes.",
            img: "https://placehold.co/600x400/f7b733/black?text=Local+Market"
        },
        weekend: {
            title: "Boryeong Mud Festival Trip",
            description: "Join a weekend bus trip to the nearby Boryeong Mud Festival for a day of fun and excitement!",
            img: "https://placehold.co/600x400/8d7762/white?text=Mud+Festival"
        }
    },
    Fall: {
        weekday: {
            title: "Scenic Mountain Hiking",
            description: "Hike the nearby mountains on a crisp weekday to see the stunning autumn foliage.",
            img: "https://placehold.co/600x400/d9885b/white?text=Mountain+Hiking"
        },
        weekend: {
            title: "Annual Harvest Moon Festival",
            description: "Experience traditional games, food, and performances at the weekend harvest festival.",
            img: "https://placehold.co/600x400/f2a65a/black?text=Harvest+Festival"
        }
    }
};

/**
 * Helper function to get the current season.
 * @param {Date} date - The current date.
 * @returns {'Winter'|'Spring'|'Summer'|'Fall'}
 */
function getSeason(date) {
    const month = date.getMonth(); // 0-11
    if (month >= 2 && month <= 4) return 'Spring'; // Mar-May
    if (month >= 5 && month <= 7) return 'Summer'; // Jun-Aug
    if (month >= 8 && month <= 10) return 'Fall';   // Sep-Nov
    return 'Winter'; // Dec-Feb
}

/**
 * Helper function to determine if it's a weekend.
 * @param {Date} date - The current date.
 * @returns {'weekday'|'weekend'}
 */
function getDayType(date) {
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday
    return (day === 0 || day === 6) ? 'weekend' : 'weekday';
}

/**
 * Gets the recommended activity based on the current date.
 */
function getRecommendedActivity() {
    const today = new Date();
    const season = getSeason(today);
    const dayType = getDayType(today);
    
    return recommendations[season][dayType];
}


export default function Home(props) {
    
    // Get today's recommended activity
    const activity = getRecommendedActivity();

    return (
        <div>
            {/* 1. Hero Section */}
            <Container fluid className="p-5 mb-4 bg-light rounded-3 text-center">
                <h1 className="display-4">Welcome to Hahoe (하회마을)</h1>
                <p className="lead">Discover the timeless beauty of a traditional Korean village preserved for centuries.</p>
                <Button variant="primary" size="lg">Explore Locations</Button>
            </Container>

            {/* 2. Recommended Activity Section */}
            <Container>
                <Row className="justify-content-center">
                    <Col md={8}>
                        <h2 className="text-center mb-4">Today's Recommended Activity</h2>
                        <Card className="shadow-sm">
                            <Card.Img 
                                variant="top" 
                                src={activity.img} 
                                alt={activity.title}
                                style={{ 
                                    height: '300px', 
                                    objectFit: 'cover' 
                                }}
                            />
                            <Card.Body>
                                <Card.Title as="h3">{activity.title}</Card.Title>
                                <Card.Text>
                                    {activity.description}
                                </Card.Text>
                                <Button variant="outline-success">Learn More</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}