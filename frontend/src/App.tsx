import './App.css'
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Item} from "./models/models.ts";
import ItemCard from "./components/ItemCard.tsx";
import FetchItem from "./components/FetchItem.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [barcode, setBarcode] = useState<string>("");
    const [item, setItem] = useState<Item>();
    const [items, setItems] = useState<Item[]>();


    useEffect(()=>{
        fetchAllItems();
    },[])

    function fetchAllItems() {
        axios
            .get("/api/items")
            .then((response) => response.data)
            .then((data) => {
                setItems(data)
            })
            .catch((error) => {
                toast.error("Something went wrong trying to fetch all items");
                console.log(error);
            })

    }

    const fetchItem = (childData: Item) => {
        setItem(childData);
    };


    return (
        <>
            <ToastContainer/>
            <input name={"barcode"} type={"text"} value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
            <FetchItem fetchData={fetchItem} barcode={barcode}/>
            {item && <ItemCard item={item}/>}

        </>
    )
}

export default App
