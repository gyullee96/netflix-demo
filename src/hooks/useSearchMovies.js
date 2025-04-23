import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page }) => {
    const safePage = Math.min(Math.max(page, 1), 500)
    return keyword
        ? api.get(`/search/movie?query=${keyword}&page=${page}`)
        : api.get(`/movie/popular?page=${safePage}`)
}


export const useSearchMovieQuery = ({ keyword, page }) => {
    return useQuery({
        queryKey: ['movie-search', { keyword, page }],
        queryFn: () => fetchSearchMovie({ keyword, page }),
        select: (result) => result.data,
    })
}