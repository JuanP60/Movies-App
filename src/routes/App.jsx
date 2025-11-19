import { HashRouter, Routes, Route } from "react-router-dom";
import { ApiProvider } from "./ProviderApiTMDB";
import { Home } from "./Home/index"
import { Trending } from "./Home/Trending/index";
import { Favorites } from "./Home/Favorites/index";
import { MovieInfo } from "./Home/MovieInfo/MovieInfo";

// rutas de mi app

function App () {
  return (
    <HashRouter>
      <ApiProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieInfo />}/>
          <Route path="/trending" element={<Trending />} />
          <Route path="/favorites" element={<Favorites />}/>
          <Route path="*" element={<Home />} />
        </Routes>
      </ApiProvider>

    </HashRouter>
  )
}

export default App;