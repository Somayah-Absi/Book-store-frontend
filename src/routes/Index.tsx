import { BrowserRouter, Route, Routes } from "react-router-dom"

import React from "react"
import Home from "@/pages/Home"
import NavBar from "@/components/layout/NavBar"
import ProductsDetail from "@/components/ProductsDetail"

const Index = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:ProductId" element={<ProductsDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
