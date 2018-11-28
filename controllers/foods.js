const Food = require('../models/food.js');

module.exports = (app) => {
    // FOOD INDEX
    app.get('/foods', (req, res) => {
        const test = Food.find({})
        .then((foods) => {
            res.render('food-index', { foods: foods });
        }).catch((err) => {
            console.log(err.message);
        });
    });
    
    // CREATE FOOD
    app.post('/foods', (req, res) =>{
        Food.create(req.body)
            .then((food) =>{
                res.redirect(`/foods`);
            })
            .catch((err) =>{
                console.log(err.message);
            })
    });
}
