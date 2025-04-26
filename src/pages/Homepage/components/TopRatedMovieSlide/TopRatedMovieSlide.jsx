import React from 'react'
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies'
import { Alert } from 'bootstrap'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';

const TopRatedMovieSlide = () => {

    const { data, isLoading, isError, error } = useTopRatedMoviesQuery()

    if (isError) {
        return <Alert variant='danger'>{error.message}</Alert>
    }
    return (
        <div style={{ padding: '2%' }}>
            <MovieSlider title='TopRated Movies' movies={data.results} responsive={responsive} />
        </div>
    )
}

export default TopRatedMovieSlide