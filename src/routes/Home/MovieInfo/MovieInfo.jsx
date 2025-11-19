import React from "react";
import { Header } from "../../../ui/Header/Header";
import { useParams } from "react-router-dom";

function MovieInfo() {

    const params = useParams();
    const movieId = params.id; // id de la movie

    return (
        <div>
            <Header />
            <p>movie info: {movieId}</p>
        </div>
    );
}

export {MovieInfo};