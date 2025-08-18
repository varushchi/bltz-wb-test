import 'dotenv/config';
import type { ResponseDataType, warehouseListType } from './types';
import knex from "knex";
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

async function getBoxTarrifs(date: string){
  const href = 'https://common-api.wildberries.ru/api/v1/tariffs/box'
  const query = `?date=${date}`
  try {
    const res = await fetch(`${href}${query}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${process.env.API_KEY}`
      }
    })
    const { response: { data } }: ResponseDataType = await res.json()

    await db('warehouse_metadata').insert({
          dt_next_box: data.dtNextBox,
          dt_till_max: data.dtTillMax
        }).onConflict('id').merge()

    for (const warehouse of data.warehouseList) {
      const [warehouseId] = await db('warehouse').insert({
        name: warehouse.warehouseName,
        geo_name: warehouse.geoName
      }).onConflict('name').merge().returning('id')

      console.log(warehouseId)

      await db('warehouse_box').insert({
        warehouse_id: warehouseId,
        box_delivery_and_storage_expr: warehouse.boxDeliveryAndStorageExpr,
        box_delivery_base: warehouse.boxDeliveryBase,
        box_delivery_coef_expr: warehouse.boxDeliveryCoefExpr,
        box_delivery_liter: warehouse.boxDeliveryLiter,
        box_delivery_marketplace_base: warehouse.boxDeliveryMarketplaceBase,
        box_delivery_marketplace_coef_expr: warehouse.boxDeliveryMarketplaceCoefExpr,
        box_delivery_marketplace_liter: warehouse.boxDeliveryMarketplaceLiter,
        box_storage_base: warehouse.boxStorageBase,
        box_storage_coef_expr: warehouse.boxStorageCoefExpr,
        box_storage_liter: warehouse.boxStorageLiter
      }).onConflict('id').merge()
    }

  } catch (error) {
    console.log(error)
  }
}

getBoxTarrifs('2025-08-18')



