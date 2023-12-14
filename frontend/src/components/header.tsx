import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/survey.png';
import { Link, NavLink } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import { useContext } from 'react';
import { MyContext, removeLocalStorageData } from '../context/surveyContext';


const ResponsiveAppBar = () => {

  const {} = useContext(MyContext);
  const returnActiveClass = ({ isActive }: any) => {
    return isActive
      ? "nav-link active"
      : "nav-link";
  }

  const logout = () =>{
    axiosClient.post('logout').then((resp)=>{
      if(resp.data.success){
        removeLocalStorageData();
      }
    }).catch((err) =>{
      removeLocalStorageData();
    })
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link className='nav-link ' to={'/dashboard/home'}>
            <img src={Logo} alt='Logo' height={60} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={returnActiveClass} to={'/dashboard/home'}>Home</NavLink>
            <NavLink className={returnActiveClass} to={'/dashboard/surveys'}>Surveys</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end gap-2" >
          Logout 
          <a onClick={logout} role="button" className='border border-1 rounded-circle bg-default flex justify-content-center align-items-center fs-4 ' style={{ height:'50px',width:'50px'}} >
             <i className="bi bi-box-arrow-right"></i>
          </a>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default ResponsiveAppBar;
