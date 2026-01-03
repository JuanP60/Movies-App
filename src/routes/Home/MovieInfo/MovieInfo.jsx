import React from "react";
import { Header } from "../../../ui/Header/Header";
import { Footer } from "../../../ui/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useApiTMDB } from "../../../hooks/ProviderApiTMDB";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { FavoritesFunc } from "../../../ui/Favorites/FavoritesFunc";

function MovieInfo() {

    const {
        movieDetailsState, 
        fetchMovieDetails,
        categoriesPerMovie, 
        recommendedMovies
    } = useApiTMDB();

    const { toggleFavorite, addMovie, removeMovie } = useLocalStorage();

    const navigate = useNavigate();
    const params = useParams();
    const movieId = Number(params.id); // id de la movie, pasamos a numero ya que params devuelve string
    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w400";

    const rating = Math.round(movieDetailsState.movieDetails.vote_average / 2); // escala de 5

    // buscamos la movie:

    React.useEffect(() => {
        fetchMovieDetails({movieId});
    }, [movieId]); // cada que movieId cambie buscamos la movie.

    const routingNewMovie = (id) => {
        navigate(`/movie/${id}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (!!movieDetailsState.errorMovieDetails) return <p>Error en la consulta de movie details: {movieDetailsState.errorMovieDetails}</p>
    if (!!movieDetailsState.loadingMovieDetails) return <p>Cargando...</p>

    return (
        <div>
            <Header />
            <div className="flex flex-col gap-6 mt-20">

                <div className="flex justify-center gap-6">

                    <div className="relative">
                        <FavoritesFunc 
                            toggle={toggleFavorite(movieId)}
                            movieID={movieId}
                            movieData={movieDetailsState.movieDetails}
                            addMovie={addMovie}
                            removeMovie={removeMovie}
                        />
                        <div className="w-[400px] h-[500px] overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                            <img 
                            className="w-full h-full object-cover"
                            src={`${baseURL}${size}${movieDetailsState.movieDetails.poster_path}`} 
                            alt="movie-poster" />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="max-w-lg">
                            <div className="flex items-center gap-4">
                                <h1 className="text-2xl">{movieDetailsState.movieDetails.title}</h1>
                                <p>{`⭐`.repeat(rating)}</p>
                            </div> 
                            <p className="text-wrap mt-5">{movieDetailsState.movieDetails.overview}</p>
                        </div>   

                        <div className="mt-5">
                            <ul className="flex gap-2">
                                {categoriesPerMovie.map(category => (
                                    <li className="border border-red-950 rounded-xl p-2 hover:bg-red-950" key={category.id}>{category.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>


            <div className="flex flex-col justify-center max-w-10xl mt-28">
                <h2 className="text-center text-xl">Peliculas Similares</h2>

                <div className="flex justify-center max-w-10xl mt-12">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                        {recommendedMovies?.map(movie => (
                            movie.poster_path ? (
                                <div key={movie.id}>

                                    <li onClick={() => routingNewMovie(movie.id)} className="relative">

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
                                            alt="poster_img" 
                                            className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </li>
                                </div>
                            ) : null
                        ))}
                    </ul>     
                </div>
            </div>

            <Footer />
        </div>
    );
}

export {MovieInfo};