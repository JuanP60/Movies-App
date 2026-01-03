import SearchIcon from '@mui/icons-material/Search';

// {prop que paso directamente desde el dashboard}

function MoviesSearch({onSearchMovie}) {
    return (
        <div className="w-full max-w-6xl mx-auto mt-14 relative">
            <SearchIcon  className="absolute left-2 top-1/2 -translate-y-1/2 text-text-primary"/>
            <input
            type="text" 
            placeholder=""
            className="
            border rounded-xl text-left p-2.5 border-t-0 border-l-0 border-r-0 border-text-primary 
            w-full max-w-6xl mx-auto 
            outline-none focus:outline-none focus:ring-0 pl-10"
            onChange={(e) => onSearchMovie(e.target.value)}
            />
        </div>
    )
}

export { MoviesSearch };