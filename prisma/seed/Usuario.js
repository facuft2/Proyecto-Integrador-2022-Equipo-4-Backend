import { PrismaClient } from '@prisma/client';
import {faker} from '@faker-js/faker';
import * as dotenv from 'dotenv';
import fs from 'fs';

const filepath = path.resolve(__dirname, './items/picDemo.jpg');
const profilfoePicture = Buffer.from(fs.readFileSync(filepath));

const outputFilepath = path.resolve(__dirname, './items/picDemo1.jpg');
fs.writeFileSync(outputFilepath, profilePicture);

const prisma = new PrismaClient();

new Blob

const fakerUsuario = () => {
    return{
    nombre: faker.name.firstName(),
    apellido: faker.name.lastName(),
    email: faker.internet.email(),
    contrasenia: faker.internet.password(),
    ultimo_acceso: faker.date.recent(),
    descripcion: faker.lorem.paragraph(),
    foto_perfil: profilePicture,
    telefono: faker.phone.number()
    }
}

async function main() {
        
    const fakerRounds = 10;
    dotenv.config();
    for (let i = 0; i < fakerRounds; i++) {
        const usuario = await prisma.usuario.create({
            data: fakerUsuario()
        });
        console.log(usuario);
    }
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


