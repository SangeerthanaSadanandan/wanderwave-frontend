import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import galleryimg from '../Assets/gallery-04.jpg'
import { addTourAPI } from '../Services/allAPI';
import { addTourResponseContext } from '../ContestAPI/ContestShare';

function AddTour() {

  const {addTourRes,setAddTourRes} = useContext(addTourResponseContext)

  //to hold token from sessionStorage
  const [token, setToken] = useState("");
  //to get token from sessionStorage
  useEffect(() => {
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [tourDetails, setTourDetails] = useState({
    destination: "", locations: "", description: "", price: "", days: "", tourImage: "",
  })
  console.log(tourDetails);

  const [preview,setPreview] = useState("")
  console.log(preview);

  useEffect(()=>{
    if(tourDetails.tourImage){
      setPreview(URL.createObjectURL(tourDetails.tourImage))
    }
  },[tourDetails.tourImage])


  const tourAdd=async()=>{
    const {destination,locations,description,price,days,tourImage} = tourDetails
    if(!destination || !locations || !description || !price || !days || !tourImage){
      alert("Please enter the details")
    }
    else{
      //API call
      const reqBody= new FormData()
      reqBody.append("destination",destination)
      reqBody.append("locations",locations)
      reqBody.append("description",description)
      reqBody.append("price",price)
      reqBody.append("days",days)
      reqBody.append("tourImage",tourImage)

      const  reqHeader = {
        "Content-Type": "multipart/form-data",//It indicates the req containes a image file
        "Authorization": `Bearer ${token}`//To send token from client side to server side
      };
  
      const result = await addTourAPI(reqBody,reqHeader)
      console.log(result);
      if(result.status === 200){
        console.log(result.data);
        alert("Tour details added successfully")
        handleClose()
        setAddTourRes(result.data)
        setTourDetails({
          destination:"",locations:"",description:"",price:"",days:"",tourImage:""
        })
        setPreview("")
      }
      else{
        alert(result.response.data)
        console.log(result.response.data);
      }
    }
    
  }


  return (
    <div>
      <button className='btn btn-success' style={{ borderRadius: '30px', fontSize: '15px', fontWeight: 'bold' }} onClick={handleShow}>ADD TOUR</button>

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
                <input type="file" style={{ display: 'none' }} onChange={e=>setTourDetails({...tourDetails,tourImage:e.target.files[0]})}  />
                <img src={preview?preview:galleryimg} width={'100%'} alt="" />
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
            <Button variant='primary' onClick={tourAdd} style={{ fontSize: '15px' }}>Add</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddTour