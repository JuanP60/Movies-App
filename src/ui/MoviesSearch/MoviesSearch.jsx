import SearchIcon from '@mui/icons-material/Search';

// {prop que paso directamente desde el dashboard}

function MoviesSearch({onSearchMovie}) {
    return (
        <div className="w-full max-w-6xl mx-auto mt-14 relative">
            <SearchIcon  className="absolute"/>
            <input
            type="text" 
            placeholder=""
            className="
            border rounded-xl text-left p-2.5 border-t-0 border-l-0 border-r-0 border-red-950 
            w-full max-w-6xl mx-auto 
            outline-none focus:outline-none focus:ring-0
            pl-8
            "
            onChange={(e) => onSearchMovie(e.target.value)}
            />
        </div>
    )
}

export { MoviesSearch };