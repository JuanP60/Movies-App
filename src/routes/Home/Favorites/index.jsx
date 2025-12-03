import { Header } from "../../../ui/Header/Header";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

function Favorites() {

    const { moviesLiked } = useLocalStorage();

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w300"; // tamaño imagen, con este tamaño quedad bien en pc y el responsive ya esta practicamente hecho, tailwind + flex

    if (!!moviesLiked.loading) return <p>Cargando peliculas favoritas...</p>
    if (!!moviesLiked.error) return <p>{moviesLiked.error}</p>
    // agregar estructura de map con estilos ya creados en otros componentes. base url. default size.

    return (
        <div>
            <Header />
            <h1>Favorites Page</h1>

            <div className="flex justify-center max-w-10xl mt-20">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                    {moviesLiked.movies?.map(movie => (
                        <li key={movie.id}>

                            <div className="w-[400px] h-[500px] overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                                <img
                                src={`${baseURL}${size}${movie.poster_path}`}
                                alt="favorite-poster-img" 
                                className="w-full h-full object-cover"
                                />
                            </div>

                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export { Favorites };