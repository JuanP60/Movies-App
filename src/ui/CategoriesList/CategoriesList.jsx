import React from "react";

function CategoriesList() {

    const [categories, setCategories] = React.useState([]);

    // endpoints para traer todas las categorias disponibles
    const API_CATEGORIES = "https://api.themoviedb.org/3/genre/movie/list";
    const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTkyNDk5MDkwOGE4YWY2ODFmMjhkYTk5MjRkM2ZiNSIsIm5iZiI6MTc2MzMzNjQyNy4zOTUsInN1YiI6IjY5MWE2MGViYTE2OWY1ZjMxMTQ0Njg0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMrFZ334iZwue2dMoafUSwb8a-QdXeeoeVEKGFhto34";
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
        }
    };

    React.useEffect(() => {
        async function fetchCategories() {
            try {
                const request = await fetch(API_CATEGORIES, options);
                const response = await request.json(); // pasamos a json la respuesta que se supone ser todas la categories
                const data = response.genres;

                if (data && data.length > 0) {
                    setCategories(data);
                    console.log(data);
                }

            } catch (error) {
                console.log("Error en fetch de categories")
            }
        }
        fetchCategories();
    }, [])

    return (
        <div className="flex flex-col items-center">
            <p>Categorias</p>
            <ul className="flex gap-1.5">
                {categories.map(category => (
                    <li key={category.id}>{category.name}</li>
                ))}
            </ul>
        </div>
    );
}

export {CategoriesList};