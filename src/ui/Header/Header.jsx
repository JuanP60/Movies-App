import { Link } from "react-router-dom"; 
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

function Header() {

    return (
        <nav className="flex flex-wrap items-center justify-between p-4 md:p-12 text-md md:text-lg">
            <div className="flex items-center text-2xl md:text-4xl">
                <Link className="" to="/">Movvs <LocalMoviesIcon fontSize="large"/></Link>
            </div>
            <ul className="flex flex-row gap-3 md:gap-6 mt-2 md:mt-2">
                <li className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                 after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
                    <Link to="/trending">Trending</Link>
                </li>

                <li className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
                 after:bg-white after:w-0 hover:after:w-full after:transition-all after:duration-300">
                    <Link to="/favorites">Favorites</Link>
                </li>
            </ul>
        </nav>
    );
}

export {Header};