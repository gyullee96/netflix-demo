import React from 'react'
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies'
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import { useUpcomingMoviesQuery } from '../../../../hooks/useUpcomingMovies';
import Alert from 'react-bootstrap/Alert';
import "./Banner.style.css"

const Banner = () => {

    const {
        data: popularData,
        isLoading: isPopularLoading,
        isError: isPopularError,
        error: popularError
    } = usePopularMoviesQuery();

    const {
        data: topratedData,
        isLoading: isTopRatedLoading,
        isError: isTopRatedError,
        error: topratedError
    } = useTopRatedMoviesQuery()

    const {
        data: upcomingData,
        isLoading: isUpcomingLoading,
        isError: isUpcomingError,
        error: upcomingError
    } = useUpcomingMoviesQuery()

    if (isPopularError) return <Alert variant="danger">{popularError.message}</Alert>;
    if (isTopRatedError) return <Alert variant="danger">{topratedError.message}</Alert>;
    if (isUpcomingError) return <Alert variant="danger">{upcomingError.message}</Alert>;

    return (
        <div style={{
            backgroundImage:
                "url(" + `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${popularData?.results[0].poster_path}` + ")"
        }}
            className='banner'
        >
            <div className='text-white banner-text-area'>
                <h1>{popularData?.results[0].title}</h1>
                <p>{popularData?.results[0].overview}</p>
            </div>
        </div>
    )
}

export default Banner