import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBBtn,
    MDBRipple
} from 'mdb-react-ui-kit';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom';
import { viewBookingAPI, viewUserAPI } from '../Services/allAPI';


function MyProfile() {

    const formatDate = (dateString) => {
        const originalDate = new Date(dateString);
        return `${('0' + originalDate.getDate()).slice(-2)}-${('0' + (originalDate.getMonth() + 1)).slice(-2)}-${originalDate.getFullYear().toString().slice(-2)}`;
    };

    // get a particular user details
    const [viewUser, setVIewUser] = useState([])

    const { id } = useParams()
    console.log(id);

    const viewUsers = async (id) => {
        const result = await viewUserAPI(id)
        console.log(result.data);
        setVIewUser(result.data)
    }

    console.log(viewUser);


    useEffect(() => {
        viewUsers(id)
    }, [])

    //get a particular user booking details
    const [userBookings, setUserBookings] = useState([])

    const viewBooking = async (id) => {
        try {
            const result = await viewBookingAPI(id)
            console.log(result);
            if (result.status === 200) {
                setUserBookings(result.data)
                console.log(userBookings);
            }
            else {
                alert("Failed to fetch booking details")
            }
        }
        catch (error) {
            console.error("Error fetching booking details: ", error);
            alert("Failed to fetch booking details");
        }
    }


    useEffect(() => {
        viewBooking(id)
    }, [id])



    const [user, setUser] = useState(null)

    useEffect(() => {
        const storedUser = sessionStorage.getItem("userData");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [])

    return (
        <div>
            <Header user={user} />
            <div className='m-5 shadow'>
                <h1 className='text-center mb-3 p-3 ' style={{ color: '#fd7e14' }}>Profile</h1>
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    style={{ marginLeft: '40%' }}
                >
                    <Tab eventKey="profile" title="My Profile">

                        <div>
                            <div className="container p-5 m-5 d-flex justify-content-between">
                                <MDBCard style={{ width: '500px' }} className='shadow p-5'>
                                    <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                        <a>
                                            <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                        </a>
                                    </MDBRipple>
                                    <MDBCardBody>
                                        {
                                            <MDBCardText>
                                                <MDBListGroup style={{ minWidth: '22rem' }} light className='shadow'>
                                                    <MDBListGroupItem noBorders aria-current='true' className='bg-light text-primary px-3'>
                                                        User ID : {viewUser._id}
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem active noBorders className='px-3 bg-light text-primary'>
                                                        Full Name : {viewUser.name}
                                                    </MDBListGroupItem>
                                                    <MDBListGroupItem noBorders className='px-3 bg-light text-primary'>
                                                        Email : {viewUser.email}
                                                    </MDBListGroupItem>
                                                </MDBListGroup>
                                            </MDBCardText>
                                        }
                                    </MDBCardBody>
                                </MDBCard>

                                <div className="image card text-center shadow" style={{ width: '300px' }}>
                                    <img width={'100%'} src="https://cdni.iconscout.com/illustration/premium/thumb/user-profile-8743177-7050108.png" alt="" />
                                </div>
                            </div>

                            <div className='text-center' style={{ paddingBottom: '20px' }}>
                                <MDBBtn href='/'>Back To Home</MDBBtn>
                            </div>

                        </div>

                    </Tab>
                    <Tab eventKey="bookings" title="My Bookings">
                        <div className='container'>
                            <MDBTable align='middle' >
                                <MDBTableHead style={{ backgroundColor: '#b3e0ff' }}>
                                    <tr>
                                        <th scope='col'>Tour_id</th>
                                        <th scope='col'>Destination</th>
                                        <th scope='col'>Locations</th>
                                        <th scope='col'>Date</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody style={{ backgroundColor: '#e6f7ff' }}>
                                    {userBookings.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ fontFamily: 'sans-serif' }}>
                                                {item.tourId}
                                            </td>
                                            <td>
                                                {item.destination}
                                            </td>
                                            <td>
                                                {item.locations}
                                            </td>
                                            <td style={{ fontFamily: 'sans-serif' }}>
                                                {formatDate(item.bookedAt)}
                                            </td>
                                        </tr>
                                    ))}
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <Footer />
        </div>
    )
}

export default MyProfile