import { Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer () {

    const year = new Date().getFullYear(); // current year

    return (
        <div className="flex justify-center items-center mt-36 p-10 gap-30 border-t border-red-950 bg-footer text-text-secondary">
            <div>
                <span> {year} © MovieApp by JuanP60</span>
            </div>
            <div className="flex flex-col items-center gap-4">
                <span>Built with React & TMDB API</span>
                <span>This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
            </div>
            <div className="flex flex-col items-center gap-4">
                <div className='flex flex-row justify-center gap-2'>
                    <Link to={'https://github.com/JuanP60'}> <span className='hover:cursor-pointer'>Github</span> </Link> 
                    <GitHubIcon />
                </div>
                <div className='flex flex-row justify-center gap-2'>
                    <Link to={'https://www.linkedin.com/in/juan-pablo-aguirre-jim%C3%A9nez-7b90a8273/'}> <span className='hover:cursor-pointer'>LinkedIn</span> </Link>
                    <LinkedInIcon />
                </div>
            </div>
        </div>
    )
}

export {Footer};