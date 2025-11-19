import React, {useContext} from "react";

// creamos contexto:
const MoviesContext = React.createContext();

export function ApiProvider({children}) {

    //estados
    const [movies, setMovies] = React.useState([]);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    // nuevo estado para movieDetails? + fetch solo para movieDetails

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

            setMovies(result || []); // por si no trae nada le asignamos un array vacio.
            setError("");
        } catch (error) {
            setError("No se pudo traer la data");
        } finally {
            setLoading(false);
        }
    }
        
    const moviesData = {movies, error, loading, fetchRatedMovies}; // pasamos esos datos a los componentes que lo necesiten con el provider y el context creado

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