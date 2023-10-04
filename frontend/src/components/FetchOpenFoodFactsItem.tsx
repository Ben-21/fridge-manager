import {useState} from "react";
import axios from "axios";
import {OpenFoodFactsItem} from "../models/models.ts";


export default function FetchOpenFoodFactsItem() {


    const [openFoodFactsItem, setOpenFoodFactsItem] = useState<OpenFoodFactsItem | undefined>(undefined);
    const [barcode, setBarcode] = useState<string>("");


   function fetchOpenFoodFactsItem(barcode: string) {
       axios
           .get("/api/items/openfoodapi/" + barcode)
           .then((response) => response.data)
              .then((data) => {
                  setOpenFoodFactsItem(data);
              })
           .catch(console.error)
   }


    return (
        <>
            <form id="barcodeForm">
                <input name="barcode" type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
                <button type="submit" onClick={() => fetchOpenFoodFactsItem(barcode)}>Search</button>
            </form>

            <form id="productForm">
                <input name="name" type="text" value={openFoodFactsItem?.product.product_name}>

                </input>
            </form>
        </>
)
}
