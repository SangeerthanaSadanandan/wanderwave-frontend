import React, { useState } from 'react'
import Footer from '../Components/Footer/Footer'
import loginimg from '../Assets/login (1).png'
import Header from '../Components/Header/Header'
import user from '../Assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../Services/allAPI'


function Login() {

  const location = useNavigate()

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  })

  const loginData = async () => {
    const { email, password } = userData
    if (!email || !password) {
      alert("Please fill the form ")
    }
    else {
      const result = await loginAPI(userData)
      console.log(result);
      if (result.status == 200) {
        alert("login successful")//user login successful
        sessionStorage.setItem("userData", JSON.stringify(result.data.user));
        sessionStorage.setItem("token", result.data.token);
        if (result.data.user.role === 'admin') {
          // Redirect to admin dashboard
          location('/admindashboard');
        } else {
          // Redirect to user dashboard
          location('/home');
        }
      }
      else {
        alert("Invalid user data")
      }
    }
  }

  return (
    <>
      <Header />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={loginimg} height={'550px'} alt="" />
            </div>
            <div className="col-6 card shadow p-2" style={{ background: '#faa935' }}>
              <div className='p-5'>
                <div className='user text-center'>
                  <img src={user} alt="" style={{ height: '100px' }} />
                </div>
                <h2 className='text-center p-3' style={{ fontWeight: 'bold', color: 'black' }}>Login</h2>
                <input type="text" value={userData.email} className='form-control' placeholder='Email' onChange={e => setUserData({ ...userData, email: e.target.value })} style={{ height: '40px', borderRadius: '10px' }} />
                <br />
                <input type="password" value={userData.password} className='form-control' placeholder='Password' onChange={e => setUserData({ ...userData, password: e.target.value })} style={{ height: '40px', borderRadius: '10px' }} />
                <br />
                <br />
                <div className="text-center">
                  <button className='btn btn-dark' onClick={loginData}>Login</button>
                </div>
                <br />
                <p className='text-center' style={{ color: 'white' }}>Don't have an account? <Link to='/register' style={{ color: 'black', fontWeight: 'bold' }}>Create Account</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>

  )
}

export default Login