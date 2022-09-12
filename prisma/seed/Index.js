const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
require('dotenv').config();
const fs = require('fs');

const prisma = new PrismaClient();

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomDealType = () => {
    const dealTypes = ['INTERCAMBIO', 'DONACION'];
    return dealTypes[generateRandomNumber(0, 1)];
};

const fakerUser = () => {
    return{
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    email: faker.internet.email(),
    contrasenia: faker.internet.password(),
    ultimo_acceso: faker.date.recent(),
    descripcion: faker.lorem.paragraph(),
    telefono: faker.phone.number()
    }
}

const adminUser = () => {
    return{
    nombre: 'admin',
    apellido: 'admin',
    email: 'admin@admin.com',
    contrasenia: 'admin123',
    ultimo_acceso: faker.date.recent(),
    descripcion: faker.lorem.paragraph(),
    tipo: 'ADMIN',
    telefono: faker.phone.number(),
    }
}

const fakerProduct = () => {
    return{
        titulo: faker.commerce.productName(),
        descripcion: faker.lorem.paragraph(),
        tipo_trato: randomDealType(),
        cantidad: generateRandomNumber(1, 10),
        userId: generateRandomNumber(1, 10)
    }
}

async function main() {
    console.log('Seeding...');
    const fakerProducts = 5;
    const fakerRounds = 10;
    const admin = await prisma.usuario.create({
        data: adminUser()
    })
    for (let i = 0; i < fakerRounds; i++) {
        const usuario = await prisma.usuario.create({
            data: fakerUser()
        });
        console.log(usuario);
    }
    for (let i = 0; i < fakerProducts; i++) {
        const producto = await prisma.producto.create({
            data: fakerProduct()
        });
        console.log(producto);
    }
    //generate categories
    const categories = await prisma.categoria.createMany({
        data: [
            { nombre: 'Electrónica' },
            { nombre: 'Hogar' },
            { nombre: 'Juguetes' },
            { nombre: 'Ropa' },
            { nombre: 'Deportes' },
            { nombre: 'Libros' },
            { nombre: 'Muebles' },
            { nombre: 'Mascotas' },
            { nombre: 'Otros' },
        ]
    });
    
    console.log(categories);

    const categoriesProducts = await prisma.CatProducto.createMany({
        data: [
            { id_cate: 1, id_prod: 1 },
            { id_cate: 2, id_prod: 2 },
            { id_cate: 3, id_prod: 3 },
            { id_cate: 4, id_prod: 4 },
            { id_cate: 5, id_prod: 5 },
        ]
    });

    console.log(categoriesProducts);

    const Intercambio = await prisma.intercambio.createMany({
        data: [
            { id_producto_enviado: 1, id_producto_recibido: 2, mensaje: 'Hola, me interesa tu producto, ¿podemos intercambiarlo?', fecha: faker.date.recent() },
            { id_producto_enviado: 3, id_producto_recibido: 4, mensaje: 'Hola, me interesa tu producto, ¿podemos intercambiarlo?', fecha: faker.date.recent() }
        ]
    });

}

main()
    .catch(e => {
        throw e;
    }
    )
    .finally(async () => {
        await prisma.$disconnect();
    }
    );


