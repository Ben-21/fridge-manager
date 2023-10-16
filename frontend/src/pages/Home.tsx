import FetchItem from "../components/FetchItem.tsx";
import ItemCard from "../components/ItemCard.tsx";
import ListItems from "../components/ListItems.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Item} from "../models/models.ts";
import axios from "axios";
import {toast} from "react-toastify";
import styled from "@emotion/styled";

export default function Home() {
    const navigate = useNavigate();
    const [item, setItem] = useState<Item>();
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchAllItems();
    }, [])

    const fetchItem = (childData: Item) => {
        setItem(childData);
    };

    function fetchAllItems() {
        axios
            .get("/api/items")
            .then((response) => response.data)
            .then((data) => {
                setItems(data)
            })
            .catch((error) => {
                toast.error("Something went wrong trying to fetch all items");
                console.log(error);
            })
    }

    function goToItemPage() {
        navigate(`/add`);
    }

    function clearFoundItem() {
        setItem(undefined);
        fetchAllItems();
    }

    return (
        <>
            <FetchItem fetchData={fetchItem}/>
            <button type={"button"} onClick={goToItemPage}>Add New Item</button>
            {item &&
                <ItemCardContainer>
                    <legend>Product Details</legend>
                    <button type={"button"} onClick={clearFoundItem}>Clear</button>
                <ItemCard item={item}/>
                </ItemCardContainer>}
            <ListItems items={items}/>
        </>
    )
}

const ItemCardContainer = styled.fieldset`
  border: 5px solid #ccc; 
  border-radius: 5px;
  margin: 10px; 
  padding: 10px; 
`;
