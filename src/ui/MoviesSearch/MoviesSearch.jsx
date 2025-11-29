// {prop que paso directamente desde el dashboard}

function MoviesSearch({onSearchMovie}) {
    return (
        <div className="flex justify-center mt-10">
            <input
            type="text"
            placeholder="Buscar una película"
            className="border rounded-xl text-center"
            onChange={(e) => onSearchMovie(e.target.value)}
            />
        </div>
    )
}

export { MoviesSearch };