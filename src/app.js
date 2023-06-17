import Home from "./pages/Home.js";
import Search from "./pages/Search.js";
import Movies from "./pages/Movies.js";
import TvShows from "./pages/TvShows.js";
import Login from "./pages/Login.js";
import WatchList from "./pages/WatchList.js";
import Detail from "./pages/Detail.js";
import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/searched/:search" element={<Search />} />
      <Route path="/movies/:page" element={<Movies />} />
      <Route path="/tvshows/:page" element={<TvShows />} />
      <Route path="/login" element={<Login />} />
      <Route path="/watchlist/:id" element={<WatchList />} />
      <Route path="/detail/:type/:id/:user_id" element={<Detail />} />
    </Routes>
  );
}
