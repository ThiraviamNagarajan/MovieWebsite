import { useState } from 'react'

import './App.css'
import HomePage from './components/HomePage'
import LoginInPage from './components/LoginPage'
import SignInPage from './components/SignInPage'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/landingpage" element={<HomePage />}/>
          <Route path="/sign-in-page" element={<SignInPage/>} />
          <Route path="/" element={<LoginInPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
