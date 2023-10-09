import FetchItem from "../components/FetchItem.tsx";
import ItemCard from "../components/ItemCard.tsx";
import ListItems from "../components/ListItems.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Item} from "../models/models.ts";
import axios from "axios";
import {toast} from "react-toastify";

export default function Home() {
    const navigate = useNavigate();
    const [barcode, setBarcode] = useState<string>("");
    const [item, setItem] = useState<Item>();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchAllItems();
    }, [])

    const fetchItem = (childData: Item) => {
        setItem(childData);
    };

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

    function goToItemPage() {
        navigate(`/add`);
    }

    return (
        <>
            <input name={"barcode"} type={"text"} value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
            <FetchItem fetchData={fetchItem} barcode={barcode}/>
            <button type={"button"} onClick={goToItemPage}>Add New Item</button>
            {item && <ItemCard item={item}/>}
            <ListItems items={items}/>
        </>
    )
}