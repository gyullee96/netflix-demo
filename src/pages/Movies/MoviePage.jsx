import { React, useState, useEffect } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovies'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import MovieCard from '../../common/MovieCard/MovieCard'
import ReactPaginate from 'react-paginate'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

// 경로 2가지
// nav바에서 클릭해서 온 경우 => popularMovie 보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여주기


const MoviePage = ({ id }) => {
    const navigate = useNavigate();
    const handleClick = (movieId) => {
        navigate(`/movies/${movieId}`); //무비디테일페이지로 이동
    }

    const [query, setQuery] = useSearchParams()
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const genreMap = {
        Action: 28,
        Adventure: 12,
        Animation: 16,
        Comedy: 35,
        Crime: 80,
        Documentary: 99,
        Drama: 18,
        Family: 10751,
        Fantasy: 14,
        History: 36,
        Horror: 27,
        Music: 10402,
        Mystery: 9648,
        Romance: 10749,
        'Science Fiction': 878,
        'TV Movie': 10770,
        Thriller: 53,
        War: 10752,
        Western: 37
    };
    const keyword = query.get("q");

    useEffect(() => {
        setPage(1)
    }, [keyword])
    // useEffect로 keyword가 바뀔 때 pagination을 1로 리셋

    const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page, genreId: selectedGenre, })
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
        <Container className='pt-3'>
            <Row>
                <Col lg={4} xs={12} className='d-flex flex-row pb-5'>
                    <DropdownButton id="dropdown-item-button" title="Sort">
                        <Dropdown.ItemText>Sort Results By</Dropdown.ItemText>
                        <Dropdown.Item as="button" onClick={() => setSortOrder('desc')}>
                            Popularity(Desc)
                        </Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => setSortOrder('asc')}>
                            Popularity(Asc)
                        </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton id="dropdown-item-button" title="Genres">
                        <Dropdown.ItemText>Genre</Dropdown.ItemText>
                        <Dropdown.Item onClick={() => setSelectedGenre(null)}>
                            All Genres
                        </Dropdown.Item>
                        {Object.keys(genreMap).map((genre) => (
                            <Dropdown.Item
                                as="button"
                                key={genre}
                                onClick={() => setSelectedGenre(genreMap[genre])}
                            >
                                {genre}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
                <Col lg={8} xs={12}>
                    <Row>
                        {data?.results?.length === 0 && keyword && (
                            <h1 className="pt-3 pb-3">요청하신 검색 결과가 없습니다</h1>
                        )}

                        {[...data?.results]
                            .filter((movie) =>
                                selectedGenre ? movie.genre_ids.includes(selectedGenre) : true
                            )
                            .sort((a, b) =>
                                sortOrder === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity
                            )
                            .map((movie, index) => (
                                <Col onClick={() => handleClick(movie.id)} key={index} lg={4} xs={6}>
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