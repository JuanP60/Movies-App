import React from "react"; 
import { Link } from "react-router-dom"; 

function Header() {

    return (
        <nav className="flex flex-row justify-between">
            <Link to="/">Logo</Link>
            <ul className="flex flex-row gap-2">
                <li><Link to="/trending">Trending</Link></li>
                <li><Link to="/favorites">Favorites</Link></li>
            </ul>
        </nav>
    );
}

export {Header};