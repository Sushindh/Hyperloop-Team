import Home from "./Home.jsx"
import About from "./About.jsx"
import FKC from "./FastKmCalculator.jsx"
import Map from "./Map12.jsx"
import {Link} from "react-router-dom"

function Navbar(){
    return(
        <div className="flex justify-center items-center pt-2" >
            <button className="font-semibold font-sans text-xl  hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30 h-12 w-20 rounded-sm flex justify-center items-center " ><Link to="/Home" >Home</Link></button>
            <button className="font-semibold font-sans text-xl  hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30 h-12 w-52 rounded-md flex justify-center items-center " ><Link to="/About" >About The Project</Link></button>
            <button className="font-semibold font-sans text-xl  hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30 h-12 w-52 rounded-md flex justify-center items-center " ><Link to="/FKC" > Check Distance</Link></button>
            <button className="font-semibold font-sans text-xl  hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30 h-12 w-52 rounded-md flex justify-center items-center " ><Link to="/Map" > Current Routes</Link></button>
        </div>
    );
}

export default Navbar