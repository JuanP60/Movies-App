import { Header } from "../../ui/Header/Header";
import { MoviesDashBoard } from "../../ui/DashBoard/DashBoard";

function Home() {
    return (
        <div>
            <Header />
            <MoviesDashBoard />
        </div>
    );
}

export { Home };