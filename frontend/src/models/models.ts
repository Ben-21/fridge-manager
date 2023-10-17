export type Item = {
    id: string,
    barcode: string,
    name: string,
    imageUrl: string,
    storageLocation: StorageLocation,
    stockAmount: number,
    warnStockAmount: number,
    stockUnit: StockUnit,
    quantity: string
}

export type ItemToCreate = {
    barcode: string,
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
    product: OpenFoodFactsProduct,
    status: number,
    status_verbose: string
}

export type OpenFoodFactsProduct = {
    id: string,
    product_name: string,
    product_name_de: string,
    image_url: string,
    quantity: string
}

export enum StorageLocation {
    FRIDGE = "FRIDGE",
    PANTRY = "PANTRY"
}

export enum StockUnit {
    PIECE = "PIECE",
    PACKAGING = "PACKAGING",
    GRAM = "GRAM",
    MILLILITER = "MILLILITER"
}

