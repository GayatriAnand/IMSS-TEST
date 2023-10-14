const express = require('express');
const services = require('./services');
const bodyParser = require('body-parser')


const app = express();
const route = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api',route);

// TASK -1 -- logic to get output
route.get('/org_hierarchy',services.getpaymentBeneficiaryDetails);


// TASK -2 --  Image processing call back api development
route.post('/image-processing',services.imageProcessor)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
