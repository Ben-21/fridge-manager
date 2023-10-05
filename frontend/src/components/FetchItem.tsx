import axios from "axios";
import {Item} from "../models/models.ts";
import {toast} from "react-toastify";


type Props = {
    fetchData: (childData: Item) => void;
    barcode: string;
}

export default function FetchItem(props: Props) {

    function fetchItem(barcode: string) {
        if (barcode === "") {
            toast.error("Please enter a barcode");
        } else {
            axios
                .get("/api/items/" + barcode)
                .then((response) => response.data)
                .then((data) => {
                    props.fetchData(data);
                    toast.success("Found Product")
                })
                .catch((error) => {
                    toast.error("No Product found");
                    console.log(error);
                })
        }
    }


    return (
        <form id="barcodeForm">
            <button type={"button"} onClick={() => fetchItem(props.barcode)}>Search Database</button>
        </form>
    )
}
