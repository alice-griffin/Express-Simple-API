const express = require('express');
const cartItems = express.Router(); //this is what we want to export

const myItems = [
    {id: 1, product: 'apples', price: 3.99, quantity: 2},
    {id: 2, product: 'chips', price: 1.99, quantity: 1},
    {id: 3, product: 'bagels', price: 2.99, quantity: 1},
    {id: 4, product: 'avocados', price: 3.00, quantity: 3},
    {id: 5, product: 'water', price: 5.99, quantity: 5},
    {id: 6, product: 'tomatoes', price: 1.99, quantity: 6},
    {id: 7, product: 'potatoes', price: 4.99, quantity: 7},
];

cartItems.get('/', (req, res) => {
    let newItems = myItems; 
    if (req.query.maxPrice) {
        newItems = newItems.filter(c => c.price <= req.query.maxPrice)
    } 
    
    if (req.query.prefix) {
        newItems = newItems.filter(c => c.product.startsWith(req.query.prefix)); 
    } 
    
    if (req.query.pageSize) {
        newItems = newItems.slice(0, req.query.pageSize);
    }
    res.status(200).send(newItems);
});

cartItems.get('/:id', (req, res) => {
    const item = myItems.find(c => c.id == req.params.id);
    if (item) {
        res.status(200).send(item);
    } else
        res.status(404).send('not found')
})

cartItems.post('/', (req, res) => {
    const lastItemIndex = myItems.length - 1; //index of our last item in the array
    const newId = myItems[lastItemIndex].id + 1; //assign a new id to our new item using last index and adding 1
    const newItem = {id: newId, product: req.body.product, price: req.body.price, quantity: req.body.quantity}
    myItems.push(newItem);
    res.status(201).send(newItem);
}) //req.body is used on post 


cartItems.put('/:id', (req, res) => {
    const item = myItems.find(item => item.id == req.params.id);
    const itemIndex = myItems.indexOf(item);
    myItems[itemIndex] = {id: itemIndex.id, product: req.body.product, price: req.body.price, quantity: req.body.quantity}
    if (!item) {
        res.status(204).send();
    } else {
        res.status(200).send(item);
    }
}) 

cartItems.delete('/:id', (req, res) => {
    const item = myItems.find(item => item.id == req.params.id);
    const itemIndex = myItems.indexOf(item);
    myItems.splice(itemIndex, 1);
    if (!item) {
        res.sendStatus(500);
    }
    res.status(204).send(item);
})

module.exports = cartItems; 