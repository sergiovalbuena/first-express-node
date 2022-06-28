const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;


//crear ruta
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
})
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy nueva ruta');
})

//endpoint que muestra JSON
app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;

  for (let index = 0; index < limit; index++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    })
  }
  res.json(products);
})


//endopont que recibe /:id y lo asigna "id"
app.get('/products/:id', (req, res) => {
  const {id} = req.params;
  res.json({
    id,
    name: 'Producto Exclusivo con Id',
    price: 420
  })
})

//endpoint que recibe dos valores:
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  })
})

//query params
app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parametros query');
  }
});

app.listen(port, () => {
  console.log('Mi port' + port);
})
