import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setMovie } from "../actions/movieActions";
import { Link } from 'react-router-dom';
import { Image, Nav, Carousel, Spinner } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movie.movies);

    // Memoize the movies array
    const memoizedMovies = useMemo(() => {
        return movies || [];
    }, [movies]);

    useEffect(() => {
        // IMPORTANT: fetch with reviews=true so avgRating is included
        dispatch(fetchMovies(true)); // make sure your action supports this flag
    }, [dispatch]);

    const handleSelect = (selectedIndex) => {
        dispatch(setMovie(memoizedMovies[selectedIndex]));
    };

    const handleClick = (movie) => {
        dispatch(setMovie(movie));
    };

    if (!memoizedMovies.length) {
        return (
            <div className="text-center mt-5 text-light">
                <Spinner animation="border" variant="light" />
                <p>Loading movies...</p>
            </div>
        );
    }

    return (
        <Carousel onSelect={handleSelect} className="bg-dark text-light p-4 rounded">
            {memoizedMovies.map((movie) => (
                <Carousel.Item key={movie._id}>
                    <Nav.Link
                        as={Link}
                        to={`/movie/${movie._id}`}
                        onClick={() => handleClick(movie)}
                    >
                        <Image
                            className="image"
                            src={movie.imageUrl || "https://via.placeholder.com/300x400?text=No+Image"}
                            alt={movie.title}
                            thumbnail
                        />
                    </Nav.Link>
                    <Carousel.Caption>
                        <h3>{movie.title}</h3>
                        <BsStarFill /> {movie.avgRating?.toFixed(1) || 'N/A'} &nbsp;&nbsp; {movie.releaseDate}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default MovieList;
