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

export enum OpenFoodFactsProduct {
    _ID = "-Id",
    PRODUCT_NAME = "Product Name",
    IMAGE_URL = "Image Url",
    QUANTITY = "Quantity"
}