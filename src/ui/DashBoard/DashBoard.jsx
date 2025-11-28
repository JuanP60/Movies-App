import React from "react";
import { useApiTMDB } from "../../routes/ProviderApiTMDB";
import { useNavigate } from "react-router-dom";

function MoviesDashBoard() {

    const {state, fetchRatedMovies} = useApiTMDB();
    const navigate = useNavigate(); // se debe definir de primero ya que se rompe debajo de los returns.

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w300"; // tamaño imagen, con este tamaño quedad bien en pc y el responsive ya esta practicamente hecho, tailwind + flex

    // usamos el fetch para cargar datos una vez el componente cargue:

    React.useEffect(() => {
        fetchRatedMovies();
    }, []);

    const routeMovie = (id) => {
        navigate(`/movie/${id}`);
    }
    
    if (!!state.error) return <p>Error en la consulta</p>
    if (!!state.loading) return <p>Cargando...</p>

    return (
        <div className="flex justify-center max-w-10xl mt-20">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                {state.movies?.map(movie => (
                    <li key={movie.id} onClick={() => routeMovie(movie.id)}>
                        <div className="w-[400px] h-[500px] overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                            <img 
                            src={`${baseURL}${size}${movie.poster_path}`} 
                            alt="poster-img"
                            className="w-full h-full object-cover"
                            />
                        </div>
                    </li>
                ))}
            </ul>   
        </div>
    )
}

export { MoviesDashBoard };