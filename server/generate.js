var faker = require('faker');

var database = { products: []};

// Faker helps me to automatically generate massive amounts of realistic fake data.
// In this case I'll generate 200 products (food)
for (var i = 1; i<= 300; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    price: faker.commerce.price(),
    imageUrl: `https://source.unsplash.com/1600x900/?product${i}`,
    quantity: faker.random.number()
  });
}

console.log(JSON.stringify(database));