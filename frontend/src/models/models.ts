export type Product = {
    id: string,
    name: string,
    imageUrl: string,
    storageLocation: StorageLocation,
    stockAmount: number,
    warnStockAmount: number,
    stockUnit: StockUnit
}



export enum StorageLocation {
    FRIDGE = "Fridge",
    PANTRY = "Pantry"
}

export enum StockUnit {
    PIECE = "Piece",
    PACKAGING = "Packaging Unit",
    GRAM = "Gram",
    MILLILITER = "Milliliter"
}