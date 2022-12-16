import React from 'react'
import MoviePage from './MoviePage'
import { useParams } from 'react-router-dom'

const Catalog = () => {
    const { category } = useParams()
    return (
        <div className="page-container mb-10">
            <MoviePage category={category}></MoviePage>
        </div>
    )
}

export default Catalog