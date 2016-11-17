var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');

var dataDateSchema = mongoose.Schema({
    datadateId: {
        type: Number
    },
    letter: {
        type: Date,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    }
})

dataDateSchema.plugin(AutoIncrement, { inc_field: 'datadateId' });
module.exports = mongoose.model('Datadate', dataDateSchema);
