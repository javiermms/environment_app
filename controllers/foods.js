const Food = require('../models/food');

module.exports = function (app) {
    // Root
    app.get('/foods', (req, res) => {
        res.render('food-index');
    })

    // Update
    // get the food name from index form
    // search the database
    app.put('/foods', (req, res) => {
        const query = { name: req.body.name }
        Food.findOne(query).then((food) =>{
            Profile.update
        })
    })

}
