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

    const [categories, setCategories] = React.useState([]);

    // estados para la ruta de categories
    const [moviesPerCategories, setMoviesPerCategories] = React.useState({
        moviesCtg: [],
        errorMoviesCtg: "",
        loadingMoviesCtg: true,
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

    //api para populars:
    const API = "https://api.themoviedb.org/3/movie/popular?language=es-MX";
    //api para categorias:
    const API_CATEGORIES = "https://api.themoviedb.org/3/genre/movie/list";
    // urls para la seccion de categories (traer primeras 3 paginas de movies que cumplan con el category id)
    const urls = [
        `https://api.themoviedb.org/3/discover/movie?&page=1`,
        `https://api.themoviedb.org/3/discover/movie?&page=2`,
        `https://api.themoviedb.org/3/discover/movie?&page=3`,
    ];

    // este es el llamado inicial a la API para obtener peliculas para el home.

    async function fetchRatedMovies() {
        try {
            const response = await fetch(API, options); // llamado a la API.
            const data = await response.json(); // pasamos a json
            const result = data.results; // data ya transformada

            if (result.length > 0) {
                // actualizamos el estado:
                setState(prev => ({
                    ...prev,
                    movies: result || [],
                    error: ""
                }));
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

    // funcion para traer info por movie:
    
    async function fetchMovieDetails({movieId}) {
        try {
            const movieDetails = state.movies?.find(movie => movie.id === movieId); // aca tenemos la movie que el user abrio
    
            if (movieDetails) {
                setMovieDetailsState(prev => ({
                    ...prev,
                    movieDetails: movieDetails || {},
                    errorMovieDetails: "",
                }));
            } else {
                // si la movie no esta en el array que usamos en el home, buscamos en el estado usado para las categorias.
                const movieDetailsCtg = moviesPerCategories.moviesCtg?.find(movie => movie.id === movieId);

                if (movieDetailsCtg) {
                    setMovieDetailsState(prev => ({
                        ...prev,
                        movieDetails: movieDetailsCtg || {},
                        errorMovieDetails: "",
                    })); 
                } else {
                    setMovieDetailsState(prev => ({
                        ...prev,
                        movieDetails: {},
                        errorMovieDetails: "La pelicula no existe en la data base",
                    })); 
                }
            }

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

    // para traer todas las cateogories y mostrarlas en el dashboard.

    async function fetchCategories() {
    try {
        const request = await fetch(API_CATEGORIES, options);
        const response = await request.json(); // pasamos a json la respuesta que se supone ser todas la categories
        const data = response.genres;

        if (data && data.length > 0) {
            setCategories(data);
        }
        } catch (error) {
            console.log("Error en fetch de categories");
        }
    }

    // para mostrar las movies que cumplan con el cateegory id:

    async function fetchMoviesPerCategory({categoryId}){
        try {
            const request = await Promise.all(urls.map(api => fetch(api, options)));
            const response =  await Promise.all(request.map(json => json.json()));
            // unir los 3 fetch en 1 solo array, porque en response tenemos un objeto de 3 arrays (1 fecth por pagina)
            const data = response.flatMap(data => data.results); // 3 arrays concatenados con flatMap en 1 solo array

            if (data && data.length > 0) {
                // filtro por categoria

                const fetchedMovies = data.filter((movie) => movie.genre_ids.includes(categoryId));

                if (fetchedMovies.length > 0) {
                    setMoviesPerCategories(prev => ({
                        ...prev,
                        moviesCtg: fetchedMovies || [],
                        errorMoviesCtg: ""
                    })); 
                }
            }
        } catch (error) {
            setMoviesPerCategories(prev => ({
                ...prev,
                errorMoviesCtg: "Fetching error"
            }));
        } finally {
            setMoviesPerCategories(prev => ({
                ...prev,
                loadingMoviesCtg: false
            }));
        }
    }

    const moviesData = {
        state, 
        fetchRatedMovies, 
        movieDetailsState, 
        fetchMovieDetails, 
        fetchCategories, 
        categories,
        fetchMoviesPerCategory,
        moviesPerCategories
    }; // pasamos esos datos a los componentes que lo necesiten con el provider y el context creado

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