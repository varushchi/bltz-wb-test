import { getBoxTarrifs } from "./getBoxTarrifs.ts";
import knex from "knex";
import knexConfig from '../knexfile.ts'

export async function insertData () {
  const db = knex(knexConfig.development);

  const today = new Date()

  try {
    const boxTarrifs = await getBoxTarrifs(today)

    if (!boxTarrifs) {
      throw new Error('No data to insert')
    }

    await db('warehouse_metadata').insert({
      date: today,
      dt_next_box: boxTarrifs.dtNextBox !== '' ? new Date(boxTarrifs.dtNextBox) : null,
      dt_till_max: boxTarrifs.dtTillMax !== '' ? new Date(boxTarrifs.dtTillMax) : null
    }).onConflict('date').merge()

    for (const warehouse of boxTarrifs.warehouseList) {

      const [warehouseRow] = await db('warehouse').insert({
        date: today,
        name: warehouse.warehouseName,
        geo_name: warehouse.geoName
      }).onConflict(['name', 'date']).merge().returning('id')

      await db('warehouse_box').insert({
        date: today,
        warehouse_id: warehouseRow.id,
        box_delivery_and_storage_expr: warehouse.boxDeliveryAndStorageExpr,
        box_delivery_base: warehouse.boxDeliveryBase,
        box_delivery_coef_expr: warehouse.boxDeliveryCoefExpr,
        box_delivery_liter: warehouse.boxDeliveryLiter,
        box_delivery_marketplace_base: warehouse.boxDeliveryMarketplaceBase,
        box_delivery_marketplace_coef_expr:warehouse.boxDeliveryMarketplaceCoefExpr,
        box_delivery_marketplace_liter: warehouse.boxDeliveryMarketplaceLiter,
        box_storage_base: warehouse.boxStorageBase,
        box_storage_coef_expr: warehouse.boxStorageCoefExpr,
        box_storage_liter: warehouse.boxStorageLiter,
      }).onConflict(['warehouse_id', 'date']).merge()
    }
  } catch (error) {
    console.log(error)
  }
  finally {
    await db.destroy()
  }
}


