import React from "react";

export function useLocalStorage() {

    const [moviesLiked, setMoviesLiked] = React.useState({
        movies: [],
        error: "",
        loading: true
    });

    // para cargar local desde el inicio:
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
                movies: [],
                error: "",
                loading: false
            }));
        }
    }, [])

    // toggle para manejar true or false al clickear sobre favIcon
    const toggleFavorite = (movieID) => {
        if (moviesLiked.movies?.some(movie => movie.id === movieID)) {
            return true;
        } else {
            return false;
        }
    }

    const addMovie = (movie) =>  { 
        if (movie) {
            setMoviesLiked(prev => {
                const updatedMovies = [...prev.movies, movie];

                // guardamos en local pasando a json el array de movies.
                localStorage.setItem("moviesLiked", JSON.stringify(updatedMovies));

                return {
                    ...prev,
                    movies: updatedMovies, // agregamos nueva movie sin reemplazar las que ya teniamos
                    error: "",
                    loading: false
                }
            });
        } else {
            setMoviesLiked(prev => ({
               ...prev,
               movies: [],
               error: "La movie no tiene datos que guardar",
               loading: false 
            }));
            localStorage.setItem("moviesLiked", JSON.stringify([]));
        }
    }

    const removeMovie = (movieId) => {
        // filtramos por id para remover la movie
        const filterFavMovies = moviesLiked.movies?.filter((mov) => mov.id !== movieId);
        // lista actualizada:
        setMoviesLiked(prev => ({
            ...prev,
            movies: filterFavMovies,
            error: "",
            loading: false
        }));
        localStorage.setItem("moviesLiked", JSON.stringify(filterFavMovies));
    }

    return { 
        moviesLiked, 
        addMovie, 
        removeMovie, 
        toggleFavorite 
    }// variables que guardan las movies que el user le dio corazoncito,
}