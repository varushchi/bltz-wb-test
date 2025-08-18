import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('warehouse_metadata', table => {
    table.increments('id').primary();
    table.date("date").notNullable().unique();
    table.date('dt_next_box');
    table.date('dt_till_max');
  });
};


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('warehouse_metadata');
};
