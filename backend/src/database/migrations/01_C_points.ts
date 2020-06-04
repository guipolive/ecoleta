import Knex from 'knex';

// realiza as alterações no banco de dados
export async function up(knex: Knex) {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // máximo 2 caracteres
    })
}

// caso algo dê erro, precisaremos voltar atrás
// o método down será executado caso algum erro aconteça no método up
// por isso devemos desfazer as alterações que fizemos dentro do método up
export async function down(knex: Knex) {
    return knex.schema.dropTable('point');
}