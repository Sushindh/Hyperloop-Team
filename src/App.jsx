import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx"
import About from "./About.jsx"
import Login from "./Login.jsx"
import Map from "./Map12.jsx"
import HP1 from "./HyperloopProject (1).jsx"

function App() {
  return(
    <div>
      <BrowserRouter>
     
     <Routes>
        <Route path="/" element={<Login />} />  
         <Route path="/Home" element={<Home />} />
         <Route path="/About" element={<About />} />
         <Route path="/HP1" element={<HP1 />} />
         <Route path="/Map" element={<Map />} />
     </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App
