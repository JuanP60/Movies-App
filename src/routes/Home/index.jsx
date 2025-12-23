import { Header } from "../../ui/Header/Header";
import { MoviesDashBoard } from "../../ui/DashBoard/DashBoard";
import { CategoriesList } from "../../ui/CategoriesList/CategoriesList";
import { Footer } from "../../ui/Footer/Footer";

function Home() {
    return (
        <div>
            <Header />
            <CategoriesList />
            <MoviesDashBoard />
            <Footer />
        </div>
    );
}

export { Home };