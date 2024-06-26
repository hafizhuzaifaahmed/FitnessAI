import { useEffect, useState } from 'react';
import NavBar from '../Components/Navbar/NavBar';
import Progress from '../Components/Progress/Progress';
import Sidebar from '../Components/Sidebar/SideBar';
import AppBar from '../Components/Appbar/AppBar';
import './pg.css';
import { useNavigate } from 'react-router-dom';
export default function ProgressPg() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check authentication status when the component mounts
    // You can use your authentication state or token logic here
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);
  const handleLogout = () => {
    // Clear the token from the cookie
    localStorage.removeItem("token");

    // Update the authentication state
    setIsAuthenticated(false);
    localStorage.removeItem("profileData");
    // Redirect to the login page after logout
    navigate("/login");
  };
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    return (
      <>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <NavBar
          isOpen={isOpen}
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
        />
        <Progress isOpen={isOpen} />
        
      </>
    );
}