import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'


import Home from './pages/Home'
import Header from './nav/Header'
import SingleWorkout from './pages/SingleWorkout'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  
  const {user} = useAuthContext()

  return (
    <div className="className">
      <BrowserRouter>
        <Header/>
        <div className="pages">
          <Routes>
            <Route path='/' element={user ? <Home/> : <Navigate to="/login"/>} />
            <Route path='/:id' element={user? <SingleWorkout/> : <Navigate to="/login"/>} />
            <Route path='/login' element={!user ? <Login/> : <Navigate to="/"/>} />
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to="/"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
