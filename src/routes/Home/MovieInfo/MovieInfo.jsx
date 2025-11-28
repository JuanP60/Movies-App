import React from "react";
import { Header } from "../../../ui/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useApiTMDB } from "../../ProviderApiTMDB";

function MovieInfo() {

    const {
        movieDetailsState, 
        fetchMovieDetails,
        categoriesPerMovie, 
        recommendedMovies
    } = useApiTMDB();

    const navigate = useNavigate();
    const params = useParams();
    const movieId = Number(params.id); // id de la movie, pasamos a numero ya que params devuelve string
    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w400";

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
            <div className="flex gap-6 mt-32 justify-center">
                <div>
                    <img 
                    src={`${baseURL}${size}${movieDetailsState.movieDetails.poster_path}`} 
                    alt="movie-poster" />
                </div>

                <div className="flex flex-col">
                    <div className="max-w-lg">
                        <div className="flex gap-2">
                            <h1>{movieDetailsState.movieDetails.title}</h1>
                            <p>stars {movieDetailsState.movieDetails.vote_average}</p>
                        </div> 
                        <p className="text-wrap">{movieDetailsState.movieDetails.overview}</p>
                    </div>   

                    <div className="mt-2">
                        <ul className="flex gap-2">
                            {categoriesPerMovie.map(category => (
                                <li key={category.id}>{category.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>


            <div className="flex flex-col justify-center max-w-10xl mt-28">
                <h2 className="text-center">Peliculas Similares</h2>

                <div className="flex justify-center max-w-10xl mt-12">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                        {recommendedMovies?.map(movie => (
                            movie.poster_path ? (
                            <li key={movie.id} onClick={() => routingNewMovie(movie.id)}>
                                <div className="w-[400px] h-[500px] overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                                    <img
                                    src={`${baseURL}${size}${movie.poster_path}`}
                                    alt="poster_img" 
                                    className="w-full h-full object-cover"
                                    />
                                </div>
                            </li>
                            ) : null
                        ))}
                    </ul>     
                </div>
            </div>
        </div>
    );
}

export {MovieInfo};