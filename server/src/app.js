const app = require('express')();
require('dotenv').config();


const {
    signUp,
    login
} = require('./handlers/user');

const {
    getTips,
    postTip
} = require('./handlers/posts');

const PORT = process.env.PORT || 5000;

/** user routes */
app.post('/signup', signUp);
app.post('/login', login);

/** tips routes */
app.get('/tips', getTips);
app.post('/tip', postTip);


app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT}`);
})