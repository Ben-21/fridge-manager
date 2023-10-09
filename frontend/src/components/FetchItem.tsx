import axios from "axios";
import {Item} from "../models/models.ts";
import {toast} from "react-toastify";
import React, {useState} from "react";


type Props = {
    fetchData: (childData: Item) => void;
}

export default function FetchItem(props: Props) {

    const [barcode, setBarcode] = useState<string>("");


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
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
        <form id="barcodeForm" onSubmit={handleSubmit}>
            <input name={"barcode"} type={"text"} value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
            <br/>
            <button type={"submit"}>Search Database</button>
        </form>
    )
}
