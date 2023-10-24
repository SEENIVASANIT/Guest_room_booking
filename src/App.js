import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Landing_pages from "./pages/Landing_pages";
import House_owner_main_page from "./House_Owner/House_owner_main_page";
import Customers_main_page from "./Customers/Customers_main_page";
import Rooms_deatails from "./pages/Rooms_deatails";
import View_Rooms from "./Customers/View_Rooms";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing_pages />} />
          <Route path="/HouseOwner" element={<House_owner_main_page />} />
          <Route path="/Customer" element={<Customers_main_page />} />
          <Route path="/Rooms" element={<Rooms_deatails />} />
          <Route path="/View_rooms" element={<View_Rooms />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
