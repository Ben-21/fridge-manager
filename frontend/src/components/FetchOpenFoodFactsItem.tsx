import axios from "axios";
import {OpenFoodFactsItem} from "../models/models.ts";


type Props = {
    fetchData: (childData: OpenFoodFactsItem) => void;
    barcode: string;
}

export default function FetchOpenFoodFactsItem(props: Props) {


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
            <button type={"button"} onClick={() => fetchOpenFoodFactsItem(props.barcode)}>Search OpenFoodFacts Api</button>
        </form>
    )
}
