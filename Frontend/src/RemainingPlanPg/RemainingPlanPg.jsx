import NavBar from '../Components/Navbar/NavBar';
import RemainPlan from '../Components/YourPlan/YourPlan';
import Sidebar from "../Components/Sidebar/SideBar";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from "../Components/Appbar/AppBar";

export default function GeneratePlanpg() {
  const navigate=useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check authentication status when the component mounts
    // You can use your authentication state or token logic here
    const token = localStorage.getItem("token");
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
        <NavBar isOpen={isOpen} />
        <RemainPlan isOpen={isOpen}/>
        <AppBar isAuthenticated={isAuthenticated} handleLogout={handleLogout}/>
        </>
    );
}