import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/online-survey.png';
import { Link, NavLink } from 'react-router-dom';


const  ResponsiveAppBar= () =>{

  const returnActiveClass = ({ isActive}:any)=>{
      return isActive
      ? "nav-link active"
      : "nav-link";
  }


  return(
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand>
        <Link className='nav-link ' to={'/dashboard/home'}>
          <img src={Logo} alt='Logo' height={60}/>   
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink className={returnActiveClass} to={'/dashboard/home'}>Home</NavLink>
          <NavLink className={returnActiveClass} to={'/dashboard/surveys'}>Surveys</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}
export default ResponsiveAppBar;
