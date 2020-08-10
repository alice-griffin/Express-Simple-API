const express = require('express');
const port = 3000;
const app = express(); 
const cors = require('cors');
const cartItems = require('./routes/cart-items');

app.use(cors());

app.use(express.json());

app.use('/cart-items', cartItems);

app.listen(port, () => console.log(`listening on ${port}`));