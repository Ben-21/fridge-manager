import axios from "axios";
import {OpenFoodFactsItem} from "../models/models.ts";
import {useState} from "react";


type Props = {
    fetchData: (childData: OpenFoodFactsItem) => void;
}

export default function FetchOpenFoodFactsItem(props: Props) {
    const [barcode, setBarcode] = useState<string>("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios
            .get("/api/items/openfoodapi/" + barcode)
            .then((response) => response.data)
            .then((data) => {
                props.fetchData(data);
            })
            .catch(console.error)
            .finally(() => setBarcode(""));
    }


    return (
        <form id="barcodeForm" onSubmit={handleSubmit}>
            <input name="barcode" type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
            <br/>
            <button type={"submit"}>Search OpenFoodFacts Api</button>
        </form>
    )
}
