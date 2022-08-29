import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Home from './pages/Home.js'
import Search from './pages/Search.js'
import Movies from './pages/Movies.js'
import TvShows from './pages/TvShows.js';
import Login from './pages/Login.js';
import WatchList from './pages/WatchList.js';
import Detail from './pages/Detail.js';
import AuthProvider from './contexts/AuthContext.js';
import { HashRouter as Router,Route,Routes} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

function App(){

    return(
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/searched/:search' element={<Search/>}/>
                    <Route path='/movies/:page' element={<Movies/>}/>
                    <Route path='/tvshows/:page' element={<TvShows/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/watchlist/:id' element={<WatchList/>}/>
                    <Route path='/detail/:type/:id/:user_id' element={<Detail/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    )
}

root.render(<App />)