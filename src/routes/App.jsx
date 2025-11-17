import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home/index"
import { Trending } from "./Trending/index"
import { Favorites } from "./Favorites/index";

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