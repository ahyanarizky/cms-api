'use strict'

const Datadate = require('../models/datadate.model')

module.exports = {
    getDataDate: function(req, res) {
        Datadate.find({}, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    getOneDataDate: function(req, res) {
        Datadate.find({
            datadateId: req.params.id
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
                console.log(data);
            }
        })
    },
    createDataDate: function(req, res) {
        Datadate.create({
            letter: req.body.letter,
            frequency: req.body.frequency
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    updateDataDate: function(req, res) {
        Datadate.findOneAndUpdate({
            datadateId: req.params.id
        }, {
            letter: req.body.letter,
            frequency: req.body.frequency
        }, {
            new: true
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    deleteDataDate: function(req, res) {
        Datadate.remove({
            datadateId: req.params.id
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    }
}
