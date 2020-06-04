import Knex from 'knex';

// realiza as alterações no banco de dados
export async function up(knex: Knex) {
    return knex.schema.createTable('point-items', table => {
        table.increments('id').primary();
        table.integer('point_id')
            .notNullable()
            .references('id')
            .inTable('points');

        table.integer('item_id')
            .notNullable()
            .references('id')
            .inTable('items');
    })
}

// caso algo dê erro, precisaremos voltar atrás
// o método down será executado caso algum erro aconteça no método up
// por isso devemos desfazer as alterações que fizemos dentro do método up
export async function down(knex: Knex) {
    return knex.schema.dropTable('point-items');
}