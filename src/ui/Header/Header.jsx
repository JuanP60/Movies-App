import React from "react"; 
import { Link } from "react-router-dom"; 

function Header() {

    return (
        <nav className="flex flex-row justify-between">
            <Link to="/">Logo</Link>
            <ul className="flex flex-row gap-2">
                <Link>Search</Link>
                <Link to="/trending">Trending</Link>
                <Link to="/favorites">Favorites</Link>
            </ul>
        </nav>
    );
}

export {Header};