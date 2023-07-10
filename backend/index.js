const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('./routes/stripe');



app.use(express.json());
app.use(cors());

app.use('/api/stripe', stripe);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}!`));
