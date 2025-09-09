
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  

  return (
   <div>
    <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}/>

      {/* Not Found  */}
      <Route path='*' element={<div className='text-4xl font-semibold text-center mt-20'>404   <br /> Page Not Found</div>}/>
    </Routes>
   </div>
  )
}

export default App
