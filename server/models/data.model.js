var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');

var dataSchema = mongoose.Schema({
    dataId: {
        type: Number
    },
    letter: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        required: true
    }
})

dataSchema.plugin(AutoIncrement, { inc_field: 'dataId' });
module.exports = mongoose.model('Data', dataSchema);
