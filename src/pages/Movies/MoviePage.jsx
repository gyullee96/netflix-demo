import { React, useState, useEffect } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여주기


const MoviePage = ({ id }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movies/${id}`); //무비디테일페이지로 이동
    }

    const [query, setQuery] = useSearchParams()
    const [page, setPage] = useState(1);
    const keyword = query.get("q");

    useEffect(() => {
        setPage(1)
    }, [keyword])
    // useEffect로 keyword가 바뀔 때 pagination을 1로 리셋

    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page })
    // console.log('ddd', data);

    const handlePageClick = ({ selected }) => (
        setPage(selected + 1)
    );

    if (isLoading) {
        return (
            <div className='spinner-area'>
                <Spinner
                    animation='border'
                    variant='danger'
                    style={{ width: '5rem', height: '5rem' }}
                />
            </div>
        );
    }

    if (isError) {
        return <Alert variant='danger'>{error.message}</Alert>
    }

    return (
        <Container>
            <Row>
                <Col lg={4} xs={12}>
                    {""}
                    필터{""}
                </Col>
                <Col lg={8} xs={12}>
                    <Row>
                        {data?.results?.length === 0 && keyword && (
                            <h1>검색결과가 없습니다</h1>
                        )}

                        {data?.results?.map((movie, index) => (
                            <Col onClick={handleClick} key={index} lg={4} xs={12}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={(data?.total_pages) < 500 ? data?.total_pages : 500} // 전체 페이지가 몇 개인지
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={page - 1}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default MoviePage