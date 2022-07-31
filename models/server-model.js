const mongoose = require('mongoose');

const ServerSchema = new mongoose.Schema({
    ip_address: {
        type: String,
        require: true
    },
    server_name: {
        type: Date,
        require: true
    },
    status: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        require: true
    }
})

const ServerModel = mongoose.model('Server', ServerSchema);
module.exports = ServerModel;