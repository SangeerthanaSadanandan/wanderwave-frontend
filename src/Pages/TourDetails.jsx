import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import './Styles/TourDetails.css'
import { Col, Container, Row } from 'reactstrap'
import Booking from '../Components/Bookings/Booking'
import { useParams } from 'react-router-dom'
import { viewTourAPI } from '../Services/allAPI'
import { baseUrl } from '../Services/baseUrl'


function TourDetails() {

  const [viewTours, setViewTours] = useState({})

  const { id } = useParams()
  console.log(id);

  const viewTour = async (id) => {
    const result = await viewTourAPI(id)
    console.log(result.data);
    setViewTours(result.data)
  }

  console.log(viewTours);


  useEffect(() => {
    viewTour(id)
  }, [])
  


  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])



  return (
    <>
      <Header user={user} />
      <section>
        <Container>
          <Row>
            {
              <Col lg='8'>
                <div className="tour_content">
                  <img src={`${baseUrl}/uploads/${viewTours.tourImage}`} alt="" />
                  <div className="tour_info">
                    <h2>{viewTours.destination}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span>
                        <i class="fa-solid fa-location-dot"></i> {viewTours.locations}
                      </span>
                    </div>

                    <div className="tour_extradetails">
                      <span>{viewTours.description}</span>
                      <span><i class="fa-solid fa-indian-rupee-sign" style={{ fontSize: '15px' }}></i>{viewTours.price}/ <i class="fa-solid fa-user text-muted" style={{ fontSize: '15px' }}></i></span>
                      <span>{viewTours.days}</span>
                    </div>
                  </div>
                </div>
              </Col>
            }

            <Col lg='4'>
              <Booking tour={viewTours}/>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  )
}



export default TourDetails