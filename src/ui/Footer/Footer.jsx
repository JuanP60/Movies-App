function Footer () {

    const year = new Date().getFullYear(); // current year

    return (
        <div className="flex justify-center mt-36 p-10 gap-32 bg-footer text-text-secondary">
            <div className="mt-2">
                <span> {year} © MovieApp by JuanP60</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <span>Built with React & TMDB API</span>
                <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
            </div>
            <div className="flex justify-center gap-2 mt-2">
                <span>Github</span>
                <span>LinkedIn</span>
            </div>
        </div>
    )
}

export {Footer};