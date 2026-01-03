import React from "react";
import { Header } from "../../../ui/Header/Header";
import { Footer } from "../../../ui/Footer/Footer";
import { useApiTMDB } from "../../../hooks/ProviderApiTMDB";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { FavoritesFunc } from "../../../ui/Favorites/FavoritesFunc";
import { Loader } from "../../../ui/Loader/Loader"

function Trending() {

    const {fetchTrendingMovies, trendingMovies} = useApiTMDB();
    const { toggleFavorite, addMovie, removeMovie } = useLocalStorage();
    const navigate = useNavigate();

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w300";

    React.useEffect(() => {
        fetchTrendingMovies();
    }, []);

    const routeMovieDetails = (id) => {
        navigate(`/movie/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (!!trendingMovies.errorTrendingMovies) return <p>Error en fetch de trending movies: {trendingMovies.errorTrendingMovies}</p>
   
    return (
        <>
            <div className="" >
                <Header />
            </div>
 
            <div className="flex flex-col justify-center max-w-10xl mt-20">
                <h1 className="text-center text-xl mb-10">Trending movies of this week!</h1>

                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">

                    {trendingMovies.trending?.map(movie => (
                        <div key={movie.id}>

                            <li onClick={() => routeMovieDetails(movie.id)} className="relative">

                                <FavoritesFunc 
                                    toggle={toggleFavorite(movie.id)}
                                    movieID={movie.id}
                                    movieData={movie}
                                    addMovie={addMovie}
                                    removeMovie={removeMovie}
                                />
                                <div className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] aspect-2/3 overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                                    <img
                                    src={`${baseURL}${size}/${movie.poster_path}`} 
                                    alt="movies-poster"
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
            

            <Footer />
        </>
    );
}

export { Trending };