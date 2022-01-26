const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.port || 8080;
const database = require("./models/database");
const item = require("./models/item");
const user = require("./models/user");
const order = require("./models/order");
const category = require("./models/category");
const sellingList = require("./models/selllingList");
const app = express();

var corsOptions = {
    origin: "http:// localhost: 8080"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', require('./routes/user'))
app.use('/items', require('./routes/item'))
app.use('/orders',require('./routes/order'))
app.use('/category', require('./routes/category'))
app.use('/sellinglists', require('./routes/sellingList'))

database.sync().then(() =>{
    app.listen(port, () =>
        console.log(`Serving portmanteau since there were ports ${port}`)
    )
})

app.get("" , (req, res) => {
    res.json({message: "Routing works"});
})


