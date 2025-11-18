import { useApiTMDB } from "../../routes/useApiTMDB";

function MoviesDashBoard() {

    const API = "https://api.themoviedb.org/3/movie/popular?language=es-MX";
    const {movies, error, loading} = useApiTMDB({API});
    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w300"; // tamaño imagen, con este tamaño quedad bien en pc y el responsive ya esta practicamente hecho, tailwind + flex
    
    if (!!error) return <p>Error en la consulta</p>
    if (!!loading) return <p>Cargando...</p>
    
    return (
        <div>
            <ul className="flex flex-wrap gap-2 justify-center">
                {movies?.map(movie => (
                    <li key={movie.id} >
                        <img src={`${baseURL}${size}${movie.poster_path}`} alt="poster-img"/>
                        <p>{movie.title}</p></li>
                ))}
            </ul>   
        </div>
    )
}

export { MoviesDashBoard };