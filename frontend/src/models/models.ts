export type Item = {
    id: string,
    name: string,
    imageUrl: string,
    storageLocation: StorageLocation,
    stockAmount: number,
    warnStockAmount: number,
    stockUnit: StockUnit,
    quantity: string
}

export type ItemToCreate = {
    name: string,
    imageUrl: string,
    storageLocation: StorageLocation,
    stockAmount: number,
    warnStockAmount: number,
    stockUnit: StockUnit,
    quantity: string
}

export type OpenFoodFactsItem = {
    code: string,
    product: OpenFoodFactsProduct
}

export type OpenFoodFactsProduct = {
    id: string,
    product_name: string,
    image_url: string,
    quantity: string
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

