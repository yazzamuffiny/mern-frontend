import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'


import Home from './pages/Home'
import Header from './nav/Header'

import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  

  return (
    <div className="className">
      <BrowserRouter>
        <Header/>
        <div className="pages">
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
