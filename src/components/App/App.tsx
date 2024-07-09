import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../../pages/Main/Main";
import './App.css'

function App() {

  return (
    <BrowserRouter>
     <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
    
    </BrowserRouter>

  )
}

export default App
