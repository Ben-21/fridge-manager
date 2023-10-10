import './App.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Route, Routes} from "react-router-dom";
import AddEditItem from "./pages/AddEditItem.tsx";
import Home from "./pages/Home.tsx";
import UpdateItem from "./pages/UpdateItem.tsx";

function App() {

    return (
        <>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="add" element={<AddEditItem/>}/>
                <Route path="update/:id" element={<UpdateItem/>}/>
            </Routes>
        </>
    )
}

export default App
