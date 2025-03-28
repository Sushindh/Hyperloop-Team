import Home from "./Home.jsx"
import About from "./About.jsx"
import HP1 from "./HyperloopProject (1).jsx"
import Map from "./Map12.jsx"
import Contact from "./Contact.jsx"
import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { Menu, X } from "lucide-react" 

function Navbar() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const getNavLinkClass = (path) => {
        const baseClasses = "font-semibold font-sans text-xl flex justify-center items-center transition-all duration-200";
        const activeClasses = "text-white backdrop-blur-sm bg-emerald-100/30";
        const hoverClasses = "hover:text-white hover:backdrop-blur-sm hover:bg-emerald-100/30";
        

        const mobileClasses = "w-full h-12 rounded-md mb-2";
    
        const desktopClasses = `h-12 ${path === "/Home" ? "w-20 rounded-sm" : "w-52 rounded-md"}`;
        
        return `${baseClasses} ${location.pathname === path ? activeClasses : hoverClasses} ${
            isMenuOpen ? mobileClasses : desktopClasses
        }`;
    };

    return (
        <nav className="relative">
            
            <div className="md:hidden flex justify-end p-4">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-700 hover:text-emerald-500 transition-colors"
                >
                    {isMenuOpen ? (
                        <X size={24} />
                    ) : (
                        <Menu size={24} />
                    )}
                </button>
            </div>
            <div className={`
                ${isMenuOpen 
                    ? 'flex flex-col absolute top-16 left-0 right-0 bg-blue-500 p-4 shadow-lg rounded-lg mx-4' 
                    : 'hidden'
                } 
                md:flex md:flex-row md:static md:justify-center md:items-center md:pt-2 md:bg-transparent md:shadow-none
            `}>
                <Link to="/Home" className={getNavLinkClass("/Home")}>Home</Link>
                <Link to="/About" className={getNavLinkClass("/About")}>About The Project</Link>
                <Link to="/HP1" className={getNavLinkClass("/HP1")}>Hyperloop Simulation</Link>
                <Link to="/Map" className={getNavLinkClass("/Map")}>Current Routes</Link>
                <Link to="/Contact" className={getNavLinkClass("/Contact")}>Contact Us</Link>

            </div>
        </nav>
    );
}

export default Navbar