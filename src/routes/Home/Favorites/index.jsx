import { Header } from "../../../ui/Header/Header";
import { Footer } from "../../../ui/Footer/Footer";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { FavoritesFunc } from "../../../ui/Favorites/FavoritesFunc";
import { useNavigate } from "react-router-dom";

function Favorites() {

    const navigate = useNavigate();
    const { moviesLiked, toggleFavorite, addMovie, removeMovie } = useLocalStorage();

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w300"; // tamaño imagen, con este tamaño quedad bien en pc y el responsive ya esta practicamente hecho, tailwind + flex

    const routeMovie = (id) => { // ruta hacia movie details
        navigate(`/movie/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (!!moviesLiked.loading) return <p>Cargando peliculas favoritas...</p>
    if (!!moviesLiked.error) return <p>{moviesLiked.error}</p>
    // agregar estructura de map con estilos ya creados en otros componentes. base url. default size.

    return (
        <div>
            <div className= "" >
                <Header />
            </div>
            
            <div className="flex flex-col justify-center max-w-10xl mt-20">
                <h1 className="text-center text-xl mb-10">Favorites Page</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                    {moviesLiked.movies?.map(movie => (
                        <div key={movie.id}>

                            <li onClick={() => routeMovie(movie.id)} className="relative">

                                <FavoritesFunc 
                                    toggle={toggleFavorite(movie.id)}
                                    movieID={movie.id}
                                    movieData={movie}
                                    addMovie={addMovie}
                                    removeMovie={removeMovie}
                                />
                                <div className="w-[400px] h-[500px] overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                                    <img
                                    src={`${baseURL}${size}${movie.poster_path}`}
                                    alt="favorite-poster-img" 
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            
            <Footer />
        </div>
    );
}

export { Favorites };