import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';

// --- Helper Functions (Copied from Home.jsx) ---

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

// --- Mock Data for Locations ---
// This data structure holds all locations and their specific seasonal activities.
const locationsData = [
    {
        id: "wondae-ri",
        name: "Wondae-ri Birch Forest",
        description: "A stunning, sprawling forest of over 700,000 white birch trees. A magical healing walk in any season.",
        image: "https://placehold.co/600x400/ECEFF1/78909C?text=Wondae-ri+Forest",
        initialFavCount: 128,
        activities: {
            Winter: {
                weekday: { title: "Quiet Snowy Hike", exclusive: null },
                weekend: { title: "Guided Snowshoeing Tour", exclusive: null }
            },
            Spring: {
                weekday: { title: "Forest Birdwatching", exclusive: null },
                weekend: { title: "Spring Wildflower Photography", exclusive: null }
            },
            Summer: {
                weekday: { title: "Cool Forest Bathing (산림욕)", exclusive: null },
                weekend: { title: "Family Picnic & Nature Crafting", exclusive: null }
            },
            Fall: {
                weekday: { title: "Peak Autumn Foliage Walk", exclusive: "Best in Oct-Nov" },
                weekend: { title: "Autumn Leaf Peeping", exclusive: "Best in Oct-Nov" }
            }
        }
    },
    {
        id: "naerincheon",
        name: "Naerincheon River",
        description: "One of Korea's most famous rivers, offering clear waters that rush down from the mountains. The home of thrilling water sports.",
        image: "https://placehold.co/600x400/B2EBF2/006064?text=Naerincheon+River",
        initialFavCount: 92,
        activities: {
            Winter: {
                weekday: { title: "Frozen Riverbed Trekking", exclusive: null },
                weekend: { title: "View the Icy Scenery", exclusive: null }
            },
            Spring: {
                weekday: { title: "Relaxing Riverside Walk", exclusive: null },
                weekend: { title: "Fly Fishing Season Opening", exclusive: "Spring Only" }
            },
            Summer: {
                weekday: { title: "Whitewater Rafting (Advanced)", exclusive: "Summer Only" },
                weekend: { title: "Guided Group Rafting", exclusive: "Summer Only" }
            },
            Fall: {
                weekday: { title: "Riverside Camping", exclusive: null },
                weekend: { title: "Autumn Kayaking", exclusive: null }
            }
        }
    },
    {
        id: "bingeo-festival",
        name: "Inje Bingeo (Smelt) Festival",
        description: "A world-famous festival where thousands gather on the frozen Soyang Lake to catch tiny, translucent smelt (bingeo).",
        image: "https://placehold.co/600x400/E3F2FD/1E88E5?text=Bingeo+Festival",
        initialFavCount: 204,
        activities: {
            Winter: {
                weekday: { title: "Ice Fishing (Less Crowded)", exclusive: "Winter Only" },
                weekend: { title: "Festival Main Events & Ice Soccer", exclusive: "Winter Only" }
            },
            Spring: {
                weekday: { title: "Off-Season: View the Lake", exclusive: null },
                weekend: { title: "Off-Season: View the Lake", exclusive: null }
            },
            Summer: {
                weekday: { title: "Off-Season: View the Lake", exclusive: null },
                weekend: { title: "Off-Season: View the Lake", exclusive: null }
            },
            Fall: {
                weekday: { title: "Off-Season: View the Lake", exclusive: null },
                weekend: { title: "Off-Season: View the Lake", exclusive: null }
            }
        }
    },
    {
        id: "speedium",
        name: "Inje Speedium",
        description: "A professional, world-class motorsports racetrack surrounded by mountains, also featuring a hotel and a classic car museum.",
        image: "https://placehold.co/600x400/616161/FFFFFF?text=Inje+Speedium",
        initialFavCount: 45,
        activities: {
            Winter: {
                weekday: { title: "Classic Car Museum Visit", exclusive: null },
                weekend: { title: "Winter Drift Racing Event", exclusive: "Event-Based" }
            },
            Spring: {
                weekday: { title: "Circuit Karting Experience", exclusive: null },
                weekend: { title: "Super Race Championship Opening", exclusive: "Event-Based" }
            },
            Summer: {
                weekday: { title: "Circuit Karting Experience", exclusive: null },
                weekend: { title: "Summer Night Race", exclusive: "Event-Based" }
            },
            Fall: {
                weekday: { title: "Classic Car Museum Visit", exclusive: null },
                weekend: { title: "Track Day & Race Finals", exclusive: "Event-Based" }
            }
        }
    }
];


export default function Locations(props) {
    
    // Get the current season and day type to pass to cards
    const currentSeason = getSeason(new Date());
    const currentDayType = getDayType(new Date());

    return (
        <Container>
            <h1 className="mb-3">Explore Inje</h1>
            <p className="lead mb-4">
                From serene forests to thrilling rapids, discover the best destinations Inje has to offer.
                Below are today's recommendations for each location.
            </p>

            <Row>
                {locationsData.map(location => (
                    <LocationCard 
                        key={location.id} 
                        location={location} 
                        season={currentSeason}
                        dayType={currentDayType}
                    />
                ))}
            </Row>
        </Container>
    );
}

/**
 * A sub-component to render a single location card.
 * This keeps the logic clean inside the map function.
 */
function LocationCard({ location, season, dayType }) {
    
    // Get the specific activity for today
    const activity = location.activities[season][dayType];
    
    // State for managing favorites (as planned in your description)
    const [favCount, setFavCount] = useState(location.initialFavCount);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavorite = () => {
        if (isFavorited) {
            setFavCount(favCount - 1);
            setIsFavorited(false);
        } else {
            setFavCount(favCount + 1);
            setIsFavorited(true);
        }
    };

    return (
        <Col md={6} lg={4} className="mb-4">
            <Card className="h-100 shadow-sm">
                <Card.Img 
                    variant="top" 
                    src={location.image}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start">
                        <Card.Title className="mb-1">{location.name}</Card.Title>
                        <Button 
                            variant={isFavorited ? "danger" : "outline-danger"} 
                            size="sm" 
                            onClick={handleFavorite}
                        >
                            ♡ {favCount}
                        </Button>
                    </div>
                    
                    <Card.Text className="text-muted small mb-3">
                        {location.description}
                    </Card.Text>

                    {/* This section Spacer */}
                    <div className="mt-auto">
                        <hr />
                        <h6 className="text-dark">Today's Recommendation</h6>
                        <p className="mb-1">{activity.title}</p>
                        {activity.exclusive && (
                            <Badge bg="info" text="dark">{activity.exclusive}</Badge>
                        )}
                    </div>
                </Card.Body>
                {/* We can add the "expand" logic to this button later */}
                <Card.Footer>
                    <Button variant="outline-primary" className="w-100">
                        View Details
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    );
}