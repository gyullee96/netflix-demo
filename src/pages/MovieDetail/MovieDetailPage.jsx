import React, { useState } from 'react'
import './MovieDetail.style.css'
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import { useMovieRecommendQuery } from '../../hooks/useMovieRecommend';
import { useMovieVideoQuery } from '../../hooks/useMovieVideos';
import { useParams } from 'react-router-dom';
import { Alert, Container, Row, Col, Badge, Modal, Button } from 'react-bootstrap';
import YouTube from 'react-youtube';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
        <Container className='pt-3'>
            <Row>
                <Col lg={6} xs={12}>
                    <img src={`https://www.themoviedb.org/t/p/w1280${detailData?.poster_path}`} alt="" className="img-fluid" />
                </Col>

                <Col lg={6} xs={12}>
                    {detailData?.genres?.map((genre) => (<Badge bg="danger" className='me-1'>{genre.name}</Badge>))}
                    <h1 className='movie-title'>{detailData?.title}</h1>
                    <h2 className='movie-popularity'>인기도: {detailData?.popularity}</h2>
                    <h3 className='movie-overview'>{detailData?.overview}</h3>
                    <h2 className='movie-budget'>예산: {detailData?.budget.toLocaleString()}</h2>
                    <h2>개봉일: {detailData?.release_date}</h2>
                </Col>
            </Row>
            <Row className='pt-5 pb-5'>
                <Button variant="primary" onClick={() => setShow(true)} className='fs-5'>
                    예고편 보기 (Click!)
                </Button>

                <Modal show={show} onHide={() => setShow(false)} centered size='xl' className='modal'>
                    <Modal.Body>
                        <YouTube
                            videoId={videoData?.results?.find(video => video.type === 'Trailer')?.key}
                            opts={videoOpts} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setShow(false)}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Row>
            <Row className='moviereview'>
                <Col lg={12} s={12}>
                    <h2>영화 리뷰</h2>

                    {reviewData?.results?.map((review) => (
                        <ReviewItem key={review.id} review={review} />
                    ))}
                </Col>
            </Row>

            <Row className='recommendmovie'>
                <h1>추천 영화</h1>
                {recommendData?.results?.map((movie, index) => (
                    <Col lg={3} sm={4} key={index} className="mb-3">
                        <div
                            className="recommend-movie-card"
                            onClick={() => navigate(`/movies/${movie.id}`)}
                        >
                            <img
                                src={`https://www.themoviedb.org/t/p/w1280${movie.poster_path}`}
                                alt=""
                                className="img-fluid"
                            />
                            <div className='recommend-overlay'>
                                <h1 className='movie-card-title'>{movie.title}</h1>
                                <div>
                                    <div>{movie.vote_average}</div>
                                    <div>{movie.popularity}</div>
                                    <div>{movie.adult ? 'over18' : 'under18'}</div>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container >
    )
}

export default MovieDetailPage