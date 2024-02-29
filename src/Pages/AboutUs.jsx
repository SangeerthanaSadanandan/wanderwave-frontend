import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import { Col, Container, Row } from 'reactstrap'
import Review from '../Components/Review/Review'
import './Styles/About.css'
import about from '../Assets/about.png'



function AboutUs() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])

  return (
    <div>
     <Header user={user}/>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="about_card">
                <div className="row">
                  <div className="col-md-4 mt-3">
                    <h2>About <br /><span>WanderWave</span></h2>
                  </div>
                  <div className="col-md-8 mt-3">
                    <p>Embark on a journey with WanderWave, where we redefine travel as a seamless and delightful experience. Our commitment lies in crafting bespoke tours tailored to your unique interests, preferences, and budget, ensuring every adventure is as extraordinary as you are.</p>
                    <p>Meet our team of seasoned travel experts, passionate about turning your wanderlust into reality. Collaborating closely with you, we design a personalized tour that caters to your individual needs, whether you're exploring solo, with friends, or alongside family. From your first inquiry to the moment you step back into the familiar, we're dedicated to making your journey smooth, memorable, and stress-free.</p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <h5 style={{fontWeight:'bold'}}>Vision</h5>
                    <p>At WanderWave, we envision inspiring and empowering individuals to traverse the globe, fostering meaningful connections with diverse cultures. We believe in the transformative power of travel, encouraging everyone to explore beyond boundaries and embrace the beauty of our world.</p>
                  </div>
                  <div className="col-md-6 mt-4">
                    <h5 style={{fontWeight:'bold'}}>Mission</h5>
                    <p>Our mission is to curate unparalleled travel experiences, finely tuned to the preferences of each adventurer. Simultaneously, we champion local communities, endorsing responsible tourism practices that contribute to the preservation and prosperity of the destinations we explore. Join us on a journey where every step is a celebration of exploration, connection, and responsible travel.</p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg='12'>
              <div className="thumb">
                <img src={about} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <h4 style={{fontWeight:'bold'}}>Goal of WanderWave</h4>
              <p className='mt-3' style={{fontSize:'15px',lineHeight:'24px',color:'#737679'}}>At WanderWave, our goals are rooted in providing unparalleled travel experiences. We strive for customer satisfaction excellence by exceeding expectations and offering personalized service. Committed to sustainable tourism, we minimize our environmental impact and support local communities. We aim to stay innovative, adapting to the evolving needs of modern travelers. Promoting cultural exchange, community empowerment, and global connectivity, we seek to be a positive force for change. Continuous improvement is ingrained in our culture, ensuring that each journey with WanderWave is not just a trip but a transformative and responsible exploration.</p>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section>
        <Container>
        <h4 style={{marginBottom:'30px',fontWeight:'bold'}}>What our Customers say about us</h4>
        <Review />
        </Container>
      </section>
      <Footer/>
    </div>
  )
}

export default AboutUs