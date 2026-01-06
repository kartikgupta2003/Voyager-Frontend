import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import CreateTrip from './Pages/CreateTripPage';
import ShowTrip from "./Pages/showTripPage";
import MyTrips from './Pages/MyTrips'
import { toast, ToastContainer } from "react-toastify";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/trip-planner" element={<CreateTrip/>}></Route>
        <Route path="/show-trip/:id" element={<ShowTrip/>}></Route>
        <Route path="/my-trips" element={<MyTrips/>}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        closeOnClick
        pauseOnHover
        theme="colored"
        toastClassName="responsive-toast"
        className="toast-container Toastify__toast-container"
      />
    </div>
  )
}

export default App
