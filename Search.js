import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Container, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { getToken } from './authentication';

function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.REACT_APP_URL}/movies/search`, { query }, {
                headers: { Authorization: getToken() }
        });
        setResults(res.data.data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};

return (
    <Container className="mt-4 text-light">
        <Form onSubmit={handleSearch} className="mb-4">
            <Form.Group controlId="searchQuery">
                <Form.Label>Search Movies or Actors</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">Search</Button>
        </Form>

        {loading ? <Spinner animation="border" /> : (
            <Row>
                {results.map(movie => (
                    <Col md={4} key={movie._id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={movie.imageUrl || 'https://via.placeholder.com/300x400?text=No+Image'} />
                            <Card.Body>
                                <Card.Title>{movie.title}</Card.Title>
                                <Card.Text>Genre: {movie.genre}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        )}
    </Container>
);
}

export default Search;