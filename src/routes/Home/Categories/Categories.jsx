import React from "react";
import { Header } from "../../../ui/Header/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useApiTMDB } from "../../ProviderApiTMDB";

// ruta por categoria
function Categories () {

    const {fetchMoviesPerCategory, moviesPerCategories} = useApiTMDB();
    const navigate = useNavigate();
    const params = useParams();
    const {id: catID, name: catName} = params; // params pasados por url
    // pasamos id a numero ya que desde params se da un string
    const catIdNumber = Number(catID);

    const baseURL = "https://image.tmdb.org/t/p/"; // para construir imagenes, url base
    const size = "w400";

    React.useEffect(() => {
        fetchMoviesPerCategory({catIdNumber});
    }, [catID]);

    const routeMovie = (id) => {
        navigate(`/movie/${id}`);
    }

    // todo, traer nombre de categoria a esta ruta.

    return (
        <>
            <Header />
            <h1>Categoría: {catName}</h1>
            <div className="flex justify-center max-w-10xl mt-80">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-items-center">
                    {moviesPerCategories.moviesCtg?.map(movie => (
                        <li key={movie.id} >
                            <div className="w-[400px] h-[500px] overflow-hidden rounded-xl cursor-pointer transition transform hover:-translate-y-2 hover:scale-105">
                                <img 
                                src={`${baseURL}${size}${movie.poster_path}`} 
                                alt="poster-img"
                                onClick={() => routeMovie(movie.id)}
                                className="w-full h-full object-cover"
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