import { useLocation } from "react-router-dom"
import Header from './Components/Layout/Header/Header.jsx'
import Navbar from './Components/Layout/Navbar/Navbar.jsx'
import Footer from './Components/Layout/Footer/Footer.jsx'
import ProductsList from "./Functions/ProductsList.js"
import AllRoutes from "./Pages/AllRoutes.jsx"

import './App.css'

function App() {
  ProductsList();
  
  const location = useLocation();
  const isLoginPage = (location.pathname === '/login' || location.pathname === '/signup');
  const isLoggedIn = localStorage.getItem("user") && localStorage.getItem("user").length > 2;
  let username = "";
  if (isLoggedIn) {
    username = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <>
      {!isLoginPage && (
        <>
          <Header isLoggedIn={isLoggedIn} username={username}/>
          <Navbar />
        </>
      )}


      <AllRoutes />

      {!isLoginPage && <Footer />}
    </>
  )
}

export default App
