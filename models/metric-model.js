const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
    ip_address: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    cpu_useage: {
        type: Number,
        require: true
    },
    memory_useage: {
        type: Number,
        require: true
    },
    disk_useage: {
        type: Number,
        require: true
    },
})

const MetricModel = mongoose.model('Metric', MetricSchema);
module.exports = MetricModel;