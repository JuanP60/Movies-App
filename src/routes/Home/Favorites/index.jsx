import React from "react";  
import { Header } from "../../../ui/Header/Header";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

function Favorites() {

    const {moviesLiked} = useLocalStorage();

    if (!!moviesLiked.loading) return <p>Cargando peliculas favoritas...</p>
    if (!!moviesLiked.error) return <p>{moviesLiked.error}</p>
    // agregar estructura de map con estilos ya creados en otros componentes. base url. default size.

    return (
        <div>
            <Header />
            <h1>Favorites Page</h1>

        </div>
    );
}

export { Favorites };