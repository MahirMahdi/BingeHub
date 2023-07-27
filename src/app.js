import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Home from "./pages/Home.js";
const Search = lazy(() => import("./pages/Search.js"));
const Movies = lazy(() => import("./pages/Movies.js"));
const TvShows = lazy(() => import("./pages/TvShows.js"));
const Login = lazy(() => import("./pages/Login.js"));
const Layout = lazy(() => import("./components/Layout.js"));
const Watchlist = lazy(() => import("./pages/Watchlist.js"));
const Detail = lazy(() => import("./pages/Detail.js"));

export default function App() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/searched/:search" element={<Search />} />
          <Route path="/movies/:page" element={<Movies />} />
          <Route path="/tvshows/:page" element={<TvShows />} />
          <Route path="/login" element={<Login />} />
          <Route path="/watchlist/:id" element={<Watchlist />} />
          <Route path="/detail/:type/:id/:user_id" element={<Detail />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
