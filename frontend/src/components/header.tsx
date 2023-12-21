import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/survey.png';
import { Link, NavLink } from 'react-router-dom';
import axiosClient from '../utils/axiosClient';
import { removeLocalStorageData } from '../context/surveyContext';
import { useState } from 'react';
import { ShowSuceessMessage } from '../utils/SweetAlert';
import { Spinner } from 'react-bootstrap';


const ResponsiveAppBar = () => {
  const [loading,setLoading] = useState<boolean>(false);
  
  const returnActiveClass = ({ isActive }: any) => {
    return isActive
      ? "nav-link active"
      : "nav-link";
  }

  const logout = () =>{
    setLoading(true);
    axiosClient.post('logout').then((resp)=>{
      if(resp.data.success){
         removeLocalStorageData();
         ShowSuceessMessage('See you soon!')
      }
    }).catch((err) =>{
        removeLocalStorageData();
  }).finally(() => {setLoading(false);})
  }


  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <Link className='nav-link ' to={'/home'}>
            <img src={Logo} alt='Logo' height={60} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className={returnActiveClass} to={'/home'}>Home</NavLink>
            <NavLink className={returnActiveClass} to={'/surveys'}>Surveys</NavLink>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end gap-2" >
          Logout 
          <button disabled={loading} onClick={logout} role="button" className='border border-1 rounded-circle bg-default flex justify-content-center align-items-center fs-4 ' style={{ height:'50px',width:'50px'}} >
            {loading?<Spinner/>:(<i className="bi bi-box-arrow-right"></i>)} 
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default ResponsiveAppBar;
