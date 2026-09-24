import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import DashboardLayout from './Layouts/DashboardLayout'
import './App.css'

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
         <Route element={<DashboardLayout />}>
           <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
         </Route>
      </Routes>
    </BrowserRouter>

    
    </>
  )
}

export default App
