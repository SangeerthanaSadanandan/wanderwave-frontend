import React, { useState } from 'react'
import Footer from '../Components/Footer/Footer'
import Header from '../Components/Header/Header'
import registerimg from '../Assets/register.png'
import user from '../Assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../Services/allAPI'


function Register() {

  const location = useNavigate()

  const [userData, setUserData] = useState({
    name:"",
    email:"",
    password:""
  })

  const registerData=async()=>{

    const {name,email,password} = userData

    if(!name || !email || !password){
      alert("Please fill the form ")
    }
    else{
      const result = await registerAPI(userData)
      console.log(result);
        if(result.status==200){
          alert(result.data)//user registration successful
          location('/login')
        }
        else{
          alert(result.response.data)//user already registered
        }
    }
    console.log(userData); 
  }

  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={registerimg} height={'550px'} alt="" />
            </div>
            <div className="col-6 card shadow p-4" style={{ background: '#faa935' }}>
              <div>
                <div className='user text-center'>
                  <img src={user} alt="" style={{ height: '100px' }} />
                </div>
                <h2 className='text-center p-3' style={{ fontWeight: 'bold', color: 'black' }}>Register</h2>
                <input type="text" value={userData.name} className='form-control' placeholder='Username' onChange={e=>setUserData({...userData,name:e.target.value})} style={{height:'40px',borderRadius:'10px'}} />
                <br />
                <input type="text" value={userData.email} className='form-control' placeholder='Email' onChange={e=>setUserData({...userData,email:e.target.value})}  style={{height:'40px',borderRadius:'10px'}} />
                <br />
                <input type="password" value={userData.password} className='form-control' placeholder='Password' onChange={e=>setUserData({...userData,password:e.target.value})}  style={{height:'40px',borderRadius:'10px'}} />
                <br />
                <div className="text-center">
                  <button className='btn btn-dark' onClick={registerData}>Create Account</button>
                </div>
              </div>
              <br />
              <p className='text-center' style={{ color: 'white' }}>Already have an account? <Link to='/login' style={{color:'black',fontWeight:'bold'}}>Login</Link></p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Register
