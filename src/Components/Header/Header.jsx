import React, { useEffect } from 'react'
import './header.css'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Container, Row, Button } from 'reactstrap'
import logo from '../../Assets/logos.jpg'


const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About Us'
  },
  {
    path: '/tours',
    display: 'Tour Package'
  }
]

function Header({ user }) {

  const location = useNavigate()

  const logout=()=>{
    sessionStorage.clear();
    location('/')
  }


  useEffect(() => {
    const isSticky = () => {
      const header = document.querySelector('.header');
      const scrollTop = window.scrollY;
      if (scrollTop >= 250) {
        header.classList.add('is-sticky');
      } else {
        header.classList.remove('is-sticky');
      }
    };

    window.addEventListener('scroll', isSticky);

    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);


  return (
    <>
    <header className='header'>
      <Container>
        <Row>
          <div className="nav_bar d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="" /> 
              WanderWave
            </div>

            <div className="navigation">
              <ul className='menu d-flex align-items-center gap-5'>
                {nav_links.map((item, index) => (
                  <li className='nav_item' key={index}>
                    <NavLink to={item.path} className={navClass=>navClass.isActive?'active_link':""}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
                {user?(<>
                  <Button className='btn secondary__btn'><Link to={`/myprofile/${user._id}`}>{user.name}</Link></Button>
                  <Button className='btn primary__btn' onClick={logout}>Logout</Button>
                </>):(
                  <>
                  <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                  <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Row>
        </Container>
    </header>
    </>
  )
}

export default Header
