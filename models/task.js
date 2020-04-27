// Load required packages
var mongoose = require('mongoose');

// Define our task schema
var TaskSchema = new mongoose.Schema({

    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false,
        default: "No description"
    },

    completed: {
        type: Boolean,
        required: false,
        default: false
    }
},

{ versionKey: false }

);

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema);
