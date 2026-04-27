import { faker } from '@faker-js/faker';

/**
 * Dynamic test data generators.
 * Uses Faker to produce unique data on each run, avoiding state collisions
 * on the shared ServeRest public API.
 */
export const generateUserData = (isAdmin = true) => ({
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: isAdmin ? 'true' : 'false',
});

export const generateProductData = () => ({
  nome: `Produto Teste ${faker.commerce.productName()} ${Date.now()}`,
  preco: Number(faker.commerce.price({ min: 10, max: 1000, dec: 0 })),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int({ min: 10, max: 100 }),
});
