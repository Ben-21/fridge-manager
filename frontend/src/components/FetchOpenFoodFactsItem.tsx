import {useState} from "react";
import axios from "axios";
import {OpenFoodFactsItem} from "../models/models.ts";


type Props = {
    fetchData: (childData: OpenFoodFactsItem) => void;
}

export default function FetchOpenFoodFactsItem(props: Props) {

    const [barcode, setBarcode] = useState<string>("");


    function fetchOpenFoodFactsItem(barcode: string) {
        axios
            .get("/api/items/openfoodapi/" + barcode)
            .then((response) => response.data)
            .then((data) => {
                props.fetchData(data);
            })
            .catch(console.error)
    }


    return (
        <form id="barcodeForm">
            Barcode:
            <input name="barcode" type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
            <button type={"button"} onClick={() => fetchOpenFoodFactsItem(barcode)}>Search</button>
        </form>
    )
}
