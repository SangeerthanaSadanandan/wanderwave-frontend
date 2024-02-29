import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import TourCard from '../Components/TourCard'
import { getAllTourAPI } from '../Services/allAPI'
import { Col, Row } from 'reactstrap'
import { addTourResponseContext } from '../ContestAPI/ContestShare'


function Tours() {

  // to hold search value from input tag
  const [searchKey,setSearchKey]= useState("")
  console.log(searchKey);

  const {addTourRes,setAddTourRes} = useContext(addTourResponseContext)


  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = sessionStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [])



  const [allTours, setAllTours] = useState([])
  //api call
  const allTour = async () => {
    try {
      const result = await getAllTourAPI(searchKey);
      console.log(result);
      if (result.status === 200) {
        setAllTours(result.data);
        console.log(allTours);
      } else {
        alert("Failed to fetch tour details");
      }
    } catch (error) {
      console.error("Error fetching tour details: ", error);
      alert("Failed to fetch tour details");
    }
  }


  useEffect(() => {
    allTour();
}, [searchKey, addTourRes]);



  return (
    <div>
      <Header user={user} />
      <header style={{ marginBottom: '30px' }}>
        <div
          className='p-5 text-center bg-image'
          style={{ backgroundImage: "url('https://mdbootstrap.com/img/new/slides/041.webp')", height: '400px' }}
        >
          <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <div className='text-white'>
                <h3 style={{ fontSize: '40px', fontWeight: '500' }}><i>There Is A Vast World Out There <span style={{ color: '#fd7614' }}>To Discover</span></i></h3>

                <div className="d-flex justify-content-center w-100 mt-5">

                  <div className='d-flex  rounded mb-5 w-50'>
                    <input onChange={e=>setSearchKey(e.target.value)} type="text" placeholder='Search By locations' className='form-control' />
                    <i style={{ marginLeft: '10px' }} class=" fs-3 mt-1 me-5 fa-solid fa-magnifying-glass"></i>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container p-4" style={{alignItems:'center'}}>
        <Row>
          {allTours.length > 0 ? (
            allTours.map((item, index) => (
              <Col key={index} style={{ marginRight: '15px', marginLeft:'20px', marginBottom:'20px' }} >
                <TourCard tour={item} />
              </Col>
            ))
          ) : (
            <Col> 
             <div>No tour found</div>
            </Col>
          )}
        </Row>
      </div>
      <Footer />
    </div>
  )
}


export default Tours