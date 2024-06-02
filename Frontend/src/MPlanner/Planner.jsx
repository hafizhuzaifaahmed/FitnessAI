import { useState, useEffect } from "react";
import MealPlanner from "../Components/Meal Planner/MealPlanner";
import NavBar from "../Components/Navbar/NavBar";
import Sidebar from "../Components/Sidebar/SideBar";
import AppBar from "../Components/Appbar/AppBar";
import { useNavigate } from "react-router-dom";
export default function Planner(){
  const navigate=useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      // Check authentication status when the component mounts
      // You can use your authentication state or token logic here
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }, []);
    const handleLogout = () => {
      // Clear the token from the cookie
      localStorage.removeItem('token');
      
      // Update the authentication state
      setIsAuthenticated(false);
      localStorage.removeItem("profileData");
      
      // Redirect to the login page after logout
      navigate('/login');
    };
    return(
        <>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
            <NavBar isOpen={isOpen} isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
            <MealPlanner isOpen={isOpen}/>
            <AppBar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
            </>
    );
}