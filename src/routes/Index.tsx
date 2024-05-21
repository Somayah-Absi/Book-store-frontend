import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "@/components/layout/NavBar"
import { Error, Home, Login, ProductsDetail, Register } from "@/pages/index."

const Index = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:ProductId" element={<ProductsDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
