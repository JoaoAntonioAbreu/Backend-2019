const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({
        message: "op quarelho"
    });
});
app.get('/test', (req, res) => {
    res.json({
        message: 'This is a message from the Back-end!'
    });
});
const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});