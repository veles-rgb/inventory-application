require('dotenv').config();
const express = require("express");
const app = express();
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));

const indexRouter = require("./routes/indexRouter");
const animalsRouter = require("./routes/animalsRouter");
const categoriesRouter = require("./routes/categoriesRouter");

app.use("/", indexRouter);
app.use("/animals", animalsRouter);
app.use("/categories", categoriesRouter);

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Server running on port ${PORT}`);
});