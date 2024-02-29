import React from 'react'
import Card from 'react-bootstrap/Card';
import { baseUrl } from '../Services/baseUrl';
import { Link } from 'react-router-dom';

function TourCard({ tour }) {
    console.log(tour);

    return (
        <div>
            <Card style={{ width: '300px', height:'420px', borderRadius: '40px' }} >
                <Card.Img variant="top" height={'200px'} src={tour?`${baseUrl}/uploads/${tour?.tourImage}`:"null"} />
                <Card.Body>
                    <Card.Title className='text-center' style={{ fontWeight: 'bold', color: '#fd7e14' }}>{tour?.destination}</Card.Title>
                    <Card.Text style={{ color: 'black' }}>
                        <div>
                        <div style={{height:'45px'}}>
                        <i class="fa-solid fa-location-dot"></i> {tour?.locations}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'sans-serif', marginTop: "10px" }}>
                            <div style={{fontSize:'20px'}}><i class="fa-solid fa-indian-rupee-sign" style={{ fontSize: '15px' }}></i> {tour?.price}/ <i class="fa-solid fa-user text-muted" style={{ fontSize: '15px' }}></i></div>
                            <div style={{fontSize:'18px'}}>{tour?.days}</div>
                        </div>
                       <Link to={`/tourdetails/${tour._id}`}>
                       <div className='text-center mt-3'>
                            <button className='btn btn-lg primary__btn' style={{fontWeight:"bold"}}>Book Now</button>
                        </div>
                       </Link>
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default TourCard