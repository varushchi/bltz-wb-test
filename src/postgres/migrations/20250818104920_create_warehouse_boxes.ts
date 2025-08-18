import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('warehouse_box', table => {
    table.increments('id').primary();
    table
      .integer("warehouse_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("warehouse")
      .onDelete("CASCADE");
    table.date("date").notNullable();
    table.string('box_delivery_and_storage_expr');
    table.string('box_delivery_base');
    table.string('box_delivery_coef_expr');
    table.string('box_delivery_liter');
    table.string('box_delivery_marketplace_base');
    table.string('box_delivery_marketplace_coef_expr');
    table.string('box_delivery_marketplace_liter');
    table.string('box_storage_base');
    table.string('box_storage_coef_expr');
    table.string('box_storage_liter');
    table.unique(['warehouse_id', 'date']);
  });
};


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('warehouse_box');
};
