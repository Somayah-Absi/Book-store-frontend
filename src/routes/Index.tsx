import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from "react"
import Home from "@/pages/Home"
import NavBar from "@/components/layout/NavBar"

const Index = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
