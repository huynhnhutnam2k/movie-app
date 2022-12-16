/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Main from '../components/layout/Main'
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../utils';
import MovieCard, { MovieCardSkeleton } from '../components/movie-card/MovieCard';
import useDebound from '../hooks/useDebound';
import { v4 } from 'uuid'
import ReactPaginate from 'react-paginate';
interface IProps {
    category?: string
}
const MoviePage: React.FC<IProps> = ({ category }) => {
    const [nextPage, setNextPage] = useState(1)
    const [url, setUrl] = useState("")
    const [filter, setFilter] = useState<string>("")
    const filterDebound = useDebound(filter, 500)
    console.log("🚀 ~ file: MoviePage.tsx:18 ~ filterDebound", filterDebound, filter)
    const { data, error } = useSWR(url, fetcher)
    const loading = !data && !error
    useEffect(() => {
        if (filterDebound) {
            console.log("dff")
            setUrl(tmdbAPI.search(category, filter, nextPage))
        }
        else {
            setUrl(tmdbAPI.getList(category, "popular", nextPage))
        }
    }, [filterDebound, nextPage, category])
    const list = data?.results || []
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 20;
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        if (!data) return;
        setPageCount(Math.ceil(data.total_results / itemsPerPage));
    }, [itemOffset, data]);

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % data.total_results;
        setNextPage(+event.selected + 1);
        setItemOffset(newOffset);
    };
    return (
        <>
            <Main></Main>
            <div className="page-container py-10">
                <input type="text" className='w-full py-2 px-4 border-[#ccc] outline-none mb-5 bg-slate-800 ' placeholder='Enter you name film' onChange={e => setFilter(e.target.value)} />
                {loading && (
                    <div className="grid grid-cols-4 gap-5">
                        {new Array(itemsPerPage).fill(0).map(() => (
                            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-4 gap-5">
                    {!loading && list.length > 0 && list?.map((item: any) => (
                        <MovieCard movie={item} category={category}></MovieCard>
                    ))}
                </div>
            </div>
            <div className="mb-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={undefined}
                    className="pagination"
                />
            </div>
        </>
    )
}

export default MoviePage