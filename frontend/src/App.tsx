import './App.css'
import AddEditItem from "./pages/AddEditItem.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {


    return (
        <>
            <ToastContainer/>
            <AddEditItem/>
        </>
    )
}

export default App
