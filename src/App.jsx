import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Create from './Components/Create';
import Update from './Components/Update';
import Delete from './Components/Delete';
import 'bootstrap/dist/css/bootstrap.min.css'
import View from './Components/View';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/delete' element={<Delete/>}></Route>
        <Route path="/view/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
