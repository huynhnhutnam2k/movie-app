import React from 'react'
import { Link, useLocation } from 'react-router-dom'
const nav = [
    {
        display: "Home",
        path: "/"
    },
    {
        display: "TV Series",
        path: "/tv"
    },
    {
        display: "Movies",
        path: "/movie"
    }
]
const Header = () => {
    const location = useLocation()
    // console.log(location)
    return (
        <header className="header w-full h-[80px] justify-center items-center flex text-white gap-x-4">
            {
                nav.map(item => (

                    <Link to={item.path} className={` text-primary relative ${location.pathname === item.path ? "before:w-1/2" : ""} before:h-[6px] before:rounded-full before:absolute before:bg-primary before:left-1/2 before:-bottom-2 before:-translate-x-1/2 before:content-[''] `}>{item.display}</Link>
                ))
            }
        </header>
    )
}

export default Header