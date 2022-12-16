import React from 'react'

const Banner = () => {
    return (
        <div className='page-container h-[550px] relative rounded-lg mb-10'>
            <img src="https://nld.mediacdn.vn/2019/4/3/avengers-endgame-poster-og-social-crop-15542720808371479664269.jpg" alt="" className=' w-full h-full object-cover rounded-lg' />
            <div className="absolute left-5 bottom-2 text-white">
                <div className="text-3xl capitalize mb-10">
                    Avengers: Endgame
                </div>
                <div className="flex gap-x-2 h-10 items-center mb-10">
                    <div className="border border-[#ccc] opacity-70 px-4 py-2 flex justify-center items-center rounded-lg">
                        Action
                    </div>
                    <div className="border border-[#ccc] opacity-70 px-4 py-2 flex justify-center items-center rounded-lg">
                        Adventure
                    </div>
                    <div className="border border-[#ccc] opacity-70 px-4 py-2 flex justify-center items-center rounded-lg">
                        Drama
                    </div>
                </div>
                <div className="flex gap-x-4 h-10 items-center ">
                    <div className="flex justify-center items-center rounded-lg bg-primary text-white px-4 w-[170px] py-2 text-md cursor-pointer">Watch now</div>
                    <div className="flex justify-center items-center rounded-lg border border-[#ccc] text-white px-4 py-2 text-md cursor-pointer">+</div>
                </div>
            </div>
        </div>
    )
}

export default Banner