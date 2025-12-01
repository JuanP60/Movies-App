import React from "react";

function useLocalStorage({movies}) {
    const [moviesLiked, setMoviesLiked] = React.useState({
        movies: [],
        error: "",
        loading: true
    });

    // para cargar local desde el inicio
    React.useEffect(() => {
        const stored = localStorage.getItem("moviesLiked");

        if (stored) {
            setMoviesLiked(prev => ({
                ...prev,
                movies: JSON.parse(stored),
                error: "",
                loading: false
            }));
        } else {
            setMoviesLiked(prev => ({
                ...prev,
                loading: false
            }));
        }
    }, [])

    // actualizar local storage cada que se agregue una nueva movie:

    React.useEffect(() => {
        if (movies.length > 0) {
            setMoviesLiked(prev => ({
                ...prev,
                movies: movies,
                error: "",
                loading: false
            }));
            // guardamos en local pasando a json el array de movies.
            localStorage.setItem("moviesLiked", JSON.stringify(movies));
        } else {
            setMoviesLiked(prev => ({
                ...prev,
                movies: [],
                error: "No hay películas favoritas",
                loading: false
            }));
            localStorage.setItem("moviesLiked", JSON.stringify([]));
        }
    }, [movies])

    return { moviesLiked }// variables que guardan las movies que el user le dio corazoncito, debo crear componente solo para ese corazon.
}

export {useLocalStorage};