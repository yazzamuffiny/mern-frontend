import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from './pages/Home'
import Header from './nav/Header'
import './App.css'

const App = () => {
  

  return (
    <div className="className">
      <BrowserRouter>
        <Header/>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
