import { faker } from '@faker-js/faker';

export const generatedUsers = [];
export const generatedProducts = [];

export const generateUserData = (isAdmin = true) => {
  const user = {
  nome: faker.person.fullName(),
  email: `qa-${faker.string.uuid()}@example.com`,
  password: faker.internet.password(),
  administrador: isAdmin ? 'true' : 'false',
  };
  generatedUsers.push(user);
  return user;
};

export const generateProductData = () => {
  const product = {
  nome: `Produto Teste ${faker.commerce.productName()} ${Date.now()}`,
  preco: Number(faker.commerce.price({ min: 10, max: 1000, dec: 0 })),
  descricao: faker.commerce.productDescription(),
  quantidade: faker.number.int({ min: 10, max: 100 }),
  };
  generatedProducts.push(product);
  return product;
};
