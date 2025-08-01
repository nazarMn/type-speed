import './App.css'
import TextList from './components/TextList/TextList'
import Header from './components/Header/Header'
import Registration from './components/Registration/Registration'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col items-center justify-start bg-gray-100">
       
        
        <Routes>
    <Route  path="/" element={  <div className='w-full h-full pt-[20px]'>    <Header />   <TextList /> </div>} />

          <Route path="/registration" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
