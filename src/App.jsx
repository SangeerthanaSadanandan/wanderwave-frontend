
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import Tours from './Pages/Tours';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import PageNotFound from './Pages/PageNotFound';
import TourDetails from './Pages/TourDetails';
import MyProfile from './Pages/MyProfile';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/tours' element={<Tours />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/myprofile/:id' element={<MyProfile />} />
        <Route path='/admindashboard' element={<AdminDashboard/>} />
        <Route path='/tourdetails/:id' element={<TourDetails/>}/>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
