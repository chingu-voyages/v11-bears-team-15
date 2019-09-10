const app = require('express')();

const {
    signUp,
    login
} = require('./handlers/user');

const {
    getTips,
    postTip
} = require('./handlers/posts');

const PORT = process.env.PORT || 3000;

/** test for initial configuration */
const {test} = require('./handlers/test')
app.get('/test', test);

/** user routes */
// app.post('/signup', signUp);
// app.post('/login', login);

/** tips routes */
// app.get('/tips', getTips);
// app.post('/tip', postTip);


app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT}`);
})