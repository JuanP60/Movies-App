function FavoritesFunc({toggle, movieID, movieData, addMovie, removeMovie}) {

    function handleClick() {
        if (!toggle) { // false
            addMovie(movieData); // funciones del custom hook useLocalStorage
            //console.log(`Movie: ${movieData.title} agregada, estado del toggle: ${toggle}`);
        } else {
            removeMovie(movieID);
            //console.log(`Movie: ${movieData.title} eliminada, estado del toggle: ${toggle}`);
        }
    }

    return (
        <button
        onClick={handleClick}
        className="z-50 cursor-pointer transition transform hover:-translate-y-1 hover:scale-3d"
        >
            {toggle ? "Corazon red " : "corazon white"}
        </button>
    )
}

export { FavoritesFunc };