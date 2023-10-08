import './App.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Item, StockUnit, StorageLocation} from "./models/models.ts";
import ItemCard from "./components/ItemCard.tsx";
import FetchItem from "./components/FetchItem.tsx";
import {useState} from "react";

function App() {

    const [barcode, setBarcode] = useState<string>("");
    const [item, setItem] = useState<Item>();
    const testItem: Item = {
        id: "0123",
        barcode: "0000",
        name: "Test Item",
        imageUrl: "https://miro.medium.com/v2/da:true/resize:fit:800/1*nzx2zFmbdZ5xWUQHWohvkw.gif",
        storageLocation: StorageLocation.FRIDGE,
        stockAmount: 10,
        warnStockAmount: 2,
        stockUnit: StockUnit.PIECE,
        quantity: "150 g"
    };

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
