const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
    const dotEnv = require('dotenv');
    dotEnv.config();
}

const app = express();

app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json());

const routes = require('./routes');
app.use(routes);

const PORT = process.env.PORT || 9999;
const NODE_ENV = process.env.NODE_ENV;

const mongoURI = {
    development: process.env.DEV_MONGO_URI,
    testing: process.env.TESTING_MONGO_URI,
    production: process.env.PROD_MONGO_URI,
}

mongoose
    .connect(mongoURI[NODE_ENV] === undefined
        ? mongoURI.development : mongoURI[NODE_ENV],
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT}`);
})