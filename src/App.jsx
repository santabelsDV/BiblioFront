import './App.css';
import {useState} from "react";
import {Routes, Route, Link} from "react-router-dom"; // BrowserRouter тут вже не потрібен
import NotFound from "./pages/NotFounde.jsx";
import Info from "./pages/Info.jsx";
import Home from "./pages/Home.jsx";
import Header from "./header/header.jsx";
import Catalog from "./pages/Catalog.jsx";
import Login from "./pages/login.jsx";
import ProtectedRoute from "./protectCompontnt/ProtectedRoute.jsx";
export default function App() {
    const [stun, setStun] = useState("Присутній");








    return (
        <>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/info" element={<Info />} />
                <Route path="/catalog" element={<ProtectedRoute><Catalog/></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}