import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { baseUrl } from '../Services/baseUrl';
import { updateTourAPI } from '../Services/allAPI';
import { editTourContextResponse } from '../ContestAPI/ContestShare';



function EditTour({ tours }) {

    const { editTourRes,setEditTourRes } = useContext(editTourContextResponse)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //to hold project details

    const [tourDetails, setTourDetails] = useState({
        id: tours._id, destination: tours.destination, locations: tours.locations, description: tours.description, price: tours.price, days: tours.days, tourImage: "",
    })
    console.log(tourDetails);

    // to hold image details
    const [preview, setPreview] = useState("")
    console.log(preview);

    // converting image to url
    useEffect(() => {
        if (tourDetails.tourImage) {
            setPreview(URL.createObjectURL(tourDetails.tourImage))
        }
    }, [tourDetails.tourImage])

    //update project

    const updateTour = async () => {
        const {id, destination, locations, description, price, days, tourImage } = tourDetails

            //API call
            const reqBody = new FormData()
            reqBody.append("destination", destination)
            reqBody.append("locations", locations)
            reqBody.append("description", description)
            reqBody.append("price", price)
            reqBody.append("days", days)
            preview ? reqBody.append("tourImage", tourImage) : reqBody.append("tourImage", tours.tourImage)

            const token = sessionStorage.getItem("token")
            console.log(token);

            //api call
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",//It indicates the req containes a image file
                    "Authorization": `Bearer ${token}`
                }
                // api call
                const result = await updateTourAPI(id,reqBody,reqHeader)
                console.log(result);
                if(result.status === 200){
                    console.log(result.data);
                    setEditTourRes(result.data)
                    alert("Tour details updated successfully")
                    handleClose()
                }
                else{
                    console.log(result.response.data);
                    setEditTourRes(result.response.data)
                }
            }
            else{
                const reqHeader = {
                    "Content-Type": "application/json",//It indicates the req containes a image file
                    "Authorization": `Bearer ${token}`
                }
                // api call
                const result = await updateTourAPI(id,reqBody,reqHeader)
                console.log(result);
                if(result.status === 200){
                    setEditTourRes(result.data)
                    alert("Tour details updated successfully")
                    handleClose()
                }
                else{
                    console.log(result.response.data);
                }
            }
    }
    return (
        <div>
            <button className='btn ' onClick={handleShow}><i className='fa-solid fa-pen text-primary'></i>
            </button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>Tour Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col mt-4">
                            {/* image  */}
                            <label>
                                <input type="file" style={{ display: 'none' }} onChange={e => setTourDetails({ ...tourDetails, tourImage: e.target.files[0] })} />
                                <img src={preview ? preview : `${baseUrl}/uploads/${tours.tourImage}`} width={'100%'} alt="" />
                            </label>
                        </div>
                        <div className="col mt-4">
                            {/* input  */}
                            <div className="inp">
                                <input type="text" value={tourDetails.destination} onChange={e => setTourDetails({ ...tourDetails, destination: e.target.value })} placeholder='Destination' className='form-control mb-3' />
                                <input type="text" value={tourDetails.locations} onChange={e => setTourDetails({ ...tourDetails, locations: e.target.value })} placeholder='Locations' className='form-control mb-3' />
                                <input type="text" value={tourDetails.description} onChange={e => setTourDetails({ ...tourDetails, description: e.target.value })} placeholder='Description' className='form-control mb-3' />
                                <input type="text" value={tourDetails.price} onChange={e => setTourDetails({ ...tourDetails, price: e.target.value })} placeholder='Price' className='form-control mb-3' />
                                <input type="text" value={tourDetails.days} onChange={e => setTourDetails({ ...tourDetails, days: e.target.value })} placeholder='Days' className='form-control mb-3' />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className='text-center'>
                        <Button variant='primary' style={{ fontSize: '15px' }} onClick={updateTour}>Update</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditTour