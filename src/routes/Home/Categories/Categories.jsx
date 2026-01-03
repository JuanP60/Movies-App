import React from "react";
import { Header } from "../../../ui/Header/Header";
import { Footer } from "../../../ui/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import { useApiTMDB } from "../../../hooks/ProviderApiTMDB";
import { FavoritesFunc } from "../../../ui/Favorites/FavoritesFunc";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

// ruta por categoria
function Categories () {

    const {addMovie, removeMovie, toggleFavorite} = useLocalStorage();
    const {fetchMoviesPerCategory, moviesPerCategories} = useApiTMDB();
    const navigate = useNavigate();
    const params = useParams();
    const {id: catID, name: catName} = params; // params pasados por url
    // pasamos id a numero ya que desde params se da un string
    const catIdNumber = Number(catID);

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w400";

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        fetchMoviesPerCategory({catIdNumber});
    }, [catID]);

    const routeMovie = (id) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(`/movie/${id}`);
    }

    // todo, traer nombre de categoria a esta ruta.

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center max-w-10xl mt-20">
                <h1 className="text-center text-xl mb-10">{catName}</h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                    {moviesPerCategories.moviesCtg?.map(movie => (
                        movie.poster_path ? (
                            <div key={movie.id}>

                                <li onClick={() => routeMovie(movie.id)} className="relative">

                                    <FavoritesFunc
                                        toggle={toggleFavorite(movie.id)}
                                        movieID={movie.id}
                                        movieData={movie}
                                        addMovie={addMovie}
                                        removeMovie={removeMovie}
                                    />
                                    <div className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] aspect-2/3 overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                                        <img 
                                        src={`${baseURL}${size}${movie.poster_path}`} 
                                        alt="poster-img"
                                        className="w-full h-full object-cover"
                                        />
                                    </div>
                            </li>
                            </div>
                        ) : null
                    ))}
                </ul>   
            </div>

            <Footer />
        </>
    );
}

export {Categories};