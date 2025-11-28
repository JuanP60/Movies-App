import { Header } from "../../ui/Header/Header";
import { MoviesDashBoard } from "../../ui/DashBoard/DashBoard";
import { CategoriesList } from "../../ui/CategoriesList/CategoriesList";
import { MoviesSearch } from "../../ui/MoviesSearch/MoviesSearch";

function Home() {
    return (
        <div>
            <Header />
            <CategoriesList />
            <MoviesSearch />
            <MoviesDashBoard />
        </div>
    );
}

export { Home };