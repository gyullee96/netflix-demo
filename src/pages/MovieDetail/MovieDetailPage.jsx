import React from 'react'
import './MovieDetail.style.css'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import { useParams } from 'react-router-dom';
import { Alert, Container, Row, Col, Badge } from 'react-bootstrap';

const MovieDetailPage = () => {

    const { id } = useParams();
    const {
        data: detailData,
        isLoading: isDetailLoading,
        isError: isDetailError,
        error: detailError
    } = useMovieDetailQuery(id);

    const {
        data: reviewData,
        isLoading: isReviewLoading,
        isError: isReviewError,
        error: reviewError
    } = useMovieReviewQuery(id);

    console.log("reviewdata", reviewData)

    if (isDetailLoading || isReviewLoading) {
        return <h1>Loading...</h1>
    }
    if (isDetailError) {
        return <Alert variant='danger'>{detailError.message}</Alert>
    }
    if (isReviewError) {
        return <Alert variant='danger'>{reviewError.message}</Alert>
    }
    return (
        <Container>
            <Row>
                <Col lg={6} xs={6}>
                    <img src={`https://www.themoviedb.org/t/p/w1280${detailData.poster_path}`} alt="" className="img-fluid" />
                </Col>
                <Col lg={6} xs={6}>
                    {detailData.genres.map((genre) => (<Badge bg="danger" className='me-1'>{genre.name}</Badge>))}
                    <h1 className='movie-title'>{detailData.title}</h1>
                    <h2 className='movie-popularity'>{detailData.popularity}</h2>
                    <h3 className='movie-overview'>{detailData.overview}</h3>
                    <h2 className='movie-budget'>{detailData.budget}</h2>
                    <h2>{detailData.release_date}</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Movie Review</h2>

                    {reviewData.results.map((review) => (
                        <div key={review.id}>
                            <h3>{review.author}</h3>
                            <p>{review.content}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container >
    )
}

export default MovieDetailPage