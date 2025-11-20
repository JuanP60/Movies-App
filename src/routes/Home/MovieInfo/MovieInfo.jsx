import React from "react";
import { Header } from "../../../ui/Header/Header";
import { useParams } from "react-router-dom";
import { useApiTMDB } from "../../ProviderApiTMDB";

function MovieInfo() {

    const {movieDetailsState, fetchMovieDetails} = useApiTMDB();
    const params = useParams();
    const movieId = Number(params.id); // id de la movie, pasamos a numero ya que params devuelve string

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w400";

    // buscamos la movie:

    React.useEffect(() => {
        fetchMovieDetails({movieId});
    }, [movieId]); // cada que movieId cambie buscamos la movie.

    if (!!movieDetailsState.errorMovieDetails) return <p>Error en la consulta de movie details.</p>
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

                <div className="max-w-lg">
                    <div className="flex gap-2">
                        <h1>{movieDetailsState.movieDetails.title}</h1>
                        <p>stars {movieDetailsState.movieDetails.vote_average}</p>
                    </div> 
                    <p className="text-wrap">{movieDetailsState.movieDetails.overview}</p>
                </div>
            </div>
        </div>
    );
}

export {MovieInfo};