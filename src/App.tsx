import CharacterDetail from './components/CharacterDetail';
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} /> 
          <Route path=":id" element={<CharacterDetail/>} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
