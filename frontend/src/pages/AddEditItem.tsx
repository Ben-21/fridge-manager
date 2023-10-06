import React, {useState} from "react";
import FetchOpenFoodFactsItem from "../components/FetchOpenFoodFactsItem.tsx";
import {Item, OpenFoodFactsItem} from "../models/models.ts";
import FetchItem from "../components/FetchItem.tsx";
import axios from "axios";
import {toast} from "react-toastify";


export default function AddEditItem() {
    const [openFoodFactsItem, setOpenFoodFactsItem] = useState<OpenFoodFactsItem>();
    const [itemToSave, setItemToSave] = useState<Item>();
    const [barcode, setBarcode] = useState<string>("");
    const fetchOpenFoodFactsData = (childData: OpenFoodFactsItem) => {
        setOpenFoodFactsItem(childData)
    }
    const fetchItem = (childData: Item) => {
        setItemToSave(childData);
    }


    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const {name, value} = event.target;
        setItemToSave((prevItem) => ({
            ...(prevItem as Item),
            [name]: value,
        }));
    }


    function adoptDataToItemToSave(newFields: Partial<Item>) {
        setItemToSave((prevITem) => ({
            ...(prevITem as Item),
            ...newFields,
        }));
    }

    function clearFields() {
        setOpenFoodFactsItem(undefined);
        setBarcode("");
    }

    function saveItemToDatabase() {
        axios
            .post("/api/items/", itemToSave)
            .then(() => toast.success("Product successfully added"))
            .catch((error) => {
                toast.error("Something went wrong" + error);
                console.log(error)
            })
    }

    return (
        <>
            <input name="barcode" type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
            <FetchItem fetchData={fetchItem} barcode={barcode}/>
            <FetchOpenFoodFactsItem fetchData={fetchOpenFoodFactsData} barcode={barcode}/>
            <button type={"button"} onClick={clearFields}>Clear all Fields</button>
            <br/>
            <hr/>
            <img src={openFoodFactsItem?.product.image_url} alt={openFoodFactsItem?.product.product_name}/>
            <br/>
            Product Name: {openFoodFactsItem?.product.product_name}
            <br/>
            Product Quantity: {openFoodFactsItem?.product.quantity}
            <br/>
            <button type={"button"} onClick={() => adoptDataToItemToSave({
                name: openFoodFactsItem?.product.product_name,
                imageUrl: openFoodFactsItem?.product.image_url,
                quantity: openFoodFactsItem?.product.quantity
            })}>Adopt Data
            </button>
            <hr/>
            <br/>
            <br/>
            <br/>

            Product Name:
            <input name="name" type="text" value={itemToSave?.name} onChange={handleChange} style={{width: "550px"}}/>
            <br/>
            Product Quantity:
            <input name="quantity" type="text" value={itemToSave?.quantity} onChange={handleChange}/>


            <div>
                <p>Storage Location</p>
                <label htmlFor="dropdown">Select an option:</label>
                <select name="storageLocation" id="dropdown" value={itemToSave?.storageLocation}
                        onChange={handleChange}>
                    <option value="">-- Select an option --</option>
                    <option value="FRIDGE">Fridge</option>
                    <option value="PANRTRY">Pantry</option>
                </select>
            </div>
            <br/>
            Stock Amount:
            <input name="stockAmount" type="number" value={itemToSave?.stockAmount} onChange={handleChange}/>
            <br/>
            Warn Stock Amount:
            <input name="warnStockAmount" type="number" value={itemToSave?.warnStockAmount} onChange={handleChange}/>
            <br/>
            <div>
                <p>Stock Unit</p>
                <label htmlFor="dropdown">Select an option:</label>
                <select name="stockUnit" id="dropdown" value={itemToSave?.stockUnit} onChange={handleChange}>
                    <option value="">-- Select an option --</option>
                    <option value="PIECE">Piece</option>
                    <option value="PACKAGING">Packaging</option>
                    <option value="GRAM">Gram</option>
                    <option value="MILLILITER">Milliliter</option>
                </select>
            </div>
            <button type={"button"} onClick={saveItemToDatabase}>Save Product to Database</button>

        </>
    )


}