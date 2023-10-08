import {Item} from "../models/models.ts";


type Props = {
    item: Item
}
export default function ItemCard(props: Props) {
    return (
        <div className="item-card">
            <div className="image-container">
                <img src={props.item.imageUrl} alt="Product Image" />
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
        </div>
    )
}