import React from "react";

export function useSearchBar() {

    // treamos el fetch que hacemos en el dashboard a este hook para manejar logica con barra de busqueda.

    // estados home, peliculas iniciales
    const [state, setState] = React.useState({
        movies: [],
        error: "",
        loading: true,
    });

    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTkyNDk5MDkwOGE4YWY2ODFmMjhkYTk5MjRkM2ZiNSIsIm5iZiI6MTc2MzMzNjQyNy4zOTUsInN1YiI6IjY5MWE2MGViYTE2OWY1ZjMxMTQ0Njg0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMrFZ334iZwue2dMoafUSwb8a-QdXeeoeVEKGFhto34";
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
        }
    };

    //api para populars vista dashboard:
    const API = "https://api.themoviedb.org/3/movie/popular?language=es-MX";

        // este es el llamado inicial a la API para obtener peliculas para el home.

    async function fetchFilteredMovies(userInput = "") {
        try {
            const response = await fetch(API, options); // llamado a la API.
            const data = await response.json(); // pasamos a json
            const result = data.results; // data ya transformada

            if (result.length > 0) {
                //filtrado 

                const filter = result.filter(movie => {
                        const input = userInput.toLowerCase();
                        const movieTitle = movie.title.toLowerCase();
                        return movieTitle.includes(input)
                });

                if (filter.length > 0) {
                    setState(prev => ({
                        ...prev,
                        movies: filter || [],
                        error: "",
                    }));
                } else if (filter.length === 0){
                    setState(prev => ({
                        ...prev,
                        movies: [],
                        error: `No hay resultados para ${userInput}`,
                    }));
                } else {
                    setState(prev => ({
                        ...prev,
                        movies: result,
                        error: "",
                    }));
                }
            } 
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: "No se pudo traer la data"
            }));
            console.log("No movies were filtered");
        } finally {
            setState(prev => ({
                ...prev,
                loading: false
            }));
        }
    }

    return {
        state,
        fetchFilteredMovies
    };
}
