const Food = require('../models/food');

module.exports = function (app) {
    // // Root
    app.get('/foods', (req, res) => {
        res.render('food-index');
    })
}
