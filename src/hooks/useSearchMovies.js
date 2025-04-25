import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page, genreId }) => {
    const safePage = Math.min(Math.max(page, 1), 500);

    if (genreId) {
        return api.get(`/discover/movie?with_genres=${genreId}&page=${safePage}`);
    }

    return keyword
        ? api.get(`/search/movie?query=${keyword}&page=${page}`)
        : api.get(`/movie/popular?page=${safePage}`)
}


export const useSearchMovieQuery = ({ keyword, page, genreId }) => {
    return useQuery({
        queryKey: ['movie-search', { keyword, page, genreId }],
        queryFn: () => fetchSearchMovie({ keyword, page, genreId }),
        select: (result) => result.data,
    })
}