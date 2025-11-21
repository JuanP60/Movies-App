import { Header } from "../../ui/Header/Header";
import { MoviesDashBoard } from "../../ui/DashBoard/DashBoard";
import { CategoriesList } from "../../ui/CategoriesList/CategoriesList";

function Home() {
    return (
        <div>
            <Header />
            <CategoriesList />
            <MoviesDashBoard />
        </div>
    );
}

export { Home };