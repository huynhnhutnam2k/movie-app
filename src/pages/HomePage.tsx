import React from 'react'
import Banner from '../components/Banner/Banner'
import MovieList from '../components/movie-list/MovieList'

const HomePage = () => {
    return (
        <>
            <Banner></Banner>
            <MovieList type='movie' category="movie"></MovieList>
            <MovieList type='tv' category="tv"></MovieList>
        </>
    )
}

export default HomePage