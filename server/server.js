const express = require('express');
// import express from 'express';
const port = process.env.PORT || 3000;
const app = express();
const clientRouter = require('./routes/clientRouter.js');
// import clientRouter from './routes/clientRouter.js';

app.use(express.json);

// TASKS FOR BACKEND

// 1. get request to get 10 latest queries from our SQL Db
// 2. get request to get a specific query from our SQL DB

app.use('/user', clientRouter);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}...`);
});
