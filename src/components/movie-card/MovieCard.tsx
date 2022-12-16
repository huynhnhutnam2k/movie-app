import React from 'react'
import { useNavigate } from 'react-router-dom';
import { withErrorBoundary } from "react-error-boundary";
import Loading from '../loading/Loading';
interface IProps {
    movie: any,
    category?: string
}
const MovieCard: React.FC<IProps> = ({ movie, category }) => {
    const { title, vote_average, release_date, poster_path, id, name, first_air_date } = movie;
    const navigate = useNavigate()
    return (
        <div className='flex flex-col p-3 bg-slate-800 rounded-lg h-full' key={id}>
            <div className="w-full h-[250px] rounded-lg ">
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" className=' w-full h-full object-cover rounded-lg' />

            </div>
            <div className="flex flex-col flex-1 text-white mt-4 w-full">
                <div className="mb-3 flex flex-col">
                    <div className="">{title || name}</div>
                    <div className="flex justify-between w-full opacity-70 text-xs">
                        <div className="">{release_date || first_air_date}</div>
                        <div className="">{vote_average}</div>
                    </div>
                </div>
                <div className="mt-auto">
                    <button className='w-full py-2 px-4 flex justify-center items-center bg-primary text-sm rounded-lg' onClick={() => navigate(`/${category}/${id}`)}>Watch now</button>
                </div>
            </div>
        </div>
    )
}

function FallbackComponent() {
    return (
        <p className="bg-red-50 text-red-400">
            Something went wrong with this component
        </p>
    );
}

export default withErrorBoundary(MovieCard, {
    FallbackComponent,
});


export const MovieCardSkeleton = () => {
    return (
        <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
            <Loading
                width="100%"
                height="250px"
                radius="8px"
                className="mb-5"
            ></Loading>
            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3">
                    <Loading width="100%" height="20px"></Loading>
                </h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span>
                        <Loading width="50px" height="10px"></Loading>
                    </span>
                    <span>
                        <Loading width="30px" height="10px"></Loading>
                    </span>
                </div>
                <Loading
                    width="100%"
                    height="45px"
                    radius="6px"
                ></Loading>
            </div>
        </div>
    );
};