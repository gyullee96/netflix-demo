import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { Alert } from 'bootstrap'
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const PopularMovieSlide = () => {

    const { data, isLoading, isError, error } = usePopularMoviesQuery()
    console.log('ddd', data)

    if (isError) {
        return <Alert variant='danger'>{error.message}</Alert>
    }
    return (
        <div style={{ padding: '2%' }}>
            <MovieSlider title='Popular Movies' movies={data.results} responsive={responsive} />
        </div>
    )
}

export default PopularMovieSlide