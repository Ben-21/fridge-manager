import axios from "axios";
import {OpenFoodFactsItem} from "../models/models.ts";
import React, {useState} from "react";
import {toast} from "react-toastify";
import styled from "@emotion/styled";


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
                if (data.status === 0) {
                    toast.error(data.status_verbose);
                } else {
                    props.fetchData(data);
                }
            })
            .catch(console.error)
            .finally(() => setBarcode(""));
    }


    return (
        <Form id="barcodeForm" onSubmit={handleSubmit}>
            <FormGroup>
                <label htmlFor="barcode">Barcode:</label>
                <br/>
                <input name="barcode" type="text" value={barcode} onChange={(event) => setBarcode(event.target.value)}/>
                <br/>
                <button type={"submit"}>Search OpenFoodFacts Api</button>
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
