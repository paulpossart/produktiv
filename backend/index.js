require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
