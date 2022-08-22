import HomeNavbar from '../components/HomeNavbar.js';
import Trending from '../components/Trending.js';
import TopRated from '../components/TopRated.js';

export default function Home(){
    return(
        <div>
            <HomeNavbar/>
            <Trending/>    
            <TopRated/>
        </div>
    )
};