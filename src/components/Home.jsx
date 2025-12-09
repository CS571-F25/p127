import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import injeTempleImg from './images/InjeTemple.jpg'; 

const recommendations = {
    Winter: {
        weekday: {
            title: "Peaceful Temple Stay",
            description: "Experience tranquility with a weekday temple stay. Participate in a tea ceremony and meditation.",
            img: injeTempleImg, 
            locationId: "baekdamsa"
        },
        weekend: {
            title: "Winter Ice Fishing Festival",
            description: "Join the locals at the annual ice fishing festival! Inje is famous for its Bingeo (smelt) fishing.",
            img: "https://placehold.co/600x400/d1e3e6/black?text=Ice+Fishing",
            locationId: "bingeo-festival"
        }
    },
    Spring: {
        weekday: {
            title: "Quiet Cherry Blossom Walk",
            description: "Enjoy the cherry blossoms without the crowds on a peaceful weekday stroll through the main park.",
            img: "https://placehold.co/600x400/f5c6d0/black?text=Cherry+Blossoms",
            locationId: "wondae-ri" 
        },
        weekend: {
            title: "Strawberry Picking Festival",
            description: "A fun weekend activity for everyone! Pick fresh strawberries at a local farm.",
            img: "https://placehold.co/600x400/e07a8b/white?text=Strawberries",
            locationId: "naerincheon" 
        }
    },
    Summer: {
        weekday: {
            title: "Naerincheon River Rafting",
            description: "Experience thrilling whitewater rafting on the Naerincheon River, one of Korea's best rafting spots.",
            img: "https://placehold.co/600x400/f7b733/black?text=River+Rafting",
            locationId: "naerincheon"
        },
        weekend: {
            title: "Inje Speedium Race Day",
            description: "Feel the excitement at the Inje Speedium, a professional racetrack with events happening most weekends.",
            img: "https://placehold.co/600x400/8d7762/white?text=Speedium",
            locationId: "speedium"
        }
    },
    Fall: {
        weekday: {
            title: "Wondae-ri Birch Forest Walk",
            description: "Hike through the stunning, white-barked birch forest on a crisp, quiet weekday.",
            img: "https://placehold.co/600x400/d9885b/white?text=Birch+Forest",
            locationId: "wondae-ri"
        },
        weekend: {
            title: "Annual Harvest Moon Festival",
            description: "Experience traditional games, food, and performances at the weekend harvest festival.",
            img: "https://placehold.co/600x400/f2a65a/black?text=Harvest+Festival",
            locationId: "bingeo-festival" 
        }
    }
};

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

function getRecommendedActivity() {
    const today = new Date();
    const season = getSeason(today);
    const dayType = getDayType(today);
    return recommendations[season][dayType];
}

export default function Home(props) {
    
    const activity = getRecommendedActivity();

    return (
        <div>
            <div className="p-5 mb-4 bg-dark text-white rounded-3 text-center" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(src/components/images/InjeLandscape.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <Container fluid className="py-5">
                    <h1 className="display-4 fw-bold">Welcome to Inje (인제)</h1>
                    <p className="col-md-8 fs-4 mx-auto">Discover the natural wonders of Gangwon Province, from soaring mountains to rushing rivers.</p>
                    <Button variant="primary" size="lg" as={Link} to="/locations">Explore Locations</Button>
                </Container>
            </div>

            <Container>
                <Row className="mb-5 text-center">
                    <Col md={4} className="mb-3">
                        <div className="h1" aria-hidden="true">🏔️</div>
                        <h3>Seoraksan National Park</h3>
                        <p>Home to some of the most beautiful peaks in Korea, accessible right from Inje.</p>
                    </Col>
                    <Col md={4} className="mb-3">
                        <div className="h1" aria-hidden="true">🌊</div>
                        <h3>Clean Waters</h3>
                        <p>Famous for the Naerincheon River, offering the best rafting experiences in the country.</p>
                    </Col>
                    <Col md={4} className="mb-3">
                        <div className="h1" aria-hidden="true">🏎️</div>
                        <h3>Inje Speedium</h3>
                        <p>A world-class racing circuit and hotel resort for thrill-seekers.</p>
                    </Col>
                </Row>

                <hr className="my-5" />

                <Row className="justify-content-center">
                    <Col lg={10}>
                        <h2 className="text-center mb-4">Today's Local Pick <Badge bg="secondary">New</Badge></h2>
                        <Card className="shadow border-0">
                            <Row className="g-0">
                                <Col md={6}>
                                    <Card.Img 
                                        src={activity.img} 
                                        alt={activity.title}
                                        style={{ height: '100%', objectFit: 'cover', minHeight: '300px' }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Card.Body className="d-flex flex-column justify-content-center h-100 p-4">
                                        <Card.Title as="h3">{activity.title}</Card.Title>
                                        <Card.Text className="lead">
                                            {activity.description}
                                        </Card.Text>
                                        <div className="mt-3">
                                            <Button 
                                                as={Link} 
                                                to={`/locations#${activity.locationId}`} 
                                                variant="outline-success"
                                            >
                                                Find this Location
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}