import { Link } from "react-router-dom"; 
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

function Header() {

    return (
        <nav className="flex flex-row items-center justify-between p-12 text-lg">
            <div className="flex items-center text-4xl">
                <Link className="" to="/">Movvs <LocalMoviesIcon fontSize="large"/></Link>
            </div>
            <ul className="flex flex-row gap-3">
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