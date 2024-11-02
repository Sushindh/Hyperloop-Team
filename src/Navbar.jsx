import Home from "./Home.jsx"
import About from "./About.jsx"
import HP1 from "./HyperloopProject (1).jsx"
import Map from "./Map12.jsx"
import { Link, useLocation } from "react-router-dom"

function Navbar() {
    const location = useLocation();

    const getNavLinkClass = (path) => {
        const baseClasses = "font-semibold font-sans text-xl h-12 rounded-md flex justify-center items-center transition-all duration-200";
        const activeClasses = "text-white backdrop-blur-sm bg-emerald-100/30";
        const hoverClasses = "hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30";
        
        return `${baseClasses} ${location.pathname === path ? activeClasses : hoverClasses} ${
            path === "/Home" ? "w-20 rounded-sm" : "w-52"
        }`;
    };

    return (
        <div className="flex justify-center items-center pl-1 pt-2">
            <Link to="/Home" className={getNavLinkClass("/Home")}>Home</Link>
            <Link to="/About" className={getNavLinkClass("/About")}>About The Project</Link>
            <Link to="/HP1" className={getNavLinkClass("/HP1")}>Hyperloop Simulation</Link>
            <Link to="/Map" className={getNavLinkClass("/Map")}>Current Routes</Link>
        </div>
    );
}

export default Navbar