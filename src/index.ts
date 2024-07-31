import express from 'express';
import { Sequelize } from 'sequelize';
import { Category, Product } from './models';
var cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors())

const sequelize = new Sequelize('sqlite::memory:');
Category.initialize(sequelize);
Product.initialize(sequelize);

sequelize.sync({ force: true }).then(() => {
  const categories = ['Cleaning Products', 'Cheeses', 'Vegetables and Fruits', 'Meat and Fish', 'Pastries'];
  categories.forEach(async (category) => {
    await Category.create({ name: category });
  });
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories.map((c) => c.name));
  } catch (error) {
    res.status(500).send("Failed to fetch categories.");
  }
});

app.post('/api/order', async (req, res) => {
  try{
    const products = req.body.products;
    await Product.bulkCreate(products);
    res.status(201).send('Order saved');
  }
  catch (e) {
    res.status(500).send("Failed to save order.");
  }
});

app.get('/api/purchases', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  }
  catch (e) {
    res.status(500).send("Failed to fetch purchases.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
