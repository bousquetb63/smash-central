var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    post: {
        host: String,
        code: String,
        location: {
            country: String,
            state: String,
            city: String
        },
        main: String,
        description: String
    },
    hidden: { type: Boolean, default: false },
    created_at: Date
})

var Match = mongoose.model('Match', matchSchema);

module.exports = Match;