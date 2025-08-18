import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('warehouse', table => {
    table.increments('id').primary();
    table.date("date").notNullable();
    table.string('name').notNullable();
    table.string('geo_name').notNullable();
    table.unique(['name', 'date']);
  });
};


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('warehouse');
};
