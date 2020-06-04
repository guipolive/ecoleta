import Knex from 'knex';

// realiza as alterações no banco de dados
export async function up(knex: Knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('title').notNullable();
    })
}

// caso algo dê erro, precisaremos voltar atrás
// o método down será executado caso algum erro aconteça no método up
// por isso devemos desfazer as alterações que fizemos dentro do método up
export async function down(knex: Knex) {
    return knex.schema.dropTable('items');
}