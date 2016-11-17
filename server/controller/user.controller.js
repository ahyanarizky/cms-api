'use strict'
const User = require('../models/user.model')
const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = {
    registerProcess: function(req, res) {
        User.register({
            email: req.body.email,
            username: req.body.username
        }, req.body.password, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                passport.authenticate('local')(req, res, function() {
                    req.session.save(function(err, next) {
                        if (err) {
                            res.json({ message: `Registration failed : ${err}` })
                        } else {
                            var token = jwt.sign({
                                    email: data.email,
                                    username: data.username
                                }, 'secret', { expiresIn: 1440 }) //1 day
                            res.json({
                                success: true,
                                message: `Registration Success`,
                                token: token
                            })
                        }
                    })
                })
            }
        })
    },
    loginProcess: function(req, res, next) {
        passport.authenticate('local', {}, (err, user, info) => {
            var token = jwt.sign({
                    email: user.email,
                    username: user.username
                }, 'secret', { expiresIn: 1440 }) //1 day
            res.json({
                success: true,
                message: `Login Success`,
                token: token
            })
        })(req, res, next)
    }
}
