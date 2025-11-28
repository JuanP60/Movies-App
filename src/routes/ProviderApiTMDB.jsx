import React, {useContext} from "react";

// creamos contexto:
const MoviesContext = React.createContext();

export function ApiProvider({children}) {
    // estados home, peliculas iniciales
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

    // estados para la ruta de categories
    const [moviesPerCategories, setMoviesPerCategories] = React.useState({
        moviesCtg: [],
        errorMoviesCtg: "",
        loadingMoviesCtg: true,
    });

    const [trendingMovies, setTrendingMovies] = React.useState({
        trending: [],
        errorTrendingMovies: "",
        loadingTrengingMovies: true
    });

    const [categories, setCategories] = React.useState([]); // listado de categorias en dashboard
    const [categoriesPerMovie, setCategoriesPerMovie] = React.useState([]); // para categorias por movie abierta
    const [recommendedMovies, setRecommendedMovies] = React.useState([]); // para movies recomendadas en la vista movieDetails

    // crear env para api_key
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
    //api para lista de categorias:
    const API_CATEGORIES = "https://api.themoviedb.org/3/genre/movie/list";
    //api para vista de trending movies:
    const API_TRENDING = "https://api.themoviedb.org/3/trending/movie/week?language=es-MX"; // tendencias de la semana

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
                    error: "",
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
            const resMovie = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=es-MX`,
            options
            );
            const movieData = await resMovie.json(); // ya aca tengo la movie que abrio el user, tambien devuelve ya los genres con sus id, nombre
            const categoriesPerMovieFilter = movieData.genres; // movieData es 1 objeto, acceddemos a las propiedades directamente.

            // traer movies similares desde el endpoint correcto de la api:

            const resSimilar = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/similar?language=es-MX`,
            options
            );
            const similarData = await resSimilar.json(); // ya el enpoint me relaciona las similares con la movie id

            if (movieData) {
                setMovieDetailsState(prev => ({
                    ...prev,    
                    movieDetails: movieData || {},
                    errorMovieDetails: "",
                    loadingMovieDetails: false
                }));
                setCategoriesPerMovie(categoriesPerMovieFilter);
                setRecommendedMovies(similarData.results);
            }
        } catch (error) {
            setMovieDetailsState(prev => ({
                ...prev,
                movieDetails: {},
                errorMovieDetails: "No se pudo traer la data",
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

    async function fetchMoviesPerCategory({catIdNumber}){
        try {
            // const request = await Promise.all(urls.map(api => fetch(api, options)));
            // const response =  await Promise.all(request.map(json => json.json()));
            // // unir los 3 fetch en 1 solo array, porque en response tenemos un objeto de 3 arrays (1 fecth por pagina)
            // const data = response.flatMap(data => data.results); // 3 arrays concatenados con flatMap en 1 solo array

            const API_CATEGORIES_RUTA = `https://api.themoviedb.org/3/discover/movie?with_genres=${catIdNumber}&sort_by=popularity.desc&include_adult=false&page=1`;
            const request = await fetch(API_CATEGORIES_RUTA, options);
            const resolve = await request.json(); // esto si es un array

            if (resolve.results.length > 0) {
                // ya vienen filtradas las movies per category con el anterior endpoint.
                setMoviesPerCategories(prev => ({
                    ...prev,
                    moviesCtg: resolve.results || [],
                    errorMoviesCtg: ""
                })); 
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

    // fetch para trending movies.

    async function fetchTrendingMovies() {
        try {
            const request = await fetch(API_TRENDING, options);
            const resolve = await request.json();
            const data = resolve.results;

            if (data.length > 0) {
                // actualizamos el estado
                setTrendingMovies(prev => ({
                    ...prev,
                    trending: data || [],
                    errorTrendingMovies: "",
                    loadingTrengingMovies: false
                }));
            }
        } catch (error) {
            // actualizamos el estado
            setTrendingMovies(prev => ({
                ...prev,
                errorTrendingMovies: "Error fetching trending movies per week",
                loadingTrengingMovies: false
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
        moviesPerCategories,
        categoriesPerMovie,
        recommendedMovies,
        fetchTrendingMovies,
        trendingMovies
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