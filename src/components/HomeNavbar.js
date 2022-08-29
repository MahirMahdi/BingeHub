import { Icon } from '@iconify/react';
import React,{ useState,useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import { useNavigate, Link } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown.js';


export default function HomeNavbar(){
    const navigate = useNavigate();
    const [currentUser] = useContext(AuthContext);
    const [search, setSearch] = useState('');

    function updateSearch(e){
        setSearch(e.target.value);
    };

    function submitSearch(){
        navigate('/searched/'+ search);
        
    };

    return(
        <div>
            <div className="navbar-home">
                <Icon icon="emojione:film-projector" className='logo'/>
                <Link to="/"><h1 className='title'>BingeHub</h1></Link>
                <form onSubmit={submitSearch}>
                    <input type="search" onChange={updateSearch} value={search} className='search-bar-home' placeholder='Search...'/>
                </form>
                <Link to="/movies/1" ><p className='movies'>Movies</p></Link>
                <Link to="/tvshows/1" ><p className='tvshows'>TV Shows</p></Link>
                {currentUser && <AvatarDropdown/>}
                {!currentUser && <Link to="/login" ><p className='login'>Login</p></Link>}
            </div>
        </div>
    )
};
