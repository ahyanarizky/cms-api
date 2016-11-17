'use strict'

const Data = require('../models/data.model')

module.exports = {
    getData: function(req, res) {
        Data.find({}, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    getOneData: function(req, res) {
        Data.find({
            dataId: req.params.id
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    },
    createData: function(req, res) {
        Data.create({
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
    updateData: function(req, res) {
        Data.findOneAndUpdate({
            dataId: req.params.id
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
    deleteData: function(req, res) {
        Data.remove({
            dataId: req.params.id
        }, function(err, data) {
            if (err) {
                res.json({ message: `Error : ${err}` })
            } else {
                res.json(data)
            }
        })
    }
}
