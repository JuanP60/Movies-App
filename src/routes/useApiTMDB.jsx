import React from "react";

function useApiTMDB({API}) {
    //const account_id = 22477018; // numero default de cuenta TMDB.
    // crear env para api_key
    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTkyNDk5MDkwOGE4YWY2ODFmMjhkYTk5MjRkM2ZiNSIsIm5iZiI6MTc2MzMzNjQyNy4zOTUsInN1YiI6IjY5MWE2MGViYTE2OWY1ZjMxMTQ0Njg0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMrFZ334iZwue2dMoafUSwb8a-QdXeeoeVEKGFhto34";
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
        }
    };

    const [movies, setMovies] = React.useState([]);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    // este es el llamado inicial a la API para obtener peliculas para el home.

    React.useEffect(() => {
        async function fetchRatedMovies() {
            try {
                const response = await fetch(API, options); // llamado a la API.
                const data = await response.json(); // pasamos a json
                const result = data.results; // data ya transformada

                setMovies(result || []); // por si no trae nada le asignamos un array vacio.
                setError("");
                console.log('Exito en la consulta');
                console.log(result);
            } catch (error) {
                console.log('Error en la consulta', error);
                setError("No se pudo traer la data");
            } finally {
                setLoading(false);
            }

    }
        fetchRatedMovies();
    }, [API]);   // se ejecuta cuando le pasamos una {API} desde otro componente

    return {movies, error, loading} // pasamos esos datos a los componentes que lo necesiten, solo se llama desde otro componente con {movies, error, loading} = useApiTMDB({API})
}

export {useApiTMDB};