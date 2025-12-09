import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useUser } from '../contexts/UserContext';
import { useLocation } from 'react-router-dom';
import injeForestImg from './images/InjeForest.jpg';
import injeRiverImg from './images/InjeRiver.jpg';
import injeFestivalImg from './images/InjeFestival.jpg';
import injeSpeediumImg from './images/InjeSpeedium.jpg';
import injeTempleImg from './images/InjeTemple.jpg';

function getSeason(date) {
    const month = date.getMonth(); 
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
}

function getDayType(date) {
    const day = date.getDay();
    return (day === 0 || day === 6) ? 'weekend' : 'weekday';
}

const locationsData = [
    {
        id: "wondae-ri",
        name: "Wondae-ri Birch Forest",
        description: "A stunning, sprawling forest of over 700,000 white birch trees. A magical healing walk in any season.",
        image: injeForestImg,
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
        image: injeRiverImg,
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
        image: injeFestivalImg,
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
        image: injeSpeediumImg,
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
    },
    {
        id: "baekdamsa",
        name: "Baekdamsa Temple",
        description: "A historic Inje temple located deep in the Inner Seoraksan mountains. A place of profound silence, spiritual healing, and stone towers.",
        image: injeTempleImg,
        initialFavCount: 156,
        activities: {
            Winter: {
                weekday: { title: "Winter Meditation Stay", exclusive: null },
                weekend: { title: "Snowy Temple Photography", exclusive: null }
            },
            Spring: {
                weekday: { title: "Lotus Lantern Making", exclusive: null },
                weekend: { title: "Buddha's Birthday Celebration", exclusive: "Event-Based" }
            },
            Summer: {
                weekday: { title: "Cool Valley Meditation", exclusive: null },
                weekend: { title: "Templestay Experience", exclusive: null }
            },
            Fall: {
                weekday: { title: "Autumn Prayer Walk", exclusive: "Best Foliage" },
                weekend: { title: "Maple Leaf Festival", exclusive: "Best Foliage" }
            }
        }
    }
];


export default function Locations(props) {
    
    const currentSeason = getSeason(new Date());
    const currentDayType = getDayType(new Date());
    const { hash } = useLocation();
    useEffect(() => {
        if (hash) {
            const id = hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                element.style.transition = 'transform 0.3s';
                element.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 1000);
            }
        }
    }, [hash]);

    return (
        <Container>
            <h1 className="mb-3">Explore Inje</h1>
            <p className="lead mb-4">
                From serene forests to thrilling rapids, discover the best destinations Inje has to offer.
                Below are today's recommendations for each location.
            </p>

            <Row>
                {locationsData.map(location => (
                    <Col 
                        md={6} 
                        lg={4} 
                        className="mb-4" 
                        key={location.id}
                        id={location.id} 
                    >
                        <LocationCard 
                            location={location} 
                            season={currentSeason}
                            dayType={currentDayType}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

function LocationCard({ location, season, dayType }) {
    
    const activity = location.activities[season][dayType];
    const { user } = useUser();
    
    const [favCount, setFavCount] = useState(location.initialFavCount);
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavorite = () => {
        if (!user) {
            return;
        }

        if (isFavorited) {
            setFavCount(favCount - 1);
            setIsFavorited(false);
        } else {
            setFavCount(favCount + 1);
            setIsFavorited(true);
        }
    };

    return (
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
                        disabled={!user}
                        title={user ? "Like this location" : "Login to like"}
                    >
                        ♡ {favCount}
                    </Button>
                </div>
                
                <Card.Text className="text-muted small mb-3">
                    {location.description}
                </Card.Text>

                <div className="mt-auto">
                    <hr />
                    <h6 className="text-dark">Today's Recommendation</h6>
                    <p className="mb-1">{activity.title}</p>
                    {activity.exclusive && (
                        <Badge bg="info" text="dark">{activity.exclusive}</Badge>
                    )}
                </div>
            </Card.Body>
            <Card.Footer>
                <Button variant="outline-primary" className="w-100">
                    View Details
                </Button>
            </Card.Footer>
        </Card>
    );
}