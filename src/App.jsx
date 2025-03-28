import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home.jsx"
import About from "./About.jsx"
import Login from "./Login.jsx"
import Map from "./Map12.jsx"
import HP1 from "./HyperloopProject (1).jsx"
import Contact from "./Contact.jsx"
import Signup from "./Signup.jsx"
import TOS from "./TOS.jsx"
import PP from "./PrivacyPolicy.jsx"

function App() {
  return(
    <div>
      <BrowserRouter>
     
     <Routes>
         <Route path="/" element={<Login />} /> 
         <Route path="/signup" element={< Signup/>} />  
         <Route path="/Home" element={<Home />} />
         <Route path="/About" element={<About />} />
         <Route path="/HP1" element={<HP1 />} />
         <Route path="/Map" element={<Map />} />
         <Route path="/Contact" element={<Contact />} />
         <Route path="/tos" element={<TOS />} />
         <Route path="/privacy" element={<PP />} />
     </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App
