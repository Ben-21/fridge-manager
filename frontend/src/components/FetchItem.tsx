import axios from "axios";
import {Item} from "../models/models.ts";


type Props = {
    fetchData: (childData: Item) => void;
    barcode: string;
}

export default function FetchItem(props: Props) {

    function fetchItem(barcode: string) {
        axios
            .get("/api/items/" + barcode)
            .then((response) => response.data)
            .then((data) => {
                props.fetchData(data);
            })
            .catch(console.error)
    }


    return (
        <form id="barcodeForm">
            <button type={"button"} onClick={() => fetchItem(props.barcode)}>Search Database</button>
        </form>
    )
}
