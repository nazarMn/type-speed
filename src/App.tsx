import './App.css'
import TextList from './components/TextList/TextList'
import Header from './components/Header/Header'

function App() {


  return (
    <div className="w-full h-screen flex flex-col items-center justify-start bg-gray-100 gap-16 pt-[20px]">

      <Header />
     
        <TextList />
   
     
    </div>
  )
}

export default App
