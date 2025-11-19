import React from "react";
import { useApiTMDB } from "../../routes/ProviderApiTMDB";
import { useNavigate } from "react-router-dom";

function MoviesDashBoard() {

    const {
        fetchRatedMovies, 
        movies, 
        error, 
        loading
    } = useApiTMDB();

    const navigate = useNavigate(); // se debe definir de primero ya que se rompe debajo de los returns.

    const API = "https://api.themoviedb.org/3/movie/popular?language=es-MX";
    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w300"; // tamaño imagen, con este tamaño quedad bien en pc y el responsive ya esta practicamente hecho, tailwind + flex

    // usamos el fetch para cargar datos una vez el componente cargue:

    React.useEffect(() => {
        fetchRatedMovies({API});
    }, [])
    
    if (!!error) return <p>Error en la consulta</p>
    if (!!loading) return <p>Cargando...</p>

    const routeMovie = (id) => {
        navigate(`/movie/${id}`);
    }

    return (
        <div className="flex justify-center max-w-10xl mt-80">
            <ul className="flex flex-wrap gap-5 justify-center">
                {movies?.map(movie => (
                    <li key={movie.id} >
                        <div className="overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                            <img 
                            src={`${baseURL}${size}${movie.poster_path}`} 
                            alt="poster-img"
                            onClick={() => routeMovie(movie.id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>   
        </div>
    )
}

//LINEA COMENTADA: <p className="text-center">{movie.title}</p> no es necesario mostrar el nombre de la pelicula en esta seccion del hom

export { MoviesDashBoard };