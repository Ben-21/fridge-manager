import {Item, StockUnit, StorageLocation} from "../models/models.ts";
import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import HomeButton from "../components/HomeButton.tsx";


export default function UpdateItem() {
    const {id} = useParams();
    const [itemToSave, setItemToSave] = useState<Item>({
        id: "",
        barcode: '',
        name: '',
        imageUrl: '',
        quantity: '',
        storageLocation: StorageLocation.FRIDGE,
        stockAmount: 1,
        warnStockAmount: 1,
        stockUnit: StockUnit.PIECE
    })
    const navigate = useNavigate();
    const [deleteQuestion, setDeleteQuestion] = useState(false);

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/items/id/${id}`)
                .then((response) => {
                    const itemTemp = response.data;
                    setItemToSave(itemTemp);
                })
                .catch((error) => {
                    toast.error("Product not found" + error)
                    navigate("/");
                });
        }
    }, [id, navigate])

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const newItem = {...itemToSave};
        setItemToSave(newItem);
        const {name, value} = event.target;
        setItemToSave((prevItem) => ({
            ...(prevItem),
            [name]: value,
        }));
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {id, ...itemToCreate} = itemToSave;
        axios
            .put(`/api/items/${id}`, itemToCreate)
            .then(() => toast.success("Product successfully updated"))
            .catch((error) => {
                toast.error("Something went wrong" + error);
                console.log(error)
            })
            .finally(() => navigate("/"));
    }

    function handleDeleteOne() {
        setDeleteQuestion(true)
    }

    function handleDeleteTwo() {
        axios
            .delete(`/api/items/${id}`)
            .then(() => toast.success("Product successfully deleted"))
            .catch((error) => {
                toast.error("Something went wrong" + error);
                console.log(error)
            })
            .finally(() => navigate("/"));
    }


    return (
        <Container>
            <HomeButton/>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <label htmlFor={"imageUrl"}>Product Image</label>
                    <br/>
                    <img src={itemToSave.imageUrl} alt={"Product Image"}/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="barcode">Product Barcode:</label>
                    <input name="barcode" type="text" value={itemToSave.barcode} onChange={handleChange} required/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="name">Product Name:</label>
                    <input name="name" type="text" value={itemToSave.name} onChange={handleChange} required/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="quantity">Product Quantity:</label>
                    <input name="quantity" type="text" value={itemToSave.quantity} onChange={handleChange}
                           required/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="storageLocation">Storage Location:</label>
                    <select name="storageLocation" value={itemToSave.storageLocation} onChange={handleChange}>
                        <option value="">-- Select an option --</option>
                        <option value="FRIDGE">Fridge</option>
                        <option value="PANTRY">Pantry</option>
                    </select>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="stockAmount">Stock Amount:</label>
                    <input name="stockAmount" type="number" value={itemToSave.stockAmount}
                           onChange={handleChange} required/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="warnStockAmount">Warn Stock Amount:</label>
                    <input name="warnStockAmount" type="number" value={itemToSave.warnStockAmount}
                           onChange={handleChange} required/>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="stockUnit">Stock Unit:</label>
                    <select name="stockUnit" value={itemToSave.stockUnit} onChange={handleChange}>
                        <option value="">-- Select an option --</option>
                        <option value="PIECE">Piece</option>
                        <option value="PACKAGING">Packaging</option>
                        <option value="GRAM">Gram</option>
                        <option value="MILLILITER">Milliliter</option>
                    </select>
                </FormGroup>
                <button type="submit">
                    Save Product to Database
                </button>
                <button type={"button"} onClick={handleDeleteOne}>Delete Item</button>
                {deleteQuestion &&
                    <>
                        <div>Do you really want to delete this Item? This process cannot be undone!</div>
                        <button type={"button"} onClick={handleDeleteTwo}>Yes</button>
                        <button type={"button"} onClick={() => setDeleteQuestion(false)}>No</button>
                    </>
                }
            </Form>
        </Container>
    )
}

const Container = styled.div`
  max-width: 800px;
  margin: 70px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

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
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box; 
  }
`;
