import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetMovieGenre = () => {
    return api.get(`/genre/movie/list`)
}

export const useMovieGenreQuery = () => {
    return useQuery({
        queryKey: ['movie-genre'],
        queryFn: fetMovieGenre,
        select: (result) => result.data.genres,
        staleTime: 300000, //5분
    })
}