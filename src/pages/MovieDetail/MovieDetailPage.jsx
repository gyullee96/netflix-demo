import React, { useState } from 'react'
import './MovieDetail.style.css'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import { useMovieRecommendQuery } from '../../hooks/useMovieRecommend';
import { useMovieVideoQuery } from '../../hooks/useMovieVideos';
import { useParams } from 'react-router-dom';
import { Alert, Container, Row, Col, Badge, Modal, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';

const ReviewItem = ({ review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 300; // 기준 글자 수

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const shortContent = review.content.slice(0, maxLength);
    const isLong = review.content.length > maxLength;

    return (
        <div className='review'>
            <h3>{review.author}</h3>
            <p>
                {isExpanded || !isLong ? review.content : `${shortContent}...`}
            </p>
            {isLong && (
                <button className='toggle-btn' onClick={toggleExpand}>
                    {isExpanded ? '접기' : '더보기'}
                </button>
            )}
        </div>
    );
};

const MovieDetailPage = () => {
    const [show, setShow] = useState(false);
    const { id } = useParams();
    const videoOpts = {
        width: '100%',
        height: '400', // 또는 vh 단위도 가능 e.g. '60vh'
        playerVars: {
            autoplay: 1,
        },
    };

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

    const {
        data: recommendData,
        isLoading: isRecommendLoading,
        isError: isRecommendError,
        error: recommendError
    } = useMovieRecommendQuery(id);

    const {
        data: videoData,
        isLoading: isVideoLoading,
        isError: isVideoError,
        error: videoError
    } = useMovieVideoQuery(id);

    console.log("reviewdata", reviewData)
    console.log("recommenddata", recommendData)
    console.log("videodata", videoData)

    if (isDetailLoading || isReviewLoading || isRecommendLoading || isVideoLoading) {
        return <h1>Loading...</h1>
    }
    if (isDetailError) {
        return <Alert variant='danger'>{detailError.message}</Alert>
    }
    if (isReviewError) {
        return <Alert variant='danger'>{reviewError.message}</Alert>
    }
    if (isRecommendError) {
        return <Alert variant='danger'>{recommendError.message}</Alert>
    }
    if (isVideoError) {
        return <Alert variant='danger'>{videoError.message}</Alert>
    }
    return (
        <Container>
            <Row>
                <Col lg={6} xs={6}>
                    <img src={`https://www.themoviedb.org/t/p/w1280${detailData.poster_path}`} alt="" className="img-fluid" />
                </Col>
                <Col lg={6} xs={6}>
                    {detailData?.genres?.map((genre) => (<Badge bg="danger" className='me-1'>{genre.name}</Badge>))}
                    <h1 className='movie-title'>{detailData.title}</h1>
                    <h2 className='movie-popularity'>{detailData.popularity}</h2>
                    <h3 className='movie-overview'>{detailData.overview}</h3>
                    <h2 className='movie-budget'>{detailData.budget.toLocaleString()}</h2>
                    <h2>{detailData.release_date}</h2>
                </Col>
            </Row>
            <Row className='moviereview'>
                <Col lg={12} s={12}>
                    <h2>Movie Review</h2>

                    {reviewData?.results?.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))}
                </Col>
            </Row>
            <Row className='recommendmovie'>
                <h1>추천 영화</h1>
                {recommendData?.results?.map((imgs, index) => (
                    <Col lg={6} sm={12} key={index} className="mb-3">
                        <img
                            src={`https://www.themoviedb.org/t/p/w1280${imgs.backdrop_path}`}
                            alt=""
                            className="img-fluid"
                        />
                    </Col>
                ))}
            </Row>
            <Row>
                <Button variant="primary" onClick={() => setShow(true)}>
                    예고편 보기
                </Button>

                <Modal show={show} onHide={() => setShow(false)} centered size='xl' className='modal'>
                    <Modal.Body>
                        <YouTube
                            videoId={videoData?.results?.[0]?.key}
                            opts={videoOpts} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setShow(false)}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
        </Container >
    )
}

export default MovieDetailPage