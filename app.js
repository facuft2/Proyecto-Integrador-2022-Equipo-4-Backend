const express = require("express");
const morgan = require("morgan");
const passport = require("passport")
const createError = require("http-errors");

const users = require("./src/routes/api.users");
const auth = require("./src/routes/api.routeauth");
const products = require("./src/routes/api.products");
const ExchangeProduct = require("./src/routes/api.exchange")
const category = require("./src/routes/api.category")
const cors = require("cors");

require('./src/config/loginCheck')
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(passport.initialize());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cors(
    {
    exposedHeaders: 'Authorization'
}
));

app.use(morgan('dev'));

app.use("/", auth);
app.use('/category', category)
app.use("/product", products);
app.use("/exchange", ExchangeProduct)
app.use("/users", users);

app.use((req, res, next) => {
    next(createError(404));
    }
);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
}
);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);
