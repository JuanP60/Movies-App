import FavoriteIcon from '@mui/icons-material/Favorite';

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
        onClick={event => {
            event.stopPropagation();
            handleClick();
        }}
        className="z-50 cursor-pointer transform transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-110 absolute top-3 right-3"
        >
            {toggle ? <FavoriteIcon className='text-rose-600'/> : <FavoriteIcon className='text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'/>}
        </button>
    )
}

export { FavoritesFunc };