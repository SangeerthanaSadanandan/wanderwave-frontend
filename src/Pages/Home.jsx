import React, { useState } from 'react'
import './Styles/Home.css'
import { Col, Container, Row } from 'reactstrap'
import img1 from '../Assets/img1.jpeg'
import img2 from '../Assets/hero-img02.jpg'
import video from '../Assets/hero-video.mp4'
import worldimg from '../Assets/world.png'
import Gallery from '../Components/Gallery'
import Review from '../Components/Review/Review'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import { useEffect } from 'react'
import TourCard from '../Components/TourCard'
import { Link } from 'react-router-dom'
import { homeTourAPI } from '../Services/allAPI'

function Home() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])

  const [homeTour,setHomeTour]=useState([])

  const getHomeTour=async()=>{
    const result = await homeTourAPI()
    console.log(result);
    if(result.status===200){
        setHomeTour(result.data)
        console.log(homeTour);
    }
    else{
        console.log(result.response.message);
    }
}
useEffect(()=>{
    getHomeTour()
},[])


  return (
    <>
      <Header user={user} />
      <section>
        <Container>
          <Row>
            <Col lg='6'>
              <div className="head_content">
                <div className="head_subtitle d-flex align-items-center">
                  <p>Know Before You Go </p>
                  <img src={worldimg} alt="" />
                </div>
                <h1><span className='highlights'>From dream to destination - </span>book your perfect getaway now!</h1>
                <p>Embark on a journey with <span className='highlights'>WanderWave</span>, where we redefine travel as a seamless and delightful experience. Our commitment lies in crafting bespoke tours tailored to your unique interests, preferences, and budget, ensuring every adventure is as extraordinary as you are.</p>
              </div>
            </Col>

            <Col lg='2'>
              <div className="head_imgbox">
                <img src={img1} alt="" />
              </div>
            </Col>

            <Col lg='2'>
              <div className="head_imgbox mt-4">
                <video src={video} alt="" controls />
              </div>
            </Col>

            <Col lg='2'>
              <div className="head_imgbox mt-5">
                <img src={img2} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="main-banner-content text-center">
                <h3 style={{ fontSize: '40px', fontWeight: '500' }}><i>There Is A Vast World Out There <span style={{ color: '#fd7614' }}>To Discover</span></i></h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-5'>
              <div className="head_subtitle d-flex align-items-center">
                <p>Explore </p>
              </div>
              <h2 className='featured_tour-title'><i>Our Featured Tours</i></h2>

              <Link to= '/tours'>
              <marquee>
               <div>
                <Row style={{marginTop:'40px'}}>
                {
                  homeTour.length>0?homeTour.map((item)=>(
                    <Col>
                      <TourCard tour={item} />
                    </Col>
                  )):"empty"
                }
                </Row>
                
               </div>
              </marquee>
              </Link>

              <div className="text-center" style={{marginTop:'30px'}}>
              <Link to = '/tours'>
              <button className='btn btn-lg primary__btn' style={{fontWeight:'bold'}}>View More</button>
              </Link>
              </div>
              
            </Col>
          </Row>
        </Container>
      </section>

        <Container>
          <Row>
            <Col lg='12'>
              <div className="head_subtitle d-flex align-items-center">
                <p>Experience</p>
              </div>
              <div className="customize_area">
                <div className="contentexp">
                  <h2 className="text-white">
                    With our all experience
                    <br />
                    we will serve you
                  </h2>
                  <div className="counter_wrapper d-flex align-items-center gap-5">
                    <div className="counter_box">
                      <span>12k+</span>
                      <h6>Successful trips</h6>
                    </div>

                    <div className="counter_box">
                      <span>2k+</span>
                      <h6>Regular clients</h6>
                    </div>

                    <div className="counter_box">
                      <span>15</span>
                      <h6>Year experience</h6>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="head_subtitle d-flex align-items-center">
                <p>Gallery</p>
              </div>
              <h2 className='gallery_title'><i>Visit Our Customer tour gallery</i></h2>
            </Col>

            <Col lg='12'>
              <Gallery />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="head_subtitle d-flex align-items-center">
                <p>Fans Love</p>
              </div>
              <h2 className="testimonal_title pb-4"><i>What our Customers say about us</i></h2>
            </Col>
          </Row>
          <Review />
        </Container>
      </section>
      <Footer />
    </>
  )
}

export default Home