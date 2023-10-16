import {Item} from "../models/models.ts";
import styled from "@emotion/styled";
import {useNavigate} from "react-router-dom";


type Props = {
    item: Item
}
export default function ItemCard(props: Props) {
    const navigate = useNavigate();

    return (
        <Container onClick={() => navigate(`/update/${props.item.id}`) }>
            <Fieldset>
                <legend>Product Details</legend>
                <div className="image-container">
                    <img src={props.item.imageUrl} alt="Product Image"/>
                </div>
                <div className="details">
                    <div>
                        <strong>Barcode:</strong> {props.item.barcode}
                    </div>
                    <div>
                        <strong>Name:</strong> {props.item.name}
                    </div>
                    <div>
                        <strong>Quantity:</strong> {props.item.quantity}
                    </div>
                    <div>
                        <strong>Storage:</strong> {props.item.storageLocation}
                    </div>
                    <div>
                        <strong>In Stock:</strong> {props.item.stockAmount}
                    </div>
                    <div>
                        <strong>Stock Unit:</strong> {props.item.stockUnit}
                    </div>
                    <div>
                        <strong>Warn Stock Amount:</strong> {props.item.warnStockAmount}
                    </div>
                </div>
            </Fieldset>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const Fieldset = styled.fieldset`
  border: 1px solid #ccc; 
  border-radius: 5px;
  padding: 10px; 
`;
