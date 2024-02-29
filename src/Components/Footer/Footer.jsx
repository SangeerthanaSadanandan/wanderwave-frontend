import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'
import { Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import logo from '../../Assets/logos.jpg'

const quick__links = [
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
  },
]

const quick__links2 = [
  {
    path: '/gallery',
    display: 'Gallery'
  },
  {
    path: '/login',
    display: 'Login'
  },
  {
    path: '/register',
    display: 'Register'
  },
]

function Footer() {

  const year = new Date().getFullYear()

  return (
    <>
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <img src={logo} alt="" />
              WanderWave
              <p>WanderWave is a premier travel agency dedicated to helping you discover the world's most amazing destinations. With our personalized service and support, you can embark on the adventure of a lifetime, whether you're seeking relaxation, exploration, or cultural immersion.</p>
              <div className="social__link d-flex align-items-center gap-4">
                <span>
                  <Link to='#'>
                  <i class="fa-brands fa-youtube"></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                  <i class="fa-brands fa-github"></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                  <i class="fa-brands fa-facebook"></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                  <i class="fa-brands fa-instagram"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg='3'>
            <h5 className="footer__link-title">Discover</h5>

            <ListGroup className='footer__quick-links'>
              {
                quick__links.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Quick Links</h5>

            <ListGroup className='footer__quick-links'>
              {
                quick__links2.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Contact</h5>

            <ListGroup className='footer__quick-links'>
    
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i class="fa-solid fa-envelope"></i></span>
                  Email:
                </h6>

                <p className='mb-0'>wanderwavetravels@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i class="fa-solid fa-phone-volume"></i></span>
                  Phone:
                </h6>
                <p className='mb-0' style={{fontFamily:'sans-serif',color:'#6e7074',fontSize:'17px'}}>0497-678943</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          
          <Col lg='12' className='text-center pt-5'>
            <p className='copyright'>Copyright {year} <a href='/home' style={{color:'#fd7e14'}}>WanderWave</a> | All rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  )
}

export default Footer