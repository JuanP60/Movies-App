function FavoritesFunc({toggle, movieID, movieData, addMovie, removeMovie}) {

    function handleClick() {
        if (!toggle) { // false
            addMovie(movieData); // funciones del custom hook useLocalStorage
        } else {
            removeMovie(movieID);
        }
    }

    return (
        <button
        onClick={handleClick}
        className="z-50 cursor-pointer transition transform hover:-translate-y-1 hover:scale-3d"
        >
            {toggle ? "❤️" : "🤍"}
        </button>
    )
}

export { FavoritesFunc };