const express = require("express");
const cors = require("cors");
const compression = require('compression')
const dotenv = require('dotenv')
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(compression())
// parse requests of content-type - application/json
app.use(express.json());

dotenv.config()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Routes 
//app.use('/api', routes)

app.get('/', (req, res) => {
    return res.status(200).send({
        success: true,
        message: 'Welcome API!!!!'
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${config.port}`)
})