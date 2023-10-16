import axios from "axios";
import {Item} from "../models/models.ts";
import {toast} from "react-toastify";
import React, {useState} from "react";
import styled from "@emotion/styled";


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
                .get("/api/items/barcode/" + barcode)
                .then((response) => response.data)
                .then((data) => {
                    props.fetchData(data);
                    toast.success("Found Product")
                })
                .catch((error) => {
                    toast.error("Product not found");
                    console.log(error);
                })
                .finally(() => setBarcode(""));
        }
    }


    return (
        <Form id="barcodeForm" onSubmit={handleSubmit}>
            <FormGroup>
                <label htmlFor="barcode">Barcode:</label>
                <br/>
                <input name={"barcode"} type={"text"} value={barcode}
                       onChange={(event) => setBarcode(event.target.value)}/>
                <br/>
                <button type={"submit"}>Search Database</button>
            </FormGroup>
        </Form>
    )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;

`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    font-weight: bold;
  }

  input,
  select {
    width: 50%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
`;
