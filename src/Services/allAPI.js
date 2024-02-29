import { commonAPI } from "./commonAPI"
import { baseUrl } from "./baseUrl"


// 1.register API call - post - body
export const registerAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}

// 2.login API call - post - body
export const loginAPI = async(user) =>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}

//3.addTour API call -post-body
export const addTourAPI =async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/tours/add`,reqBody,reqHeader)
}

//get home project api call
export const homeTourAPI = async() =>{
    return await commonAPI("get",`${baseUrl}/tour/home-tours`,"","")
}

//get all tour api call
export const getAllTourAPI = async(searchKey)=>{
    return await commonAPI("get",`${baseUrl}/tour/all-tours?search=${searchKey}`,"","")
}

//get all user api call
export const getAllUsersAPI = async()=>{
    return await commonAPI("get",`${baseUrl}/user/getallusers`,"")
}

//update the tourdetails
export const updateTourAPI = async(tourId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/tour/update-tour/${tourId}`,reqBody,reqHeader)
}

//view particular tour
export const viewTourAPI = async(id)=>{
    return await commonAPI("get",`${baseUrl}/tour/view-tour/${id}`,"")
}

//delete a particular tour
export const deleteTourAPI = async(tourId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/tour/delete-tour/${tourId}`,{},reqHeader)
}

// booking api call
export const addBookingAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/tour/create-booking`,reqBody,reqHeader)
}

// get all bookings api call
export const getAllBookingsAPI = async()=>{
    return await commonAPI("get",`${baseUrl}/booking/allbookings`,"","")
}

//view a particular user details
export const viewUserAPI = async(id)=>{
    return await commonAPI("get",`${baseUrl}/user/viewuser/${id}`,"")
}

//get a particular user booking details
export const viewBookingAPI = async(id)=>{
    return await commonAPI("get",`${baseUrl}/booking/viewbooking/${id}`,"")
}

