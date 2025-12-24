function Footer () {

    const year = new Date().getFullYear(); // current year

    return (
        <div className="flex justify-center items-center mt-36 p-10 gap-30 border-t border-red-950 bg-footer text-text-secondary">
            <div>
                <span> {year} © MovieApp by JuanP60</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <span>Built with React & TMDB API</span>
                <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <span>Github</span>
                <span>LinkedIn</span>
            </div>
        </div>
    )
}

export {Footer};