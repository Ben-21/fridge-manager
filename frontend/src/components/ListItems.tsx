import {Item} from "../models/models.ts";
import ItemCard from "./ItemCard.tsx";
import styled from "@emotion/styled";


type Props = {
    items: Item[];
}
export default function ListItems(props: Props) {
    return (
        <ItemListContainer>
            {props.items.map((item) => (
                <ItemCardWrapper key={item.id}>
                    <ItemCard item={item}/>
                </ItemCardWrapper>
            ))}
        </ItemListContainer>
    )
}

const ItemListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px; 
`;

const ItemCardWrapper = styled.div`
  flex: 0 0;
`;