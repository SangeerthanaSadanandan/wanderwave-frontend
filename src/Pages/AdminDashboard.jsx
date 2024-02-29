import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Button } from 'reactstrap'
import logo from '../Assets/logos.jpg'
import { useNavigate } from 'react-router-dom'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AddTour from '../Components/AddTour';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { deleteTourAPI, getAllBookingsAPI, getAllTourAPI, getAllUsersAPI } from '../Services/allAPI';
import { addTourResponseContext, editTourContextResponse } from '../ContestAPI/ContestShare';
import EditTour from '../Components/EditTour';


function AdminDashboard() {

  const formatDate = (dateString) => {
    const originalDate = new Date(dateString);
    return `${('0' + originalDate.getDate()).slice(-2)}-${('0' + (originalDate.getMonth() + 1)).slice(-2)}-${originalDate.getFullYear().toString().slice(-2)}`;
  };

  const [searchKey,setSearchKey]= useState("")
  console.log(searchKey);

  const { addTourRes, setAddTourRes } = useContext(addTourResponseContext)

  const { editTourRes,setEditTourRes } = useContext(editTourContextResponse)


  const location = useNavigate()

  const logout = () => {
    sessionStorage.clear();
    location('/')
  }

  //api call
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
    allTour()
  }, [searchKey,addTourRes,editTourRes])

  // All Bookings
  const [allBookings,setAllBookings] = useState([])

  const allBooking = async()=>{
    try{
      const result = await getAllBookingsAPI()
      console.log(result);
      if(result.status===200){
        setAllBookings(result.data)
        console.log(allBookings);
      }else{
        alert("Failed to fetch booking details")
      }
    }
    catch(error){
      console.error("Error fetching booking details: ", error);
      alert("Failed to fetch booking details");
    }
  }

  useEffect(()=>{
    allBooking()
  },[])
  

  //All users
  const [allUsers, setAllUsers] = useState([])

  const allUser = async () => {
    try {
      const result = await getAllUsersAPI();
      console.log(result);
      if (result.status === 200) {
        setAllUsers(result.data);
        console.log(allUsers);
      } else {
        alert("Failed to fetch tour details");
      }
    } catch (error) {
      console.error("Error fetching tour details: ", error);
      alert("Failed to fetch tour details");
    }
  }

  useEffect(() => {
    allUser()
  }, [])

  const filteredUsers = allUsers.filter(user => user.role !== 'admin');
  console.log(filteredUsers);

  //delete a tour

  const deleteTour = async(tid)=>{
    const token = sessionStorage.getItem("token")

    if(token){
      const reqHeader={
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      try{
        const result = await deleteTourAPI(tid,reqHeader)
        console.log(result);
        if(result.status===200){
          alert("Tour details deleted successfully")
          allTour()
        }
      }
      catch(error){
        console.log(error);
      }
    }
  }

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
              <div className="nav_right d-flex align-items-center gap-4">
                <div className="nav_btns d-flex align-items-center gap-4">
                  <Button className='btn primary__btn' onClick={logout}>Logout</Button>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </header>

      <div className='m-5 shadow'>
        <h1 className='text-center mb-3 p-3'>Admin Dashboard</h1>
        <hr />
        <Tabs
          defaultActiveKey="tours"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="tours" title="Tours">
            <div style={{ padding: '20px' }} className='text-center'>
              <AddTour />
            </div>

            <div className='container'>
              <MDBTable align='middle'>
                <MDBTableHead style={{ backgroundColor: '#b3e0ff' }}>
                  <tr>
                    <th scope='col'>Tour_id</th>
                    <th scope='col'>Destination</th>
                    <th scope='col'>Locations</th>
                    <th scope='col'>Description</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ backgroundColor: '#e6f7ff' }}>
                  {allTours.map((tour, index) => (
                    <tr key={index}>
                      <td style={{ fontFamily: 'sans-serif' }}>
                        {tour._id}
                      </td>
                      <td>
                        {tour.destination}
                      </td>
                      <td>
                        {tour.locations}
                      </td>
                      <td>
                        {tour.description}
                      </td>
                      <td>
                        {tour.price}
                      </td>
                      <td>
                        <div className='d-flex justify-content-evenly'>
                          <div>
                          <EditTour tours={tour} /> 
                          </div>
                          <div className="btn">
                          <i className='fa-solid fa-trash text-danger' onClick={()=>deleteTour(tour?._id)}></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>

          </Tab>
          <Tab eventKey="bookings" title="Bookings">
            <MDBTable align='middle'>
                <MDBTableHead style={{ backgroundColor: '#b3e0ff' }}>
                  <tr>
                    <th scope='col'>Booking_id</th>
                    <th scope='col'>Tour_id</th>
                    <th scope='col'>Destination</th>
                    <th scope='col'>UserName</th>
                    <th scope='col'>Phone Number</th>
                    <th scope='col'>Date</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ backgroundColor: '#e6f7ff' }}>
                  {allBookings.map((booking, index) => (
                    <tr key={index}>
                      <td style={{ fontFamily: 'sans-serif' }}>
                        {booking._id}
                      </td>
                      <td style={{ fontFamily: 'sans-serif' }}>
                        {booking.tourId}
                      </td>
                      <td>
                        {booking.destination}
                      </td>
                      <td>
                        {booking.fullName}
                      </td>
                      <td style={{ fontFamily: 'sans-serif' }}>
                       {booking.phoneNumber}
                      </td>
                      <td style={{ fontFamily: 'sans-serif' }}>
                      {formatDate(booking.bookedAt)}
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
          </Tab>
          <Tab eventKey="users" title="Users">
            <div className='container'>
              <MDBTable align='middle' >
                <MDBTableHead style={{ backgroundColor: '#b3e0ff' }}>
                  <tr>
                    <th scope='col'>User_id</th>
                    <th scope='col'>User_name</th>
                    <th scope='col'>E-mail</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody style={{ backgroundColor: '#e6f7ff' }}>
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td style={{ fontFamily: 'sans-serif' }}>
                        {user._id}
                      </td>
                      <td>
                        {user.name}
                      </td>
                      <td>
                        {user.email}
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </div>
          </Tab>
        </Tabs>
      </div>

    </>
  )
}

export default AdminDashboard