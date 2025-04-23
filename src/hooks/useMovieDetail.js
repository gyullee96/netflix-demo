import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = () => {
    return api.get(`/movie/${movie_id}`)
}

export const useMovieDetailQuery = () => {
    return useQuery({
        queryKey: ['movie-detail'],
        queryFn: fetchMovieDetail,
        select: (result) => result.data,
    })
}