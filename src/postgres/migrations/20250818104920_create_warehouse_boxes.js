/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('warehouse_box', table => {
    table.increments('id').primary();
    table.integer('warehouse_id').unsigned().notNullable();
    table.foreign('warehouse_id').references('id').inTable('warehouse').onDelete('CASCADE');
    table.decimal('box_delivery_and_storage_expr');
    table.decimal('box_delivery_base');
    table.decimal('box_delivery_coef_expr');
    table.decimal('box_delivery_liter');
    table.decimal('box_delivery_marketplace_base');
    table.decimal('box_delivery_marketplace_coef_expr');
    table.decimal('box_delivery_marketplace_liter');
    table.decimal('box_storage_base');
    table.decimal('box_storage_coef_expr');
    table.decimal('box_storage_liter');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('warehouse_box');
};
