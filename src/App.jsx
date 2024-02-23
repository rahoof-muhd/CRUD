import React  from "react";
import axios from "axios";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Create from "./assets/components/create";
import Read from "./assets/components/read";
import Home from "./assets/components/home";

function App() {

  console.log(import.meta.env);
  axios.defaults.baseURL = location.origin;
  if(import.meta.env.MODE == "development") {
    axios.defaults.baseURL = "http://localhost:3000"
  }

return(
  <>
  <BrowserRouter>
  <Routes>
  <Route path="/" element={<Home/>} />
   <Route path="/create" element={<Create/>}/> 
   <Route path="/read" element={<Read/>}/> 
  </Routes>
  </BrowserRouter>
  </>
)

}
export default App;