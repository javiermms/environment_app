const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const should = chai.should();

/** Require Models */
const Profile = require('../models/profile');
const Food = require('../models/food')

/** Test Objects */
const testProfile = {
    "username": "testBob123",
    "password": "bestpassword123"
}

const fakeAsparagus = {
    "name": "fakeAsparagus",
    "describe": "this is not asparagus"
}

chai.use(chaiHttp);

describe('Profiles', () => {

    after(() => {
        Profile.deleteMany({ username: "testBob123" })
            .exec((err, profiles) => {
                console.log(profiles)
                profiles.remove();
            });
        Food.deleteMany({ name: "fakeAsparagus" })
            .exec((err, foods) => {
                console.log(foods)
                foods.remove();
            });
    });

    // TEST INDEX
    it('should display index form on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html
                done();
            });
        });

    // TEST SHOW PROFILE
    it('should show a single profile on /profiles/<id> GET', (done) => {
        var profile = new Profile(testProfile);
        profile.save((err, data) => {
            chai.request(server)
                .get(`/profiles/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });
    // TEST UPDATE PROFILE
    it('should update a single profile on /profiles/<id> PUT', (done) => {
        var profile = new Profile(testProfile);
        profile.save((err, data) => {
            chai.request(server)
                .put(`/profiles/${data._id}?method=PUT`)
                .send({ $push: {foods: fakeAsparagus } })
                .send({ $pull: {foods: fakeAsparagus } })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
            });
        });
    });

    // TEST SHOW EDIT FORM
    it('should show the food index on /profiles/<id>/edit GET', (done) => {
        var profile = new Profile(testProfile);
        profile.save((err, data) => {
            chai.request(server)
                .get(`/profiles/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
    });

    // TEST DELETE PROFILE
    it('should delete a single profile on /profiles/<id> DELETE', (done) => {
        var profile = new Profile(testProfile);
        profile.save((err, data) => {
            chai.request(server)
                .delete(`/profiles/${data._id}?_method=DELETE`)
                .end((err, res) => {
                    // res.should.have.status(200);
                    res.should.be.html
                    done();
            });
        });
    });

})
