import React, {useContext} from "react";

// creamos contexto:
const MoviesContext = React.createContext();

export function ApiProvider({children}) {
    // estados home
    const [state, setState] = React.useState({
        movies: [],
        error: "",
        loading: true,
    });

    // estados para ruta de movie details.
    const [movieDetailsState, setMovieDetailsState] = React.useState({
        movieDetails: {},
        errorMovieDetails: "",
        loadingMovieDetails: true,
    });

    // crear env para api_key
    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTkyNDk5MDkwOGE4YWY2ODFmMjhkYTk5MjRkM2ZiNSIsIm5iZiI6MTc2MzMzNjQyNy4zOTUsInN1YiI6IjY5MWE2MGViYTE2OWY1ZjMxMTQ0Njg0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMrFZ334iZwue2dMoafUSwb8a-QdXeeoeVEKGFhto34";
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
        }
    };
    // este es el llamado inicial a la API para obtener peliculas para el home.

    async function fetchRatedMovies({API}) {
        try {
            const response = await fetch(API, options); // llamado a la API.
            const data = await response.json(); // pasamos a json
            const result = data.results; // data ya transformada

            // actualizamos el estado:
            setState(prev => ({
                ...prev,
                movies: result || [],
                error: ""
            }));
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

    // funcion para traer info por movie:
    
    async function fetchMovieDetails({movieId}) {
        try {
            const movieDetails = state.movies.find(movie => movie.id === movieId); // aca tenemos la movie que el user abrio
            console.log(movieDetails);
            setMovieDetailsState(prev => ({
                ...prev,
                movieDetails: movieDetails || {},
                errorMovieDetails: "",
            }));
        } catch (error) {
            setMovieDetailsState(prev => ({
                ...prev,
                errorMovieDetails: "No se pudo traer la data"
            }));
        } finally {
            setMovieDetailsState(prev => ({
                ...prev,
                loadingMovieDetails: false,
            }));
        }
    }


        
    const moviesData = {state, fetchRatedMovies, movieDetailsState, fetchMovieDetails}; // pasamos esos datos a los componentes que lo necesiten con el provider y el context creado

    return (
        <MoviesContext.Provider value={moviesData}>
            {children}
        </MoviesContext.Provider>
    );
}

export function useApiTMDB() { // aca estariamos exportando globalmente toda la info de las movies. 
    const data = useContext(MoviesContext);
    return data;
}