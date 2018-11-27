const Food = require('../models/food.js');

module.exports = (app) => {
    // Food Index

    app.get('/foods', (req, res) => {
        const test = Food.find()
        .then(foods => {
            console.log(test)
            console.log(foods)
            res.render('food-index', { foods: foods });
        }).catch((err) => {
            console.log(err.message);
        });
    });

}
