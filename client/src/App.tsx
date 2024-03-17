import DashBoard from "./components/dasboard";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Room from "./components/room";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< DashBoard />} />
        <Route path='/room' element={< Room />} />

      </Routes>
    </BrowserRouter >

  );
}