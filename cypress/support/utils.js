import { faker } from '@faker-js/faker';

/**
 * Utilitários para geração de dados dinâmicos de teste,
 * evitando colisões de estado na API pública do ServeRest.
 */
export const generateUserData = (isAdmin = true) => ({
  nome: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: isAdmin ? 'true' : 'false',
});

export const generateProductData = () => ({
  nome: `Produto Teste ${faker.commerce.productName()} ${Date.now()}`,
  preco: faker.commerce.price({ min: 10, max: 1000, dec: 0 }),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int({ min: 10, max: 100 }),
});
