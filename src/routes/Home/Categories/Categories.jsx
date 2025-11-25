import React from "react";
import { Header } from "../../../ui/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useApiTMDB } from "../../ProviderApiTMDB";

// ruta por categoria
function Categories () {

    const {fetchMoviesPerCategory, moviesPerCategories} = useApiTMDB();
    const navigate = useNavigate();
    const params = useParams();
    const categoryId = Number(params.categoryId); // categoria a la que el user entró

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w400";

    React.useEffect(() => {
        fetchMoviesPerCategory({categoryId});
    }, [categoryId]);

    const routeMovie = (id) => {
        navigate(`/movie/${id}`);
    }

    // todo, traer nombre de categoria a esta ruta.

    return (
        <>
            <Header />
            <div className="flex justify-center max-w-10xl mt-80">
                <ul className="flex flex-wrap gap-5 justify-center">
                    {moviesPerCategories.moviesCtg?.map(movie => (
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
        </>
    );
}

export {Categories};