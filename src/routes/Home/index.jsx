import { Header } from "../../ui/Header/Header";
import { MoviesDashBoard } from "../../ui/DashBoard/DashBoard";
import { CategoriesList } from "../../ui/CategoriesList/CategoriesList";
import { Footer } from "../../ui/Footer/Footer";

function Home() {
    return (
        <div>
            <section className=" relative h-[70vh] bg-cover bg-center bg-amber-50" style={{backgroundImage: "url('/bg-home.jpg')"}}>
                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-b from-black to-transparent" />
                <Header />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-b from-transparent to-black" />
            </section>

            <CategoriesList />
            <MoviesDashBoard />
            <Footer />
        </div>
    );
}

export { Home };