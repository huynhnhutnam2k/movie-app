import { useParams } from 'react-router-dom'
import Main from '../components/layout/Main'
import { fetcher, tmdbAPI } from '../utils'
import useSWR from 'swr'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import MovieCard from '../components/movie-card/MovieCard'
const MovieDetail = () => {
    const { movieId, category } = useParams()
    const { data } = useSWR(tmdbAPI.getDetails(category, movieId), fetcher);
    if (!data) return null;
    const { backdrop_path, poster_path, title, genres, overview } = data;
    console.log(data)
    return (
        <>
            <Main></Main>
            <div className="py-10">
                <div className="w-full h-[600px] relative">
                    <div className="absolute bg-black inset-0 bg-opacity-70"></div>
                    <div className="w-full h-full bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})` }}></div>
                </div>
                <div className="-mt-[200px] w-[800px] h-[400px] rounded-lg mx-auto z-10 relative">
                    <img src={tmdbAPI.imageOriginal(poster_path)} alt="" className='w-full h-full object-cover rounded-lg' />
                </div>
                <h1 className='text-3xl text-center my-4'>{title}</h1>
                {genres?.length > 0 &&
                    <div className="flex justify-center gap-x-5">
                        {genres.map((item: any) => (
                            <div className="rounded-3xl border-primary border-2 text-primary py-2 px-4 text-center " key={item.id}>
                                {item.name}
                            </div>
                        ))}
                    </div>
                }
                <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
                    {overview}
                </p>
                <MovieMeta type='credits'></MovieMeta>
                <MovieMeta type='videos'></MovieMeta>
                <MovieMeta type='similar'></MovieMeta>
            </div>
        </>
    )
}

const MovieMeta = ({ type = "video" }) => {
    const { movieId, category } = useParams();
    const { data } = useSWR(tmdbAPI.getMeta(category, movieId, type), fetcher);
    if (!data) return null;
    if (type === "credits") {
        const { cast } = data;
        if (!cast || cast.length <= 0) return null;

        return (
            <div className="py-10">
                <h2 className="text-center text-3xl mb-10">Casts</h2>
                <div className="grid grid-cols-4 gap-5 page-container">
                    {cast.slice(0, 4).map((item: any) => (
                        <div className="cast-item" key={item.id}>
                            <img
                                src={tmdbAPI.imageOriginal(item.profile_path)}
                                className="w-full h-[350px] object-cover rounded-lg mb-3"
                                alt=""
                            />
                            <h3 className="text-xl font-medium">{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    } else {
        const { results } = data;
        if (!results || results.length <= 0) return null;
        if (type === "videos")
            return (
                <div className="py-10">
                    <div className="flex flex-col gap-10">
                        {results.slice(0, 2).map((item: any) => (
                            <div className="" key={item.id}>
                                <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                                    {item.name}
                                </h3>
                                <div key={item.id} className="w-full aspect-video">
                                    <iframe
                                        width="864"
                                        height="486"
                                        src={`https://www.youtube.com/embed/${item.key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full object-fill"
                                    ></iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        if (type === "similar")
            return (
                <div className="py-10">
                    <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
                    <div className="movie-list">
                        <Swiper
                            grabCursor={true}
                            spaceBetween={40}
                            slidesPerView={"auto"}
                        >
                            {results.length > 0 &&
                                results.map((item: any) => (
                                    <SwiperSlide key={item.id}>
                                        <MovieCard movie={item}></MovieCard>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            );
    }
    return null;

}

export default MovieDetail