const express = require("express");
const createError = require("http-errors");
const users = require("./src/routes/api.users");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);

app.use("/auth/", require("./src/routes/api.routeauth"));


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
