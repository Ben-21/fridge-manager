import React, {useEffect, useState} from "react";
import axios from "axios";
import {OpenFoodFactsItem} from "../models/models.ts";


export default function FetchOpenFoodFactsItem() {


    const [openFoodFactsItem, setOpenFoodFactsItem] = useState<OpenFoodFactsItem | undefined>(undefined);
    const [barcode, setBarcode] = useState<string>("");
    const [name, setName] = useState<string>("");


    useEffect(() => {
        if (openFoodFactsItem) {
            setName(openFoodFactsItem.product.product_name);
        }
    }, [openFoodFactsItem])

    function fetchOpenFoodFactsItem(barcode: string) {

        axios
            .get("/api/items/openfoodapi/" + barcode)
            .then((response) => response.data)
            .then((data) => {
                setOpenFoodFactsItem(data);
            })
            .catch(console.error)
    }


    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    return (
        <>
            <form id="barcodeForm">
                Barcode:
                <input name="barcode" type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
                <button type={"button"} onClick={() => fetchOpenFoodFactsItem(barcode)}>Search</button>
            </form>

            <form id="productForm">
                Product Name:
                <input name="name" type="text" value={name} onChange={handleNameChange} style={{width: "550px"}}/>
            </form>
        </>
    )
}
