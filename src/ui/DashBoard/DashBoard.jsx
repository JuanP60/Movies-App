import React from "react";
import { useSearchBar } from "../../hooks/useSeachBar";
import { useNavigate } from "react-router-dom";
import { MoviesSearch } from "../MoviesSearch/MoviesSearch";
import { FavoritesFunc } from "../Favorites/FavoritesFunc";
import { useLocalStorage } from "../../hooks/useLocalStorage";

function MoviesDashBoard() {

    const {state, fetchFilteredMovies} = useSearchBar();
    const {toggleFavorite, addMovie, removeMovie} = useLocalStorage();
    const navigate = useNavigate(); // se debe definir de primero ya que se rompe debajo de los returns.

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w300"; // tamaño imagen, con este tamaño quedad bien en pc y el responsive ya esta practicamente hecho, tailwind + flex

    // usamos el fetch para cargar datos una vez el componente cargue:

    React.useEffect(() => {
        fetchFilteredMovies(); 
    }, []);

    const routeMovie = (id) => {
        navigate(`/movie/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    if (!!state.loading) return <p>Cargando...</p>

    return (
        <>
            <MoviesSearch onSearchMovie={fetchFilteredMovies}/>
            
            {!!state.error ? <p>{state.error}</p> : 
            <div className="flex justify-center max-w-10xl mt-20">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                    {state.movies?.map(movie => (
                        <div key={movie.id}>

                            <FavoritesFunc 
                                toggle={toggleFavorite(movie.id)}
                                movieID={movie.id}
                                movieData={movie}
                                addMovie={addMovie}
                                removeMovie={removeMovie}
                            />

                            <li onClick={() => routeMovie(movie.id)}>
                                <div className="w-[400px] h-[500px] rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                                    <img 
                                    src={`${baseURL}${size}${movie.poster_path}`} 
                                    alt="poster-img"
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>   
            </div>
            }
        </>
    )
}

export { MoviesDashBoard };