import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import AddCripto from './components/AddCripto/AddCripto'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import EditCripto from './components/EditCripto/EditCripto'
import { QueryClientProvider, QueryClient } from "react-query"
import ProtectedRoute from './components/ProtectedRoutes'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/addcripto' element={<AddCripto />} />
            <Route path='/editcripto/:id' element={<EditCripto />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
