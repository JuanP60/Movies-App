import React from "react";

function MoviesSearch() {
    return (
        <div className="flex justify-center mt-10">
            <input
            type="text"
            placeholder="Buscar una película"
            className="border rounded-xl text-center"
            />
        </div>
    )
}

export { MoviesSearch };