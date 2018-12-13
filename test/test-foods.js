const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);

/** Require Models */
const Profile = require('../models/profile')
const Food = require('../models/food');

/** Test objects */
const testProfile = {
    username: "testBob123",
    password: "bestpassword123"
}

const fakeAsparagus = {
    name: "fakeAsparagus",
    describe: "this is not asparagus",
    CO2e: 1000
}

describe('Foods', () => {

    // FOOD INDEX
    it('should index all foods on /GET', (done) => {
        chai.request(server)
        .get('/profiles/5c083a79abc27e1906854e5d/foods')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
    });

    // TEST CREATE FOOD
    it('should create a single food on /profiles/<id>/foods', (done) => {
        var profile = new Profile(testProfile);
        profile.save((err, user) => {
            chai.request(server)
                .post(`/profiles/${user._id}/foods`)
                .send(fakeAsparagus)
                .end((err, res) => {
                    console.log("success!")
                    res.should.have.status(200);
                    res.should.be.html;
                    done();
            });
        })
    }).timeout(4000);
})
