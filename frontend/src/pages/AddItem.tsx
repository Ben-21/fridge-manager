import React, {useState} from "react";
import FetchOpenFoodFactsItem from "../components/FetchOpenFoodFactsItem.tsx";
import {ItemToCreate, OpenFoodFactsItem, StockUnit, StorageLocation} from "../models/models.ts";
import axios from "axios";
import {toast} from "react-toastify";
import styled from "@emotion/styled";
import HomeButton from "../components/HomeButton.tsx";


export default function AddItem() {
    const [openFoodFactsItem, setOpenFoodFactsItem] = useState<OpenFoodFactsItem>();
    const emptyItem: ItemToCreate = {
        barcode: '',
        name: '',
        imageUrl: '',
        quantity: '',
        storageLocation: StorageLocation.FRIDGE,
        stockAmount: 1,
        warnStockAmount: 1,
        stockUnit: StockUnit.PIECE
    }
    const [itemToSave, setItemToSave] = useState<ItemToCreate>(emptyItem);
    const [productName, setProductName] = useState<string>("");

    const fetchOpenFoodFactsData = (childData: OpenFoodFactsItem) => {
        setOpenFoodFactsItem(childData)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const newItem = {...itemToSave};
        setItemToSave(newItem);
        const {name, value} = event.target;
        setItemToSave((prevItem) => ({
            ...(prevItem),
            [name]: value,
        }));
    }

    function handleProductNameChange(event: React.ChangeEvent<HTMLSelectElement>) {
        if (event.target.value === "INT" && openFoodFactsItem?.product.product_name) {
            setProductName(openFoodFactsItem.product.product_name);
        }
        if (event.target.value === "DE" && openFoodFactsItem?.product.product_name_de) {
            setProductName(openFoodFactsItem.product.product_name_de);
        }
    }

    function adoptDataToItemToSave() {
        if (productName === "") {
            toast.error("Please select a product name")
        } else {
            const newFields: Partial<ItemToCreate> = {
                barcode: openFoodFactsItem?.code,
                name: productName,
                imageUrl: openFoodFactsItem?.product.image_url,
                quantity: openFoodFactsItem?.product.quantity,
            }
            setItemToSave((prevITem) => ({
                ...(prevITem),
                ...newFields,
            }));
            setProductName("");
            setOpenFoodFactsItem(undefined);
        }
    }

    function clearFields() {
        setOpenFoodFactsItem(undefined);
        setItemToSave(emptyItem);
        setProductName("");
    }

    function saveItemToDatabase(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios
            .post("/api/items", itemToSave)
            .then(() => toast.success("Product successfully added"))
            .catch((error) => {
                toast.error("Something went wrong" + error);
                console.log(error)
            })
            .finally(() => setItemToSave({
                barcode: '',
                name: '',
                imageUrl: '',
                quantity: '',
                storageLocation: StorageLocation.FRIDGE,
                stockAmount: 1,
                warnStockAmount: 1,
                stockUnit: StockUnit.PIECE
            }));
    }

    return (
        <>
            <HomeButton/>
            <Container>
                <FetchOpenFoodFactsItem fetchData={fetchOpenFoodFactsData}/>
                <button type="button" onClick={clearFields}>
                    Clear all Fields
                </button>
                <hr/>
                {openFoodFactsItem && (
                    <div className="product-details">
                        <img src={openFoodFactsItem?.product.image_url} alt={openFoodFactsItem?.product.product_name}/>
                        <div>
                            <strong>Barcode:</strong> {openFoodFactsItem?.code}
                        </div>
                        <div>
                            <strong>Name International:</strong> {openFoodFactsItem?.product.product_name}
                        </div>
                        <div>
                            <strong>Name DE:</strong> {openFoodFactsItem?.product.product_name_de}
                        </div>
                        <div>
                            <strong>Quantity:</strong> {openFoodFactsItem?.product.quantity}
                        </div>
                        <br/>
                        <FormGroup>
                            <label htmlFor="productName">Choose Product Name:</label>
                            <select name="productName" value={productName} onChange={handleProductNameChange}>
                                <option value="">-- Select an option --</option>
                                <option value="INT">Name International</option>
                                <option value="DE">Name DE</option>
                            </select>
                        </FormGroup>
                        <button
                            type="button" onClick={adoptDataToItemToSave}>
                            Adopt Data
                        </button>
                    </div>
                )}
                <hr/>
                <Form onSubmit={saveItemToDatabase}>
                    {itemToSave.imageUrl &&
                        <FormGroup>
                            <label htmlFor="image_url">Product Image:</label>
                            <br/>
                            <img src={itemToSave.imageUrl} alt={"Product Image"}/>
                        </FormGroup>
                    }
                    <FormGroup>
                        <label htmlFor="barcode">Product Barcode:</label>
                        <input name="barcode" type="text" value={itemToSave?.barcode} onChange={handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="name">Product Name:</label>
                        <input name="name" type="text" value={itemToSave?.name} onChange={handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="quantity">Product Quantity:</label>
                        <input name="quantity" type="text" value={itemToSave?.quantity} onChange={handleChange}
                               required/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="storageLocation">Storage Location:</label>
                        <select name="storageLocation" value={itemToSave?.storageLocation} onChange={handleChange}>
                            <option value="">-- Select an option --</option>
                            <option value="FRIDGE">Fridge</option>
                            <option value="PANTRY">Pantry</option>
                        </select>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="stockAmount">Stock Amount:</label>
                        <input name="stockAmount" type="number" value={itemToSave?.stockAmount}
                               onChange={handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="warnStockAmount">Warn Stock Amount:</label>
                        <input name="warnStockAmount" type="number" value={itemToSave?.warnStockAmount}
                               onChange={handleChange} required/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="stockUnit">Stock Unit:</label>
                        <select name="stockUnit" value={itemToSave?.stockUnit} onChange={handleChange}>
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
                </Form>
            </Container>
        </>
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
