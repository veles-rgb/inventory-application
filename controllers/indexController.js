const db = require("../db/queries");

async function getIndex(req, res) {
    res.render("index", {
        title: "Veles Pets"
    });
}

module.exports = {
    getIndex
};