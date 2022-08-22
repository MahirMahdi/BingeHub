import { Icon } from '@iconify/react';
import React,{ useState,useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import AvatarDropdown from './AvatarDropdown.js';


export default function Navbar(){
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
            <div className="navbar">
                <Icon icon="emojione:film-projector" className='logo'/>
                <a href="/"><h1 className='title'>BingeHub</h1></a>
                <form onSubmit={submitSearch}>
                    <input type="search" onChange={updateSearch} value={search} className='search-bar' placeholder='Search...'/>
                </form>
                <a href="/movies/1" ><p className='movies'>Movies</p></a>
                <a href="/tvshows/1" ><p className='tvshows'>TV Shows</p></a>
                {currentUser && <AvatarDropdown/>}
                {!currentUser && <a href="/login" ><p className='login'>Login</p></a>}
            </div>
        </div>
    )
};
