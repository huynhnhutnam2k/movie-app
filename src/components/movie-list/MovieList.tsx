import React, { useEffect, useState } from 'react'
import IonIcon from '@reacticons/ionicons';
import { Swiper, SwiperSlide } from 'swiper/react'
import MovieCard from '../movie-card/MovieCard';
import 'swiper/css'
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../utils';
interface IProp {
    category?: string
    type: string,
    kind?: string
}
const MovieList: React.FC<IProp> = ({ type = "movie", kind = "popular" }) => {
    const { data } = useSWR(tmdbAPI.getList(type, 'popular'), fetcher)
    const [movieList, setMovieList] = useState([])
    useEffect(() => {
        if (data) {
            setMovieList(data.results)
        }
    }, [data])
    return (
        <div className="page-container select-none mb-20">
            <div className="flex justify-between w-full h-8 items-center">
                <div className="font-bold capitalize text-xl">{type}</div>
                <div className="flex items-center gap-x-2">
                    <div className="w-8 h-8 flex justify-center items-center bg-black text-white text-xl rounded-full cursor-pointer"><IonIcon name="chevron-back-outline" size='small'></IonIcon></div>
                    <div className="w-8 h-8 flex justify-center items-center bg-black text-white text-xl rounded-full cursor-pointer"><IonIcon name="chevron-forward-outline" size='small'></IonIcon></div>
                </div>
            </div>
            <div className="movie-list mt-2 w-full">
                <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"} >
                    {movieList?.length > 0 && movieList?.map((movie, index) => (
                        <SwiperSlide>
                            <MovieCard movie={movie} category={type}></MovieCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

export default MovieList