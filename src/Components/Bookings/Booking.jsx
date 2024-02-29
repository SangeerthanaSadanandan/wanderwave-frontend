import React, { useEffect, useState } from 'react'
import './Booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem } from 'reactstrap'
import { addBookingAPI } from '../../Services/allAPI';


function Booking({ tour }) {

    //to hold token from sessionStorage
    const [token, setToken] = useState("");
    //to get token from sessionStorage
    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, []);

    const [bookingDetails, setBookingDetails] = useState({
        tourId:"",destination:"",locations:"", fullName: "", phoneNumber: "", bookedAt: "", guestSize: ""
    })
    console.log(bookingDetails);

    const bookNow = async () => {
        const {tourId,destination,locations, fullName, phoneNumber, bookedAt, guestSize } = bookingDetails
        if (!fullName || !phoneNumber || !bookedAt || !guestSize) {
            alert("Please enter the details")
        }
        else {

            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            };

            const result = await addBookingAPI({
                tourId: tour._id,  
                destination:tour.destination,
                locations:tour.locations,
                fullName,
                phoneNumber,
                bookedAt,
                guestSize
            }, reqHeader)
            console.log(result);
            if (result.status === 200) {
                console.log(result.data);
                alert("Your tour booked successfully")
                setBookingDetails({ tourId:"",destination:"",locations:"", fullName: "", phoneNumber: "", bookedAt: "", guestSize: "" })
            }
            else {
                alert(result.response.data)
                console.log(result.response.data);
            }
        }
    }


    return (
        <div className='booking'>
            <div className="price">
                <h3>
                    {tour.price} <span className='text-muted'>/per person</span>
                </h3>
            </div>
            <hr />
            <div className="booking_form">
                <h5>Information</h5>
                <Form className='booking_info_form'>
                    <FormGroup>
                        <input type="text" value={bookingDetails.fullName} style={{ border: 'none' }} onChange={e => setBookingDetails({ ...bookingDetails, fullName: e.target.value })} placeholder='Full Name' id='fullname' className='form-control' />
                    </FormGroup>
                    <FormGroup style={{fontFamily:"sans-serif"}}>
                        <input type="text" value={bookingDetails.phoneNumber} style={{ border: 'none' }} onChange={e => setBookingDetails({ ...bookingDetails, phoneNumber: e.target.value })} placeholder='Phone Number' id='number' className='form-control' />
                    </FormGroup>
                    <FormGroup className='d-flex align-items-center gap-3'>
                        <input type="date" value={bookingDetails.bookedAt} style={{ border: 'none' }} onChange={e => setBookingDetails({ ...bookingDetails, bookedAt: e.target.value })} className='text-muted' placeholder='' id='bookAt' required />
                        <input type="number" value={bookingDetails.guestSize} onChange={e => setBookingDetails({ ...bookingDetails, guestSize: e.target.value })} placeholder='Guest' id='guestSize' required />
                    </FormGroup>
                </Form>
            </div>

            <div className="booking_bottom">
                <ListGroup>
                    <ListGroupItem className='border-0 px-0 text-muted'>
                        <h5 className='d-flex align-items-center gap-1'><i class="fa-solid fa-indian-rupee-sign" style={{ fontSize: '15px' }}></i> {tour.price} <i class="fa-solid fa-xmark" style={{ fontSize: '15px', marginTop: '5px' }}></i> 1 person</h5>
                        <span><i class="fa-solid fa-indian-rupee-sign" style={{ fontSize: '15px' }}></i> {tour.price}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 text-muted'>
                        <h5>No.of Guest</h5>
                        <span>{bookingDetails.guestSize}</span>
                    </ListGroupItem>
                    <ListGroupItem className='border-0 px-0 total'>
                        <h5>Total</h5>
                        <span><i class="fa-solid fa-indian-rupee-sign" style={{ fontSize: '15px' }}></i> {parseFloat(tour.price) * bookingDetails.guestSize}</span>
                    </ListGroupItem>
                </ListGroup>

                <button className='btn btn-lg primary__btn w-100 mt-4' onClick={bookNow}>Book Now</button>
            </div>
        </div>
    )
}

export default Booking