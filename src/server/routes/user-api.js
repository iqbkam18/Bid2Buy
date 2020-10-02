const express = require('express');
const user = express.Router();
const itemss = require('../db/items.json');

let items = [...itemss];

user.get('/items', (_, res) => {
  res.status(200).send(items);
});

user.get('/user/items', (req, res) => {
  if (req.user) {
    const itemsFound = items.filter((item) => item.createdBy == req.user._id);
    return res.status(200).send({ items: itemsFound });
  } else {
    res.status(401).send();
  }
});

user.get('/item/:id', (req, res) => {
  const { id } = req.params;
  const result = items.filter((actionItem) => actionItem.id == id);

  if (result.length > 0) {
    res.status(200).send(result[0]);
  } else {
    res.json({
      error: 'No Item Found With Current Id',
      id,
    });
  }
});

user.post('/add/item', (req, res) => {
  const { price, imageUrl, title, description } = req.body;
  const { _id } = req.user;
  const item = {
    id: items.length + 1,
    title,
    price,
    category: 'men-clothing',
    image: imageUrl,
    bids: [],
    status: false,
    description,
    createdBy: _id,
  };

  items.unshift(item);

  if (req.user) {
    const itemsFound = items.filter((item) => item.createdBy == req.user._id);
    return res.status(200).send({ items: itemsFound });
  } else {
    res.status(401).send();
  }
});

user.patch('/user/item/:id', (req, res) => {
  const updateItems = items.map((item) =>
    item.id == req.params.id ? { ...item, status: true } : item
  );
  items = updateItems;
  return res.status(200).json({ items: updateItems });
});

user.patch('/bidding/:id/:bid', (req, res) => {
  const updateItems = items.map((item) =>
    item.id == req.params.id
      ? { ...item, bids: [...item.bids, parseInt(req.params.bid)] }
      : item
  );

  items = updateItems;
  return res.status(200).json({ items: updateItems });
});

module.exports = user;
