export type warehouseListType = {
  boxDeliveryAndStorageExpr: string,
  boxDeliveryBase: string,
  boxDeliveryCoefExpr: string,
  boxDeliveryLiter: string,
  boxDeliveryMarketplaceBase: string,
  boxDeliveryMarketplaceCoefExpr:string,
  boxDeliveryMarketplaceLiter: string,
  boxStorageBase: string,
  boxStorageCoefExpr: string,
  boxStorageLiter: string,
  geoName: string,
  warehouseName: string
}

export type ResponseDataType = {
  response: {
    data: ReturnDatatype
  }
}

export type ReturnDatatype = {
  dtNextBox: string,
  dtTillMax: string,
  warehouseList: warehouseListType[]
}

export type ReturnTarrifs = {
  warehouse_name: string,
  geo_name: string,
  box_delivery_coef: string,
  box_storage_coef: string,
  date: Date
}


