import React, { Suspense } from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner'

// 1. 배너 = popular영화를 들고와서 첫번째 아이템을 보여주자
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie

const Homepage = () => {
    return (
        <div>
            <Suspense fallback={<LoadingSpinner />}>
                <Banner />
                <PopularMovieSlide />
                <TopRatedMovieSlide />
                <UpcomingMovieSlide />
            </Suspense>
        </div>
    )
}

export default Homepage