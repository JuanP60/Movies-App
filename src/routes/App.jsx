import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/index"
import { Trending } from "./Home/Trending/index";
import { Favorites } from "./Home/Favorites/index";

// rutas de mi app

function App () {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/favorites" element={<Favorites />}/>
        <Route path="*" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

export default App;