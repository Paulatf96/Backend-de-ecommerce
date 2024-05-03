const {faker} = require("@faker-js/faker");

const generateMocks = () => {
  return {
    id: faker.database.mongodbObjectId(),
    tittle: faker.commerce.productName(),
    description: faker.lorem.sentence(5),
    price: faker.commerce.price(),
    code: faker.commerce.isbn(),
    stock: faker.number.bigInt({ max: 100n }),
    category: faker.commerce.department(),
    status: true,
  };
};

module.exports = generateMocks;
