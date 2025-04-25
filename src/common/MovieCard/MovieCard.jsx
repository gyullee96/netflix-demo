import React from 'react'
import Badge from 'react-bootstrap/Badge';
import './MovieCard.style.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useNavigate } from 'react-router-dom';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';

const MovieCard = ({ movie, id }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movies/${id}`); //무비디테일페이지로 이동
    }

    const { data: genreData } = useMovieGenreQuery()

    const showGenre = (genreIdList) => {
        if (!genreData) return []
        const genreNameList = genreIdList.map((id) => {
            const genreObj = genreData.find((genre) => genre.id === id)
            return genreObj.name;
        })

        return genreNameList
    }

    return (
        <div
            style={{ backgroundImage: "url(" + `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ")", }}
            className='movie-card'
            onClick={handleClick}
        >
            <div className='overlay'>
                <h1 className='movie-card-title'>{movie.title}</h1>
                {showGenre(movie.genre_ids).map((genre, index) => (<Badge bg="danger" key={index} className='me-1'>{genre}</Badge>))}
                <div>
                    <div>{movie.vote_average}</div>
                    <div>{movie.popularity}</div>
                    <div>{movie.adult ? 'over18' : 'under18'}</div>
                </div>
            </div>
        </ div>
    )
}

export default MovieCard