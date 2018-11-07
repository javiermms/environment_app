const Food = require('../models/food');

module.exports = function (app) {
    // Root
    app.get('/', (req, res) => {
        res.render('index');
    })
}
