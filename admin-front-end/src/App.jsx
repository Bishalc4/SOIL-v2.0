import Sidebar from './Components/Sidebar/Sidebar'
import Navbar from './Components/Navbar/Navbar'
import Dashboard from './Pages/Dashboard/Dashboard'
import AllRoutes from './Pages/AllRoutes'
import './App.scss'

function App() {

  return (
    <div className='App'>
      <Sidebar />
      <div className='main'>
        <Navbar />
        <AllRoutes />
      </div>
    </div>
  )
}

export default App
