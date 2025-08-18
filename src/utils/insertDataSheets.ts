import knex from 'knex';
import knexConfig from '../knexfile.ts';
import type { ReturnTarrifs } from '../types.ts';

export async function insertDataSheets(): Promise<ReturnTarrifs[]> {
  const db = knex(knexConfig.development)
  const tariffs = await db('warehouse_box')
    .join('warehouse', 'warehouse.id', 'warehouse_box.warehouse_id')
    .select(
      'warehouse.name as warehouse_name',
      'warehouse.geo_name',
      'warehouse_box.box_delivery_coef_expr as box_delivery_coef',
      'warehouse_box.box_storage_coef_expr as box_storage_coef',
      'warehouse.date'
    )
    .whereRaw("?? <> '-' AND ?? <> '-'", [
      'warehouse_box.box_delivery_coef_expr',
      'warehouse_box.box_storage_coef_expr'
    ])
    .orderByRaw('CAST(?? AS numeric) ASC', ['warehouse_box.box_delivery_coef_expr'])


    await db.destroy()

    return tariffs
}