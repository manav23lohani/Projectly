const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isAccepted: {
        type: Boolean, 
        default: false,
    },
        
}, {timestamps: true})

module.exports = mongoose.model("Request", requestSchema);