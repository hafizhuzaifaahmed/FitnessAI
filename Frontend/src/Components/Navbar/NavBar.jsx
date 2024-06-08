import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Logo from '../Assets/dead_lift.png';
import './nav.css';
import { useLocation, useNavigate } from 'react-router-dom';


//shadow p-3 mb-5 bg-body rounded 
const NavBar = ({ isOpen, isAuthenticated, handleLogout }) => {
  const navigate=useNavigate();
  const location = useLocation();

  
  const reloadIfOnSamePage = () => {
    if (location.pathname === '/') {
      window.location.reload();
    } else {
      navigate('/');
    }
  };
  let isauthenticated= false;

  return (
    <div className={`navbar ${isOpen ? 'shifted' : ''}`}>
   <Navbar
          expand="lg"
          className="custom-navbar rounded  p-3 mb-5"
          variant='light'
        >
           <Nav.Item className="font-bold-extra text-uppercase logo-text" onClick={reloadIfOnSamePage}> Ded-Lift</Nav.Item>
          <Navbar.Brand ><img onClick={reloadIfOnSamePage} src={Logo} className='Logo'></img>
         
          </Navbar.Brand>
          <Navbar.Toggle className='dedpool'  aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            
            <Nav className="me-auto">
              <div className='plan-heading'>
              <Link to="/generatePlan">Generate Plan</Link>
              </div>
              <div className='yourPlan-heading'> 
              <Link to="/yourPlan">My Plan</Link>
              </div>
              <div className='help-heading'> 
              <Link to="/help">Help</Link>
              </div>
              
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#memes">
                <NavDropdown
                  title={<PersonCircle size={20} />}
                  id="navbarScrollingDropdown"
                >
                  {isAuthenticated ? (
                    <>
                <NavDropdown.Item onClick={handleLogout} className='nav-link-transition'>Logout</NavDropdown.Item>
                <NavDropdown.Item className='nav-link-transition' onClick={()=>navigate('/profile')}>Profile</NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item onClick={() => navigate('/login')} className='nav-link-transition'>Login</NavDropdown.Item>
              )}
                  
        
                </NavDropdown>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      
    </div>
  );
}

export default NavBar;
